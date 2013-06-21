class AddFieldsToSubscriptionPlans < ActiveRecord::Migration
  def change
  	add_column :subscription_plans, :subscription_offers_allowed, :string
  	add_column :subscription_plans, :wishlist_allowed, :boolean
  end
end
