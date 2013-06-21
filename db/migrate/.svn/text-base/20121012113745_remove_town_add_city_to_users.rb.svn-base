class RemoveTownAddCityToUsers < ActiveRecord::Migration
  def up
  	remove_column :users, :user_town
  	add_column :users, :user_city, :string
  end

  def down
  end
end
