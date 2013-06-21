class AddParentChildToForumMessage < ActiveRecord::Migration
  def change
    add_column :forum_messages, :child_of, :integer
    add_column :forum_messages, :is_parent, :boolean
  end
end
