class Admin::ReportsController < ApplicationController
  
  before_filter :authenticate_admin_user!

  def index
  	@stat_type = params[:stat_type] || 'new subscriptions'
  	@interval = params[:interval] || 'daily'
  	@start_date = params[:start_date] || (Date.today-7).strftime("%Y-%m-%d")
  	@end_date = params[:end_date] || Date.today.strftime("%Y-%m-%d")
  	logger.debug(@stat_type)
  	logger.debug 'aaaaaaaaaaaaaaaaaaaaaaaaaa'
    
    if @stat_type == 'new subscriptions' || @stat_type == 'cancelled subscriptions'
    	if params[:interval] == Time.now.year.to_s
        @subscriptions = Subscription.where("extract (year from subscription_start_date) = #{Time.now.year}")
      elsif params[:interval] == "quartly"
        qtr =  ((Time.now.month - 1)/3)
        #@subscriptions = Subscription.where("extract (QUARTER from subscription_start_date) = #{qtr+1}")
        @subscriptions = Subscription.where("date(subscription_start_date) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      elsif params[:interval] == "daily"
        #day1 = @start_date.split('-')[2]
        #day2 = @end_date.split('-')[2]
        #@subscriptions = Subscription.where("extract (DAY from subscription_start_date) BETWEEN #{day1} AND #{day2}")
        @subscriptions = Subscription.where("date(subscription_start_date) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      elsif params[:interval] == "monthly"  
        mnth1 = @start_date.split('-')[1]
        mnth2 = @end_date.split('-')[1]
        @subscriptions = Subscription.where("date(subscription_start_date) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      elsif params[:interval] == "yearly"
        @subscriptions = Subscription.where("date(subscription_start_date) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      else
        @subscriptions = Subscription
      end

    elsif @stat_type == 'new offers' || @stat_type == 'active offers' || @stat_type == 'cancelled offers'
      if params[:interval] == "quartly" || params[:interval] == "daily" || params[:interval] == "monthly" || params[:interval] == "yearly"

        @offers = Offer.where("date(offer_start_date) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      else
        @offers = Offer
      end

    elsif @stat_type == 'unfinished sign-ups'
      if params[:interval] == 'quartly' || params[:interval] == 'daily' || params[:interval] == 'monthly' || params[:interval] == 'yearly'
        @users = User.where("date(users.created_at) BETWEEN '#{@start_date}' AND '#{@end_date}'")
      else
        @users = User
      end
    else
      @subscriptions = Subscription
    end


    respond_to do |format|
      logger.debug 'in respond'
      format.html
      format.js { render "admin/reports/statistics" }
     
    end
  end

end
