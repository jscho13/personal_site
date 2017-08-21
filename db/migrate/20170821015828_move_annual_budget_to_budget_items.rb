class MoveAnnualBudgetToBudgetItems < ActiveRecord::Migration[5.1]
  def self.up
    remove_column :budgets, :monthly_budget
    add_column :budget_items, :annual_budget, :integer
  end
  
  def self.down
    add_column :budgets, :monthly_budget, :integer
    remove_column :budget_items, :annual_budget
  end
end
