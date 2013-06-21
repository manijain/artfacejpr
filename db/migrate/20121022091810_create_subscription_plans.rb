class CreateSubscriptionPlans < ActiveRecord::Migration
  def change
    create_table :subscription_plans do |t|
    	t.integer  :subscription_fee, :null => false
    	t.string   :subscription_name,  :null => false
    	t.integer  :subscription_paintings_allowed, :null => false
      t.timestamps
    end
  end
end
