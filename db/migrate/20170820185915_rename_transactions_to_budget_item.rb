class RenameTransactionsToBudgetItem < ActiveRecord::Migration[5.1]
  def change
    rename_table :transactions, :budget_items
    rename_column :budgets, :transaction_id, :budget_item_id
  end
end
