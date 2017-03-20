class CreatePremia < ActiveRecord::Migration[5.0]
  def change
    create_table :premia do |t|
      t.integer :price
      t.string :name
      t.string :permalink

      t.timestamps
    end
  end
end
