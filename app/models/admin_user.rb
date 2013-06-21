class AdminUser < ActiveRecord::Base
  has_many :admin_invitations
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :password, :password_confirmation, :remember_me
end
