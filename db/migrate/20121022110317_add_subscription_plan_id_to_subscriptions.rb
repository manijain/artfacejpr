class AddSubscriptionPlanIdToSubscriptions < ActiveRecord::Migration
  def up
  	add_column :subscriptions, :subscription_plan_id, :integer
  end
  
  def down
  	remove_column :subscriptions, :subscription_plan_id
  end
end
