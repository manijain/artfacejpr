class ForumMailer < ActionMailer::Base
  default from: "cloud.test.dev@gmail.com"
  def new_reply forum_message_notification
    @forum_message_notification = forum_message_notification
    @user = User.find_by_id(forum_message_notification.user_id)
    mail(
      :to      => @user.email,
      :from    => "cloud.test.dev@gmail.com",
      :subject => "New Reply in forum message #{forum_message_notification.forum_message_id}") do |format|
        format.html { render "new_reply" }
      end
  end
end
