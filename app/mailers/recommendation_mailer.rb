class RecommendationMailer < ActionMailer::Base
  default from: "cloud.test.dev@gmail.com"

  def send_recommendation(user, data)
    @user = user
    @data = data
    subject = "#{@user.user_salutation} #{@user.user_first_name} #{@user.user_last_name} has recommended you to try Artface.com"
    mail(
      :to      => @data.email,
      :from    => 'cloud.test.dev@gmail.com',
      :subject => subject) do |format|
        format.html { render "send_recommendation" }
      end
  end
end