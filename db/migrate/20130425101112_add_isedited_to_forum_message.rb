class AddIseditedToForumMessage < ActiveRecord::Migration
  def change
  	add_column :forum_messages, :is_edited, :boolean
  end
end
