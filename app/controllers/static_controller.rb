class StaticController < ApplicationController
	require "RMagick"
	require 'will_paginate/array' 

	def set_locale language=""
		session[:language] = params[:language]
		I18n.locale = session[:language]
		render :text => "true"
	end

	def memberfees
		current_user
		@from_home = 1 if request.referrer && request.referrer.split('/')[3].nil?
	end
	
	def home
    @header_texts      = []
		temp_header_texts  = HeaderText.find(:all, :order=> "RANDOM()", :limit=>10)
		temp_header_texts.each_with_index do |temp,index|
			@header_texts.push(temp_header_texts[index])
		end

		@header_images     = []
		temp_header_images = HeaderImage.find(:all, :order=>"RANDOM()", :limit=>10)
		temp_header_images.each_with_index do |temp,index|
			@header_images.push(PAPERCLIP_STORAGE_PATH + "images/header_images/smalls/#{temp.id}/#{temp.header_image_file_name}")
		end

		@partners      = Partner.find(:all, :limit=>10)
		header_movie   = HeaderMovie.where(:header_movie_name => "home_header_movie").first
		@header_movie  = PAPERCLIP_STORAGE_PATH + "videos/header_movies/#{header_movie.id}/#{header_movie.header_movie_file_name}"
    path_hash      = {}
    @img_url_array = []
    @artwork       = []
    @artist        = []
		Artwork.find(:all, :order => ["created_at desc"]).first(30).each_with_index do |artwork,index|
			path_hash["artwork_hires"]            = PAPERCLIP_STORAGE_PATH + "images/uploaded/artwork/smalls/artwork_hires/#{artwork.id}/#{artwork.artwork_hires_file_name}"
			path_hash["artwork_thumbnail"]        = PAPERCLIP_STORAGE_PATH + "images/uploaded/artwork/smalls/artwork_thumbnail/#{artwork.id}/#{artwork.artwork_thumbnail_file_name}"
			path_hash["artwork_detail_one"]       = PAPERCLIP_STORAGE_PATH + "images/uploaded/artwork/smalls/artwork_detail_one/#{artwork.id}/#{artwork.artwork_detail_one_file_name}"
			path_hash["artwork_detail_two"]       = PAPERCLIP_STORAGE_PATH + "images/uploaded/artwork/smalls/artwork_detail_two/#{artwork.id}/#{artwork.artwork_detail_two_file_name}"
			path_hash["artwork_documentation"]    = PAPERCLIP_STORAGE_PATH + "images/uploaded/artwork/smalls/artwork_documentation/#{artwork.id}/#{artwork.artwork_documentation_file_name}"
			@img_url_array[index]                 = path_hash
			@artwork[index]                       = artwork
			@artist[index]                        = artwork.artist.nil? ? "Unknown" : artwork.artist
			path_hash = {}
		end
	end

	def offers
		current_user
		@header_artwork = HeaderArtwork.where("name = 'public_offers_page'")
		@artists = Artist.all
		per_page = params[:per_page] || 6
		page     = params[:page] || 1
		
		if params["sort_by"] == "artist name"
			@offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc").paginate :page => params[:page], :per_page => per_page
		elsif params["sort_by"] == "time left"
			@offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("offers.offer_end_date asc").paginate :page => params[:page], :per_page => per_page
		elsif params["sort_by"] == "popularity"
			@offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("offers.offer_popularity desc").paginate :page => params[:page], :per_page => per_page
		elsif params["sort_by"] == "date"
			@offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("offers.offer_start_date asc").paginate :page => params[:page], :per_page => per_page
		else
			@offers  = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc").paginate :page => params[:page], :per_page => per_page
		end
		respond_to do |format|
    	format.html 
    	format.js
	  end
	end 

	def validate_captcha
		if session[:captcha_text] == params[:captcha_text]
			render :text => "true"
		else
			render :text => "false"
		end		
	end

	def contact
		current_user
		if request.get?
			@concern = Property.where("key = 'contact_page_concern' and language = ?", I18n.locale)
			session[:captcha_text] = generate_captcha_text 8
			@captcha_image_path = generate_captcha_image session[:captcha_text]
		end
		if request.post?
			@concern = Property.where("key = 'contact_page_concern' and language = ?", I18n.locale)
			contact = Contact.new(params[:contact])
			if contact.valid?
				if contact.save
					flash[:notice] = "Your feedback has reached us."
					ContactMailer.contact_mail(contact).deliver
				else
					#do nothing 
				end
			else
				flash[:notice] = "There was an error in sending your feedback."
			end
		end
	end

	def about
		current_user
		@header_artwork = HeaderArtwork.where("name = 'public_about_page'")
		@partners = Partner.find(:all, :limit=>10)
		@about_page_slideshow = Slideshow.where("name = 'public_about_page'").order(:slide_order)			
	end

	def missing	
	end

	private
		def generate_captcha_image captcha_text
			options = {:img_width => 130, :img_height => 20, :text_color => "#000", :font_size => 16, :text => captcha_text, :bg_color => "#FFF"}
			captcha_image = Magick::Image.new(options[:img_width],options[:img_height]){
				self.background_color = options[:bg_color]
			}
			image=Magick::Draw.new
			image.stroke('transparent')
			image.fill(options[:text_color])
			image.font='/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType/Verdana_Italic.ttf'
			image.pointsize=options[:font_size]
			image.text(0,0,options[:text])
			image.text_antialias(false)
			image.font_style=Magick::NormalStyle
			image.gravity=Magick::CenterGravity
			image.draw(captcha_image)
			temp_file_name = "image_#{Time.now.to_i}"
			file_name = "tmp/#{temp_file_name}.gif"
			captcha_image.write(file_name)
			aws_credentials = {
        :aws_access_key_id => 'AKIAIIF2R4AR4SW6NSZQ',
        :aws_secret_access_key => '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'
      }
			          
      image_url = "#{temp_file_name}.gif"
      data = File.open("#{file_name}")
      storage = Fog::Storage.new(aws_credentials.merge(:provider => 'AWS'))
      storage.get_bucket('artfacedev-pro')
      storage.put_object('artfacedev-pro', image_url, data)
      expiry_time = Time.now.to_i + 600
      img_url=storage.get_object_url('artfacedev-pro',image_url,expiry_time)
      img_url
		end

		def generate_captcha_text size
	  	charset = %w{ 2 3 4 6 7 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z}
  		(0...size).map{ charset.to_a[rand(charset.size)] }.join
		end

end