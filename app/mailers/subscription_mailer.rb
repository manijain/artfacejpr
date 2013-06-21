class SubscriptionMailer < ActionMailer::Base
	default from: "cloud.test.dev@gmail.com"
	
	def payment_invalid_credit_card_error(data, user)
		@user           = user
		@error_messages = data

		mail(
			:to      => @user.email,
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface registration error") do |format|
				format.html { render "payment_invalid_credit_card_error" }
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

	def payment_success(data, user)
		@data = data
		@user = user
		mail(
			:to      => @user.email,
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface registration success") do |format|
				format.html { render "payment_success" }
			end
	end

	def payment_error(data, user)
		@data = data
		@user = user
		mail(
			:to      => @user.email,
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface registration error") do |format|
				format.html { render "payment_error" }
			end
	end

	def payment_error_to_artface(data, user)
		@data = data
		@user = user
		mail(
			:to      => "cloud.test.dev@gmail.com",
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface registration error") do |format|
				format.html { render "payment_error_to_artface" }
			end
	end

	def paypal_express_success(data, user)
		@data = data
		@user = user
		mail(
			:to      => @user.email,
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface payment success") do |format|
				format.html { render "paypal_express_success" }
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
	def bank_transfer user, pdf_path
		attachments["invoice_#{Time.now.to_date}.pdf"] = File.read(pdf_path)
		@user = user
		mail(
			:to      => @user.email,
			:from    => "cloud.test.dev@gmail.com",
			:subject => "Artface Bank transfer details") do |format|
				format.html { render "bank_transfer" }
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

	def amount_due(user, amount)
		@amount_due = amount
		@user = user
		mail(
			:to 		=> @user.email,
			:from		=> "cloud.test.dev@gmail.com",
			:subject	=> "Amount Due") do | format |
				format.html { render "amount_due"}
			end
	end

	def subscription_plan_change(affected_users)

		plan_arr = Hash.new
		(1..5).each do |index|
			plan_arr[index] = SubscriptionPlan.find_by_id(index)
		end

		@affected_users = affected_users
			@affected_users.each do |key, value|
		    	@affected_users[key].each do |user|
			        mail(
						:to 		=> user.email,
						:from		=> "cloud.test.dev@gmail.com",
						:subject	=> "Subscription Plan Price Changes",
						:body		=>	"Plan : #{plan_arr[key].subscription_name} and Amount : #{plan_arr[key].subscription_fee} and Paintings allowed : #{plan_arr[key].subscription_paintings_allowed}").deliver
			    end
				
		    end
		

	end

end
