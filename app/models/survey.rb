class Survey < ApplicationRecord
    has_many :survey_questions
    accepts_nested_attributes_for :survey_questions
    validates :name, presence: true

end
