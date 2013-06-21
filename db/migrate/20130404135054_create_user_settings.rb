class CreateUserSettings < ActiveRecord::Migration
  def change
    create_table :user_settings do |t|
      t.string  :notification_by
      t.string  :notification_email
      t.boolean :show_identity
      t.boolean :wishlist_notification
      t.boolean :seller_message_notification
      t.boolean :buyer_message_notification
      t.boolean :forum_notification
      t.boolean :user_offer_forum_discussion

      t.timestamps
    end
  end
end
