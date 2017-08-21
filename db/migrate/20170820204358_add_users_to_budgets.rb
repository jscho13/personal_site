class AddUsersToBudgets < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :budgets, :users
    
    change_table :budgets do |t|
      t.references :user
    end
  end
end
