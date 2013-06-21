require 'rubygems'
require 'rufus/scheduler'

scheduler = Rufus::Scheduler.start_new

# Removing old unconfirmed users
scheduler.every "1d", :first_in => "10m" do
	puts "Checking for old unconfirmed users"
	puts Time.now
  User.scheduled_removal
end


scheduler.every "1d", :first_in => "1d" do
  puts "Checking for new offers for all wishlists"
  puts Time.now
  Wishlist.scheduled_new_offers
 end

# remove old captcha images
#scheduler.every("10m") do
#	puts "Removing old captcha images"
#	puts Time.nowl
#	folder_path = "public/captcha/"
#	files = Dir.glob(File.join(folder_path, "*"))
#	files.each do |file|
#		captcha_created_time = file[21..30]
#		time_difference = Time.now.to_i - captcha_created_time.to_i
#		if time_difference > 600
#			File.delete file
#		end
#	end
#end