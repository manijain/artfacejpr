class CreateUserRecommendations < ActiveRecord::Migration
  def up
    create_table :user_recommendations do |t|
      t.string  :name
      t.string  :email
      t.text    :message
      t.integer :user_id
      t.timestamps
    end
  end
  def down
    drop_table :user_recommendations
  end
end
