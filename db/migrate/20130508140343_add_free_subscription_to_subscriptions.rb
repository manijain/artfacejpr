class AddFreeSubscriptionToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :free_subscription, :boolean
  end
end
