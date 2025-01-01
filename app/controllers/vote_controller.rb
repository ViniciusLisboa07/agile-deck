class VoteController < ApplicationController
  before_action :set_room

  def create
    @vote = @round.votes.find_or_initialize_by(user: current_user)

    @vote.value = params[:value]

    if @vote.save
      RoomChannel.broadcast_to(@room, {
        action: "vote",
        user_id: current_user.id,
        value: @vote.value
      })
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def reveal_votes
    votes = @round.votes.includes(:user).map do |vote|
      {
        user_id: vote.user.id,
        user_name: vote.user.name || vote.user.email,
        value: vote.value
      }
    end

    RoomChannel.broadcast_to(@room, {
      action: "reveal_votes",
      votes: votes
    })

    head :ok
  end

  private

  def set_room
    @round = Round.find(params[:round_id])
    @room = Room.find(@round.room_id)
  end
end
