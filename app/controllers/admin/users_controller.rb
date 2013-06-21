class Admin::UsersController < ApplicationController

  require 'will_paginate/array'
  require 'zip/zip'
  before_filter :authenticate_admin_user!
    
  def choose_subscription_type

    @subscription_plan = SubscriptionPlan.find_by_id(params[:type].to_i)
    respond_to do |format|
      format.js { render "admin/users/subscription_plan"}
    end
    return
  end

  def cancel_user_subscription
    @user = User.find(params[:user_id])
    @user.subscription.update_attribute :subscription_renewal_date, ''
    @user.subscription.update_attribute :auto_renewal, false
    SubscriptionMailer.cancel_subscription(@user).deliver
    render :text=>"true"
  end

  def send_invitation_to_user  
    
    @token = true 
    User.all.each do |check|
      if check.email == params[:email]
        @token = false
        break
      end
    end 
    if @token == true
      @user_invitation = AdminInvitation.new do |temp|
        temp.admin_user_id = current_admin_user.id
        temp.name = params[:f_name] + ' ' + params[:l_name]
        temp.email = params[:email]
        temp.password = params[:pwd]
      end
      @user_invitation.save
      AdminInvitationMailer.send_invitation(@user_invitation).deliver
      render :text => "true"
    else
      render :text => "false"  
    end  
  end
  
  def resend_invitation_to_user
    @invitation = AdminInvitation.where(:email=>params[:email]).where(:admin_user_id=>current_admin_user).first
    if @invitation.blank?
      @invitation = AdminInvitation.where(:email=>params[:email]).first
      @user_invitation = AdminInvitation.new do |temp|
        temp.admin_user_id = current_admin_user.id
        temp.name = @invitation.name
        temp.email = params[:email]
        temp.password = @invitation.password
      end
      @user_invitation.save
      AdminInvitationMailer.resend_invitation(@user_invitation).deliver
    else
      logger.debug("yessssssss")
      @invitation.update_attribute :updated_at, Time.now
      @invitation.save
      AdminInvitationMailer.resend_invitation(@invitation).deliver
    end  

    render :text => "true"

  end

	def index
	  per_page = params[:per_page] || 7	 
    page = params[:page] || 1
    @users = User.order(user_sort(params[:sort_by])).paginate :page =>page, :per_page => per_page
    session[:user_simple_search_string] = "" 
    session[:user_advanced_select] = "" 
=begin    
	  if params["sort_by"] == "first name"
        @users = User.order("users.user_first_name asc").paginate :page => params[:page], :per_page => per_page
      elsif params["sort_by"] == "last name"
      	@users = User.order("users.user_last_name asc").paginate :page => params[:page], :per_page => per_page
      elsif	params["sort_by"] == "country"
      	@users = User.order("users.user_country asc").paginate :page => params[:page], :per_page => per_page
      elsif params["sort_by"] == "membership date"
        @users = User.order("users.created_at asc").paginate :page => params[:page], :per_page => per_page	      
      else
	    @users = User.paginate :page => params[:page], :per_page => per_page
	  end  
=end	 
  end
  
  def user_sort sort_by
    if sort_by == "first name"
      "users.user_first_name asc"
    elsif sort_by == "last name"
      "users.user_last_name asc"
    elsif sort_by == "country"
      "users.user_country asc"
    elsif sort_by == "membership"
      "users.created_at asc"
    else
      "users.id asc"
    end    
  end

  def user_search
     page = params[:page] || 1
     per_page = params[:per_page] || 7
     sort_by = params[:sort_by] || "country"
    if params[:search_basic] =="true"
      search_string = params[:user][:search_string]
      session[:user_simple_search_string] = search_string
      session[:user_advanced_select] = "" 
      logger.debug("one")
      @users = user_search_basic(search_string).order(user_sort(sort_by)).uniq.paginate :page=>page, :per_page=>per_page
    elsif params[:search_advanced] =="true"
      search_temp = params[:select]
      session[:user_advanced_select] = search_temp
      logger.debug(session[:user_advanced_select])
      session[:user_simple_search_string] = ""
      @users = []
      @userthree = []
      @message_flag = false
      @forumessage_flag = false
      @userone = []
      @usertwo = []
      @usersfour = []
      @temp = user_search_advanced(search_temp)
      if(search_temp.has_key?(:usermessages)) 
        @userone = User.joins("LEFT JOIN messages on messages.user_id = users.id").having("#{@search_advanced_user_msgs}").group("users.id")
        @message_flag = true
      end
      if (search_temp.has_key?(:userforummessages))
        @usertwo = User.joins("LEFT JOIN forum_messages on forum_messages.user_id = users.id").having("#{@search_advanced_user_frmsgs}").group("users.id")        
        @forumessage_flag = true
      end            
      @usersfour =  User.joins("LEFT JOIN subscriptions on subscriptions.user_id = users.id JOIN user_settings on user_settings.user_id = users.id  LEFT JOIN offers on offers.seller_id = users.id LEFT JOIN admin_invitations on admin_invitations.email = users.email").where(user_search_advanced(search_temp)).having("#{@search_advanced_user_offers}").order(user_sort(sort_by)).group("users.id")#.uniq.paginate :page=>page, :per_page=>per_page            
      if @message_flag == true && @forumessage_flag == true
        @userone.each do |usero|
          @usertwo.each do |usert|
            if usero.id == usert.id
               @userthree.push(usero)
            end            
          end 
        end
      elsif @message_flag == true
        logger.debug(@userone)
        @userthree = @userone
      elsif @forumessage_flag == true 
        @userthree = @usertwo
      else 
        @userthree = ""      
      end
      logger.debug(@userthree)
      if @userthree == ""
        @users = @usersfour
      else
        @usersfour.each do |userf|
          @userthree.each do |userst|
            if userf.id == userst.id
              @users.push(userf)
            end
          end
        end 
      end  

      @users = @users.uniq.paginate :page=>page, :per_page=>per_page  
      #@users =  User.joins("LEFT JOIN subscriptions on subscriptions.user_id = users.id JOIN user_settings on user_settings.user_id = users.id  LEFT JOIN offers on offers.seller_id = users.id").where(user_search_advanced(search_temp)).having("#{@search_advanced_user_having}").order(user_sort(sort_by)).group("users.id").uniq
      #@users = User.joins("LEFT JOIN messages on messages.user_id = users.id").having("messages.count = 5").group("users.id").paginate :page=>page, :per_page=>per_page
    else
      if session[:user_advanced_select] != "" 
        search_temp = session[:user_advanced_select]
        @users = []
        @userthree = []
        @message_flag = false
        @forumessage_flag = false
        @userone = []
        @usertwo = []
        @usersfour = []
        @temp = user_search_advanced(search_temp)
        if(search_temp.has_key?(:usermessages)) 
          @userone = User.joins("LEFT JOIN messages on messages.user_id = users.id").having("#{@search_advanced_user_msgs}").group("users.id")
          @message_flag = true
        end
        if (search_temp.has_key?(:userforummessages))
          @usertwo = User.joins("LEFT JOIN forum_messages on forum_messages.user_id = users.id").having("#{@search_advanced_user_frmsgs}").group("users.id")        
          @forumessage_flag = true
        end            
        @usersfour =  User.joins("LEFT JOIN subscriptions on subscriptions.user_id = users.id JOIN user_settings on user_settings.user_id = users.id  LEFT JOIN offers on offers.seller_id = users.id LEFT JOIN admin_invitations on admin_invitations = users.email").where(user_search_advanced(search_temp)).having("#{@search_advanced_user_offers}").order(user_sort(sort_by)).group("users.id")#.uniq.paginate :page=>page, :per_page=>per_page            
        if @message_flag == true && @forumessage_flag == true
          @userone.each do |usero|
            @usertwo.each do |usert|
              if usero.id == usert.id
                 @userthree.push(usero)
              end            
            end 
          end
        elsif @message_flag == true
          logger.debug(@userone)
          @userthree = @userone
        elsif @forumessage_flag == true 
          @userthree = @usertwo
        else 
          @userthree = ""      
        end
        logger.debug(@userthree)
        if @userthree == ""
          @users = @usersfour
        else
          @usersfour.each do |userf|
            @userthree.each do |userst|
              if userf.id == userst.id
                @users.push(userf)
              end
            end
          end 
        end  

        @users = @users.uniq.paginate :page=>page, :per_page=>per_page 
        logger.debug("three")
      elsif session[:user_simple_search_string] != ""  
        @users = user_search_basic(session[:user_simple_search_string]).order(user_sort(sort_by)).uniq.paginate :page=>page, :per_page=>per_page
        logger.debug("four")
      else 
        @users = User.order(user_sort(params[:sort_by])).paginate :page => params[:page], :per_page => per_page
      end  
    end
    
   respond_to do |format|
      format.js {render "admin/users/index"}
    end
  end

  def user_search_basic search_term
    #Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id 
    #JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id")
    #.where("messages.message_text ilike ? OR messages.message_title ilike ? OR messages.concern ilike ? OR artists.artist_name ilike ? OR users.user_first_name ilike ? OR users.user_last_name ilike ? ", "%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%")
    User.where("users.user_first_name ilike ? OR users.user_last_name ilike ? OR users.user_gender ilike ? OR users.user_street ilike ? OR users.user_country ilike ?" , "%#{search_term}%", "%#{search_term}%", "%#{search_term}%", "%#{search_term}%", "%#{search_term}%")
  end

  def user_search_advanced temp_params
    # "select"=>{"username"=>{"search_type"=>"contains", "value"=>"ddd"}, "usercountry"=>{"name"=>"Afghanistan"}
=begin
"select"=>{"username"=>{"search_type"=>"contains", "value"=>"ddd"}, 
"usercountry"=>{"name"=>"Afghanistan"}, 
"useraddress"=>{"search_type"=>"contains" value=>l;l}, 
"usergender"=>{"value"=>"male"}, 
"userpaymentmethod"=>{"search_type"=>"is", "name"=>"Visa"}, 
"usersubscriptiontype"=>{"search_type"=>"is", "name"=>"Basic"}, 
"usersubscriptionmethod"=>{"search_type"=>"is", "name"=>"auto renewal"}, 
"user_payment_balance"=>{"value"=>"is in debit"}, 
"usermembership"=>{"search_type"=>"begins before", "value"=>"04/10/2013"},
"userbackendstatus"=>{"search_type"=>"includes", "name"=>"admin-rights"},
"useroffers"=>{"search_type"=>"equals", "value"=>"10"}, 
"usermessages"=>{"search_type"=>"equals", "value"=>"11"},
"userforummessages"=>{"search_type"=>"equals", "value"=>"12"}, 
"user_main_activity"=>{"value"=>"is selling"}, 
"user_invited"=>{"value"=>"yes"}, 
"user_logged_in"=>{"value"=>"yes"}
=end
    if !temp_params.blank?
      
      my = ""
    #{}"username"=>{"search_type"=>"contains", "value"=>"ddd"
      unless temp_params[:username].blank?
        if temp_params[:username][:search_type] == "contains"
         search_username  = "CONCAT(users.user_first_name, ' ', users.user_last_name) ilike '%#{temp_params[:username][:value]}%'"
        elsif temp_params[:username][:search_type] == "is exactly"
          search_username = "CONCAT(users.user_first_name, ' ', users.user_last_name)  = '#{temp_params[:username][:value]}'"
        elsif temp_params[:username][:search_type] == "is not"
          search_username = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:username][:value]}'"
        end
        my = "#{search_username}"
      else
        search_username = ""
      end
      
    #usercountry"=>{"name"=>"Afghanistan"},
      unless temp_params[:usercountry].blank?
        if temp_params[:usercountry]['name'].blank?
          search_usercountry = ""
        else
          search_usercountry = "users.user_country =  '#{temp_params[:usercountry][:name]}'"
        end
        if my != ""
          my = "#{my} AND #{search_usercountry}"
        else
          my = "#{search_usercountry}"
        end
      else
        search_usercountry = ""
      end
      
    #"useraddress"=>{"search_type"=>"contains" value=>l;l},
      unless temp_params[:useraddress].blank?
        if temp_params[:useraddress][:search_type] == "contains"
         search_useraddress  = "users.user_street ilike '%#{temp_params[:useraddress][:value]}%'"
        elsif temp_params[:useraddress][:search_type] == "is exactly"
          search_useraddress = "users.user_street  = '#{temp_params[:useraddress][:value]}'"
        elsif temp_params[:useraddress][:search_type] == "is not"
          search_useraddress = "users.user_street != '#{temp_params[:useraddress][:value]}'"
        end
        if my != ""
          my = "#{my} AND #{search_useraddress}"
        else
          my = "#{search_useraddress}"
        end
      else
        search_useraddress = ""
      end

    #"usergender"=>{"value"=>"male"},   
      unless temp_params[:usergender].blank?
        if temp_params[:usergender]['value'].blank?
          search_usergender = ""
        else
          search_usergender = "users.user_gender =  '#{temp_params[:usergender][:value]}'"
        end
        if my != ""
          my = "#{my} AND #{search_usergender}"
        else
          my = "#{search_usergender}"
        end
      else
        search_usergender = ""
      end      
      
    #"userpaymentmethod"=>{"search_type"=>"is", "name"=>"Visa"},       
      unless temp_params[:userpaymentmethod].blank?
        #if temp_params[:userpaymentmethod][:name] == "bank_transfer" || temp_params[:userpaymentmethod][:name] == "PayPal"
        if temp_params[:userpaymentmethod][:search_type] == "is"
          search_userpaymentmethod = "subscriptions.payment_type  = '#{temp_params[:userpaymentmethod][:name]}'"
        elsif temp_params[:userpaymentmethod][:search_type] == "is not"
          search_userpaymentmethod = "subscriptions.payment_type != '#{temp_params[:userpaymentmethod][:name]}'"
        end
        if my != ""
          my = "#{my} AND #{search_userpaymentmethod}"
        else
          my = "#{search_userpaymentmethod}"
        end
      else
        search_userpaymentmethod = ""
      end

      #"usersubscriptiontype"=>{"search_type"=>"is", "name"=>"Basic"},  
      unless temp_params[:usersubscriptiontype].blank?
        if temp_params[:usersubscriptiontype][:name] == "Basic"
          @plan = 1
        elsif temp_params[:usersubscriptiontype][:name] == "Plus"
          @plan = 2
        elsif temp_params[:usersubscriptiontype][:name] == "Pro"
          @plan = 3
        elsif temp_params[:usersubscriptiontype][:name] == "Premium"
          @plan = 4
        elsif temp_params[:usersubscriptiontype][:name] == "No Limit"
          @plan = 5
        end 
        if temp_params[:usersubscriptiontype][:search_type] == "is" 
          search_usersubscriptiontype = "subscriptions.subscription_plan_id  = '#{@plan}' "
        elsif temp_params[:usersubscriptiontype][:search_type] == "is not"
          search_usersubscriptiontype = "subscriptions.subscription_plan_id != '#{@plan}'"
        end
        if my != ""
          my = "#{my} AND #{search_usersubscriptiontype}"
        else
          my = "#{search_usersubscriptiontype}"
        end
      else
        search_usersubscriptiontype = ""
      end

    #{}"usersubscriptionmethod"=>{"search_type"=>"is", "name"=>"auto renewal"},
      unless temp_params[:usersubscriptionmethod].blank?
        if (temp_params[:usersubscriptionmethod][:search_type] == "is" &&  temp_params[:usersubscriptionmethod][:name] == "auto renewal") || (temp_params[:usersubscriptionmethod][:search_type] == "is not" &&  temp_params[:usersubscriptionmethod][:name] == "1-year-limit")
          search_usersubscriptionmethod = "subscriptions.auto_renewal  = 'true'"
        elsif (temp_params[:usersubscriptionmethod][:search_type] == "is not" && temp_params[:usersubscriptionmethod][:name] == "auto renewal") || (temp_params[:usersubscriptionmethod][:search_type] == "is" && temp_params[:usersubscriptionmethod][:name] == "1-year-limit")
          search_usersubscriptionmethod = "subscriptions.auto_renewal != 'true'"
        end
        if my != ""
          my = "#{my} AND #{search_usersubscriptionmethod}"
        else
          my = "#{search_usersubscriptionmethod}"
        end
      else
        search_usersubscriptionmethod = ""
      end

    #{}"user_payment_balance"=>{"value"=>"is in debit"},   
      unless temp_params[:user_payment_balance].blank?
        @debit_user = []
        @credit_user = []
        User.all.each do |userpay|
          unless userpay.payments.blank?
            credits = 0
            debits = 0
            userpay.payments.each do |mypay|
              if mypay.payment_type == "credit"
                credits = credits + (mypay.transaction_amount - mypay.amount)
              elsif mypay.payment_type == "debit"
                debits = debits + (mypay.transaction_amount - mypay.amount)
              end
            end
            if credits > debits
              @credit_user.push(userpay.id)
            elsif credits < debits
              @debit_user.push(userpay.id)  
            end
          end
        end
        logger.debug(@credit_user)
        logger.debug(@debit_user)

        @debit_user =  @debit_user.collect { |w| w }.join(",")
        @credit_user =  @credit_user.collect { |w| w }.join(",")

        if temp_params[:user_payment_balance][:value] == "is in debit"
          search_user_payment_balance = "users.id IN (#{@debit_user})"
        elsif temp_params[:user_payment_balance][:value] == "is in credit"
          search_user_payment_balance = "users.id IN (#{@credit_user})"
        end
        if my != ""
          my = "#{my} AND #{search_user_payment_balance}"
        else
          my = "#{search_user_payment_balance}"
        end
      else
        search_user_payment_balance = ""
      end

    #{}"usermembership"=>{"search_type"=>"begins before", "value"=>"04/10/2013"},
      unless temp_params[:usermembership].blank?
        if temp_params[:usermembership][:search_type] == "begins before"
          search_usermembership = "date(users.confirmed_at) < '#{temp_params[:usermembership][:value]}'"
        elsif temp_params[:usermembership][:search_type] == "begins after"
          search_usermembership = "date(users.confirmed_at) > '#{temp_params[:usermembership][:value]}'"
        end
        if my != ""
          my = "#{my} AND #{search_usermembership}"
        else
          my = "#{search_usermembership}"
        end
      else
        search_usermembership = ""
      end

    #{}"userbackendstatus"=>{"search_type"=>"includes", "name"=>"admin-rights"},
      unless temp_params[:userbackendstatus].blank?
        if temp_params[:userbackendstatus][:search_type]== "includes" 
          if  temp_params[:userbackendstatus][:name] == "admin-rights"
            search_userbackendstatus = "user_settings.admin_rights = 'true'"
          elsif temp_params[:userbackendstatus][:name] == "forum-rights"
            search_userbackendstatus = "user_settings.forum_rights = 'true'"
          elsif temp_params[:userbackendstatus][:name] == "service-directory-rights"
            search_userbackendstatus = "user_settings.service_dir_rights = 'true'"
          end
        elsif temp_params[:userbackendstatus][:search_type]== "excludes"
          if  temp_params[:userbackendstatus][:name] == "admin-rights"
            search_userbackendstatus = "user_settings.admin_rights = 'false'"
          elsif temp_params[:userbackendstatus][:name] == "forum-rights"
            search_userbackendstatus = "user_settings.forum_rights = 'false'"
          elsif temp_params[:userbackendstatus][:name] == "service-directory-rights"
            search_userbackendstatus = "user_settings.service_dir_rights = 'false'"
          end
        end
        if my != ""
          my = "#{my} AND #{search_userbackendstatus}"
        else
          my = "#{search_userbackendstatus}"
        end
      else
        search_userbackendstatus = ""
      end  

    #{}"useroffers"=>{"search_type"=>"equals", "value"=>"10"},
      @search_advanced_user_having = ""   
      unless temp_params[:useroffers].blank?
        if temp_params[:useroffers][:search_type] == "equals"
          search_useroffers = "offers.count = #{temp_params[:useroffers][:value]}"
        elsif temp_params[:useroffers][:search_type] == "is lower than"
          search_useroffers = "offers.count < '#{temp_params[:useroffers][:value]}'"
        elsif temp_params[:useroffers][:search_type] == "is higher than"
          search_useroffers = "offers.count > '#{temp_params[:useroffers][:value]}'"
        end
        if  @search_advanced_user_having != ""
          @search_advanced_user_offers = "#{@search_advanced_user_having} AND #{search_useroffers}"
        else
          @search_advanced_user_offers = "#{search_useroffers}"
        end      
      else
        search_useroffers=""
      end 
    
    #{}"usermessages"=>{"search_type"=>"equals", "value"=>"11"},
      unless temp_params[:usermessages].blank?
        if temp_params[:usermessages][:search_type] == "equals"
          search_usermessages = "messages.count = #{temp_params[:usermessages][:value]}"
        elsif temp_params[:usermessages][:search_type] == "is lower than"
          search_usermessages = "messages.count < '#{temp_params[:usermessages][:value]}'"
        elsif temp_params[:usermessages][:search_type] == "is higher than"
          search_usermessages = "messages.count > '#{temp_params[:usermessages][:value]}'"
        end
        if @search_advanced_user_having != ""
          @search_advanced_user_having = "#{@search_advanced_user_having} AND #{search_usermessages}"
        else
          @search_advanced_user_msgs = "#{search_usermessages}"
        end      
      else
        search_usermessages=""
      end
    #{}"userforummessages"=>{"search_type"=>"equals", "value"=>"12"}, 
      unless temp_params[:userforummessages].blank?
        if temp_params[:userforummessages][:search_type] == "equals"
          search_userforummessages = "forum_messages.count = #{temp_params[:userforummessages][:value]}"
        elsif temp_params[:userforummessages][:search_type] == "is lower than"
          search_userforummessages = "forum_messages.count < '#{temp_params[:userforummessages][:value]}'"
        elsif temp_params[:userforummessages][:search_type] == "is higher than"
          search_userforummessages = "forum_messages.count > '#{temp_params[:userforummessages][:value]}'"
        end
        if @search_advanced_user_having != ""
          @search_advanced_user_having = "#{@search_advanced_user_having} AND #{search_userforummessages}"
        else
          @search_advanced_user_frmsgs = "#{search_userforummessages}"
        end      
      else
        search_userforummessages=""
      end
      #"user_main_activity"=>{"value"=>"is selling"}, 
      unless temp_params[:user_main_activity].blank?
        @buyer_array = []
        @seller_array = []
        User.all.each do |myuser|
          @seller = Offer.where(:seller_id => myuser.id).count
          @buyer = Offer.where(:buyer_id => myuser.id).count
          if @seller == @buyer
            @buyer_array.push(myuser.id)
            @seller_array.push(myuser.id)
          elsif @seller > @buyer
            @seller_array.push(myuser.id)
          elsif @seller < @buyer
            @buyer_array.push(myuser.id)  
          end          
        end
        @seller_array =  @seller_array.collect { |w| w }.join(",")
        @buyer_array =  @buyer_array.collect { |w| w }.join(",")

        if temp_params[:user_main_activity][:value] == "is selling"
          search_user_main_activity = "users.id IN (#{@seller_array})"          
        elsif temp_params[:user_main_activity][:value] == "is buying"
          search_user_main_activity = "users.id IN (#{@buyer_array})"          
        end
        if my != ""
          my = "#{my} AND #{search_user_main_activity}"
        else
          my = "#{search_user_main_activity}"
        end 
      else
        search_user_main_activity = ""  
      end

      #"user_invited"=>{"value"=>"yes"},       
      unless temp_params[:user_invited].blank?
        if temp_params[:user_invited][:value] == "yes"
          search_user_invited = "users.email = admin_invitations.email"
        elsif temp_params[:user_invited][:value] == "no"
          search_user_invited = "users.email != admin_invitations.email"
        end
        if my != ""
          my = "#{my} AND #{search_user_invited}"
        else
          my = "#{search_user_invited}"
        end
      else
        search_user_invited = ""
      end

      #"user_logged_in"=>{"value"=>"yes"}      
      unless temp_params[:user_logged_in].blank?
        if temp_params[:user_logged_in][:value] == "yes"
          search_invited_user_logged_in = "users.email = admin_invitations.email AND users.sign_in_count > 0"
        elsif temp_params[:user_logged_in][:value] == "no"
          search_invited_user_logged_in = "users.email = admin_invitations.email AND users.sign_in_count = 0"
        end
        if my != ""
          my = "#{my} AND #{search_invited_user_logged_in}"
        else
          my = "#{search_invited_user_logged_in}"
        end
      else
        search_invited_user_logged_in = ""
      end   

      "#{my}"     

    else
      ""
    end

  end
    
  def new
    @user = User.new
    @subscription = Subscription.new
    @user_setting = UserSetting.new
    @basic_plan = SubscriptionPlan.find_by_id(1)
  end

  def create
    @user = User.new do |temp|
      temp.user_salutation = params[:user][:user_salutation]
      temp.user_first_name = params[:user][:user_first_name]
      temp.user_last_name = params[:user][:user_last_name]
      temp.user_company = params[:user][:user_company]
      temp.user_street = params[:user][:user_street]
      temp.user_city = params[:user][:user_city]
      temp.user_phone_number = params[:user][:user_phone_number]
      temp.user_fax_number = params[:user][:user_fax_number]
      temp.user_tax_id = params[:user][:user_tax_id]
      temp.user_zip_code = params[:user][:user_zip_code]
      temp.user_country = params[:user][:user_country]
      temp.email = params[:user][:email]
      temp.password = params[:user][:password]
      temp.password_confirmation = params[:user][:password_confirmation]
    end
    @user.save
    Rails.logger.info(@user.errors.messages.inspect)
    temp_user_id = @user.id

    @subscription = Subscription.new do |temp|
      
      temp.payment_type = params[:subscription][:payment_type]
      temp.subscription_start_date = DateTime.now()
      temp.subscription_renewal_date = params[:subscription][:subscription_renewal_date] || Time.now + 1.year
      temp.subscription_plan_id = params[:subscription][:subscription_plan_id]
      temp.auto_renewal = params[:subscription][:auto_renewal]
      temp.user_id = temp_user_id
      temp.free_subscription = params[:subscription][:free_subscription] || false
      if params[:subscription][:payment_type]=="credit_card"
        temp.card_type= params[:subscription][:card_type]
        temp.credit_card=params[:subscription][:credit_card]
        temp.card_owner=params[:subscription][:card_owner]
        temp.card_expires = "#{params[:subscription][:card_expires]} / #{params[:subscription][:user_id]}"
      end
    end
    @subscription.save
    Rails.logger.info(@subscription.errors.messages.inspect)

    @user_setting = UserSetting.new do |temp|
      temp.notification_by = "email"
      temp.notification_email = params[:user][:email]
      temp.show_identity = true
      temp.wishlist_notification = true
      temp.seller_message_notification = true
      temp.buyer_message_notification = true
      temp.forum_notification = true
      temp.user_offer_forum_discussion = true
      temp.user_id = temp_user_id
      temp.admin_rights = params[:user_setting][:admin_rights]
      temp.forum_rights = params[:user_setting][:forum_rights]
      temp.service_dir_rights = params[:user_setting][:service_dir_rights]
    end
    @user_setting.save

    @first_payment = Payment.new do |pay|
      @tr_amount = SubscriptionPlan.find_by_id(@subscription.subscription_plan_id).subscription_fee
      if (params[:subscription].has_key?(:free_subscription))
        @tr_amount = 0
        logger.debug("yess")
      end
      pay.transaction_amount = @tr_amount
      pay.amount = 0
      pay.user_id = temp_user_id
      pay.payment_type = "debit"
    end
    @first_payment.save


    logger.debug 'createggggggggggggggggggggggggggggg user'

    respond_to do |format|
      if @user.save && @subscription.save
        Rails.logger.info(@user.errors.messages.inspect)
        format.html { redirect_to "/admin/users/#{temp_user_id}", notice: 'User was successfully created.' }
        format.json { render json: @user }
      else
        Rails.logger.info(@user.errors.messages.inspect)
        @basic_plan = SubscriptionPlan.find_by_id(1)
        format.html { render action: "new", notice: 'user not created' }
        format.json { render json: @user.errors }
      end
    end
  end

    
  def show
    @user = User.find(params[:id])
    logger.debug 'debug'
    @usersetting = UserSetting.where(:user_id => @user.id).first
    if params[:choice]=="2"
      logger.debug "aaaaaaaaaaagggggyyyyyyyyyyaaa"
      @subscription = Subscription.where(:user_id => @user.id).first
      @subscription.update_attribute(:subscription_plan_id, params[:subplan])
    end
    respond_to do |format|
      format.html 
      format.js  
    end
    #Rails.logger.info(@user.errors.inspect)
   
  end

  def edit
    @user= User.find(params[:id])
    @subscription = Subscription.where(:user_id => @user.id).first
    @subscription_plans = SubscriptionPlan.all
    @user_setting = UserSetting.where(:user_id=> @user.id).first
	end

  def update
    @user = User.find(params[:id])
    @subscription = Subscription.where(:user_id => @user.id).first
    @user_setting =  UserSetting.where(:user_id => @user.id).first
    unless @user_setting.blank?      
      @user_setting.update_attribute(:admin_rights, params[:user_setting][:admin_rights])
      @user_setting.update_attribute(:forum_rights, params[:user_setting][:forum_rights])
      @user_setting.update_attribute(:service_dir_rights, params[:user_setting][:service_dir_rights])
    end    
    respond_to do |format|
      if params[:user][:password].blank?
        @user.update_attribute(:user_salutation, params[:user][:user_salutation])
        @user.update_attribute(:user_first_name, params[:user][:user_first_name])
        @user.update_attribute(:user_last_name, params[:user][:user_last_name])
        @user.update_attribute(:user_company, params[:user][:user_company])
        @user.update_attribute(:user_street, params[:user][:user_street])
        @user.update_attribute(:user_zip_code, params[:user][:user_zip_code])
        @user.update_attribute(:user_city, params[:user][:user_city])
        @user.update_attribute(:user_country, params[:user][:user_country])
        @user.update_attribute(:user_phone_number, params[:user][:user_phone_number])
        @user.update_attribute(:user_fax_number, params[:user][:user_fax_number])
        @user.update_attribute(:user_tax_id, params[:user][:user_tax_id])
        @user.update_attribute(:email, params[:user][:email])
        @subscription.update_attribute(:payment_type, params[:subscription][:payment_type])
        if params[:subscription][:payment_type] == 'credit_card'
          @subscription.update_attribute(:credit_card, params[:subscription][:credit_card])
          @subscription.update_attribute(:card_owner, params[:subscription][:card_owner])
          @subscription.update_attribute(:card_expires, "#{params[:card_expires_mnth]} / #{params[:card_expires_year]}")
          @subscription.update_attribute(:card_type, params[:subscription][:card_type])
          @subscription.update_attribute(:payment_details, params[:subscription][:payment_details])
        end
        @subscription.update_attribute(:free_subscription, params[:subscription][:free_subscription] || false)
        @subscription.update_attribute(:subscription_plan_id, params[:subscription][:subscription_plan_id] || @subscription.subscription_plan_id)
        @subscription.update_attribute(:subscription_renewal_date, params[:subscription][:subscription_renewal_date] || @subscription.subscription_renewal_date)
        format.html { redirect_to "/admin/users/#{params[:id]}", notice: 'user updates successfully updated.' }
        format.json { head :no_content }
      else
        if @user.update_attributes(params[:user]) && @subscription.update_attributes(params[:subscription])
          @subscription.update_attribute(:free_subscription, params[:subscription][:free_subscription] || false)
          format.html { redirect_to "/admin/users/#{params[:id]}", notice: 'user updates successfully updated.' }
          format.json { head :no_content }
        else
          @user.errors.full_messages.each do |msg|          
            logger.debug(msg)
          end
          session[:admin_user_edit_errors] = @user.errors
          format.html { redirect_to "/admin/users/#{params[:id]}/edit", notice: 'not updated.' }
          format.json { render json: @user.errors}

        end
      end
    end
    #@user.update_attributes(params[:user])
    #redirect_to "/admin/users/#{params[:id]}"
  end
  
  


  def update_settings
    @user = User.find(params[:user_id])   

    @user.user_setting.update_attribute :notification_by             , params["user_notification_by"]
    @user.user_setting.update_attribute :notification_email          , params["user_notification_email"]
    @user.user_setting.update_attribute :show_identity               , params["user_identity"]
    @user.user_setting.update_attribute :wishlist_notification       , params["wishist_notification"]
    @user.user_setting.update_attribute :seller_message_notification , params["user_seller_message_notification"]
    @user.user_setting.update_attribute :buyer_message_notification  , params["user_buyer_message_notification"]
    @user.user_setting.update_attribute :forum_notification          , params["user_forum_notifications"]
    @user.user_setting.update_attribute :user_offer_forum_discussion , params["user_offer_forum_discussion"]
    render :text=>"true"
  end

  def zip_download
    @user = User.find(params[:id])
    folder = "tmp/stuff_to_zip"
    input_filenames = []
    zipfile_name = "tmp/archive_#{@user.id}_#{Time.now.to_date}.zip"
    Zip::ZipFile.open(zipfile_name, Zip::ZipFile::CREATE) do |zipfile|
      @user.documents.each do |document|
        tmp_save_path = "tmp/#{@user.id}_#{Time.now.to_i.to_s[5..9]}_#{document.file_name}"
        File.open(tmp_save_path, 'wb') do |file|
          file << open(document.file_path).read
        end
        zipfile.add(tmp_save_path, tmp_save_path)
      end
    end
    send_file zipfile_name, :type => "application/zip"
  end


  def login_as_user      
    sign_in User.find(params[:id]), :bypass => true
    redirect_to dashboard_home_path
  end

  

  def user_offers    

    @user = User.find(params[:id])
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    sort_by     = params[:sort_by]      || "artist name" 
    offer_show  = params[:offer_show]   || ""
    session[:search_string] = session[:search_string] || ""
    session[:search_item]=""
    offer_list = @user.offers.map{|temp| temp.id}
    

    @offers_online_count = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, "show all offers").count
    @offers              = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, offer_show)
    
    respond_to do |format|
      format.js   { render "admin/users/user_offers/user_offers_data" }
      format.html { render "admin/users/user_offers" }
    end
  end

  def user_offers_search
    
    if !params[:offer].blank?
      if params[:offer]["user_id"].blank?
        @user       = User.find(session["user_offers_user_id"])
      else
          @user   = User.find(params[:offer][:user_id])
      end
    end
    per_page     = params[:per_page] || 18
    page         = params[:page]     || 1
    sort_by      = params[:sort_by]  || ""
    offer_status = params[:offer_status] || "show all offers"
    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      session["last_search_advanced"] = true
      session["last_search_basic"] = false

      unless params[:select].blank?
        session[:select]=params[:select]
      end

      @offers = Offer.new.admin_user_offers_search_advanced(session[:select], page, per_page, sort_by, @user.id, offer_status)


    else

      session["last_search_basic"] = true
      session["last_search_advanced"] = false

      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      @offers     = Offer.new.admin_user_offers_search_basic(search_item, page, per_page, sort_by,@user.id, offer_status)
    end

    respond_to do |format|
      format.js {render "admin/users/user_offers/user_offers_data"}
    end
    return
  end

  
  def user_favourites
    session["user_favourites_user_id"] = params[:id]
    @user           = User.find(params[:id])
    per_page        = params[:per_page] || 6
    page            = params[:page]     || 1
    sort_by         = params[:sort_by]  || ""
    search_item     = session[:search_item] = ""
    offer_status = params[:offer_status] || "show all offers"
    unless params[:page].blank?
      user_favourites_search
    end
    favourites_list = @user.favourites.map{|favourite| favourite.offer_id}
    favourites_list = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    @offers = Offer.new.admin_user_favourites_search_basic(favourites_list_condition,search_item, page, per_page, sort_by,session["user_favourites_user_id"], offer_status)
  end

  def user_favourites_search

    if !params[:offer].blank?
      if params[:offer]["user_id"].blank?
        @user       = User.find(session["user_favourites_user_id"])
      else
          @user   = User.find(session["user_favourites_user_id"])
      end
    end
    
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_status = params[:offer_status] || "show all offers"
    favourites_list = @user.favourites.map{|favourite| favourite.offer_id}
    favourites_list = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    
    if request.post?
      if params[:offer]['search_advanced'] == 'true'
        session["last_search_advanced"] = true
        session["last_search_basic"] = false
      else
        session["last_search_advanced"] = false
        session["last_search_basic"] = true
      end
    end

    if (params[:offer]['search_advanced']=='true')
      unless params[:select].blank?
        session[:select]=params[:select]
      end

      @offers  = Offer.new.admin_user_favourites_search_advanced(favourites_list_condition,session[:select], page, per_page, sort_by,session["user_favourites_user_id"],offer_status)

      respond_to do |format|
        format.js { render "admin/users/user_favourites/search_data"}
      end
    else
      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      @offers = Offer.new.admin_user_favourites_search_basic(favourites_list_condition,search_item, page, per_page, sort_by,session["user_favourites_user_id"], offer_status)

      respond_to do |format|
        format.js {render "admin/users/user_favourites/search_data"}
      end
      return
    end

  end

  
  def edit_message_by_admin
   
   @message = Message.find(params[:message_id].to_i)    
    if params[:save] == "true"          
      @message.update_attribute :message_title, params[:title]
      @message.update_attribute :message_text, params[:text]
      @message.update_attribute :edit_admin, true
      respond_to do |format|
        format.js {render "admin/users/user_messages/deleted_message"}
      format.js  
      end 
    else         
      logger.debug(@message.id)
      respond_to do |format|
        format.js {render "admin/users/user_messages/edit_message"}
        format.html
      end
    end
  end



  def user_messages

    @user = User.find(params[:id])
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_show  = params[:offer_show]   || ""

    session[:admin_user_messages_search_basic] = ""
    session[:admin_user_messages_search_advanced] = ""
    @offer_sell_art_area_messages = []
    @offer_sell = Offer.where("seller_id = ?", @user.id)
    @offer_sell.each do |offer|
      unless offer.messages.blank?
        @offer_sell_art_area_messages.push(offer)
      end
    end


    @message_array = []
    unless @offer_sell_art_area_messages.blank?
      @offer_sell_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end

    @offer_with_messages = Offer.where("seller_id = #{@user.id}").collect{ |offer| offer if offer.messages.exists? }.delete_if{|temp| temp == nil}

    respond_to do |format|
      format.html
      format.js{ render "/admin/users/user_messages/user_messages"}
    end 
  end

  def sell_art_area_traversal_tree message, index
    if message.class == Message
      temp_message = Message.new
      temp_message.intialize_parent_count
      temp_message.nested_messages_count message
      @message_array[index] << {:message=>message,:count=>temp_message.get_count}
      if message.sub_messages.blank?
        return 
      elsif message.sub_messages.count == 1
        sell_art_area_traversal_tree message.sub_messages.first, index
      elsif message.sub_messages.count > 1
        message.sub_messages.each do |a|
          sell_art_area_traversal_tree a, index
        end
      end
    end
  end

  def user_wishlists

    @user           = User.find(params[:id])
    @user_wishlists = Wishlist.where("user_id = ?", @user.id).order(:created_at)
    unless @user_wishlists.blank?
      @user_wishlist_last_updated = Wishlist.where("user_id = ?", @user.id).order("updated_at desc").limit(1).first.id
    end
    @user_wishlists_count = @user_wishlists.count
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    @offers = []
    @new_offers = []
    temp_new_offers_in_wishlist = []
    @index_from_update = false
    @user_wishlists.each_with_index do |wishlist, index|
      logger.debug "wishlist: " + wishlist.inspect
      if wishlist.offer_list.blank?
        if wishlist.search_advanced == false
          temp_new_offers_in_wishlist = Offer.new.wishlist_basic_search_results wishlist.wishlist_search_params,1,99999999,""
        elsif wishlist.search_advanced == true
          temp_new_offers_in_wishlist = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
        end
        unless temp_new_offers_in_wishlist.blank?
          temp_new_offers_in_wishlist = temp_new_offers_in_wishlist.map { |e| e.id }
        end
        @new_offers[index] = Wishlist.new.wishlist_new_offers wishlist
        if @new_offers[index] == 0
          if wishlist.offer_list.length == 0
            @offers[index] = []
          elsif wishlist.offer_list.length == 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join('')})").paginate :per_page => per_page, :page=>page
          elsif wishlist.offer_list.length > 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join(',')})").paginate :per_page => per_page, :page=>page
          end
        elsif @new_offers[index] == 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join('')})").paginate :per_page => per_page, :page=>page
        elsif @new_offers[index] > 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join(',')})").paginate :per_page => per_page, :page=>page
        end
      else
        if wishlist.search_advanced == false
          temp_new_offers_in_wishlist = Offer.new.wishlist_basic_search_results wishlist.wishlist_search_params,1,99999999,""
        elsif wishlist.search_advanced == true
          temp_new_offers_in_wishlist = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
        end
        unless temp_new_offers_in_wishlist.blank?
              temp_new_offers_in_wishlist = temp_new_offers_in_wishlist.map { |e| e.id }
        end
        @new_offers[index] = Wishlist.new.wishlist_new_offers wishlist
        if @new_offers[index] == 0
          if wishlist.offer_list.length == 0
            @offers[index] = []
          elsif wishlist.offer_list.length == 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join('')})").paginate :per_page => per_page, :page=>page
          elsif wishlist.offer_list.length > 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join(',')})").paginate :per_page => per_page, :page=>page
          end
        elsif @new_offers[index] == 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join('')})").paginate :per_page => per_page, :page=>page
        elsif @new_offers[index] > 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join(',')})").paginate :per_page => per_page, :page=>page
        end
      end
    end
  end


  def admin_add_new_wishlist
    @user = User.find(params[:user_id])
    @wishlist = Wishlist.create(:user_id=>@user.id, :search_advanced=>false)
    respond_to do |format|
      format.js { render "admin/users/user_wishlists/add_new_wishlist" }
    end
    
  end

  def pagination
    @current_wishlist      = Wishlist.find(params["wishlist_id"])
    wishlist_search_params = @current_wishlist.wishlist_search_params
    search_type            = @current_wishlist.search_advanced
    per_page               = params[:per_page]
    page                   = params[:page]
    sort_by                = params[:sort_by]
    @wishlist_id_on_page   = params[:wishlist_id_on_page]

    if search_type == false
      @offers = Offer.new.wishlist_basic_search_results wishlist_search_params, page, per_page, sort_by
    else
      @offers = Offer.new.advanced_search_results wishlist_search_params, page, per_page, sort_by
    end
    
    respond_to do |format|
      format.js { render "admin/users/user_wishlists/pagination_data"}
    end
  end



  def update_wishlist
    @wishlist = Wishlist.find(params[:wishlist][:wishlist_id])
    if params[:wishlist]["search_advanced"] == "true"
      @wishlist.update_attributes(
        :search_advanced        =>true,
        :wishlist_name          =>params[:wishlist]["wishlist_name"],
        :wishlist_search_params =>params[:search_params],
        :email_notification     =>params[:wishlist]["email_notification"]
      )
    else
      @wishlist.update_attributes(

        :wishlist_name           =>params[:wishlist][:wishlist_name],
        :wishlist_search_params  =>params[:wishlist][:wishlist_search_params] || "",
        :search_advanced         =>false,
        :email_notification      =>params[:wishlist]["email_notification"]
      )
    end
    @index_from_update = true
    @index = params[:wishlist][:index_on_page]
    if @wishlist.search_advanced == false
      @temp_offers = Offer.new.wishlist_basic_search_results params[:wishlist][:wishlist_search_params], 1, 99999999, ""
    else
      @temp_offers = Offer.new.advanced_search_results params[:search_params], 1, 99999999, ""
    end
    @wishlist.update_attribute :offer_list, @temp_offers.map { |e| e.id }
    redirect_to :back
  end



  def delete_wish
     render :text=> "true" if true#Wishlist.find(params["wishlist_id"]).destroy()
  end


  def delete_offer
    render :text=> "true" if true#Offer.destroy(params["id"])    
  end

  def delete_favourite
    #Favourite.find_by_offer_id(params["offer_id"]).delete
    render :text => "true"
  end


  def create_message
    render :text => "true"
    offer_id = Message.find(params["parent_message_id"]).offer_id
    @message = Message.create(
      :user_id      =>params["user_id"],
      :is_parent    =>params["is_parent"],
      :message_text =>params["message_text"],
      :offer_id     =>offer_id,
      :message_title=>params["message_title"],
      :child_of     =>params["parent_message_id"]
    )
    @parent_message_id = "message_" + params['parent_message_id']
    temp_message = Message.new
    temp_message.intialize_parent_count
    temp_message.nested_messages_count(Message.find(@message))
    @parent_counts = temp_message.get_count * 10
    temp_message.nested_messages(Message.find(@message))
    @parent_messages_array = temp_message.get_parent_message_array.map{|temp| temp.id}
    if @parent_counts > 40
      @parent_counts = 40
    end
  end


  def delete_message
    #Message.destroy(params[:id])
    @message = Message.find(params[:id])
    @message.update_attribute :message_text , ""
    @message.update_attribute :delete_admin, true
    respond_to do |format|
      format.js { render "/admin/users/user_messages/deleted_message"}
    end
  end

  def sell_art_area_messages_sorting option_value
    

    if option_value == "All offers" 
      " "
    elsif option_value == "Active offers"
      "offers.offer_status = true"
    elsif option_value == "Inactive offers"
      "offers.offer_status = false"
    elsif option_value == "Artist Name"
      "artists.artist_name"
    elsif option_value == "offer end date"
      "offers.offer_end_date"
    elsif option_value == "new messages"
      "messages.created_at desc, messages.message_read != true desc"
    end
    
  end




  def user_messages_search
   per_page = params[:per_page] || 2
   page     = params[:page] || 1
    

    @user=User.find(params[:offer][:user_id])
    seller_id = @user.id
        
    

    @offer_sell_art_area_messages = []   

    if (params[:offer]['search_advanced']=='true')
      
      search_params = params[:select]
      session[:admin_user_messages_search_basic] = ""
      session[:admin_user_messages_search_advanced] = params[:select]
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id").where(search_advanced_user_messages(search_params)).where("seller_id = ?", @user.id).where(sell_art_area_messages_sorting(params[:offer_status])).order(sell_art_area_messages_sorting(params[:sort_by]))     
      logger.debug("one")
    elsif !(params[:offer]['search_item'].blank?)     
      search_item = params[:offer]['search_item']
      session[:admin_user_messages_search_advanced] = ""
      session[:admin_user_messages_search_basic] = params[:offer]['search_item']
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id").where("seller_id = ?", @user.id).where("artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? OR
      users.user_first_name ilike ? OR
      users.user_last_name ilike ? OR
      messages.message_text ilike ? OR
      messages.message_title ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%").where(sell_art_area_messages_sorting(params[:offer_status])).order(sell_art_area_messages_sorting(params[:sort_by]))     
      logger.debug("two")
    elsif session[:admin_user_messages_search_advanced] != ""
      search_params = session[:admin_user_messages_search_advanced]
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id").where(search_advanced_user_messages(search_params)).where("seller_id = ?", @user.id).where(sell_art_area_messages_sorting(params[:offer_status])).order(sell_art_area_messages_sorting(params[:sort_by]))       
      logger.debug("three")
    elsif session[:admin_user_messages_search_basic] != ""
      search_item = session[:admin_user_messages_search_basic]
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id").where("seller_id = ?", @user.id).where("artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? OR
      users.user_first_name ilike ? OR
      users.user_last_name ilike ? OR
      messages.message_text ilike ? OR
      messages.message_title ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%").where(sell_art_area_messages_sorting(params[:offer_status])).order(sell_art_area_messages_sorting(params[:sort_by]))          
      logger.debug("four")
    else
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN users ON users.id = messages.user_id JOIN artists on artists.id = artworks.artist_id").where("seller_id = ?", @user.id).where(sell_art_area_messages_sorting(params[:offer_status])).order(sell_art_area_messages_sorting(params[:sort_by]))  
      logger.debug("five")
    end   
   
      @offer_sell.uniq!      
     
    @offer_sell.each do |offer|
      unless offer.messages.blank?
        @offer_sell_art_area_messages.push(offer)        
      end
    end
    #@offer_sell_art_area_messages = @offer_sell_art_area_messages.paginate :per_page => per_page, :page=>page
    @message_array = []
    unless @offer_sell_art_area_messages.blank?
      @offer_sell_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end
    
    respond_to do |format|
      format.js{ render "/admin/users/user_messages/user_messages"}
    end 
  end


  

  def search_advanced_user_messages temp_params
   
    
    if !temp_params.blank?
      my = ""
      unless temp_params[:artist].blank?
        if temp_params[:artist][:search_type] == "contains"
         search_artist  = "artists.artist_name ilike '%#{temp_params[:artist][:value]}%'"
        elsif temp_params[:artist][:search_type] == "is exactly"
          search_artist = "artists.artist_name = '#{temp_params[:artist][:value]}'"
        elsif temp_params[:artist][:search_type] == "is not"
          search_artist = "artists.artist_name != '#{temp_params[:artist][:value]}'"
        end
        my = "#{search_artist}"
      else
        search_artist = ""
      end
      unless temp_params[:sender].blank?
        if temp_params[:sender]
          search_sender = "users.user_first_name ilike '%#{temp_params[:sender][:value]}%' "
        elsif temp_params[:sender][:search_type] == "is exactly"
          search_sender = "CONCAT(users.user_first_name, ' ', users.user_last_name) = '#{temp_params[:sender][:value]}'"
        elsif temp_params[:sender][:search_type] == "is not"
          search_sender = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:sender][:value]}'"
        end        
        if my != ""
          my = "#{my} AND #{search_sender}"
        else
          my = "#{search_sender}"
        end
      else
        search_sender = ""
      end

       unless temp_params[:description].blank?
        if temp_params[:description][:search_type] == "contains"
          search_description = "messages.message_text ilike '%#{temp_params[:description][:value]}%'"
        elsif temp_params[:description][:search_type] == "is exactly"
          search_description = "messages.message_text = '#{temp_params[:description][:value]}'"
        elsif temp_params[:description][:search_type] == "is not"
          search_description = "messages.message_text != '#{temp_params[:description][:value]}'"
        end
        my = "#{my} AND #{search_description}"
      else
        search_description = ""
      end

       if !temp_params[:country].blank?
        if temp_params[:country]['name'].blank?
          search_country = ""
        else
          search_country = "artworks.artwork_country =  '#{temp_params[:country][:name]}'"
        end
        if my != ""
          my = "#{my} AND #{search_country}"
        else
          my = "#{search_country}"
        end
      else
        search_country = ""
      end


      
      if search_artist.nil? && search_sender.nil? && search_description.nil? && search_country.nil? 
        ""
      else
        "#{my}"
      end

    else
      ""
    end
  end

  def forum_list
    @user = User.find(params[:id])
    per_page = params[:per_page] || 6
    page     = params[:page]     || 1
    sort_by  = params[:sort_by]  || ""
  
    #session[:search_string] = session[:search_string] || ""
    session[:search] = ""
    session[:select] = ""
    session[:forum_user_id] = @user.id
    @forum_messages = ForumMessage.joins("LEFT OUTER JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users ON users.id = forum_messages.user_id LEFT OUTER JOIN artists on artists.id = artworks.artist_id").where("forum_messages.user_id = #{params[:id]} OR forum_messages.child_of = #{params[:id]}").where("forum_messages.is_deleted IS NOT true").order(order_messages(sort_by)).paginate :page => page, :per_page => per_page
    
    
    
    #logger.debug(@forum_messages)

    respond_to do |format|
      
      format.js { render "admin/users/forum_data" }
      format.html
    end
  end

  def forum_list_search
    @user = User.find(params[:id])
    per_page = params[:per_page] || 6
    page     = params[:page]     || 1
    sort_by  = params[:sort_by]  || ""
  
    #session[:search] = ""
    #session[:select] = ""
    if params[:search_advanced] == "true"
      session["last_search_advanced"] = true
      session["last_search_basic"] = false

      unless params[:select].blank?
        session[:select]=params[:select]
      end
      
      @forum_messages = search_advanced(session[:select], per_page, page, sort_by, @user.id)
    else
      session["last_search_basic"] = true
      session["last_search_advanced"] = false

      
      search = (session[:search] || "") if request.get?
      search = (session[:search] = params[:forum_message][:search_string] || "") if request.post?

      @forum_messages = search_basic(session[:search], per_page, page, sort_by, @user.id)
      
    end
    respond_to do |format|
      
      format.js { render "admin/users/forum_data" }
      format.html
    end
    return
  end

  def order_messages temp_params
    logger.debug 'sort'
    case temp_params
    when "date"
      "forum_messages.created_at desc"
    when "artist"
      "artists.artist_name, forum_messages.created_at"
    when "author"
      "CONCAT(users.user_first_name, users.user_last_name)"
    else
      "forum_messages.created_at desc"
    end 
  end

  def search_basic (temp_params, per_page, page, sort_by, user_id)
    ForumMessage.joins("LEFT OUTER JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users on users.id = forum_messages.user_id LEFT OUTER JOIN artists on artists.id = artworks.artist_id").where("forum_messages.user_id = user_id OR forum_messages.child_of = user_id").where("forum_messages.is_deleted IS NOT true")
    .where("forum_messages.forum_message_title ilike '%#{temp_params}%'
    OR forum_messages.forum_message_text ilike '%#{temp_params}%'
    OR users.user_first_name ilike '#{temp_params}'
    OR users.user_last_name ilike '#{temp_params}'").order(order_messages(sort_by)).paginate :per_page=>per_page, :page=>page
  end

  def search_advanced (temp_params, per_page, page, sort_by, user_id)
    #sort_by  = params[:sort_by]  || ""
    if temp_params.blank?
      ForumMessage.joins("LEFT OUTER JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users on users.id = forum_messages.user_id LEFT OUTER JOIN artists on artists.id = artworks.artist_id" ).where("forum_messages.user_id = user_id OR forum_messages.child_of = user_id").where("forum_messages.is_deleted IS NOT true").order(order_messages(sort_by)).paginate :per_page=>per_page, :page=>page
    else
      unless temp_params[:concern].blank?
        if temp_params[:concern][:search_type] == "contains"
          search_concern = "forum_messages.forum_message_title ilike '%#{temp_params[:concern][:value]}%'"
        elsif temp_params[:concern][:search_type] == "is exactly"
          search_concern = "forum_messages.forum_message_title = '#{temp_params[:concern][:value]}'"
        elsif temp_params[:concern][:search_type] == "is not"
          search_concern = "forum_messages.forum_message_title != '#{temp_params[:concern][:value]}'"
        end
      else
        search_concern = ""
      end
      unless temp_params[:date_of_post].blank?
        forum_date_of_post = Date.strptime(session[:select][:date_of_post]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime

        if temp_params[:date_of_post][:search_type] == "is before"
          search_date_of_post = "forum_messages.created_at < '#{forum_date_of_post}'"
        elsif temp_params[:date_of_post][:search_type] == "is after"
          search_date_of_post = "forum_messages.created_at > '#{forum_date_of_post}'"
        elsif temp_params[:date_of_post][:search_type] == "is exactly"
          search_date_of_post = "forum_messages.created_at = '#{forum_date_of_post}'"
        end
      else
        search_date_of_post = ""
      end

      unless temp_params[:offer_id].blank?
        if temp_params[:offer_id][:value].to_i.to_s == temp_params[:offer_id][:value]
          if temp_params[:offer_id][:search_type] == "is"
            search_offer_id = "forum_messages.offer_id = '#{temp_params[:offer_id][:value]}' "
          elsif temp_params[:offer_id][:search_type] == "is not"
            search_offer_id = "forum_messages.offer_id != '#{temp_params[:offer_id][:value]}'"
          end
        else
          search_offer_id = "forum_messages.offer_id = 0"
        end
      else
        search_offer_id = ""
      end

      unless temp_params[:artist_name].blank?
        if temp_params[:artist_name][:search_type] == "contains"
          search_artist_name = "artists.artist_name ilike '%#{temp_params[:artist_name][:value]}%'"
        elsif temp_params[:artist_name][:search_type] == "is exactly"
          search_artist_name = "artists.artist_name = '#{temp_params[:artist_name][:value]}'"
        elsif temp_params[:artist_name][:search_type] == "is not"
          search_artist_name = "artists.artist_name != '#{temp_params[:artist_name][:value]}'"
        end
      else
        search_artist_name = ""
      end

      unless temp_params[:title].blank?
        if temp_params[:title][:search_type] == "contains"
          search_title = "forum_messages.forum_message_title ilike '%#{temp_params[:title][:value]}%'"
        elsif temp_params[:title][:search_type] == "is exactly"
          search_title = "forum_messages.forum_message_title = '#{temp_params[:title][:value]}'"
        elsif temp_params[:title][:search_type] == "is not"
          search_title = "forum_messages.forum_message_title != '#{temp_params[:title][:value]}'"
        end
      else
        search_title = ""
      end

      unless temp_params[:description].blank?
        if temp_params[:description][:search_type] == "contains"
          search_description = "forum_messages.forum_message_text ilike '%#{temp_params[:description][:value]}%'"
        elsif temp_params[:description][:search_type] == "is exactly"
          search_description = "forum_messages.forum_message_text = '#{temp_params[:description][:value]}'"
        elsif temp_params[:description][:search_type] == "is not"
          search_description = "forum_messages.forum_message_text != '#{temp_params[:description][:value]}'"
        end
      else
        search_description = ""
      end

      unless temp_params[:author].blank?
        if temp_params[:author][:search_type] == "contains"
          search_author = "users.user_first_name ilike '%#{temp_params[:author][:value]}%' OR users.user_last_name ilike '%#{temp_params[:author][:value]}%' "
        elsif temp_params[:author][:search_type] == "is exactly"
          search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) = '#{temp_params[:author][:value]}'"
        elsif temp_params[:author][:search_type] == "is not"
          search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:author][:value]}'"
        end
      else
        search_author = ""
      end
      if search_concern.nil? && search_date_of_post.nil? && search_offer_id.nil? && search_artist_name.nil? && search_title.nil? && search_description.nil? && search_author.nil?
        ""
      else
        #{}"#{search_concern} AND #{search_date_of_post} AND #{search_offer_id} AND #{search_artist_name} AND #{search_title} AND #{search_description} AND #{search_author}".gsub /AND  AND/, ""
        @forum_messages = ForumMessage.joins("LEFT OUTER JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users ON users.id = forum_messages.user_id LEFT OUTER JOIN artists on artists.id = artworks.artist_id").where("forum_messages.user_id =#{ user_id} OR forum_messages.child_of = #{user_id}").where("forum_messages.is_deleted IS NOT true").where(search_concern).where(search_date_of_post).where(search_artist_name).where(search_title).where(search_offer_id).where(search_description).where(search_author).order(order_messages(sort_by)).paginate :per_page=>per_page, :page=>page    
      end
    end
  end


  def users_offer_show
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_show  = params[:offer_show]   || ""

    session[:search_string] = session[:search_string] || ""
    session[:search_item]=""
    @user = User.find(params[:user_id])
    @offer = Offer.find(params[:id])
    @offers = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, offer_show)
    if @offer.seller_id != @user.id
      redirect_to "/admin/users/users_offer_show/#{params[:id]}"
    end
    
  end
  

  def user_offers_search_page
    
    if !params[:offer_new].blank?
      #@user  = User.find(session["user_offers_user_id"])
      @user = User.find(params[:offer_new][:user_id])
      logger.debug('begin')
    else
      @user  = User.find(params[:user_id])
    end
    #if !params[:offer_new].blank?
    #  @user = User.find(session["user_offers_user_id"])
    #  logger.debug('begin')
    #else
    #  @user = User.find(params[:user_id])
    #end
    logger.debug(@user.id)
    logger.debug('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    per_page     = params[:per_page] || 18
    page         = params[:page]     || 1
    sort_by      = params[:sort_by]  || ""
    offer_status = params[:status] || "show all offers"
    if !params[:offer_new].blank? and params[:offer_new]['search_advanced']=='true'
      session["last_search_advanced"] = true
      session["last_search_basic"] = false

      unless params[:select].blank?
        session[:select]=params[:select]
      end
      @offers = Offer.new.admin_user_offers_search_advanced(session[:select], page, per_page, sort_by, @user.id, offer_status)


    else

      session["last_search_basic"] = true
      session["last_search_advanced"] = false

      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer_new][:search_item] || "") if request.post?
      #logger.debug(search_item)
      #logger.debug(@user.id)
      @offers     = Offer.new.admin_user_offers_search_basic(search_item, page, per_page, sort_by,@user.id, offer_status)
    end

    respond_to do |format|
      format.js {render "admin/users/users_offer_show/user_offers_data_page"}
    end
    return
  end
end