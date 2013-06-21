class ServicesMailer < ActionMailer::Base
  default from: "cloud.test.dev@gmail.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.services_mailer.send_invitation.subject
  #
  def send_invitation(email, password, name)
    #@greeting = "Hi"
    @email = email
    @password = password
    @name = name
    mail( 
      :to => @email,
      :from => "cloud.test.dev@gmail.com",
      :subject => "Admin has invitated you to join Artface" ) do |format|
        format.html{ render "send_invitation" }
      end
  end

  def resend_invitation(email, name)
    @email = email
    @name = name
    mail(
      :to=> @email,
      :from=>"cloud.test.dev@gmail.com",
      :subject=>"Reminder to join you Artface") do |format|
        format.html{ render "resend_invitation" }
      end
  end
  
  
  

  def connection_timed_out_error(data, user)
    @data = data
    @user = user
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "Artface registration error") do |format|
        format.html { render "connection_timed_out_error" }
      end
  end

  def time_expired(user)
    @user = user
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "Artface registration error") do |format|
        format.html { render "time_expired" }
      end
  end
  
  def cancel_subscription user
    @user = user
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "Subscription Canceled") do |format|
        format.html { render "cancel_subscription" }
      end
  end



end
