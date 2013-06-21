class AddEditAdminToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :edit_admin, :boolean
  end
end
