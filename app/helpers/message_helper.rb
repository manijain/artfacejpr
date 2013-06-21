module MessageHelper

  def bfs_traversal_tree message
    if message.class == Message
      temp_message = Message.new
      temp_message.intialize_parent_count
      temp_message.nested_messages_count message
      @message_array << {:message=>message,:count=>temp_message.get_count}
      if message.sub_messages.blank?
        return 
      elsif message.sub_messages.count == 1
        bfs_traversal_tree message.sub_messages.first
      elsif message.sub_messages.count > 1
        message.sub_messages.each do |a|
          bfs_traversal_tree a
        end
      end
    end
  end

  def sell_art_area_traversal_tree message, index
    if message.class == Message
      temp_message = Message.new
      temp_message.intialize_parent_count
      temp_message.nested_messages_count message
      @message_array[index] << {:message=>message,:count=>temp_message.get_count}
      if message.sub_messages.blank?
        return 
      elsif message.sub_messages.count == 1
        sell_art_area_traversal_tree message.sub_messages.first, index
      elsif message.sub_messages.count > 1
        message.sub_messages.each do |a|
          sell_art_area_traversal_tree a, index
        end
      end
    end
  end

end