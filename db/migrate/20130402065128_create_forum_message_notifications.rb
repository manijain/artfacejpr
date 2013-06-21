class CreateForumMessageNotifications < ActiveRecord::Migration
  def change
    create_table :forum_message_notifications do |t|
      t.integer :user_id
      t.integer :forum_message_id
      t.boolean :email_notification

      t.timestamps
    end
  end
end
