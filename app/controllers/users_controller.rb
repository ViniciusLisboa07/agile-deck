class UsersController < ApplicationController
  skip_before_action :ensure_authentication, only: [ :choose_authentication, :new_anonymous, :anonymous_login ]

  def choose_authentication
  end

  def new_anonymous
  end

  def anonymous_login
    user = User.create_anonymous_user(params[:name])
    sign_in(user)
    session[:anonymous_user] = user.id
    redirect_to home_path, notice: "Você está logado anonimamente."
  end
  
  private
  
  def user_params
    params.permit(:name)
  end
end
