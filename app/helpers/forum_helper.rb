module ForumHelper
  def bfs_traversal_tree forum_message
    if forum_message.class == ForumMessage
      temp_message = ForumMessage.new
      temp_message.initialize_parent_count
      temp_message.nested_messages_count forum_message
      @message_array << {:forum_message=>forum_message,:count=>temp_message.get_parent_count}
      if forum_message.sub_messages.blank?
        return 
      elsif forum_message.sub_messages.count == 1
        bfs_traversal_tree forum_message.sub_messages.first
      elsif forum_message.sub_messages.count > 1
        forum_message.sub_messages.each do |a|
          bfs_traversal_tree a
        end
      end
    end
  end
end
