class AddIsdeletedToForumMessage < ActiveRecord::Migration
  def change
  	add_column :forum_messages, :is_deleted, :boolean
  end
end
