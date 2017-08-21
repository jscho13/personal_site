class RenameTransactionsToBudgetItem < ActiveRecord::Migration[5.1]
  def change
    rename_table :transactions, :budget_items
    remove_column :budgets, :transaction_id, foreign_key: true
    add_reference :budgets, :budget_item_id, :integer
  end
end
