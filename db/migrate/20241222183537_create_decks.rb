class CreateDecks < ActiveRecord::Migration[8.0]
  def change
    create_table :decks do |t|
      t.string :name
      t.text :cards
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
