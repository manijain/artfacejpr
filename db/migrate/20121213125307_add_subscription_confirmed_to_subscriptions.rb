class AddSubscriptionConfirmedToSubscriptions < ActiveRecord::Migration
  def up
    add_column :subscriptions, :subscription_confirmed, :boolean, :default=> false
  end
  def down
    remove_column :subscriptions, :subscription_confirmed
  end
end
