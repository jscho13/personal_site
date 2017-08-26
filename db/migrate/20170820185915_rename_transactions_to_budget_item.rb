class RenameTransactionsToBudgetItem < ActiveRecord::Migration[5.1]
  def change
    remove_column :budgets, :transaction_id, foreign_key: true
    rename_table :transactions, :budget_items
    add_reference :budgets, :budget_item
  end
end
