class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :rooms, foreign_key: "user_id", dependent: :destroy
  has_many :room_users, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :participated_rooms, through: :room_users, source: :room

  def anonymous?
    self.anonymous
  end

  def self.create_anonymous_user(name)
    create(name: name, anonymous: true, email: generate_unique_email, password: SecureRandom.hex)
  end

  def voted?(round)
    votes.exists?(round_id: round.id)
  end

  def voted_for?(round, option)
    votes.exists?(round_id: round.id, value: option)
  end

  def leave_room(room)
    room_users.find_by(room: room)&.destroy
  end

  private

  def self.generate_unique_email
    "anonymous_#{SecureRandom.uuid}@example.com"
  end
end
