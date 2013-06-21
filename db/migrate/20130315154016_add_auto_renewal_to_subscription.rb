class AddAutoRenewalToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :auto_renewal, :boolean
  end
end
