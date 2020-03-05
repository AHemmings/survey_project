class SurveyQuestion < ApplicationRecord
    belongs_to :survey
    has_many :question_options
    accepts_nested_attributes_for :question_options
    validates_presence_of :question, presence: true 
end
