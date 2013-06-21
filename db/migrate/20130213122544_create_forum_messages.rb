class CreateForumMessages < ActiveRecord::Migration
  def change
    create_table :forum_messages do |t|
    	t.integer :offer_id
    	t.string  :forum_message_title
    	t.text    :forum_message_text
    	t.integer :user_id
    	t.boolean :email_notification
      t.timestamps
    end
  end
end
