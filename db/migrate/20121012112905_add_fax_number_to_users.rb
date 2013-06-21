class AddFaxNumberToUsers < ActiveRecord::Migration
  def up
  	add_column :users, :user_fax_number, :string
  end
  def down
  	remove_column :users, :user_fax_number
  end
end
