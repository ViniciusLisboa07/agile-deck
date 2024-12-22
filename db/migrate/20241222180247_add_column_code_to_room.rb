class AddColumnCodeToRoom < ActiveRecord::Migration[8.0]
  def change
    add_column :rooms, :code, :string
  end
end
