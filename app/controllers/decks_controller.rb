class DecksController < ApplicationController
  before_action :set_room, only: [ :new, :create ]

  def new
    @deck = @room.deck || Deck.new
  end

  def create
    puts deck_params
    @deck = @room.build_deck(deck_params)

    if @deck.save
      redirect_to show_by_code_path(@room.code), notice: "Deck configurado com sucesso!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:id])

    if @deck.update(deck_params)
      redirect_to room_path(@deck.room), notice: "Deck atualizado com sucesso!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_room
    @room = Room.find(params[:room_id])
  end

  def deck_params
    params.require(:deck).permit(:name, :cards)
  end
end
