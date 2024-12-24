class Room < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'user_id'

  has_one :deck, dependent: :destroy

  has_many :room_users, dependent: :destroy
  has_many :users, through: :room_users
  
  validates :name, presence: true, uniqueness: true
  validates :creator, presence: true
  
  before_validation :generate_unique_code, on: :create
  
  def build_deck(deck_params)
    self.deck = Deck.new(deck_params)
  end

  private
  
  def generate_unique_code
    self.code ||= SecureRandom.hex(4)
  end
end
