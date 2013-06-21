class ContactMailer < ActionMailer::Base
	default from: "cloud.test.dev@gmail.com"
	def contact_mail(data)
		@contact = data
		mail(
			:to      => "cloud.test.dev@gmail.com",
			:from    => "cloud.test.dev@gmail.com",
			:subject => data.concern) do |format|
				format.html { render "contact_mail"}
			end
	end
end
