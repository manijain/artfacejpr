class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :subscription_plan, :foreign_key => 'subscription_plan_id'  
  before_update :set_check_recommendation
  after_update :check_recommendation

  attr_accessible :subscription_free_upgrade, :subscription_start_date, :subscription_renewal_date, :user_id, :subscription_plan_id, :recommendations_pending, :recommendations_successful, :subscription_confirmed, :payment_type, :auto_renewal, :card_type, :credit_card, :card_owner, :payment_details, :card_expires

  validates_presence_of :subscription_start_date, :subscription_renewal_date, :user_id, :subscription_plan_id

  attr_accessor :previous_subscription_confirmed #, :set_check_recommendation, :check_recommendation

  def increment_attribute attribute
    update_attribute attribute.intern, self[attribute.intern] + 1
  end

  def decrement_attribute attribute
    update_attribute attribute.intern, self[attribute.intern] - 1
  end

  def set_check_recommendation
    logger.debug "11111111111111" #don't remove this logger.debug
    @previous_subscription_confirmed = Subscription.find_by_id(self.id).subscription_confirmed
    logger.debug "22222222222222" #don't remove this logger.debug
  end

  def check_recommendation
    if @previous_subscription_confirmed == false && self.subscription_confirmed == true
      logger.debug "user find by user id"
      user = User.find(self[:user_id])
      recommended_user = UserRecommendation.find_by_email(user.email)
      if recommended_user.blank?
        logger.debug "no such user, recommended, hence we won't do anything"
      else
        user_subscription = User.find(recommended_user.user_id).subscription
        user_subscription.increment_attribute "recommendations_successful"
        user_subscription.decrement_attribute "recommendations_pending"
        if user_subscription.recommendations_successful == 5    
          if user_subscription.subscription_plan_id < 5
            user_subscription.increment_attribute "subscription_plan_id"
            user_subscription.update_attribute :recommendations_successful, 0
          end
        end
        recommended_user.destroy
      end
    end
  end
end
