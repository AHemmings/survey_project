class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.string :name
      t.date :due_date
      t.integer :survey_question_id # note: seems to be not needed
    

      t.timestamps
    end
  end
end
