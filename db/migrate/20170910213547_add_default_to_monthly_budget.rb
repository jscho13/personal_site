class AddDefaultToMonthlyBudget < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :monthly_budget, :integer, default: 0
  end

  def down
    change_column :users, :monthly_budget, :integer, default: nil
  end
end
