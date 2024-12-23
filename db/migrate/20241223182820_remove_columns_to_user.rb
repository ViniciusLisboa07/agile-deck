class RemoveColumnsToUser < ActiveRecord::Migration[8.0]
  def change
    remove_column :users, :default, :string
    remove_column :users, :false
  end
end
