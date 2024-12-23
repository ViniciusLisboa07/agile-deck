class ApplicationController < ActionController::Base
  before_action :ensure_authentication
  
  helper_method :current_user, :user_signed_in?

  private

  def ensure_authentication
    return if devise_controller?

    return if user_signed_in? || session[:anonymous_user]

    redirect_to choose_authentication_path
  end
end
