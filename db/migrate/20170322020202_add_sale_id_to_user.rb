class AddSaleIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :sale_id, :string
  end
end
