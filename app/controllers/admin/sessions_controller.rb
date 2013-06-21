class Admin::SessionsController < Devise::SessionsController

  
 before_filter :authenticate_admin_user!


  def root_path
        "/backend/af_login"  #add your logic
  end	
end
