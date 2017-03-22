class CreatePremiums < ActiveRecord::Migration[5.0]
  def change
    create_table :premiums do |t|
      t.integer :price
      t.string :name
      t.string :permalink

      t.timestamps
    end
  end
end
