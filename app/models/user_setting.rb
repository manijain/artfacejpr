class UserSetting < ActiveRecord::Base
  attr_accessible :buyer_message_notification, :forum_notification, :notification_by, :notification_email, :seller_message_notification, :show_identity, :user_offer_forum_discussion, :wishlist_notification,:user_id, :admin_rights, :forum_rights, :service_dir_rights
  belongs_to :user
  validates_presence_of :user_id
end
