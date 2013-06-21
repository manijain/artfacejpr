class UserController < ApplicationController
  require 'zip/zip'
	def home
		@user = current_user
	end
  def registration_check_for_email
    if User.find_by_email(params["email"]).nil?
      render :text => "false"
    else
      render :text => "true"
    end
  end
  
  def edit
    @user = current_user
    if @user.user_setting.blank?
      UserSetting.create(
        :user_id                     =>current_user.id,
        :notification_by             =>"email",
        :notification_email          =>current_user.email,
        :show_identity               =>true,
        :wishlist_notification       =>true,
        :seller_message_notification =>true,
        :buyer_message_notification  =>true,
        :forum_notification          =>true,
        :user_offer_forum_discussion =>true
      )
    end
  end


  def user_edit_data
    
  end


  def zip_download
    @user = current_user
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

  def update_settings
    current_user

    current_user.user_setting.update_attribute :notification_by             , params["user_notification_by"]
    current_user.user_setting.update_attribute :notification_email          , params["user_notification_email"]
    current_user.user_setting.update_attribute :show_identity               , params["user_identity"]
    current_user.user_setting.update_attribute :wishlist_notification       , params["wishist_notification"]
    current_user.user_setting.update_attribute :seller_message_notification , params["user_seller_message_notification"]
    current_user.user_setting.update_attribute :buyer_message_notification  , params["user_buyer_message_notification"]
    current_user.user_setting.update_attribute :forum_notification          , params["user_forum_notifications"]
    current_user.user_setting.update_attribute :user_offer_forum_discussion , params["user_offer_forum_discussion"]
    render :text=>"true"
  end


  def cancel_subscription
    current_user.subscription.update_attribute :subscription_renewal_date, ''
    current_user.subscription.update_attribute :auto_renewal, false
    SubscriptionMailer.cancel_subscription(current_user).deliver
    render :text=>"true"
  end

end

