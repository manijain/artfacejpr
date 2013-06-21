class MessageAdminMailer < ActionMailer::Base
	default from: "cloud.test.dev@gmail.com"

	def abuse_report_reply(user, title, message_id, reply_message)
		@message_id = message_id
		@user = user
		@title = title
		@reply_message = reply_message
		#@message = message
		#@offer = offer
		logger.debug(@message_id)
		mail(
			:to 		=> @user.email,
			:from		=> "cloud.test.dev@gmail.com",
			:subject	=> "#{@title}",
			:body		=> @reply_message)
	end




end