class AddBudgetsToBudgetItems < ActiveRecord::Migration[5.1]
  def self.up
    change_table :budget_items do |t|
      t.references :budget
    end
    remove_column :budgets, :budget_item_id, foreign_key: true
  end
  
  def self.down
    remove_column :budget_items, :budget_id, foreign_key: true
    add_column :budgets, :budget_item_id, :integer
  end
end
