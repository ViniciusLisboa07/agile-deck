class RoomsController < ApplicationController
  
  def new
    @room = Room.new
  end
  
  def index
    @rooms = current_user.rooms
    
    render json: @rooms
  end
  
  def create
    @room = current_user.rooms.new(room_params)
    @round = @room.rounds.create(status: 'waiting')
    
    if @room.save
      redirect_to room_path(@room)
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end
  
  def show
    @room = Room.find(params[:id])
    @round = @room.rounds.last
    @is_admin = @room.creator == current_user
  end
  
  def show_by_code(code = params[:code])
    @room = Room.find_by(code: code)
    if @room

      unless @room.users.include?(current_user)
        @room.room_users.create(user: current_user, joined_at: Time.current)
        flash[:notice] = "Bem-vindo à sala #{@room.name}!" unless @room.users.include?(current_user)
      end

      @round = @room.rounds.last
      @is_admin = @room.creator == current_user
      render :show
    else
      flash[:alert] = 'Sala não encontrada'
      redirect_to home_path
    end
  end
  
  private
  
  def room_params
    params.require(:room).permit(:name)
  end
end
