class AddUsersToBudgets < ActiveRecord::Migration[5.1]
  def change
    remove_column :budgets, :user_id, foreign_key: true
    
    change_table :budgets do |t|
      t.references :user
    end
  end
end
