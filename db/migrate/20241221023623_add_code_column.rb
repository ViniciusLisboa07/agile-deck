class AddCodeColumn < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :code, :string
  end
end
