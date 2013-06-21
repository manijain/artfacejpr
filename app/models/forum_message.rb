class ForumMessage < ActiveRecord::Base
  attr_accessible :offer_id, :user_id, :forum_message_title, :forum_message_text, :is_parent, :child_of, :email_notification, :created_at, :updated_at, :is_edited, :is_deleted
  belongs_to :user
  belongs_to :offer

  has_many :sub_messages, :class_name=> 'ForumMessage', :foreign_key => 'child_of', :dependent => :destroy
  belongs_to :parent_message, :class_name=> 'ForumMessage', :foreign_key => 'child_of'

  attr_accessor :parent_count, :parent_message_array

  def initialize_parent_count
  	self.parent_count = 0
  	self.parent_message_array = Array.new
  end

  def get_root_message message
    if message.parent_message == nil
      message
    else
      get_root_message message.parent_message
    end
  end

  def nested_messages_count message
  	unless message.parent_message == nil
  		self.parent_count = self.parent_count + 1
  		nested_messages_count(message.parent_message)
  	end
  end

  def nested_message message
  	unless message == nil
  		self.parent_message_array << message
  		nested_message(message.parent_message)
  	end
  end

  def get_parent_message_array
  	self.parent_message_array
  end

  def get_parent_count
  	self.parent_count
  end

  def unread
  	self.message_read
  end

  def reply_count
  	ForumMessage.where("child_of = ?", self.id).count
  end

end
