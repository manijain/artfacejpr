class MessageController < ApplicationController

  include MessageHelper

  def contact_owner
    Message.create(params[:message])
    respond_to do |format|
      format.js
    end
  end

  def offer_show_create_reply_box
    @parent_message = Message.find(params[:parent_message_id])
    respond_to do |format|
      format.js { render "/message/offer_show/new_message/new_message" }
    end
  end

  def offer_show_save_reply
    @message  = Message.create(params[:message])
    @offer    = Offer.find(params[:message][:offer_id])
    @messages = Message.where("user_id = ?", current_user.id).where("offer_id = ?", params[:message][:offer_id]).where("is_parent = true")
    unless @messages.blank?
      @unread_messages_count = @messages.map { |e| e.message_read}.delete_if{|e| e == true}.count
      if @unread_messages_count > 0
        @unread_messages       = true
      else
        @unread_messages       = false
      end
    else
      @unread_messages_count = 0
    end
    @message_array = []
    @messages.each do |message|
      bfs_traversal_tree message
    end
    respond_to do |format|
      format.js { render "/message/offer_show/save_reply/show_message"}
    end
  end

  def create
    offer_id = Message.find(params["parent_message_id"]).offer_id
    @message = Message.create(
      :user_id      =>current_user.id,
      :is_parent    =>params["is_parent"],
      :message_text =>params["message_text"],
      :offer_id     =>offer_id,
      :message_title=>params["message_title"],
      :child_of     =>params["parent_message_id"]
    )
    @parent_message_id = "message_" + params['parent_message_id']
    temp_message = Message.new
    temp_message.intialize_parent_count
    temp_message.nested_messages_count(Message.find(@message))
    @parent_counts = temp_message.get_count * 10
    temp_message.nested_messages(Message.find(@message))
    @parent_messages_array = temp_message.get_parent_message_array.map{|temp| temp.id}
    if @parent_counts > 40
      @parent_counts = 40
    end
    respond_to do |format|
      format.js
    end
  end
  def destroy
    Message.destroy(params[:id])
    render :text => "true"
  end
  def immediate_children
    @parent_message_id = params["parent_message_id"]
    @messages          = Message.where("child_of = #{@parent_message_id}")
    temp_message = Message.new
    temp_message.intialize_parent_count
    temp_message.nested_messages_count(Message.find(@messages.first))
    temp_message.nested_messages(Message.find(@messages.first))
    @parent_messages_array = temp_message.get_parent_message_array.map{|temp| temp.id}
    @parent_counts = temp_message.get_count * 10
    if @parent_counts > 40
      @parent_counts = 40
    end
    respond_to do |format|
      format.js
    end
  end
end