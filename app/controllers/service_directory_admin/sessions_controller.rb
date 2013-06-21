class ServiceDirectoryAdmin::SessionsController < Devise::SessionsController


  def root_path
        "/service_directory_admin/login"  
  end	
end
