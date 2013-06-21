class AddForumRightsToUserSettings < ActiveRecord::Migration
  def change
    add_column :user_settings, :forum_rights, :boolean
  end
end
