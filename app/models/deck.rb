class Deck < ApplicationRecord
  belongs_to :room

  def cards_as_array
    cards.present? ? cards.split(",").map(&:strip) : []
  end

  def cards=(value)
    if value.is_a?(Array)
      super(value.join(","))
    else
      super(value) # Presume que já seja uma string
    end
  end
end
