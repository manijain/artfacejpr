module SubscriptionHelper
  
  def upgrade_user_subscription_plan
    unless session[:recommended_to_email].nil? && session[:recommended_by_user_id].nil?
      user_subscription = User.find(session[:recommended_by_user_id].to_i).subscription
      user_subscription.increment_attribute "recommendations_successful"
      user_subscription.decrement_attribute "recommendations_pending"
      UserRecommendation.find_by_email(session[:recommended_to_email]).delete
      if user_subscription.recommendations_successful == 5    
        if user_subscription.subscription_plan_id < 5
          user_subscription.increment_attribute "subscription_plan_id"
          user_subscription.update_attribute :recommendations_successful, 0
        end
      end
    end
  end

end