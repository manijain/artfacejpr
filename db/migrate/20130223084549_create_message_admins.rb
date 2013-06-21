class CreateMessageAdmins < ActiveRecord::Migration
  def change
    create_table :message_admins do |t|
      t.string  :concern
      t.string  :message_title
      t.text    :message_text
      t.integer :user_id
      t.boolean :is_read
      t.boolean :is_parent
      t.integer :child_of

      t.timestamps
    end
  end
end
