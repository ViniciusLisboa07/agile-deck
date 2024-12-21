class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  def anonymous?
      self.anonymous
  end
  
  def self.create_anonymous_user
      create(anonymous: true, email: generate_unique_email, password: SecureRandom.hex)
  end
  
  private
  
  def self.generate_unique_email
      "anonymous_#{SecureRandom.uuid}@example.com"
    end
end
