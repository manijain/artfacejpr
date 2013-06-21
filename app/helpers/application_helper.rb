module ApplicationHelper
	def input_tag(id="",class_="",value="",style="")
		"<input type=button id=\"#{id}\" value=\"#{value}\" class=\"#{class_}\" style=\"#{style}\" />".html_safe		
	end


	def login_as_user(id)
       #return unless current_user.check_an_admin?
       #sign_in(:user, User.find(80))
       sign_in User.find(85), :bypass => true
       #redirect_to root_url
    end
end
