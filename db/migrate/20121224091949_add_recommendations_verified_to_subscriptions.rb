class AddRecommendationsVerifiedToSubscriptions < ActiveRecord::Migration
  def up
    add_column :subscriptions, :recommendations_pending,    :integer, :null=>false, :default=>0
    add_column :subscriptions, :recommendations_successful, :integer, :null=>false, :default=>0
  end
  
  def down
    remove_column :subscriptions, :recommendations_pending
    remove_column :subscriptions, :recommendations_successful
  end
end