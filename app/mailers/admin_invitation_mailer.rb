class AdminInvitationMailer < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.admin_invitation_mailer.send_invitation.subject
  #
  def send_invitation user
    @user = user
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "Invited by Artface.com") do |format|
        format.html { render "send_invitation" }
      end
  end

  def resend_invitation user
    @user = user
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "Reminder of Invitation by Artface.com") do |format|
        format.html { render "resend_invitation" }
      end
  end

end
