class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :check_session_language

  def set_language language=""
    session[:language]  = params[:language]
    I18n.locale = session[:language]
  end

  private
    def check_session_language
      if session[:language].nil?
        session[:language] = "en"
        set_language "en"
      else
        set_language session[:language]
      end
    end

    def after_sign_in_path_for(resource)
      if resource.class == User
        if resource.sign_in_count < 2
          '/dashboard'
        else
          if session[:user_return_to].blank?
            '/dashboard/home'
          else
            session[:user_return_to]
          end
        end
      elsif resource.class == AdminUser
        I18n.locale = "en"
        '/admin/dashboard'        
      elsif resource.class == ServicePartner
        I18n.locale = "en"        
        '/service_directory/overview'
      else
        I18n.locale = "en"
        '/'
      end 
    end
end
