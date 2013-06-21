class MessageAdmin < ActiveRecord::Base
  belongs_to :offer
  belongs_to :user
  attr_accessible :child_of, :concern, :is_parent, :is_read, :message_text, :message_title, :user_id, :offer_id
  attr_accessible :is_solved, :reply_title, :reply_message, :is_mailed, :reply_created_at, :reply_mailed_at
end
