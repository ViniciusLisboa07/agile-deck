class RoomsController < ApplicationController
  before_action :authenticate_user!
  
  def new
    @room = Room.new
  end
  
  def index
    @rooms = current_user.rooms
    
    render json: @rooms
  end
  
  def create
    @room = current_user.rooms.new(room_params)
    
    if @room.save
      render json: @room, status: :created
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end
  
  def show_by_code
    @room = Room.find_by(code: params[:code])
    if @room
      render json: @room
    else
      render json: { error: 'Sala não encontrada' }, status: :not_found
    end
  end
  
  private
  
  def room_params
    params.require(:room).permit(:name)
  end
end
