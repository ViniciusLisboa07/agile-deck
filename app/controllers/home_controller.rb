class HomeController < ApplicationController

  def index
    if user_signed_in?
      @rooms = current_user.rooms
      @welcome_message = "Bem-vindo, #{current_user.email}!"
    else
      @welcome_message = "Bem-vindo ao Agile Deck!"
    end
  end
end
