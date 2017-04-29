class CreateDsqAverages < ActiveRecord::Migration[5.0]
  def change
    create_table :dsq_averages do |t|
      t.integer :user_id
      t.integer :dsq_average
      t.integer :allowable_spending
      t.integer :days_left

      t.timestamps
    end
    
    add_foreign_key :dsq_averages, :users
  end
end
