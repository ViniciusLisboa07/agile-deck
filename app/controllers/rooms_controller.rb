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

    if @room.save
      @round = @room.rounds.create(status: "waiting")
      redirect_to show_by_code_path(@room.code)
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
      is_new_user = !@room.users.include?(current_user)
      
      if is_new_user
        @room.room_users.create(user: current_user, joined_at: Time.current)
        flash[:notice] = "Bem-vindo à sala #{@room.name}!"
        
        RoomChannel.broadcast_to(@room, {
          action: "user_joined",
          user: {
            id: current_user.id,
            name: current_user.name || current_user.email
          }
        })
      end
  
      @round = @room.rounds.last
      @is_admin = @room.creator == current_user
      render :show
    else
      flash[:alert] = "Sala não encontrada"
      redirect_to home_path
    end
  end

  def new_round
    room = Room.find(params[:room_id])
    room.rounds.last.update(status: "finished") if room.rounds.last
    room.rounds.create(status: "waiting")
    @round = room.rounds.last

    RoomChannel.broadcast_to(room, { action: "new_round", round: @round })
    head :ok
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
