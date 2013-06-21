class OfferController < ApplicationController
  include MessageHelper
  require 'will_paginate/array'
  before_filter :authenticate_user!

  def new
    current_user
    current_user_subscription_plan = Subscription.find(:all, :conditions=>["user_id = ?", current_user.id]).first.subscription_plan_id.to_i
    current_user_total_offers = SubscriptionPlan.find(:all, :conditions => ["id = ?", current_user_subscription_plan]).first.subscription_paintings_allowed.to_i
    curent_offers_live = Offer.find(:all, :conditions=>["seller_id = ?", current_user.id]).count
    offers_left = current_user_total_offers - curent_offers_live
    if offers_left < 1
      flash[:notice] = "You have crossed the limit of adding new offers."
      redirect_to '/dashboard/sell-art-area'
    elsif offers_left > 40      
      @offers_left = "unlimited"
    else
      @offers_left = offers_left
    end
  end

  def create
    if request.post?
      offer = Offer.new do |temp|
        temp.offer_start_date = params["new_start_date"]
        temp.offer_end_date   = params["new_end_date"]
        temp.offer_type       = params["new_purpose"]
        temp.seller_id        = current_user.id
        temp.offer_status     = 1
      end
      offer.save
      temp_offer_id = offer.id
      session[:offer_id] = offer.id
      artist = Artist.where("LOWER(artist_name) = ?", params["new_artist_name"].to_s.downcase).first
      if artist.nil?
        artist = Artist.create(:artist_name => params["new_artist_name"].to_s)
      end
      artwork = Artwork.new do |temp|
        temp.artwork_category          = params["new_category"]
        temp.artwork_medium            = params["new_medium"]
        temp.artwork_height            = params["new_height"]
        temp.artwork_width             = params["new_width"]
        temp.artwork_depth             = params["new_depth"]
        temp.artwork_size_unit         = params["new_size_unit"]
        temp.artwork_creation_year     = params["new_year"]
        temp.artwork_creation_year_era = params["new_era"]
        temp.artwork_certificate_check = params["new_certificate"]
        temp.artwork_frame_check       = params["new_frame"]
        temp.artwork_signature_check   = params["new_signature"]
        temp.artwork_movement_period   = params["new_period"]
        temp.artwork_country           = params["new_country"]
        temp.offer_id                  = temp_offer_id
        temp.artist_id                 = artist.id
      end
      if artwork.save
        @@temp_artwork_id = artwork.id
        session[:artwork_id] = artwork.id
        params[:artwork_title]["artwork_id"] = @@temp_artwork_id
        ArtworkTitle.create(params[:artwork_title])
        params[:artwork_description]["artwork_id"] = @@temp_artwork_id
        ArtworkDescription.create(params[:artwork_description])
        render :text => "true"
      end
    end
  end

  def save_image
    artwork =  Artwork.find(session[:artwork_id])
    artwork.thumbnail_crop_h      = params[:artwork][:thumbnail_crop_h] unless params[:artwork][:thumbnail_crop_h].blank?
    artwork.thumbnail_crop_x      = params[:artwork][:thumbnail_crop_x] unless params[:artwork][:thumbnail_crop_x].blank?
    artwork.thumbnail_crop_y      = params[:artwork][:thumbnail_crop_y] unless params[:artwork][:thumbnail_crop_y].blank?
    artwork.thumbnail_crop_w      = params[:artwork][:thumbnail_crop_w] unless params[:artwork][:thumbnail_crop_w].blank?  
    artwork.hi_res_crop_h         = params[:artwork][:hi_res_crop_h] unless params[:artwork][:hi_res_crop_h].blank?
    artwork.hi_res_crop_x         = params[:artwork][:hi_res_crop_x] unless params[:artwork][:hi_res_crop_x].blank?
    artwork.hi_res_crop_y         = params[:artwork][:hi_res_crop_y] unless params[:artwork][:hi_res_crop_y].blank?
    artwork.hi_res_crop_w         = params[:artwork][:hi_res_crop_w] unless params[:artwork][:hi_res_crop_w].blank?
    artwork.artwork_hires         = params[:artwork][:artwork_hires] unless params[:artwork][:artwork_hires].blank?
    artwork.detail_one_crop_h     = params[:artwork][:detail_one_crop_h] unless params[:artwork][:detail_one_crop_h].blank?
    artwork.detail_one_crop_x     = params[:artwork][:detail_one_crop_x] unless params[:artwork][:detail_one_crop_x].blank?
    artwork.detail_one_crop_y     = params[:artwork][:detail_one_crop_y] unless params[:artwork][:detail_one_crop_y].blank?
    artwork.detail_one_crop_w     = params[:artwork][:detail_one_crop_w] unless params[:artwork][:detail_one_crop_w].blank?
    artwork.detail_two_crop_h     = params[:artwork][:detail_two_crop_h] unless params[:artwork][:detail_two_crop_h].blank?
    artwork.detail_two_crop_x     = params[:artwork][:detail_two_crop_x] unless params[:artwork][:detail_two_crop_x].blank?
    artwork.detail_two_crop_y     = params[:artwork][:detail_two_crop_y] unless params[:artwork][:detail_two_crop_y].blank?
    artwork.detail_two_crop_w     = params[:artwork][:detail_two_crop_w] unless params[:artwork][:detail_two_crop_w].blank?

    if params[:artwork][:crop_existing_thumbnail] == "true"
      artwork.artwork_thumbnail     = params[:artwork][:artwork_hires] unless params[:artwork][:artwork_hires].blank?
    else
      artwork.artwork_thumbnail     = params[:artwork][:artwork_thumbnail] unless params[:artwork][:artwork_thumbnail].blank?
    end

    if params[:artwork][:crop_existing_detail_one] == "true"
      artwork.artwork_detail_one    = params[:artwork][:artwork_hires] unless params[:artwork][:artwork_hires].blank?
    else
      artwork.artwork_detail_one    = params[:artwork][:artwork_detail_one] unless params[:artwork][:artwork_detail_one].blank? 
    end

    if params[:artwork][:crop_existing_detail_two] == "true"
      artwork.artwork_detail_two    = params[:artwork][:artwork_hires] unless params[:artwork][:artwork_hires].blank?
    else
      artwork.artwork_detail_two    = params[:artwork][:artwork_detail_two] unless params[:artwork][:artwork_detail_two].blank?
    end
    
    artwork.documentation_crop_h  = params[:artwork][:documentation_crop_h] unless params[:artwork][:documentation_crop_h].blank?
    artwork.documentation_crop_x  = params[:artwork][:documentation_crop_x] unless params[:artwork][:documentation_crop_x].blank?
    artwork.documentation_crop_y  = params[:artwork][:documentation_crop_y] unless params[:artwork][:documentation_crop_y].blank?
    artwork.documentation_crop_w  = params[:artwork][:documentation_crop_w] unless params[:artwork][:documentation_crop_w].blank?

    #artwork.artwork_detail_two    = params[:artwork][:artwork_detail_two] unless params[:artwork][:artwork_detail_two].blank?
    artwork.artwork_documentation = params[:artwork][:artwork_documentation] unless params[:artwork][:artwork_documentation].blank?
    #if artwork.cropping?
    #  #artwork.reprocess_avatar
    #  #artwork.artwork_thumbnail.reprocess!
    #end
    
    artwork.save
    redirect_to "/offer/show/#{session[:offer_id]}"
    # flash[:notice] = "Your offer has been added."
    # respond_to do |format|
    #   format.html { }
    #   format.js { render "offer/edit/redirect"}
    # end
  end

  def show_full_screen
    current_user
    @offer = Offer.find(params[:id])
  end

  def show
    current_user
    @offer = Offer.find(params[:id])
    if @offer.seller_id == current_user.id   
      redirect_to "/myoffer/show/#{params[:id]}"
    else
      @messages = Message.where("user_id = ?", current_user.id).where("offer_id = ?", params[:id]).where("is_parent = true")
      @offer_in_favourite = Favourite.where("offer_id = #{@offer.id}").where("user_id = #{current_user.id}").exists?
      unless @messages.blank?
        @unread_messages_count = @messages.map { |e| e.message_read}.delete_if{|e| e == true}.count
        if @unread_messages_count > 0
          @unread_messages       = true
        else
          @unread_messages       = false
        end
      else
        @unread_messages_count = 0
      end
      @message_array = []
      @messages.each do |message|
        bfs_traversal_tree message
      end
    end
  end

  def my_offer_show
    current_user
    @offer              = Offer.find(params[:id])
    if @offer.seller_id != current_user.id
      redirect_to "/offer/show/#{params[:id]}"
    end
  end

  def edit
    current_user
    @offer = Offer.find(params[:id])
    current_user_subscription_plan = Subscription.find(:all, :conditions=>["user_id = ?", current_user.id]).first.subscription_plan_id.to_i
    current_user_total_offers = SubscriptionPlan.find(:all, :conditions => ["id = ?", current_user_subscription_plan]).first.subscription_paintings_allowed.to_i
    curent_offers_live = Offer.find(:all, :conditions=>["seller_id = ?", current_user.id]).count
    @offers_left = current_user_total_offers - curent_offers_live
    redirect_to "/offer/show/#{params[:id]}" unless @offer.seller_id == current_user.id
    temp_attributes = @offer.artwork.artwork_description.attributes
    
    @descriptions_hash = {}
    @descriptions_hash.merge!("en"=>temp_attributes["artwork_description_en"]) unless temp_attributes["artwork_description_en"].to_s.blank?
    @descriptions_hash.merge!("ne"=>temp_attributes["artwork_description_ne"]) unless temp_attributes["artwork_description_ne"].to_s.blank?
    @descriptions_hash.merge!("fr"=>temp_attributes["artwork_description_fr"]) unless temp_attributes["artwork_description_fr"].to_s.blank?
    @descriptions_hash.merge!("fi"=>temp_attributes["artwork_description_fi"]) unless temp_attributes["artwork_description_fi"].to_s.blank?
    @descriptions_hash.merge!("ch"=>temp_attributes["artwork_description_ch"]) unless temp_attributes["artwork_description_ch"].to_s.blank?

    temp_attributes = @offer.artwork.artwork_title.attributes
    @titles_hash = {}
    @titles_hash.merge!("en"=>temp_attributes["artwork_title_en"]) unless temp_attributes["artwork_title_en"].to_s.blank?
    @titles_hash.merge!("ne"=>temp_attributes["artwork_title_ne"]) unless temp_attributes["artwork_title_ne"].to_s.blank?
    @titles_hash.merge!("fr"=>temp_attributes["artwork_title_fr"]) unless temp_attributes["artwork_title_fr"].to_s.blank?
    @titles_hash.merge!("fi"=>temp_attributes["artwork_title_fi"]) unless temp_attributes["artwork_title_fi"].to_s.blank?
    @titles_hash.merge!("ch"=>temp_attributes["artwork_title_ch"]) unless temp_attributes["artwork_title_ch"].to_s.blank?
  end

  def update
    offer = Offer.find(params[:current_offer]["id"])
    artist = Artist.where("LOWER(artist_name) = ?", params[:temp]["new_artist_name"].to_s.downcase).first
    if artist.nil?
      artist = Artist.create(:artist_name => params[:temp]["new_artist_name"].to_s)
    end
    artwork = Artwork.new do |temp|
      temp.offer_id        = offer.id
      temp.artist_id       = artist.id
    end

    session[:artwork_id] = offer.artwork.id
    session[:offer_id] = offer.id
    @@temp_artwork_id = offer.artwork.id
    offer.update_attributes(params[:offer])
    offer.artwork.update_attributes!(params["artwork"])
    offer.artwork.artwork_description.update_attributes(params["artwork_description"])
    offer.artwork.artwork_title.update_attributes(params["artwork_title"])
    if offer.offer_status == true
      offer.offer_cancellation_reason = " "
      offer.save
    end
    render :text => "true"
    # => remaining artwork_title
  end

  def get_relavant_form_data
    category = params[:category]
    @medium = []
    medium = Property.where("key = 'medium' and language = ?", I18n.locale)
    medium.each do |med|
      if med.value.split(': ')[0] == category
        @medium.push med.value.split(': ')[1]
      end
    end
    render :json => @medium
  end
  def find_artist_by_name
    artist = params[:term]
    @artist = []
    artists = Artist.where("LOWER(artist_name) like ?", '%' + artist.to_s.downcase + '%').where("approved_status = ?",true)
    artists.each do |artist|
      @artist.push(artist.artist_name)
    end
    render :json => @artist
  end
  def find_artist_chronology
    artist = params[:term]
    @artist = Artist.where("artist_name = ?", artist.to_s).where("approved_status = ?", true).first
    render :json => @artist
  end
  def home
    @user = current_user
    @header_artwork = HeaderArtwork.where("name =?", "dashboard_index_page")
    @sell_current_offers = Offer.where("seller_id = ?", current_user.id).where("offer_status = true")
    
    @upgraded_subscription_plan = SubscriptionPlan.find(User.find(current_user.id).subscription.subscription_plan_id + 1).subscription_name
   
    favourites_list           = current_user.favourites.map{|favourite| favourite.offer_id}
    favourites_list           = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    
    if params["buy_your_favourites_sort_by"].nil?
      @buy_your_favourites = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").where(favourites_list_condition).order("artists.artist_name")
    else
      buy_your_favourites_sort_by = params["buy_your_favourites_sort_by"].to_i || 3
      case buy_your_favourites_sort_by
      when 0
        @buy_your_favourites = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").where(favourites_list_condition).order("artists.artist_name")
      when 1
        @buy_your_favourites = Offer.where(favourites_list_condition).order("offer_end_date")
      when 2
        @buy_your_favourites = Offer.where(favourites_list_condition).order("offer_popularity")
      end
      respond_to do |format|
        format.js { render "offer/home/favourites/favourites" }
      end
      return
    end

    if params["buy_interesting_offers_sort_by"].nil?
      @buy_interesting_offers   = Offer.order("created_at").last(15)
    else
      buy_interesting_offers_sort_by = params["buy_interesting_offers_sort_by"].to_i || 4
      case buy_interesting_offers_sort_by
      when 0
        @buy_interesting_offers = Offer.order("created_at").last(15)
      when 1
        @buy_interesting_offers = Offer.order("offer_popularity desc").last(15)
      when 2
        @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(15)
      when 3
        @buy_interesting_offers = Offer.order("offer_end_date").last(15)
      end
      respond_to do |format|
        format.js { render "offer/home/interesting_offers/interesting_offers"}
      end
      return
    end

    if params["buy_wishlist_offers_sort_by"].nil?
      @buy_wishlist_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(5)
    else
      buy_wishlist_offers_sort_by = params["buy_wishlist_offers_sort_by"].to_i || 4
      case buy_wishlist_offers_sort_by
      when 0
        @buy_wishlist_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(5)
      when 1
        @buy_wishlist_offers = Offer.order("offer_end_date").last(5)
      when 2
        @buy_wishlist_offers = Offer.order("offer_popularity desc").last(5)
      when 3
        @buy_wishlist_offers = Offer.order("created_at").last(5)
      end
      respond_to do |format|
        format.js { render "offer/home/wishlists/wishlists"}
      end
      return
    end

    respond_to do |format|
      format.html
    end
  end
  def sell_art_area_messages_sorting
    per_page = params[:per_page] || 3
    page     = params[:page] || 1
    @searching_messages = false
    sort_option_one   = ""
    sort_option_two   = ""

    if !params[:offer].blank? && params[:offer]["message_search"] == "0" and !params[:offer][:search_item_in_messages].blank?
      session["messages_search_term"] = params[:offer][:search_item_in_messages]
      session["sort_option_one"] = params["sort_one"]
      session["sort_option_two"] = params["sort_two"]
    end

    if params[:messages_sort] == "true"
      unless params["sort_two"].blank?
        session["sort_option_two"] = params["sort_two"].to_i
      end

      unless params["sort_one"].nil?
        session["sort_option_one"] = params["sort_one"].to_i
      end
    end
    case session["sort_option_two"]
    when 0
      sort_option_one = ""
    when 1
      sort_option_one = "offers.offer_status = true"
    when 2
      sort_option_one = "offers.offer_status = false"
    end
    case session["sort_option_one"]
    when 0
      sort_option_two = "artists.artist_name"
    when 1
      sort_option_two = "offers.offer_end_date"
    when 2
      sort_option_two = "messages.created_at desc, messages.message_read != true desc"
    end
    @offer_sell_art_area_messages = []
    if session["messages_search_term"].blank?
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id").where("seller_id = ?", current_user.id).where(sort_option_one).order(sort_option_two)
      @offer_sell.uniq!
    else
      @searching_messages = true
      @offer_sell = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id JOIN users on messages.user_id = users.id").where("seller_id = ?", current_user.id).where(sort_option_one).where("messages.message_text ilike ? OR messages.message_title ilike ? OR messages.concern ilike ? OR artists.artist_name ilike ? OR users.user_first_name ilike ? OR users.user_last_name ilike ? ", "%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%").order(sort_option_two)
      @offer_sell.uniq!
    end
    @offer_sell.each do |offer|
      unless offer.messages.blank?
        @offer_sell_art_area_messages.push(offer)
      end
    end
    @offer_sell_art_area_messages = @offer_sell_art_area_messages.paginate :per_page => per_page, :page=>page
    @message_array = []
    unless @offer_sell_art_area_messages.blank?
      @offer_sell_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end


    respond_to do |format|
      format.js{ render "offer/sell-art/sell_art_area_messages.js.haml"}
    end 
  end
  def sell_art_area
    per_page = params[:per_page] || 3
    page     = params[:page] || 1

    session["messages_search_term"] = nil
    @offer_sell_art_area_messages = []
    @offer_sell = Offer.joins("JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id").where("seller_id = ?", current_user.id).order("artists.artist_name")
    @offer_sell.uniq!
    @offer_sell.each do |offer|
      unless offer.messages.blank?
        @offer_sell_art_area_messages.push(offer)
      end
    end
    @offer_sell_art_area_messages = @offer_sell_art_area_messages.paginate :per_page => per_page, :page => page
    
    @message_array = []
    unless @offer_sell_art_area_messages.blank?
      @offer_sell_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end

    @user = current_user
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    sort_by     = params[:sort_by]      || "artist name" 
    offer_show  = params[:offer_show]   || ""
    session[:search_string] = session[:search_string] || ""
    offer_list = current_user.offers.map{|temp| temp.id}
    if offer_list.blank?
      @unread_messages = 0
    elsif offer_list.length == 1
      @unread_messages = Message.where("offer_id in (#{offer_list.join('')})").where("message_read != ?", true).count
    elsif offer_list.length > 1
      @unread_messages = Message.where("offer_id in (#{offer_list.join(',')})").where("message_read IS NOT true ").count
    end
    @user_messages_exists = @user.offers.map{|temp| temp.messages}.delete_if{|temp| temp.blank?}

    @offers_online_count = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, "show all offers").count
    @offers              = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, offer_show)
    
    respond_to do |format|
      format.js   { render "offer/sell-art/sell_art_area_offers_data" }
      format.html { render "offer/sell_art_area" }
    end
  end

  def buy_art_area

    per_page = params[:per_page] || 3
    page     = params[:page] || 1
    session["messages_search_term"] = nil
    @offer_buy_art_area_messages = []
    # @offer_buy = Offer.where("seller_id = ?", current_user.id)
    @offer_buy = Offer.joins("JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id").where("messages.user_id = ? ", current_user.id).order("artists.artist_name")
    @offer_buy.uniq!
    @offer_buy.each do |offer|
      unless offer.messages.blank?
        @offer_buy_art_area_messages.push(offer)
      end
    end

    @offer_buy_art_area_messages = @offer_buy_art_area_messages.paginate :per_page => per_page, :page => page

    # @count = []
    @message_array = []
    unless @offer_buy_art_area_messages.blank?
      @offer_buy_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end

    @user = current_user
    @header_artwork = HeaderArtwork.where("name =?", "buy_art_area")
   
    favourites_list           = current_user.favourites.map{|favourite| favourite.offer_id}
    favourites_list           = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    
    if params["buy_your_favourites_sort_by"].nil?
      @buy_your_favourites = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").where(favourites_list_condition).order("artists.artist_name")
    else
      buy_your_favourites_sort_by = params["buy_your_favourites_sort_by"].to_i || 3
      case buy_your_favourites_sort_by
      when 0
        @buy_your_favourites = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").where(favourites_list_condition).order("artists.artist_name")
      when 1
        @buy_your_favourites = Offer.where(favourites_list_condition).order("created_at")
      when 2
        @buy_your_favourites = Offer.where(favourites_list_condition).order("offer_end_date")
      end
      respond_to do |format|
        format.js { render "offer/home/favourites/favourites" }
      end
      return
    end

    if params["buy_interesting_offers_sort_by"].nil?
      @buy_interesting_offers = Offer.order("created_at").last(15)
    else
      buy_interesting_offers_sort_by = params["buy_interesting_offers_sort_by"].to_i || 4
      case buy_interesting_offers_sort_by
      when 0
        @buy_interesting_offers = Offer.order("created_at").last(15)
      when 1
        @buy_interesting_offers = Offer.order("offer_popularity desc").last(15)
      when 2
        @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(15)
      when 3
        @buy_interesting_offers = Offer.order("offer_end_date").last(15)
      end
      respond_to do |format|
        format.js { render "offer/home/interesting_offers/interesting_offers"}
      end
      return
    end

    if params["buy_wishlist_offers_sort_by"].nil?
      @buy_wishlist_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(5)
    else
      buy_wishlist_offers_sort_by = params["buy_wishlist_offers_sort_by"].to_i || 4
      case buy_wishlist_offers_sort_by
      when 0
        @buy_wishlist_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("artists.artist_name").last(5)
      when 1
        @buy_wishlist_offers = Offer.order("created_at").last(5)
      when 2
        @buy_wishlist_offers = Offer.order("offer_end_date").limit(5)
      end
      respond_to do |format|
        format.js { render "offer/home/wishlists/wishlists"}
      end
      return
    end

    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    sort_by     = params[:sort_by]      || "artist name" 
    offer_show  = params[:offer_show]   || ""
    session[:search_string] = session[:search_string] || ""
    offer_list = current_user.offers.map{|temp| temp.id}
    if offer_list.blank?
      @unread_messages = 0
    elsif offer_list.length == 1
      @unread_messages = Message.where("offer_id in (#{offer_list.join('')})").where("message_read != ?", true).count
    elsif offer_list.length > 1
      @unread_messages = Message.where("offer_id in (#{offer_list.join(',')})").where("message_read != ?", true).count
    end
    @user_messages_exists = @user.offers.map{|temp| temp.messages}.delete_if{|temp| temp.blank?}

    @offers_online_count = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, "show all offers").count
    @offers              = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, offer_show)
    
    respond_to do |format|
      format.js   { render "offer/buy-art/buy_art_messages/buy_art_area_offers_data" }
      format.html { render "offer/buy_art_area" }
    end

  end

  def buy_art_area_messages_sorting
    per_page = params[:per_page] || 3
    page     = params[:page] || 1
    @messages_searching = false
    sort_option_one   = ""
    sort_option_two   = ""

    if !params[:offer].blank? && params[:offer]["message_search"] == "0" and !params[:offer][:search_item_in_messages].blank?
      session["messages_search_term"] = params[:offer][:search_item_in_messages]
      session["sort_option_one"] = params["sort_one"]
      session["sort_option_two"] = params["sort_two"]
    end


    if params[:messages_sort] == "true"
      unless params["sort_two"].blank?
        session["sort_option_two"] = params["sort_two"].to_i
      end

      unless params["sort_one"].nil?
        session["sort_option_one"] = params["sort_one"].to_i
      end
    end
    case session["sort_option_two"]
    when 0
      sort_option_one = ""
    when 1
      sort_option_one = "offers.offer_status = true"
    when 2
      sort_option_one = "offers.offer_status = false"
    end
    case session["sort_option_one"]
    when 0
      sort_option_two = "artists.artist_name"
    when 1
      sort_option_two = "offers.offer_end_date"
    when 2
      sort_option_two = "messages.created_at desc, messages.message_read != true desc"
    end

    @offer_buy_art_area_messages = []
    if session["messages_search_term"].blank?
      @offer_buy = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id").where("messages.user_id = ?", current_user.id).where(sort_option_one).order(sort_option_two)
      @offer_buy.uniq!
    else
      @messages_searching = true
      @offer_buy = Offer.joins("LEFT JOIN messages on messages.offer_id = offers.id JOIN artworks on artworks.offer_id = offers.id JOIN artists on artists.id = artworks.artist_id JOIN users on messages.user_id = users.id").where("messages.user_id = ?", current_user.id).where(sort_option_one).where("messages.message_text ilike ? OR messages.message_title ilike ? OR messages.concern ilike ? OR artists.artist_name ilike ? OR users.user_first_name ilike ? OR users.user_last_name ilike ? ", "%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%","%#{session['messages_search_term']}%").order(sort_option_two)
      @offer_buy.uniq!
    end
    @offer_buy.each do |offer|
      unless offer.messages.blank?
        @offer_buy_art_area_messages.push(offer)
      end
    end
    @offer_buy_art_area_messages = @offer_buy_art_area_messages.paginate :per_page => per_page, :page=>page
    @message_array = []
    unless @offer_buy_art_area_messages.blank?
      @offer_buy_art_area_messages.each_with_index do |offer, index|
        @message_array[index] = []
        if offer.messages.where("is_parent = true").count == 1
          sell_art_area_traversal_tree offer.messages.where("is_parent = true").first, index
        elsif offer.messages.where("is_parent = true").count > 1
          offer.messages.where("is_parent = true").each do |message|
            sell_art_area_traversal_tree message, index
          end
        end
      end
    end
    respond_to do |format|
      format.js{ render "offer/buy-art/buy_art_messages/buy_art_area_messages.js.haml"}
    end 
  end

  def buy_art_search
    @user       = current_user
    per_page    = params[:per_page] || 18
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""

    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      session["last_search_advanced"] = true
      session["last_search_basic"] = false
      sort_by_advance = case sort_by
       when "artist name"
         "lower(artists.artist_name) asc"
       when "date"
         "offers.created_at asc"
       when "popularity"
         "offers.offer_popularity desc"
       when "date"
         "offers.offer_end_date asc"
       else
         ""
       end 
      unless params[:select].blank?
        session[:select] = params[:select]
      end

      if !session[:select][:artist].blank?
        if session[:select][:artist]["search_type"].blank?
          artist_name = ""
        else
          if session[:select][:artist]["search_type"]=="contains"
            artist_name = "artists.artist_name ilike ?","%#{session[:select][:artist]['value']}%"
          elsif session[:select][:artist]["search_type"]=="is exactly"       
            artist_name = "artists.artist_name=?",session[:select][:artist]['value']
          elsif session[:select][:artist]["search_type"]=="is not"        
            artist_name = "artists.artist_name!=?",session[:select][:artist]['value']
          end
        end
      else
        artist_name = ""
      end

      if !session[:select][:title].blank?
        if session[:select][:title]['value'].blank?
          title_name = ""
        else
          if session[:select][:title]["search_type"]=="contains"
            title_name = "artwork_titles.artwork_title_en ilike ? OR 
                       artwork_titles.artwork_title_fi ilike ? OR 
                       artwork_titles.artwork_title_ch ilike ? OR 
                       artwork_titles.artwork_title_fr ilike ? OR 
                       artwork_titles.artwork_title_ne ilike ? ","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
          elsif session[:select][:title]["search_type"]=="is exactly"       
            title_name ="artwork_titles.artwork_title_en =? OR 
                      artwork_titles.artwork_title_fi =? OR 
                      artwork_titles.artwork_title_ch =? OR 
                      artwork_titles.artwork_title_fr =? OR 
                      artwork_titles.artwork_title_ne =? ","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
          elsif session[:select][:title]["search_type"]=="is not"        
            title_name ="artwork_titles.artwork_title_en !=? OR 
                       artwork_titles.artwork_title_fi !=? OR 
                       artwork_titles.artwork_title_ch !=? OR 
                       artwork_titles.artwork_title_fr !=? OR 
                       artwork_titles.artwork_title_ne !=? ","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
          end
        end
      else
        title_name=""
      end

      if !session[:select][:description].blank? 
        if session[:select][:description]["search_type"].blank?
          desc_name = ""
        else
          if session[:select][:description]["search_type"]=="contains"
            desc_name = "artwork_descriptions.artwork_description_ch ilike ? OR 
                      artwork_descriptions.artwork_description_fi ilike ? OR 
                      artwork_descriptions.artwork_description_fr ilike ? OR 
                      artwork_descriptions.artwork_description_ne ilike ? ","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
          elsif session[:select][:description]["search_type"]=="is exactly"       
            desc_name = "artwork_descriptions.artwork_description_ch =? OR 
                      artwork_descriptions.artwork_description_fi =? OR 
                      artwork_descriptions.artwork_description_fr =? OR 
                      artwork_descriptions.artwork_description_ne =? ",session[:select][:description]['value'],"%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
          elsif session[:select][:description]["search_type"]=="is not"        
            desc_name = "artwork_descriptions.artwork_description_ch !=? OR 
                      artwork_descriptions.artwork_description_fi !=? OR 
                      artwork_descriptions.artwork_description_fr !=? OR 
                      artwork_descriptions.artwork_description_ne !=?  ","#{session[:select][:description]['value']}","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
          end
        end
      else
        desc_name = ""
      end

      if !session[:select][:year_of_creation].blank? 
        if !session[:select][:year_of_creation]['value'].blank?
          if session[:select][:year_of_creation]["search_type"]=="is exactly" 
            year_creation="artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
          elsif session[:select][:year_of_creation]["search_type"]=="is before"
            if session[:select][:year_of_creation]['duration'] == "AD"
              year_creation="(artworks.artwork_creation_year < '#{session[:select][:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{session[:select][:year_of_creation]['duration']}') OR artworks.artwork_creation_year_era = 'BC'"
            elsif session[:select][:year_of_creation]['duration'] == "BC"
              year_creation="artworks.artwork_creation_year > '#{session[:select][:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{session[:select][:year_of_creation]['duration']}'"
            end
          elsif session[:select][:year_of_creation]["search_type"]=="is after"
            if session[:select][:year_of_creation]['duration'] == "AD"
              year_creation="artworks.artwork_creation_year > '#{session[:select][:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{session[:select][:year_of_creation]['duration']}'"
            elsif session[:select][:year_of_creation]['duration'] == "BC"
              year_creation="(artworks.artwork_creation_year < '#{session[:select][:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{session[:select][:year_of_creation]['duration']}') OR (artworks.artwork_creation_year_era = 'AD')"
            end
          end
        else
          year_creation="artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['duration']
        end 
      else
        year_creation=""
      end
    
      if !session[:select][:category].blank? and session[:select][:category]['name']!="any"
        if session[:select][:category]["search_type"]=="is"
          artwork_category="artworks.artwork_category=? AND artworks.artwork_medium=?",session[:select][:category]['name'],session[:select][:category]['sub_name']
        elsif session[:select][:category]["search_type"]=="is not" 
          artwork_category="artworks.artwork_category!=? AND artworks.artwork_medium!=?",session[:select][:category]['name'],session[:select][:category]['sub_name']
        end
      else
        artwork_category= ""
      end

      if !session[:select][:movement_period].blank?
        if session[:select][:movement_period]["search_type"]=="contains"
          movesessionment_period="artworks.artwork_movement_period  ilike ?","%#{session[:select][:movement_period]['value']}%"
        elsif session[:select][:movement_period]["search_type"]=="is exactly" 
          movement_period="artworks.artwork_movement_period =?",session[:select][:movement_period]['value']
          elsif session[:select][:movement_period]["search_type"]=="is not" 
          movement_period="artworks.artwork_movement_period !=?",session[:select][:movement_period]['value']
        end
      else
        movement_period= ""
      end
   
      if !session[:select][:height].blank? and !session[:select][:height]['value'].blank?
        if session[:select][:height]["search_type"]=="contains"
          artwork_height="artworks.artwork_height ilike ? AND artworks.artwork_size_unit=?","%#{session[:select][:height]['value']}%",session[:select][:height]['measurement']
        elsif session[:select][:height]["search_type"]=="is exactly"       
          artwork_height="artworks.artwork_height=? AND artworks.artwork_size_unit=?",session[:select][:height]['value'],session[:select][:height]['measurement']
        elsif session[:select][:height]["search_type"]=="is not"        
          artwork_height="artworks.artwork_height!=? AND artworks.artwork_size_unit=?",session[:select][:height]['value'],session[:select][:height]['measurement']
        end
      else
        artwork_height=""
      end

      if !session[:select][:width].blank? and !session[:select][:width]['value'].blank? 
        if session[:select][:width]["search_type"]=="contains"
          artwork_width="artworks.artwork_width ilike ? AND artworks.artwork_size_unit=?","%#{session[:select][:width]['value']}%",session[:select][:width]['measurement']
        elsif session[:select][:width]["search_type"]=="is exactly"       
          artwork_width="artworks.artwork_width=? AND artworks.artwork_size_unit=?",session[:select][:width]['value'],session[:select][:width]['measurement']
        elsif session[:select][:width]["search_type"]=="is not"        
          artwork_wsessionidth="artworks.artwork_width!=? AND artworks.artwork_size_unit=?",session[:select][:width]['value'],session[:select][:width]['measurement']
        end
      else
        artwork_width=""
      end     

      if !session[:select][:depth].blank? and !session[:select][:depth]['value'].blank? 
        if session[:select][:depth]["search_type"]=="contains"
          artwork_depth="artworks.artwork_depth ilike ? AND artworks.artwork_size_unit=?","%#{session[:select][:depth]['value']}%",session[:select][:depth]['measurement']
        elsif session[:select][:depth]["search_type"]=="is exactly"       
          artwork_depth="artworks.artwork_depth=? AND artworks.artwork_size_unit=?",session[:select][:depth]['value'],session[:select][:depth]['measurement']
        elsif session[:select][:depth]["search_type"]=="is not"        
          artwork_depth="artworks.artwork_depth!=? AND artworks.artwork_size_unit=?",session[:select][:depth]['value'],session[:select][:depth]['measurement']
        end
      else
        artwork_depth=""
      end

      if !session[:select][:signature].blank?
        if session[:select][:signature]['existance']=="exists"
          artwork_signature="artworks.artwork_signature_check =? ",true
        else
          artwork_signature="artworks.artwork_signature_check =? ",false
        end
      else
        artwork_signature=""  
      end
     
      if !session[:select][:frame].blank?
        if session[:select][:frame]['existance']=="exists"
          artwork_frame="artworks.artwork_frame_check =? ",true
        else
          artwork_frame="artworks.artwork_frame_check =? ",false
        end
      else
        artwork_frame=""  
      end

      if !session[:select][:certificate].blank?
        if session[:select][:certificate]['existance']=="exists"
          artwork_certificate="artworks.artwork_certificate_check =? ",true
        else
          artwork_certificate="artworks.artwork_certificate_check =? ",false
        end
      else
        artwork_certificate=""  
      end

      if !session[:select][:offer_type].blank?
        offer_type="offers.offer_type =? ",session[:select][:offer_type]['value'] 
      else
        offer_type=""
      end


     if !session[:select][:submit_date].blank?      
        offer_start_date = Date.strptime(session[:select][:submit_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        
        if session[:select][:submit_date]["search_type"]=="is exactly"       
         artwork_start_date="offers.offer_start_date =?",offer_start_date
        elsif session[:select][:submit_date]["search_type"]=="is before"        
         artwork_start_date="offers.offer_start_date < ? ",offer_start_date
        elsif session[:select][:submit_date]["search_type"]=="is after"        
         artwork_start_date="offers.offer_start_date > ? ",offer_start_date
        end      
     else
       artwork_start_date=""
     end 

      if !session[:select][:offer_end_date].blank?      
        offer_end_date = session[:select][:offer_end_date]['value']
        if offer_end_date.blank?
          ""
        else
          if session[:select][:offer_end_date]["search_type"]=="is exactly"
             artwork_end_date = "offers.offer_end_date =?",offer_end_date
          elsif session[:select][:offer_end_date]["search_type"]=="is before"
            artwork_end_date = "offers.offer_end_date < ? ",offer_end_date
          elsif session[:select][:offer_end_date]["search_type"]=="is after"
            artwork_end_date = "offers.offer_end_date > ? ",offer_end_date
          end
        end
      else
        artwork_end_date = ""
      end
    if !session[:select][:country].blank?
      if session[:select][:country]['name'].blank?
        ""
      else
        country_name="artworks.artwork_country = ?", session[:select][:country]['name']
      end
    else
      country_name = ""
    end

    begin
      @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance).paginate :per_page => per_page, :page => page
    rescue
      @offers = []
    end

    else
      session["last_search_basic"] = true
      session["last_search_advanced"] = false

      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      @offers     = Offer.new.search_results(search_item, page, per_page, sort_by)

      respond_to do |format|
        format.html 
        format.js
      end
    end
  end

  def buy_art_search_advanced
    @user       = current_user
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    search_item = (session[:search_item] || "") if request.get?
    search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
    @offers     = Offer.new.search_results(search_item, page, per_page, sort_by)

    respond_to do |format|
      format.html { render "offer/buy_art_search"}
      format.js { render "offer/buy_art_search"}
    end
  end
  
  def delete_offer
    Offer.destroy(params["id"])
    @user = current_user
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    sort_by     = params[:sort_by]      || "artist name"
    offer_show  = params[:offer_show]   || ""
    @offers_online_count = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, "show all offers").count
    @offers              = Offer.new.sell_art_area_data(current_user.id, page, per_page, sort_by, offer_show)
    respond_to do |format|
      format.js { render "/offer/delete_offer/delete_offer"}
    end
  end

  def user_favourites
    @user           = current_user
    per_page        = params[:per_page] || 6
    page            = params[:page]     || 1
    sort_by         = params[:sort_by]  || ""
    search_item     = (session[:search_item] || "") if request.get?
    search_item     = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
    favourites_list = current_user.favourites.map{|favourite| favourite.offer_id}
    @offers         = Offer.new.search_results_in_favourites(favourites_list,search_item, page, per_page, sort_by)

    respond_to do |format|
      format.js   { render "offer/buy-art/user_favourites/favourites_data" }
      format.html { render "offer/buy-art/user_favourites/favourites" }
    end
  end

  def buy_art_search_redirect
    session[:select] = nil
    session["search_item"] = nil
    redirect_to "/buy-art/search"
  end

  def get_relavant_form_data
    category = params[:category]
    @medium = []
    medium = Property.where("key = 'medium' and language = ?", I18n.locale)
    medium.each do |med|
      if med.value.split(': ')[0] == category
        @medium.push med.value.split(': ')[1]
      end
    end
    render :json => @medium
  end
  def message_status
    Message.find_all_by_offer_id(params[:offer_id]).map{|temp| temp.update_attributes(:message_read=>true)}
    render :nothing=> true
  end
end