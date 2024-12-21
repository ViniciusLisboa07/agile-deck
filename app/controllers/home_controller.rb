class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: :index

  def index
    if user_signed_in?
      @welcome_message = "Bem-vindo, #{current_user.email}!"
    else
      @welcome_message = "Bem-vindo ao Agile Deck!"
    end
  end
end
