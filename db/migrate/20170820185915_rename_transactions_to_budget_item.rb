class RenameTransactionsToBudgetItem < ActiveRecord::Migration[5.1]
  def change
    rename_table :transactions, :budget_items
    remove_column :budgets, :transaction_id, :integer
    add_reference :budgets, :budget_item_id, foreign_key: true
  end
end
