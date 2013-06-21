class SubscriptionPlan < ActiveRecord::Base
  has_many :subscriptions, :foreign_key => 'subscription_plan_id'

  attr_accessible :subscription_fee, :subscription_name, :subscription_paintings_allowed, :updated_at

  validates_presence_of :subscription_fee, :subscription_name, :subscription_paintings_allowed

end