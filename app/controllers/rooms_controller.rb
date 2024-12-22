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
  
  def show
    @room = Room.find(params[:id])
    @is_admin = @room.creator == current_user
  end
  
  def show_by_code(code = params[:code])
    @room = Room.find_by(code: code)
    if @room
      @is_admin = @room.creator == current_user
      render :show
    else
      flash[:alert] = 'Sala não encontrada'
      redirect_to root_path
    end
  end
  
  private
  
  def room_params
    params.require(:room).permit(:name)
  end
end
