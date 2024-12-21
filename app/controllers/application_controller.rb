class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :authenticate_user!
  
  helper_method :current_user, :user_signed_in?
  
  private
  
  def authenticate_user!
    if current_user.nil?
      sign_in(User.create_anonymous_user)
    else
      super
    end
  end
end
