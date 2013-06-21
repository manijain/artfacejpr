class AddAttributesToUsers < ActiveRecord::Migration
  def up
  	add_column :users, :user_gender, :string
  	add_column :users, :user_first_name, :string
  	add_column :users, :user_last_name, :string
  	add_column :users, :user_company, :string
  	add_column :users, :user_street, :string
  	add_column :users, :user_zip_code, :string
  	add_column :users, :user_town, :string
  	add_column :users, :user_country, :string
  	add_column :users, :user_phone_number, :string
  	add_column :users, :user_notification_email_address, :string
  	add_column :users, :user_salutation, :string
  end
  def down
  	remove_column :users, :user_gender
  	remove_column :users, :user_first_name
  	remove_column :users, :user_last_name
  	remove_column :users, :user_company
  	remove_column :users, :user_street
  	remove_column :users, :user_zip_code
  	remove_column :users, :user_town
  	remove_column :users, :user_country
  	remove_column :users, :user_phone_number
  	remove_column :users, :user_notification_email_removeress
  	remove_column :users, :user_salutation
  end
end
