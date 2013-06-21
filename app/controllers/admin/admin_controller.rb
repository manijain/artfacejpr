class Admin::AdminController < ApplicationController
  before_filter :authenticate_admin_user!


  def solved_report
    message_report = MessageAdmin.find_by_id(params[:report_id].to_i)
    message_report.is_solved = "TRUE"
    message_report.save
    render :text => "true"
  end

  def unsolved_report
    message_report = MessageAdmin.find_by_id(params[:report_id].to_i)
    message_report.is_solved = "FALSE"
    message_report.save
    render :text => "true"
  end

  def delete_report
    MessageAdmin.find_by_id(params[:report_id].to_i).delete
    render :text => "true"
  end

  def abuse_report_reply
    @message_id = params[:message_admin][:message_id].to_i
    @user = User.find_by_id(params[:message_admin][:user_id].to_i)
    offer = Offer.find_by_id(params[:message_admin][:offer_id].to_i)
    title = params[:message_admin][:title]
    reply_message = params[:message_admin][:reply_message]

    message_admin = MessageAdmin.find_by_id(@message_id)
    message_admin.reply_title      = title
    message_admin.reply_message    = reply_message
    message_admin.reply_created_at = Time.now
    message_admin.is_mailed        = false
    message_admin.save

    MessageAdminMailer.abuse_report_reply(@user, title, @message_id, reply_message).deliver

    message_admin = MessageAdmin.find_by_id(@message_id).update_attribute(:is_mailed, true)
    message_admin = MessageAdmin.find_by_id(@message_id).update_attribute(:reply_mailed_at, Time.now)

    respond_to do |format|
      format.js { render "admin/admin/abuse_report_reply"}
    end
    

  end

  def send_email_reminder
    @amount_due = params[:amount_due].to_i
    @user = User.find_by_id(params[:user_id].to_i)
    logger.debug(@user.email)
    SubscriptionMailer.amount_due(@user, @amount).deliver

    render :text => "true"
  end


  def index

    if(params[:choice]=="4")
      #logger.debug("choice 444444")
      @user_payment = User.order("user_first_name").paginate :page =>params[:page] || 1, :per_page =>params[:per_page]|| 6
      
      respond_to do |format|
        format.js { render "admin/admin/payments/data"}
      end

    elsif (params[:choice]=="3")
      #logger.debug("choice 333333")
      @abuse_report = MessageAdmin.joins("JOIN users ON message_admins.user_id = users.id JOIN offers ON message_admins.offer_id = offers.id JOIN artworks ON artworks.offer_id = offers.id JOIN artists ON artworks.artist_id = artists.id").order("user_first_name").paginate :page =>params[:page] || 1, :per_page =>params[:report_per_page] || 6

      respond_to do |format|
        format.js { render "admin/admin/abuse_reports/data"}
      end
    else
      #logger.debug("else part no 333333 44444444")
    	@user_payment = User.order("user_first_name").paginate :page =>1, :per_page =>6
      @abuse_report = MessageAdmin.joins("JOIN users ON message_admins.user_id = users.id JOIN offers ON message_admins.offer_id = offers.id JOIN artworks ON artworks.offer_id = offers.id JOIN artists ON artworks.artist_id = artists.id").order("user_first_name").paginate :page =>1, :per_page =>6
      @pricing = SubscriptionPlan.order(:id)

      @abuse_report.each do |variable|
        logger.debug(variable.id)
      end

      respond_to do |format|
        format.html
      end


    end
  end

  def payment_search
    if(params[:payment_basic_search]=="false" && params[:payment_advanced_search]=="false")
      # index sort_by and pagination part

      case params[:sort_by].to_i
      when 1
        @user_payment = User.order("user_first_name")
      when 2
        @user_payment = User.order("user_last_name")
      when 3
        @user_payment = User.joins("JOIN subscriptions on users.id=subscriptions.user_id JOIN subscription_plans on subscriptions.subscription_plan_id=subscription_plans.id JOIN payments on payments.user_id=users.id").order("payments.transaction_amount-payments.paid_amount")
      when 4
        @user_payment = User.joins("JOIN subscriptions on users.id=subscriptions.user_id").order("subscriptions.subscription_start_date")
      when 5
        @user_payment = User.joins("JOIN subscriptions on users.id=subscriptions.user_id JOIN subscription_plans on subscriptions.subscription_plan_id=subscription_plans.id").order("subscription_plans.subscription_name")
      end

      @user_payment = @user_payment.paginate :per_page=> params[:per_page].to_i|| 6, :page=>params[:page] || 1
     
      @user_payment.each do |asdf|
        logger.debug(asdf.id)  
      end

      respond_to do |format|
        format.js { render "admin/admin/payments/data"}
      end
      return



    else
      
      logger.debug("in search part")

      if(params[:user][:search_basic]=="true" || params[:payment_basic_search]=="true")
        logger.debug("basic_search")
        logger.debug(params[:user][:search_term])
        logger.debug("2222222222")

        if(!params[:user][:search_term].nil?)
          session[:search_term] = params[:user][:search_term].to_s
        end

        search_item = session[:search_term]

        # basic search some part left

        @user_payment = User.joins("JOIN subscriptions on users.id=subscriptions.user_id JOIN subscription_plans on subscriptions.subscription_plan_id=subscription_plans.id JOIN payments on payments.user_id=users.id ")
        .where("CONCAT(users.user_first_name, ' ', users.user_last_name) ilike ? OR
          users.user_first_name ilike ? OR
          users.user_last_name ilike ? OR
          users.user_country ilike ? OR
          subscription_plans.subscription_name ilike ?", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")

        case params[:sort_by].to_i
        when 1
          @user_payment = @user_payment.order("user_first_name")
        when 2
          @user_payment = @user_payment.order("user_last_name")
        when 3
          @user_payment = @user_payment.order("payments.transaction_amount-payments.paid_amount")
        when 4
          @user_payment = @user_payment.order("subscriptions.subscription_start_date")
        when 5
          @user_payment = @user_payment.order("subscription_plans.subscription_name")
        else
          @user_payment = @user_payment.order("user_first_name")
        end        

        @user_payment = @user_payment.paginate :per_page=>params[:per_page] || 6, :page=>params[:page] || 1

        @user_payment.each do |asdf|
          logger.debug(asdf.id)  
        end
      
        respond_to do |format|
          format.js { render "admin/admin/payments/data"}
        end
        return



      elsif (params[:user][:search_advanced]=="true" || params[:payment_advanced_search]=="true")
     

        unless params[:select].blank?
          session[:select] = params[:select]
        end

        if !session[:select][:username].blank?
          if session[:select][:username]["search_type"].blank?
            user_name = ""
          else
            if session[:select][:username]["search_type"]=="contains"
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name) ilike '%#{session[:select][:username][:value]}%'"
            elsif session[:select][:username]["search_type"]=="is exactly"       
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name)  = '#{session[:select][:username][:value]}'"
            elsif session[:select][:username]["search_type"]=="is not"        
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{session[:select][:username][:value]}'"
            end
          end
        else
          user_name = ""
        end


        if !session[:select][:payment].blank?
          if session[:select][:payment]["search_type"].blank?
            payment = ""
          else
            if session[:select][:payment]["search_type"]=="is"       
              payment = "payments.payment_conflict_reason = '#{session[:select][:payment][:value]}'"
            elsif session[:select][:payment]["search_type"]=="is not"        
               payment = "payments.payment_conflict_reason != '#{session[:select][:payment][:value]}'"
            end
          end
        else
          payment = ""
        end


        if !session[:select][:country].blank?
          if session[:select][:country]["search_type"].blank?
            country = ""
          else
            if session[:select][:country]["search_type"]=="is"       
              country = "users.user_country = '#{session[:select][:country][:name]}'"
            elsif session[:select][:country]["search_type"]=="is not"        
               country = "users.user_country != '#{session[:select][:country][:name]}'"
            end
          end
        else
          country = ""
        end

        # Time span start date advanced search left

        # Time span end date advanced search left


        @user_payment = User.joins("JOIN subscriptions on users.id=subscriptions.user_id JOIN subscription_plans on subscriptions.subscription_plan_id=subscription_plans.id JOIN payments on payments.user_id=users.id ")
        .where(user_name).where(payment).where(country)



        case params[:sort_by].to_i
        when 1
          @user_payment = @user_payment.order("user_first_name")
        when 2
          @user_payment = @user_payment.order("user_last_name")
        when 3
          @user_payment = @user_payment..order("payments.transaction_amount-payments.paid_amount")
        when 4
          @user_payment = @user_payment.order("subscriptions.subscription_start_date")
        when 5
          @user_payment = @user_payment.order("subscription_plans.subscription_name")
        else
          @user_payment = @user_payment.order("user_first_name")
        end        

        @user_payment = @user_payment.paginate :per_page=>params[:per_page] || 6, :page=>params[:page] || 1

        @user_payment.each do |asdf|
          logger.debug(asdf.id)  
        end


       
        
        respond_to do |format|
          format.js { render "admin/admin/payments/data"}
        end
        return

      end

    end
  end

  def abuse_reports
  	#logger.debug(params[:message_admin])

    if(params[:report_basic_search]=="false" && params[:report_advanced_search]=="false")
      
      # index sort_by and per_page part
      @abuse_report = MessageAdmin.joins("JOIN users ON message_admins.user_id = users.id JOIN offers ON message_admins.offer_id = offers.id JOIN artworks ON artworks.offer_id = offers.id JOIN artists ON artworks.artist_id = artists.id")
      case params[:report_sort_by].to_i
      when 1
        #@abuse_report = MessageAdmin.joins("JOIN offers ON offers.id = message_admins.offer_id JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc")
        @abuse_report = @abuse_report.order("user_first_name")
      when 2
        @abuse_report = @abuse_report.order("user_last_name")
      when 3
        @abuse_report = @abuse_report.order("created_at")
      when 4
        @abuse_report = @abuse_report.order("is_solved desc")
      when 5
        @abuse_report = @abuse_report.order("is_solved asc")
      end

      @abuse_report = @abuse_report.paginate :per_page=> params[:report_per_page].to_i|| 6, :page=>params[:page] || 1
     
      @abuse_report.each do |asdf|
        logger.debug(asdf.id)  
      end

      respond_to do |format|
        format.js { render "admin/admin/abuse_reports/data"}
      end
      return
    
    else
      logger.debug("in search part")

      if(params[:message_admin][:search_basic]=="true" || params[:report_basic_search]=="true")
        logger.debug("in basic search")

        if(!params[:message_admin][:search_term].nil?)
          session[:report_search_term] = params[:message_admin][:search_term].to_s
        end

        report_search_item = session[:report_search_term]

        @abuse_report = MessageAdmin.joins("JOIN users ON message_admins.user_id = users.id JOIN offers ON message_admins.offer_id = offers.id JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id")
        .where("CONCAT(user_first_name, ' ', user_last_name) ilike ? OR
          user_first_name ilike ? OR
          user_last_name ilike ? OR
          artist_name ilike ? OR
          message_text ilike ?", "%#{report_search_item}%", "%#{report_search_item}%", "%#{report_search_item}%", "%#{report_search_item}%", "%#{report_search_item}%")

        case params[:report_sort_by].to_i
        when 1
          @abuse_report = @abuse_report.order("users.user_first_name")
        when 2
          @abuse_report = @abuse_report.order("users.user_last_name")
        when 3
          @abuse_report = @abuse_report.order("message_admins.created_at")
        when 4
          @abuse_report = @abuse_report.order("message_admins.is_solved desc")
        when 5
          @abuse_report = @abuse_report.order("message_admins.is_solved asc")
        else
          @abuse_report = @abuse_report.order("users.user_first_name")
        end        

        @abuse_report = @abuse_report.paginate :per_page=>params[:report_per_page] || 6, :page=>params[:page] || 1

        respond_to do |format|
          format.js { render "admin/admin/abuse_reports/data"}
        end
        return

      elsif (params[:message_admin][:search_advanced]=="true" || params[:report_advanced_search]=="true")
        
        logger.debug("in advanced search")        

        unless params[:select].blank?
          session[:report_select] = params[:select]
        end

        if !session[:report_select][:username].blank?
          if session[:report_select][:username]["search_type"].blank?
            user_name = ""
          else
            if session[:report_select][:username]["search_type"]=="contains"
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name) ilike '%#{session[:report_select][:username][:value]}%'"
            elsif session[:report_select][:username]["search_type"]=="is exactly"       
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name)  = '#{session[:report_select][:username][:value]}'"
            elsif session[:report_select][:username]["search_type"]=="is not"        
              user_name = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{session[:report_select][:username][:value]}'"
            end
          end
        else
          user_name = ""
        end


        if !session[:report_select][:artistname].blank?
          if session[:report_select][:artistname]["search_type"].blank?
            artist_name = ""
          else
            if session[:report_select][:artistname]["search_type"]=="contains"
              artist_name = "artists.artist_name ilike ?","%#{session[:report_select][:artistname]['value']}%"
            elsif session[:report_select][:artistname]["search_type"]=="is exactly"       
              artist_name = "artists.artist_name=?",session[:report_select][:artistname]['value']
            elsif session[:report_select][:artistname]["search_type"]=="is not"        
              artist_name = "artists.artist_name!=?",session[:report_select][:artistname]['value']
            end
          end
        else
          artist_name = ""
        end


        if !session[:report_select][:description].blank?
          if session[:report_select][:description]["search_type"].blank?
            description = ""
          else
            if session[:report_select][:description]["search_type"]=="contains"
              description = "message_admins.message_text ilike ?","%#{session[:report_select][:description]['value']}%"
            elsif session[:report_select][:description]["search_type"]=="is exactly"       
              description = "message_admins.message_text=?",session[:report_select][:description]['value']
            elsif session[:report_select][:description]["search_type"]=="is not"        
              description = "message_admins.message_text!=?",session[:report_select][:description]['value']
            end
          end
        else
          description = ""
        end

        # Time span starts advanced search left

        # Time span ends advanced search left

        if !session[:report_select][:issue_is].blank?
          if session[:report_select][:issue_is]["search_type"].blank?
            issue = ""
          else
            if session[:report_select][:issue_is]["search_type"]=="solved"
              issue = "message_admins.is_solved = TRUE"
            elsif session[:report_select][:issue_is]["search_type"]=="unsolved"       
              issue = "message_admins.is_solved = FALSE"
            end
          end
        else
          issue = ""
        end







         @abuse_report = MessageAdmin.joins("JOIN users ON message_admins.user_id = users.id JOIN offers ON message_admins.offer_id = offers.id JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id")
        .where(user_name).where(artist_name).where(description).where(issue)


        case params[:report_sort_by].to_i
        when 1
          @abuse_report = @abuse_report.order("users.user_first_name")
        when 2
          @abuse_report = @abuse_report.order("users.user_last_name")
        when 3
          @abuse_report = @abuse_report.order("message_admins.created_at")
        when 4
          @abuse_report = @abuse_report.order("message_admins.is_solved desc")
        when 5
          @abuse_report = @abuse_report.order("message_admins.is_solved asc")
        else
          @abuse_report = @abuse_report.order("users.user_first_name")
        end        

        @abuse_report = @abuse_report.paginate :per_page=>params[:report_per_page] || 6, :page=>params[:page] || 1

        respond_to do |format|
          format.js { render "admin/admin/abuse_reports/data"}
        end
        return

      end



    end

  end


  def update_plans

    sub_plan_basic = SubscriptionPlan.where(:subscription_name=>"BASIC").first
    sub_plan_plus = SubscriptionPlan.where(:subscription_name=>"PLUS").first
    sub_plan_pro = SubscriptionPlan.where(:subscription_name=>"PRO").first
    sub_plan_premium = SubscriptionPlan.where(:subscription_name=>"PREMIUM").first
    sub_plan_no_limit = SubscriptionPlan.where(:subscription_name=>"NO LIMIT").first

    plan_arr = Array.new

    if(sub_plan_basic.subscription_fee != params[:plan][:basic][:annual_fee].to_i || sub_plan_basic.subscription_paintings_allowed != params[:plan][:basic][:painting_allowed].to_i)
      plan_arr << 1
    end
    if(sub_plan_plus.subscription_fee != params[:plan][:plus][:annual_fee].to_i || sub_plan_plus.subscription_paintings_allowed != params[:plan][:plus][:painting_allowed].to_i)
      plan_arr << 2
    end
    if(sub_plan_pro.subscription_fee != params[:plan][:pro][:annual_fee].to_i || sub_plan_pro.subscription_paintings_allowed != params[:plan][:pro][:painting_allowed].to_i)
      plan_arr << 3
    end
    if(sub_plan_premium.subscription_fee != params[:plan][:premium][:annual_fee].to_i || sub_plan_premium.subscription_paintings_allowed != params[:plan][:premium][:painting_allowed].to_i)
      plan_arr << 4
    end
    if(sub_plan_no_limit.subscription_fee != params[:plan][:no_limit][:annual_fee].to_i || sub_plan_no_limit.subscription_paintings_allowed != params[:plan][:no_limit][:painting_allowed].to_i)
      plan_arr << 5
    end


    logger.debug(plan_arr)

    sub_plan_basic.subscription_fee = params[:plan][:basic][:annual_fee].to_i
    sub_plan_basic.subscription_paintings_allowed = params[:plan][:basic][:painting_allowed].to_i
    sub_plan_basic.subscription_offers_allowed = params[:plan][:basic][:offers_allowed]
    sub_plan_basic.wishlist_allowed = params[:plan][:basic][:wishlist_allowed]
    sub_plan_basic.save

    sub_plan_plus.subscription_fee = params[:plan][:plus][:annual_fee].to_i
    sub_plan_plus.subscription_paintings_allowed = params[:plan][:plus][:painting_allowed].to_i
    sub_plan_plus.subscription_offers_allowed = params[:plan][:plus][:offers_allowed]
    sub_plan_plus.wishlist_allowed = params[:plan][:plus][:wishlist_allowed]
    sub_plan_plus.save

    sub_plan_pro.subscription_fee = params[:plan][:pro][:annual_fee].to_i
    sub_plan_pro.subscription_paintings_allowed = params[:plan][:pro][:painting_allowed].to_i
    sub_plan_pro.subscription_offers_allowed = params[:plan][:pro][:offers_allowed]
    sub_plan_pro.wishlist_allowed = params[:plan][:pro][:wishlist_allowed]
    sub_plan_pro.save

    sub_plan_premium.subscription_fee = params[:plan][:premium][:annual_fee].to_i
    sub_plan_premium.subscription_paintings_allowed = params[:plan][:premium][:painting_allowed].to_i
    sub_plan_premium.subscription_offers_allowed = params[:plan][:premium][:offers_allowed]
    sub_plan_premium.wishlist_allowed = params[:plan][:premium][:wishlist_allowed]
    sub_plan_premium.save

    sub_plan_no_limit.subscription_fee = params[:plan][:no_limit][:annual_fee].to_i
    sub_plan_no_limit.subscription_paintings_allowed = params[:plan][:no_limit][:painting_allowed].to_i
    sub_plan_no_limit.subscription_offers_allowed = params[:plan][:no_limit][:offers_allowed]
    sub_plan_no_limit.wishlist_allowed = params[:plan][:no_limit][:wishlist_allowed]
    sub_plan_no_limit.save

  
    @affected_users = Hash.new
   
    plan_arr.each do |index|
      @affected_users[index] = User.select("users.email, subscriptions.subscription_plan_id").joins("JOIN subscriptions ON subscriptions.user_id = users.id").where("subscriptions.subscription_plan_id = #{index}")
    end

    #logger.debug(@affected_users)

    @affected_users.delete_if {|key, value| value == [] }

    #logger.debug(@affected_users)

    



    

    #@affected_users.each do |key, value|
    #  logger.debug(@affected_users[key].nil?)
    #  logger.debug(@affected_users[value].nil?)
    #  @affected_users[key].each do |asdfg|
        #logger.debug(asdfg.email)
    #  end
    #  logger.debug("222")
    #end
   
    SubscriptionMailer.subscription_plan_change(@affected_users)




    @pricing = SubscriptionPlan.order(:id)
    respond_to do |format|
      format.js
    end

  end



  def unknown_artist
  	@artists = Artist.where(:approved_status=>false)
  end
end
