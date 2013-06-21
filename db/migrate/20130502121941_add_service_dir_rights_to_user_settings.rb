class AddServiceDirRightsToUserSettings < ActiveRecord::Migration
  def change
    add_column :user_settings, :service_dir_rights, :boolean
  end
end
