class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.boolean :is_parent
      t.text :message_text
      t.string :offer_price

      t.timestamps
    end
  end
end
