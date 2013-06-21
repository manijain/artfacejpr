class AddFieldToMessageAdmin < ActiveRecord::Migration
  def change
    add_column :message_admins, :is_solved, :boolean
  end
end
