class AddBudgetTransactionTables < ActiveRecord::Migration[5.0]
  def change        
    create_table :budgets do |t|
      t.integer :monthly_budget
      t.integer :yearly_budget

      t.timestamps
    end

    create_table :transactions do |t|
      t.string :label
      t.integer :amount

      t.timestamps
    end

    add_reference :users, :budget, foreign_key: true
    add_reference :budgets, :transaction, foreign_key: true
    remove_column :users, :monthly_budget, :integer
  end
end
