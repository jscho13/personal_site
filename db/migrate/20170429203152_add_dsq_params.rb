class AddDsqParams < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :monthly_budget, :integer
    add_column :dsq_averages, :submission_day, :datetime
  end
end
