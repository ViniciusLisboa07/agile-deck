class Round < ApplicationRecord
  belongs_to :room
  has_many :votes, dependent: :destroy
end
