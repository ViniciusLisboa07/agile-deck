class AddJoinedAtToRoomUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :room_users, :joined_at, :datetime
  end
end
