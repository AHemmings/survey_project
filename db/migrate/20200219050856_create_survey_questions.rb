class CreateSurveyQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :survey_questions do |t|
      t.text :question
      t.string :order
      t.boolean :is_fixed, default: false
      t.integer :survey_id
      t.integer :question_option_id
      t.timestamps
    end
  end
end
