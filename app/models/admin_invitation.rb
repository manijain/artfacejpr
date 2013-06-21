class AdminInvitation < ActiveRecord::Base
  belongs_to :admin_user	
  attr_accessible :admin_user_id, :email, :name, :password
end
