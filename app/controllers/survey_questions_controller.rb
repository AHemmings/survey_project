class SurveyQuestionsController < ApplicationController
  def index
    @survey = Survey.find( params.permit("survey_id")[:survey_id])
    @questions = SurveyQuestion.all.where("survey_id= ?", @survey.id).order(:order)
  end

  def new
    @survey = Survey.find( params.permit("survey_id")[:survey_id])
    @question = SurveyQuestion.new
    @questions = @survey.survey_questions  
  end

  def create

    flash[:errors] = []
    @survey = Survey.find( params.permit("survey_id")[:survey_id])

    #check if the order selected already exist in the array of survey_questions
   if survey_question_params[:questions]
      question = @survey.survey_questions.build({question: survey_question_params[:questions][:question], order:  survey_question_params[:questions][:order] })
      flash[:errors] << "Questions can't be blank" if question.question == ""
      flash[:errors] << "This order is already assigned to a question" if @survey.survey_questions.find{|el| el.order == question.order && el.id }
      question.save if flash[:errors].empty?
   else
      question = @survey.survey_questions.build({question: survey_question_params[:questions1][:question], is_fixed: true, order:  survey_question_params[:questions1][:order]})
      flash[:errors] << "Questions can't be blank" if question.question == ""
      flash[:errors] << "This order is already assigned to a question" if @survey.survey_questions.find{|el| el.order == question.order && el.id }
   
      survey_question_params[:questions1][:options].each do |option|
        option = question.question_options.build({option_text: option})
        flash[:errors] << "Options can't be blank" if option.option_text == ""
      end

      question.save if flash[:errors].empty?
   end

    if @survey.save && flash[:errors].empty?
        redirect_to @survey
    else
      flash[:errors] = flash[:errors].uniq
      redirect_to "/surveys/#{@survey.id}/survey_questions/new"
    end
  end

  def edit
    @survey = Survey.find(params.require(:survey_id))
    @question = SurveyQuestion.find(params.require("id"))
  end

  def update

    flash[:errors] = []
    @survey = Survey.find(params.require(:survey_id))
    @question = SurveyQuestion.find(params.require("id"))

   if survey_question_params[:questions1]
      @question.is_fixed = true 
      @question.question = survey_question_params[:questions1][:question]
      @question.order = survey_question_params[:questions1][:order]

      flash[:errors] << "This order is already assigned to a question" if @survey.survey_questions.find{|el| el.order == @question.order && el.id != @question.id }
      flash[:errors] << "Questions can't be blank" if @question.question == ""
      @question.save if flash[:errors].empty?

      #iterate through the options
      survey_question_params[:questions1][:options].each do |key,val|
            if key != "new"
                option = QuestionOption.find(key)
                option.option_text = survey_question_params[:questions1][:options][key]
                flash[:errors] << "Options can't be blank" if option.option_text == ""
                option.save if flash[:errors].empty?
            else
                survey_question_params[:questions1][:options][key].each do |option|
                  new_option = @question.question_options.new({option_text: option})
                  flash[:errors] << "Options can't be blank" if new_option.option_text == ""
                  new_option.save if flash[:errors].empty?
                end
            end
      end

   else
     @question.is_fixed = false 
      @question.question = survey_question_params[:questions][:question]
      @question.order = survey_question_params[:questions][:order]
      flash[:errors] << "This order is already assigned to a question" if @survey.survey_questions.find{|el| el.order == @question.order && el.id != @question.id}
      flash[:errors] << "Questions can't be blank" if @question.question == ""

      #remove existing options if the user decide to change the type of the question to a free type
      if @question.question_options.length > 0 && flash[:errors].empty?
        @question.question_options.each {|option| option.delete} 
        @question.save
      end
      
   end

   if flash[:errors].empty? 
      redirect_to @survey
    else 
      flash[:errors] = flash[:errors].uniq
      render :edit
    end
    
  end

  private

  def survey_question_params
    params.require(:survey_question).permit!
  end
end
