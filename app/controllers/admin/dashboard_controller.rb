class Admin::DashboardController < ApplicationController
	
  before_filter :authenticate_admin_user!
	require 'will_paginate/array'
  caches_action :index, cache_path: proc { |c| c.params.except(:_).merge(format: request.format) }
  #helper_method :sort_column, :sort_direction

	def index
    @interval = params[:sorts] || 'All'
    per_page = params[:per_page] || 7
    sort_by = params[:sort_by] || "Most Clicked"
    page = 1
	  #@offers = Offer.paginate :page => params[:page], :per_page => per_page #:order => 'offer_popularity ASC'#, :order => "message_count" #, :order => ' ASC'
    #@offers = Offer.select("offers.*, COUNT(messages.id) AS count_messages").joins("LEFT OUTER JOIN messages ON offers.id = messages.offer_id").group("offer.id").order("count_messages DESC")#.paginate :page => params[:page], :per_page => per_page
     
    
    if params[:sorts] == "year"
      @interval = Time.now.year.to_s
      @subscriptions = Subscription.where("extract (year from subscription_start_date) = #{Time.now.year}")
    elsif params[:sorts] == "prev_year"
      @interval = (Time.now.year-1).to_s
      p_year = Time.now.year-1
      @subscriptions = Subscription.where("extract (year from subscription_start_date) =#{p_year} ")
    elsif params[:sorts] == "quarter"
      qtr =  ((Time.now.month - 1)/3)
      @subscriptions = Subscription.where("extract (QUARTER from subscription_start_date) = #{qtr+1}").where("extract (year from subscription_start_date) = #{Time.now.year}")
    elsif params[:sorts] == "today"
      @subscriptions = Subscription.where("date(subscription_start_date) = '#{Time.now.to_date}'")
    elsif params[:sorts] == "week"
      @subscriptions = Subscription.where("extract (WEEK from subscription_start_date) = #{Date.today.cweek}")
    elsif params[:sorts] == "month"  
      @subscriptions = Subscription.where("extract (MONTH from subscription_start_date) = '#{Time.now.month}'").where("extract (year from subscription_start_date) = #{Time.now.year}")
    elsif params[:sorts]=="tyear"
      @subscriptions = Subscription.where("extract (YEAR from subscription_start_date) BETWEEN #{Time.now.year-1} AND #{Time.now.year}")
    else
      @subscriptions = Subscription
    end

    if sort_by == "Most Clicked"
      @offers = Offer.where("offer_status=true").order("offers.offer_popularity desc")
    elsif sort_by == "Most messages"
      @offers = Offer.where("offer_status=true").find(:all, :include => :messages).sort_by { |p| p.messages.size}.reverse
    elsif sort_by == "Most forum activities"      
      @offers = Offer.where("offer_status=true").find(:all, :include => :forum_messages).sort_by { |p| p.forum_messages.size}.reverse
    elsif sort_by == "Newest"
      @offers = Offer.where("offer_status=true").order("offers.offer_start_date asc")
    elsif sort_by == "Highest offer"
       @offers = Offer.where("offer_status=true").find(:all, :include => :messages).sort_by { |p| p.messages.maximum(:offer_price).to_i}.reverse
    elsif sort_by == "Time left"  
      @offers = Offer.where("offer_status=true").order("offers.offer_end_date desc")
    else
      @offers = Offer.where("offer_status=true")
    end          
     
    @offers = @offers.paginate :page => params[:page], :per_page => per_page 
    #This line will be used to fetch only active offers, but right now only few active offers, so not using it.
    #.where("date(offer_end_date) >= '#{Time.now.to_date}'")
    respond_to do |format|
     format.html # index.html.erb
     format.js
    end
     #respond_to do |format|
     #format.html # index.html.erb
     #format.json 
     #format.js
   end
     #end

  #   private
  
   # def sort_column
    # Offer.column_names.include?(params[:sort]) ? params[:sort] : "offer_popularity"
    #end
  
    #def sort_direction
     #%w[asc desc].include?(params[:direction]) ? params[:direction] : "desc"
    #end

end
