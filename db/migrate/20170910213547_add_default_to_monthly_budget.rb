class AddDefaultToMonthlyBudget < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :monthly_budget, :integer, default: 0
  end

  def down
    remove_column :users, :monthly_budget
  end
end
