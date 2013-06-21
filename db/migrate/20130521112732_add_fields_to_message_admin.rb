class AddFieldsToMessageAdmin < ActiveRecord::Migration
  def change
  	add_column :message_admins, :reply_title, :string
  	add_column :message_admins, :reply_message, :text
  	add_column :message_admins, :is_mailed, :boolean
  	add_column :message_admins, :reply_created_at, :datetime
  	add_column :message_admins, :reply_mailed_at, :datetime
  end
end
