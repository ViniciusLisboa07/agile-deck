class UsersController < ApplicationController
  skip_before_action :ensure_authentication, only: [:choose_authentication, :anonymous_login]

  def choose_authentication
  end

  def anonymous_login
    user = User.create_anonymous_user
    sign_in(user)
    session[:anonymous_user] = user.id
    redirect_to home_path, notice: 'Você está logado anonimamente.'
  end
end
