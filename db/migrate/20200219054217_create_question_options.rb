class CreateQuestionOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :question_options do |t|
      t.integer :survey_question_id
      t.text :option_text
      t.timestamps
    end
  end
end
