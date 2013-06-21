class AddAdminRightsToUserSettings < ActiveRecord::Migration
  def change
    add_column :user_settings, :admin_rights, :boolean
  end
end
