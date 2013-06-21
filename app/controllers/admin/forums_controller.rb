class Admin::ForumsController < ApplicationController
	include ForumHelper

	before_filter :authenticate_admin_user!

	def index
		
		per_page = params[:per_page] || 6
		page     = params[:page]     || 1
		sort_by  = params[:sort_by]  || ""
		session[:search] = ""
		session[:select] = ""
		#@forum_message_notification = ForumMessageNotification.where("user_id = ? AND forum_message_id = ? ", @user_id, params[:id]).first
		#bfs_traversal_tree @parent_message
	
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
			format.js { render "admin/forums/index/data"}
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
		logger.debug("in advance_search")
		query_string = ""
		if !temp_params.blank?
			unless temp_params[:concern].blank?
				if temp_params[:concern][:search_type] == "contains"
					query_string+= "forum_messages.forum_message_title ilike '%#{temp_params[:concern][:value]}%' AND "
				elsif temp_params[:concern][:search_type] == "is exactly"
					query_string+= "forum_messages.forum_message_title = '#{temp_params[:concern][:value]}' AND "
				elsif temp_params[:concern][:search_type] == "is not"
					query_string+= "forum_messages.forum_message_title != '#{temp_params[:concern][:value]}' AND "
				end
			else
				query_string+= ""
			end
			#logger.debug(search_concern)
			unless temp_params[:date_of_post].blank?
				if temp_params[:date_of_post][:search_type] == "is before"
				  query_string+= "forum_messages.created_at < '#{temp_params[:date_of_post][:value]}' AND "
				elsif temp_params[:date_of_post][:search_type] == "is after"
					query_string+= "forum_messages.created_at > '#{temp_params[:date_of_post][:value]}' AND "
				elsif temp_params[:date_of_post][:search_type] == "is exactly"
					query_string+= "forum_messages.created_at = '#{temp_params[:date_of_post][:value]}' AND "
				end
			else
				query_string+= ""
			end
			#logger.debug(search_date_of_post)
			unless temp_params[:offer_id].blank?
				if temp_params[:offer_id][:value].to_i.to_s == temp_params[:offer_id][:value]
					if temp_params[:offer_id][:search_type] == "is"
						query_string+= "forum_messages.offer_id = '#{temp_params[:offer_id][:value]}' AND "
					elsif temp_params[:offer_id][:search_type] == "is not"
						query_string+= "forum_messages.offer_id != '#{temp_params[:offer_id][:value]}' AND "
					end
				else
					query_string+= "forum_messages.offer_id = 0  AND "
				end
			else
				query_string+= ""
			end

			unless temp_params[:artist_name].blank?
				if temp_params[:artist_name][:search_type] == "contains"
					query_string+= "artists.artist_name ilike '%#{temp_params[:artist_name][:value]}'% AND "
				elsif temp_params[:artist_name][:search_type] == "is exactly"
					query_string+= "artists.artist_name = '#{temp_params[:artist_name][:value]}' AND "
				elsif temp_params[:artist_name][:search_type] == "is not"
					query_string+= "artists.artist_name != '#{temp_params[:artist_name][:value]}' AND "
				end
			else
				query_string+= ""
			end

			unless temp_params[:title].blank?
				if temp_params[:title][:search_type] == "contains"
					query_string+= "forum_messages.forum_message_title ilike '#{temp_params[:title][:value]}' AND "
				elsif temp_params[:title][:search_type] == "is exactly"
					query_string+= "forum_messages.forum_message_title = '#{temp_params[:title][:value]}' AND "
				elsif temp_params[:title][:search_type] == "is not"
					query_string+= "forum_messages.forum_message_title != '#{temp_params[:title][:value]}' AND "
				end
			else
				query_string+= ""
			end

			unless temp_params[:description].blank?
				if temp_params[:description][:search_type] == "contains"
					query_string+= "forum_messages.forum_message_text ilike '#{temp_params[:description][:value]}' AND "
				elsif temp_params[:description][:search_type] == "is exactly"
					query_string+= "forum_messages.forum_message_text = '#{temp_params[:description][:value]}' AND "
				elsif temp_params[:description][:search_type] == "is not"
					query_string+= "forum_messages.forum_message_text != '#{temp_params[:description][:value]}' AND "
				end
			else
				query_string+= ""
			end

			unless temp_params[:author].blank?
				if temp_params[:author][:search_type] == "contains"
					query_string+= "users.user_first_name ilike '#{temp_params[:author][:value]}' OR users.user_last_name ilike '#{temp_params[:author][:value]}' AND "
				elsif temp_params[:author][:search_type] == "is exactly"
					query_string+= "CONCAT(users.user_first_name, ' ', users.user_last_name) = '#{temp_params[:author][:value]}' AND "
				elsif temp_params[:author][:search_type] == "is not"
					query_string+= "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:author][:value]}' AND "
				end
			else
				query_string+= ""
			end
			if query_string.nil?
				""
			else
				query_string = query_string.split(" ")
				query_striing = query_string.pop
				query_string = query_string.join(" ")
				logger.debug("start")
				logger.debug(query_string)
				logger.debug("end")
				return query_string
			end
			# if search_concern.nil? && search_date_of_post.nil? && search_offer_id.nil? && search_artist_name.nil? && search_title.nil? && search_description.nil? && search_author.nil?
			# 	""			
			# else
			# 	 # @forum_messages = ForumMessage.where(search_concern).where(search_date_of_post).where(search_offer_id).where(search_artist_name).where(search_title).where(search_description).where(search_author)
			# 	"#{search_concern} AND #{search_date_of_post} AND #{search_offer_id} AND #{search_artist_name} AND #{search_title} AND #{search_description} AND #{search_author}".gsub /AND/, ""
			# end
		else
			""
		end
	end


	def show
		@user = session[:forum_user_id]
		logger.debug(@user)
		logger.debug('aaaaaaaaaaaaaaaaaaa')
		@message_array = []
		@parent_message = ForumMessage.find(params[:id])
		#@forum_message_notification = ForumMessageNotification.where("user_id = ? AND forum_message_id = ? ", @user_id, params[:id]).first
		bfs_traversal_tree @parent_message
	end

	def new_reply
		@user = session[:forum_user_id]
		logger.debug(@user)
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		logger.debug(@parent_message)
		respond_to do |format|
			format.js { render "admin/forums/new_reply/new_reply" }
			format.html
		end
		logger.debug('end')
	end

	def new_reply_index
		@user = session[:forum_user_id]
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		@parent_message_id = @parent_message.id
		
		respond_to do |format|
			format.js { render "admin/forums/new_reply/new_reply_index" }
			format.html
		end
	end


	def new_reply_child
		@user = session[:forum_user_id]
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		@parent_message_id = @parent_message.id

		respond_to do |format|
			format.js { render "admin/forums/new_reply/new_reply_child" }
			format.html
		end
	end
	
	def forum_message_create
		forum_message = ForumMessage.create(params[:forum_message])
		logger.debug(params[:forum_message])
		
		if params["child_reply"] == "true"
			parent_message = ForumMessage.new.get_root_message forum_message
			logger.debug(parent_message.id)
			@forum_message_notification = ForumMessageNotification.where("forum_message_id = ?",parent_message.id.to_i)
			logger.debug(parent_message.id)
		else
			@forum_message_notification = ForumMessageNotification.where("forum_message_id = ?",params[:forum_message]["child_of"].to_i)
		end
		
		if params["child_reply"] == "true"
			redirect_to "/admin/forums/show/#{parent_message.id}"
		else
			redirect_to "/admin/forums/show/#{params[:forum_message]["child_of"]}"
		end
	end

	def edit_reply
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		@parent_message_id = @parent_message.id
		logger.debug(@parent_message_id)
		respond_to do |format|
			format.js {render "admin/forums/new_reply/edit_reply"}
			format.html
		end
	end

	def update_reply
		logger.debug 'aaaaaaaaaaaaaaaaaaa'
		logger.debug(params[:forum_message_id])
		@parent_message = ForumMessage.find(params[:forum_message][:id])
		@parent_message.update_attributes(params[:forum_message])
		logger.debug(params[:forum_message])
		if params["child_reply"] == "true"
			parent_message = ForumMessage.find.get_root_message forum_message
			logger.debug(parent_message.id)
		end
		if params["child_reply"] == "true"
			redirect_to "/admin/forums/show/#{parent_message.id}"
		else
			redirect_to "/admin/forums/show/#{params[:forum_message]["child_of"]}"
		end
	end

	def remove_message
		@parent_message = ForumMessage.find(params[:forum_message_id].to_i)
		@parent_message.update_attribute(:is_deleted, 'true')
		render :text=> "true"
	end
end