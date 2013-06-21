class ForumMessageNotification < ActiveRecord::Base
  attr_accessible :email_notification, :forum_message_id, :user_id, :created_at, :updated_at
end
