class ForumController < ApplicationController
	include ForumHelper
	
	before_filter :authenticate_user!

	def update_email_notification
		@forum_message_notification = ForumMessageNotification.find_by_id(params["forum_message_notification_id"])
		if @forum_message_notification.blank?
			@temp_forum_message = ForumMessageNotification.where("user_id = ?",current_user.id).where("forum_message_id = ?", params["forum_message_notification_id"])
			if @temp_forum_message.blank?
				ForumMessageNotification.create(
					:user_id            => current_user.id,
					:forum_message_id   => params["forum_message_notification_id"],
					:email_notification => params["forum_message_notification_value"] )
			else
				@temp_forum_message.first.update_attribute :email_notification , params["forum_message_notification_value"]
			end
		else
			ForumMessageNotification.find(params["forum_message_notification_id"]).update_attribute :email_notification , params["forum_message_notification_value"]
		end
		render :text => "true"
	end
	
	def forum_message_create
		forum_message = ForumMessage.create(params[:forum_message])
		
		if params["child_reply"] == "true"
			parent_message = ForumMessage.new.get_root_message forum_message
			@forum_message_notification = ForumMessageNotification.where("forum_message_id = ?",parent_message.id.to_i)
		else
			@forum_message_notification = ForumMessageNotification.where("forum_message_id = ?",params[:forum_message]["child_of"].to_i)
		end
		unless @forum_message_notification.blank?
			if @forum_message_notification.count == 1
				if @forum_message_notification.first.email_notification == true
					ForumMailer.new_reply(@forum_message_notification.first).deliver
				end
			elsif @forum_message_notification.count > 1
				@forum_message_notification.each do |forum_message_notification|
					if forum_message_notification.email_notification == true
						ForumMailer.new_reply(forum_message_notification).deliver
					end
				end
			end
		end
		if params["child_reply"] == "true"
			redirect_to "/forum/show/#{parent_message.id}"
		else
			redirect_to "/forum/show/#{params[:forum_message]["child_of"]}"
		end
	end

	def post_new_forum_message
		@forum_message_title = params[:forum_message][:forum_message_title]
		respond_to do |format|
			format.html { render "/forum/new_question" }
		end
	end

	def redirect_to_index
		session[:select] = ""
		session[:search] = ""
		redirect_to "/forum/home"
	end

	def new_reply
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		respond_to do |format|
			format.js { render "/forum/new_reply/new_reply" }
			format.html
		end
	end

	def new_reply_child
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		@parent_message_id = @parent_message.id

		respond_to do |format|
			format.js { render "/forum/new_reply/new_reply_child" }
			format.html
		end
	end

	def show
		@message_array = []
		@parent_message = ForumMessage.find(params[:id])
		@forum_message_notification = ForumMessageNotification.where("user_id = ? AND forum_message_id = ? ", current_user.id, params[:id]).first
		bfs_traversal_tree @parent_message
	end

	def home
		current_user
		per_page = params[:per_page] || 6
		page     = params[:page]     || 1
		sort_by  = params[:sort_by]  || ""
	
		if params[:search_advanced] == "true"
			session[:select] = params[:select]
			session[:search] = ""
		end

		if params[:search_basic] == "true"
			session[:search] = params
			session[:select] = ""
		end
		
		@forum_messages = ForumMessage.joins("LEFT OUTER JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users ON users.id = forum_messages.user_id LEFT OUTER JOIN artists on artists.id = artworks.artist_id").where("forum_messages.is_parent = true").where(search_basic(session[:search])).where(search_advanced(session[:select])).order(order_messages(sort_by))
		@forum_messages = @forum_messages.paginate :page => page, :per_page => per_page

		respond_to do |format|
			format.html
			format.js { render "forum/home/data"}
		end
	end

	def order_messages temp_params
		case temp_params
		when "date"
			"forum_messages.created_at desc"
		when "artist"
			"artists.artist_name, forum_messages.created_at"
		when "author"
			"CONCAT(users.user_first_name, users.user_last_name)"
		else
			"forum_messages.created_at desc"
		end	
	end

	def search_basic temp_params
		if !temp_params.blank?
			if temp_params[:search_basic] == "true"
				search_string = temp_params[:forum_message][:search_string]
				if search_string.to_i.to_s == search_string
					"forum_messages.offer_id = '#{search_string}'"
				else
					"forum_messages.forum_message_title ilike '%#{search_string}%'
					OR forum_messages.forum_message_text ilike '%#{search_string}%'
					OR users.user_first_name ilike '#{search_string}'
					OR users.user_last_name ilike '#{search_string}'"
				end
			else
				""
			end
		else
			""
		end
	end

	def search_advanced temp_params
		if !temp_params.blank?
			unless temp_params[:concern].blank?
				if temp_params[:concern][:search_type] == "contains"
					search_concern = "forum_messages.forum_message_title ilike '%#{temp_params[:concern][:value]}%'"
				elsif temp_params[:concern][:search_type] == "is exactly"
					search_concern = "forum_messages.forum_message_title = '#{temp_params[:concern][:value]}'"
				elsif temp_params[:concern][:search_type] == "is not"
					search_concern = "forum_messages.forum_message_title != '#{temp_params[:concern][:value]}'"
				end
			else
				search_concern = ""
			end
			unless temp_params[:date_of_post].blank?
				if temp_params[:date_of_post][:search_type] == "is before"
				  search_date_of_post = "forum_messages.created_at < '#{temp_params[:date_of_post][:value]}'"
				elsif temp_params[:date_of_post][:search_type] == "is after"
					search_date_of_post = "forum_messages.created_at > '#{temp_params[:date_of_post][:value]}'"
				elsif temp_params[:date_of_post][:search_type] == "is exactly"
					search_date_of_post = "forum_messages.created_at = '#{temp_params[:date_of_post][:value]}'"
				end
			else
				search_date_of_post = ""
			end

			unless temp_params[:offer_id].blank?
				if temp_params[:offer_id][:value].to_i.to_s == temp_params[:offer_id][:value]
					if temp_params[:offer_id][:search_type] == "is"
						search_offer_id = "forum_messages.offer_id = '#{temp_params[:offer_id][:value]}' "
					elsif temp_params[:offer_id][:search_type] == "is not"
						search_offer_id = "forum_messages.offer_id != '#{temp_params[:offer_id][:value]}'"
					end
				else
					search_offer_id = "forum_messages.offer_id = 0"
				end
			else
				search_offer_id = ""
			end

			unless temp_params[:artist_name].blank?
				if temp_params[:artist_name][:search_type] == "contains"
					search_artist_name = "artists.artist_name ilike '%#{temp_params[:artist_name][:value]}'%"
				elsif temp_params[:artist_name][:search_type] == "is exactly"
					search_artist_name = "artists.artist_name = '#{temp_params[:artist_name][:value]}'"
				elsif temp_params[:artist_name][:search_type] == "is not"
					search_artist_name = "artists.artist_name != '#{temp_params[:artist_name][:value]}'"
				end
			else
				search_artist_name = ""
			end

			unless temp_params[:title].blank?
				if temp_params[:title][:search_type] == "contains"
					search_title = "forum_messages.forum_message_title ilike '#{temp_params[:title][:value]}'"
				elsif temp_params[:title][:search_type] == "is exactly"
					search_title = "forum_messages.forum_message_title = '#{temp_params[:title][:value]}'"
				elsif temp_params[:title][:search_type] == "is not"
					search_title = "forum_messages.forum_message_title != '#{temp_params[:title][:value]}'"
				end
			else
				search_title = ""
			end

			unless temp_params[:description].blank?
				if temp_params[:description][:search_type] == "contains"
					search_description = "forum_messages.forum_message_text ilike '#{temp_params[:description][:value]}'"
				elsif temp_params[:description][:search_type] == "is exactly"
					search_description = "forum_messages.forum_message_text = '#{temp_params[:description][:value]}'"
				elsif temp_params[:description][:search_type] == "is not"
					search_description = "forum_messages.forum_message_text != '#{temp_params[:description][:value]}'"
				end
			else
				search_description = ""
			end

			unless temp_params[:author].blank?
				if temp_params[:author][:search_type] == "contains"
					search_author = "users.user_first_name ilike '#{temp_params[:author][:value]}' OR users.user_last_name ilike '#{temp_params[:author][:value]}' "
				elsif temp_params[:author][:search_type] == "is exactly"
					search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) = '#{temp_params[:author][:value]}'"
				elsif temp_params[:author][:search_type] == "is not"
					search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:author][:value]}'"
				end
			else
				search_author = ""
			end
			if search_concern.nil? && search_date_of_post.nil? && search_offer_id.nil? && search_artist_name.nil? && search_title.nil? && search_description.nil? && search_author.nil?
				""
			else
				"#{search_concern} AND #{search_date_of_post} AND #{search_offer_id} AND #{search_artist_name} AND #{search_title} AND #{search_description} AND #{search_author}".gsub /AND  AND/, ""
			end
		else
			""
		end
	end

	def new_question
		if request.post?
			@forum_message = ForumMessage.create(params[:forum_message])
			ForumMessageNotification.create(
				:email_notification => true,
				:forum_message_id   => "#{@forum_message.id}",
				:user_id            => params[:forum_message]["user_id"]
			)

			redirect_to "/forum/show/#{@forum_message.id}"
		end
		
	end

	def verify_offer_id
		@offer = Offer.find_by_id(params["offer_id"].to_i)
		respond_to do |format|
			format.js { render "/forum/verify_offer_id/verified_offer"}
		end
	end
end