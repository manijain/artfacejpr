class AddDeleteAdminToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :delete_admin, :boolean
  end
end
