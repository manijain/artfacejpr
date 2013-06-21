class SubscriptionController < ApplicationController

  include SubscriptionHelper
  
  def popup

  end

  def bank_transfer
    subscription_plan_id = SubscriptionPlan.find(:all, :conditions=>[ "lower(subscription_name) = ?", params[:subscription]["subscription_plan_id"].downcase]).first.id
    Subscription.create(
      :user_id                   =>params[:subscription][:user_id],
      :subscription_plan_id      =>subscription_plan_id,
      :subscription_start_date   => Date.today,
      :subscription_renewal_date => (Date.today + 1.year),
      :payment_type              => params[:payment_type],
      :auto_renewal              => params[:subscription_package_renewal]
    )
    @user = User.find(params[:subscription][:user_id])
    @document = Document.create(
      :user_id => params[:subscription][:user_id],
      :document_type => "invoice"
    )
    # Document.create(
    #   :user_id => params[:subscription][:user_id],
    #   :document_type => "static"
    # ).add_welcome_document_to_user(params[:subscription][:user_id])
    # Document.create(
    #   :user_id => params[:subscription][:user_id],
    #   :document_type => "static"
    # ).add_terms_document_to_user(params[:subscription][:user_id])

    pdf_path = @document.create_user_invoice params[:subscription][:user_id]
    SubscriptionMailer.bank_transfer(User.find(params[:subscription][:user_id]), pdf_path).deliver
    render :text => "true"
  end

  def checkout
    plan              = params["subscription_plan"].to_s
    card_expiry_month = params["card_expiry_month"].to_s
    card_expiry_year  = params["card_expiry_year"].to_s
    card_number       = params["card_number"].to_s
    card_owner        = params["card_owner"].to_s
    card_type         = params["card_type"].to_s
    temp_user_id      = params["user_id"].to_i
    user = User.find(temp_user_id)
    if plan == "no_limit"
      plan = "no limit"
    end
    subscription_plan = SubscriptionPlan.find(:all, :conditions=>[ "lower(subscription_name) = ?", plan.downcase])
    amount = subscription_plan[0].subscription_fee
    amount = amount.to_i
    amount = amount * 100
    subscription = Subscription.new do |s|
      s.subscription_free_upgrade     = ""
      s.subscription_start_date       = Time.now
      s.subscription_renewal_date     = Time.now + 1.year
      s.user_id                       = temp_user_id
      s.subscription_plan_id          = subscription_plan[0].id
      s.created_at                    = Time.now
      s.updated_at                    = Time.now
      s.payment_type                  = params[:payment_type]
      s.auto_renewal                  = params[:subscription_package_renewal]
      s.credit_card                   = card_number.last(4)
      s.card_owner                    = card_owner
      s.card_type                     = card_type
      s.card_expires                  = "#{card_expiry_month} / #{card_expiry_year}"
    end
    subscription.save

    Payment.create(
      :transaction_amount       => subscription_plan[0].subscription_fee,
      :user_id                  => temp_user_id,
      :paid_amount              => 0,
      :payment_conflict_reason  => ""
    )




    #Payment.new do |p|
    #  p.transaction_amount = subscription_plan[0].subscription_fee
    #  p.user_id            = temp_user_id
    #  p.paid_amount        = 0
    #  p.payment_conflict_reason = ""
    #end
    #payment.save

    credit_card = ActiveMerchant::Billing::CreditCard.new(
      :first_name => user.user_first_name.to_s,
      :last_name  => user.user_last_name.to_s,
      :month      => card_expiry_month,
      :year       => card_expiry_year,
      :brand      => card_type,
      :number     => card_number,
      :verification_value  => '123'
    )
    billing_address = {
      :name     => user.user_first_name.to_s,
      :address1 => user.user_street.to_s,
      :address2 => "",
      :city     => user.user_city.to_s,
      :state    => "",
      :country  => "US",
      :zip      => user.user_zip_code.to_s,
      :phone    => user.user_phone_number.to_s || ""
    }
    error_messages = []
    unless credit_card.valid?
      credit_card.errors.full_messages.each do |message|
        error_messages.push(message)
      end
      logger.debug("1111111111")
      logger.debug(error_messages)
        SubscriptionMailer.payment_invalid_credit_card_error(error_messages,user).deliver
        SubscriptionMailer.payment_error_to_artface(error_messages.to_s, user).deliver
    end
    if error_messages.empty?
      ActiveMerchant::Billing::Base.mode = :test
      gateway = ActiveMerchant::Billing::PaypalGateway.new(
        :login => 'sudipt_1350636371_biz_api1.ongraph.com',
        :password => '1350636401',
        :signature => 'ADiiNoBZz.RNJqdkC2sY9sR47yVUA8wIZs5fdHtH9rEmzlmflw04PNqJ'
      )
      begin
        @result = gateway.authorize(amount, credit_card, :ip=>request.remote_ip, :billing_address=>billing_address)
        if @result.success?
          @a = gateway.capture(amount, @result.authorization)
          flash[:notice] = "Authorized";
          User.find(session[:signing_up_user_id]).subscription.update_attribute(:subscription_confirmed, true)
          User.find(session[:signing_up_user_id]).payment.update_attribute(:payment_conflict_reason, "paid")


          SubscriptionMailer.payment_success(@result.message.to_s, user).deliver
          upgrade_user_subscription_plan
          @document = Document.create(
            :user_id => session[:signing_up_user_id],
            :document_type => "invoice"
          )
          # Document.create(
          #   :user_id => session[:signing_up_user_id],
          #   :document_type => "static"
          # ).add_welcome_document_to_user(session[:signing_up_user_id])
          # Document.create(
          #   :user_id => session[:signing_up_user_id],
          #   :document_type => "static"
          # ).add_terms_document_to_user(session[:signing_up_user_id])
          pdf_path = @document.create_user_invoice session[:signing_up_user_id]
          SubscriptionMailer.bank_transfer(User.find(session[:signing_up_user_id]), pdf_path).deliver
          redirect_to :back
        else
          SubscriptionMailer.payment_error(@result.message.to_s, user).deliver
          SubscriptionMailer.payment_error_to_artface(@result.message.to_s, user).deliver
          flash[:error] = "Failure: " + @result.message.to_s
          redirect_to :back
        end
      rescue
        error_message = "#{$!}"
        SubscriptionMailer.connection_timed_out_error(error_message, user).deliver
        SubscriptionMailer.payment_error_to_artface(error_message.to_s, user).deliver
        redirect_to :back 
      end
    else
      flash[:error] = error_messages
      redirect_to :back
    end

  end

  ActiveMerchant::Billing::Base.mode = :test
  @@paypal_express_gateway = ActiveMerchant::Billing::PaypalExpressGateway.new(
    :login => 'sudipt_1350636371_biz_api1.ongraph.com',
    :password => '1350636401',
    :signature => 'ADiiNoBZz.RNJqdkC2sY9sR47yVUA8wIZs5fdHtH9rEmzlmflw04PNqJ'
  )

  def express_checkout
    plan = params["plan"].to_s
    if plan == "no_limit"
      plan = "no limit"
    end
    temp_user_id        = params["user_id"].to_i
    subscription_plan   = SubscriptionPlan.find(:all, :conditions=>["lower(subscription_name) = ?", plan.downcase])
    @@user = User.find(:all, :conditions => [ "id = ?", temp_user_id])
    @@user = @@user[0]
    session[:signing_up_user_id] = User.find(temp_user_id).id
    amount              = subscription_plan[0].subscription_fee
    @@amount            = amount.to_i
    @@amount = @@amount * 100
    subscription = Subscription.new do |s|
      s.subscription_free_upgrade     = ""
      s.subscription_start_date       = Time.now
      s.subscription_renewal_date     = Time.now
      s.user_id                       = temp_user_id
      s.subscription_plan_id          = subscription_plan[0].id
      s.created_at                    = Time.now
      s.updated_at                    = Time.now
      s.payment_type                  = params[:payment_type]
      s.auto_renewal                  = params[:subscription_package_renewal]
    end
    subscription.save
    setup_response = @@paypal_express_gateway.setup_purchase(@@amount,
      :ip                => request.remote_ip,
      :return_url        => url_for(:action => 'confirm', :only_path => false),
      :cancel_return_url => url_for(:action => 'new', :only_path => false)
    )
    redirect_to @@paypal_express_gateway.redirect_url_for(setup_response.token)
  end

  def confirm
    redirect_to :action => 'index' unless params[:token]
    details_response = @@paypal_express_gateway.details_for(params[:token])
    if !details_response.success?
      @message = details_response.message
      render :action => 'error'
      return
    end
    @address = details_response.address
  end

  def complete
    purchase = @@paypal_express_gateway.purchase(@@amount,
      :ip       => request.remote_ip,
      :payer_id => params[:payer_id],
      :token    => params[:token]
    )
    if !purchase.success?
      @message = purchase.message
      render :action => 'error'
      return
    else
      @document = Document.create(
        :user_id => session[:signing_up_user_id],
        :document_type => "invoice"
      )
      # Document.create(
      #   :user_id => session[:signing_up_user_id],
      #   :document_type => "static"
      # ).add_welcome_document_to_user(session[:signing_up_user_id])
      # Document.create(
      #   :user_id => session[:signing_up_user_id],
      #   :document_type => "static"
      # ).add_terms_document_to_user(session[:signing_up_user_id])
      pdf_path = @document.create_user_invoice session[:signing_up_user_id]
      SubscriptionMailer.bank_transfer(User.find(session[:signing_up_user_id]), pdf_path).deliver
      User.find(session[:signing_up_user_id]).subscription.update_attribute(:subscription_confirmed,true)
      SubscriptionMailer.paypal_express_success(purchase.message.to_s, @@user)
      upgrade_user_subscription_plan
    end
  end

  def new
    
  end
  
  def error
    
  end
end