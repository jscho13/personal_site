class RenameTransactionsToBudgetItem < ActiveRecord::Migration[5.1]
  def change
    remove_foreign_key :budgets, :transactions
    rename_table :transactions, :budget_items
    add_reference :budgets, :budget_item_id
  end
end
