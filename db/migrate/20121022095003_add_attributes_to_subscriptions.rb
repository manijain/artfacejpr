class AddAttributesToSubscriptions < ActiveRecord::Migration
  def up
  	add_column :subscriptions, :subscription_free_upgrade, :string,  :default => ""
  	add_column :subscriptions, :subscription_start_date,   :datetime
  	add_column :subscriptions, :subscription_renewal_date, :datetime
  	add_column :subscriptions, :user_id, :integer
  end

  def down
  	remove_column :subscriptions, :subscription_free_upgrade
  	remove_column :subscriptions, :subscription_start_date
  	remove_column :subscriptions, :subscription_renewal_date
  	remove_column :subscriptions, :user_id
  end
end
