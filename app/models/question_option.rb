class QuestionOption < ApplicationRecord
    belongs_to :survey_question
    validates_presence_of :option_text, presence: true 
    
end
