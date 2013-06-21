module UserHelper
	def subscription_plan_data
  	@subscription_plans = SubscriptionPlan.find(:all, :order=>:id)
  end

  def country_select_data
  	@countries = Country.find(:all, :order=>:country_name)
  end

end