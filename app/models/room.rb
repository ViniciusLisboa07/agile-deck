class Room < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'user_id'
  
  validates :name, presence: true, uniqueness: true
  validates :code, presence: true, uniqueness: true
  validates :creator, presence: true
  
  before_validation :generate_unique_code, on: :create
  
  private
  
  def generate_unique_code
    self.code ||= SecureRandom.hex(4)
  end
end
