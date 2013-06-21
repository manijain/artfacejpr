class Message < ActiveRecord::Base
  attr_accessible :is_parent, :child_of, :message_text, :offer_price, :user_id, :offer_id, :message_read, :message_title,:concern, :hide_identity, :currency
  belongs_to :offer
  belongs_to :user
  has_many :sub_messages, :class_name=> 'Message', :foreign_key => 'child_of', :dependent => :destroy
  belongs_to :parent_message, :class_name=> 'Message', :foreign_key => 'child_of'

  attr_accessor :count, :parent_message_array

  def intialize_parent_count
    self.count = 0
    self.parent_message_array = Array.new
  end

  def nested_messages_count(message)
    if message.parent_message != nil
      self.count = self.count + 1
      nested_messages_count(message.parent_message)
    end
  end

  def nested_messages(message)
    if message != nil
      self.parent_message_array << message
      nested_messages(message.parent_message)
    end
  end

  def get_parent_message_array
    self.parent_message_array  
  end

  def get_count
    self.count
  end

  def unread
    self.message_read
  end

  
  # def bfs_traversal_tree message
  #   if message.class == Message
  #     temp_message = Message.new
  #     temp_message.intialize_parent_count
  #     temp_message.nested_messages_count message
  #     @text << "#{message.id},#{temp_message.get_count}"
  #     if message.sub_messages.blank?
  #       return 
  #     elsif message.sub_messages.count == 1
  #       bfs_traversal_tree message.sub_messages.first
  #     elsif message.sub_messages.count > 1
  #       message.sub_messages.each do |a|
  #         bfs_traversal_tree a
  #       end
  #     end
  #   end
  # end

  # def bfs_traversal_tree message
  #   if message.class == Message
  #     intialize_parent_count
  #     nested_messages_count message
  #     if message.sub_messages.blank?
  #       return
  #     elsif message.sub_messages.count == 1
  #       bfs_traversal_tree message.sub_messages.first
  #     elsif message.sub_messages.count > 1
  #       message.sub_messages.each do |temp|
  #         bfs_traversal_tree temp
  #       end
  #     end
  #   elsif message.class == Array
      
  #   end
  # end

end