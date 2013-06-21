class Offer < ActiveRecord::Base
  attr_accessible :offer_type, :offer_status, :buyer_id, :seller_id, :offer_price, :offer_start_date, :offer_end_date, :artwork_id, :artist_id, :created_at, :updated_at, :offer_cancellation_reason, :offer_popularity
  has_one :artwork, :dependent => :destroy
  has_many :favourites, :dependent => :destroy
  belongs_to :user, :foreign_key => 'seller_id'
  has_many :messages, :dependent => :destroy
  has_many :forum_messages
  has_many :message_admin

  def advanced_search_sort_by option
    case option
      when "artist name"
        "lower(artists.artist_name) asc"
      when "time left"
        "offers.offer_end_date asc"
      when "popularity"
        "offers.offer_popularity desc"
      when "date"
        "offers.offer_start_date asc"
      else
        "" 
    end
  end


  def search_results_in_favourites(favourites_list,search_item, page, per_page, sort_by)

    favourites_list = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    Offer.where(favourites_list_condition).joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
    .where("offers.offer_status = true")
    .where("artwork_descriptions.artwork_description_en ilike ? OR
      artwork_descriptions.artwork_description_ch ilike ? OR 
      artwork_descriptions.artwork_description_fi ilike ? OR 
      artwork_descriptions.artwork_description_fr ilike ? OR 
      artwork_descriptions.artwork_description_ne ilike ? OR 
      artwork_titles.artwork_title_en ilike ? OR 
      artwork_titles.artwork_title_fi ilike ? OR 
      artwork_titles.artwork_title_ch ilike ? OR 
      artwork_titles.artwork_title_fr ilike ? OR 
      artwork_titles.artwork_title_ne ilike ? OR 
      artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
      .order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end

  def search_results_complete(search_item)
    if search_item.blank?
      Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where("offers.offer_status = true")
    else
      Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
      .where("offers.offer_status = true")
      .where("artwork_descriptions.artwork_description_en ilike ? OR 
        artwork_descriptions.artwork_description_ch ilike ? OR 
        artwork_descriptions.artwork_description_fi ilike ? OR 
        artwork_descriptions.artwork_description_fr ilike ? OR 
        artwork_descriptions.artwork_description_ne ilike ? OR 
        artwork_titles.artwork_title_en ilike ? OR 
        artwork_titles.artwork_title_fi ilike ? OR 
        artwork_titles.artwork_title_ch ilike ? OR 
        artwork_titles.artwork_title_fr ilike ? OR 
        artwork_titles.artwork_title_ne ilike ? OR 
        artworks.artwork_category ilike ? OR 
        artworks.artwork_medium ilike ? OR 
        artworks.artwork_country ilike ? OR 
        artworks.artwork_movement_period ilike ? OR 
        offers.offer_type ilike ? OR
        artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    end
  end

  def advanced_search_results search_params, page, per_page, sort_by
    if search_params.blank?
      Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where("offers.offer_status = true").order(advanced_search_sort_by(sort_by)).paginate :per_page => per_page, :page => page
    else
      if !search_params[:artist].blank?
        if search_params[:artist]["search_type"].blank?
          artist_name = ""
        else
          if search_params[:artist]["search_type"] == "contains"
            artist_name = "artists.artist_name ilike ?","%#{search_params[:artist]['value']}%"
          elsif search_params[:artist]["search_type"] == "is exactly"       
            artist_name = "artists.artist_name=?",search_params[:artist]['value']
          elsif search_params[:artist]["search_type"] == "is not"        
            artist_name = "artists.artist_name!=?",search_params[:artist]['value']
          end
        end
      else
        artist_name = ""
      end

      if !search_params[:title].blank?
        if search_params[:title]['value'].blank?
          title_name = ""
        else
          if search_params[:title]["search_type"] == "contains"
            title_name = "artwork_titles.artwork_title_en ilike ? OR 
                       artwork_titles.artwork_title_fi ilike ? OR 
                       artwork_titles.artwork_title_ch ilike ? OR 
                       artwork_titles.artwork_title_fr ilike ? OR 
                       artwork_titles.artwork_title_ne ilike ? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is exactly"       
            title_name = "artwork_titles.artwork_title_en =? OR 
                      artwork_titles.artwork_title_fi =? OR 
                      artwork_titles.artwork_title_ch =? OR 
                      artwork_titles.artwork_title_fr =? OR 
                      artwork_titles.artwork_title_ne =? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is not"        
            title_name = "artwork_titles.artwork_title_en !=? OR 
                       artwork_titles.artwork_title_fi !=? OR 
                       artwork_titles.artwork_title_ch !=? OR 
                       artwork_titles.artwork_title_fr !=? OR 
                       artwork_titles.artwork_title_ne !=? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          end
        end
      else
        title_name = ""
      end

      if !search_params[:description].blank? 
        if search_params[:description]["search_type"].blank?
          desc_name = ""
        else
          if search_params[:description]["search_type"] == "contains"
            desc_name = "artwork_descriptions.artwork_description_ch ilike ? OR 
                      artwork_descriptions.artwork_description_fi ilike ? OR 
                      artwork_descriptions.artwork_description_fr ilike ? OR 
                      artwork_descriptions.artwork_description_ne ilike ? ","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is exactly"       
            desc_name = "artwork_descriptions.artwork_description_ch =? OR 
                      artwork_descriptions.artwork_description_fi =? OR 
                      artwork_descriptions.artwork_description_fr =? OR 
                      artwork_descriptions.artwork_description_ne =? ",search_params[:description]['value'],"%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is not"        
            desc_name = "artwork_descriptions.artwork_description_ch !=? OR 
                      artwork_descriptions.artwork_description_fi !=? OR 
                      artwork_descriptions.artwork_description_fr !=? OR 
                      artwork_descriptions.artwork_description_ne !=?  ","#{search_params[:description]['value']}","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          end
        end
      else
        desc_name = ""
      end

      if !search_params[:year_of_creation].blank? 
        if !search_params[:year_of_creation]['value'].blank?
          if search_params[:year_of_creation]["search_type"] == "is exactly" 
            year_creation = "artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['value'],search_params[:year_of_creation]['duration']
          elsif search_params[:year_of_creation]["search_type"]=="is before"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR artworks.artwork_creation_year_era = 'BC'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            end
          elsif search_params[:year_of_creation]["search_type"] == "is after"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR (artworks.artwork_creation_year_era = 'AD')"
            end
          end
        else
          year_creation = "artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['duration']
        end 
      else
        year_creation = ""
      end
    
      if !search_params[:category].blank? and search_params[:category]['name'] != "any"
        if search_params[:category]["search_type"] == "is"
          artwork_category = "artworks.artwork_category=? AND artworks.artwork_medium=?",search_params[:category]['name'],search_params[:category]['sub_name']
        elsif search_params[:category]["search_type"] == "is not" 
          artwork_category = "artworks.artwork_category!=? AND artworks.artwork_medium!=?",search_params[:category]['name'],search_params[:category]['sub_name']
        end
      else
        artwork_category = ""
      end

      if !search_params[:movement_period].blank?
        if search_params[:movement_period]["search_type"] == "contains"
          movesessionment_period = "artworks.artwork_movement_period  ilike ?","%#{search_params[:movement_period]['value']}%"
        elsif search_params[:movement_period]["search_type"] == "is exactly" 
          movement_period = "artworks.artwork_movement_period =?",search_params[:movement_period]['value']
          elsif search_params[:movement_period]["search_type"] == "is not" 
          movement_period = "artworks.artwork_movement_period !=?",search_params[:movement_period]['value']
        end
      else
        movement_period = ""
      end
   
      if !search_params[:height].blank? and !search_params[:height]['value'].blank?
        if search_params[:height]["search_type"] == "contains"
          artwork_height = "artworks.artwork_height ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:height]['value']}%",search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is exactly"       
          artwork_height = "artworks.artwork_height=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is not"        
          artwork_height = "artworks.artwork_height!=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        end
      else
        artwork_height =""
      end

      if !search_params[:width].blank? and !search_params[:width]['value'].blank? 
        if search_params[:width]["search_type"] == "contains"
          artwork_width = "artworks.artwork_width ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:width]['value']}%",search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is exactly"       
          artwork_width = "artworks.artwork_width=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is not"        
          artwork_wsessionidth = "artworks.artwork_width!=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        end
      else
        artwork_width = ""
      end

      if !search_params[:depth].blank? and !search_params[:depth]['value'].blank? 
        if search_params[:depth]["search_type"] == "contains"
          artwork_depth = "artworks.artwork_depth ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:depth]['value']}%",search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is exactly"       
          artwork_depth = "artworks.artwork_depth=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is not"        
          artwork_depth = "artworks.artwork_depth!=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        end
      else
        artwork_depth = ""
      end

      if !search_params[:signature].blank?
        if search_params[:signature]['existance'] == "exists"
          artwork_signature = "artworks.artwork_signature_check =? ",true
        else
          artwork_signature = "artworks.artwork_signature_check =? ",false
        end
      else
        artwork_signature = ""
      end
     
      if !search_params[:frame].blank?
        if search_params[:frame]['existance'] == "exists"
          artwork_frame = "artworks.artwork_frame_check =? ",true
        else
          artwork_frame = "artworks.artwork_frame_check =? ",false
        end
      else
        artwork_frame = ""
      end

      if !search_params[:certificate].blank?
        if search_params[:certificate]['existance'] == "exists"
          artwork_certificate = "artworks.artwork_certificate_check =? ",true
        else
          artwork_certificate = "artworks.artwork_certificate_check =? ",false
        end
      else
        artwork_certificate = ""  
      end

      if !search_params[:offer_type].blank?
        offer_type = "offers.offer_type =? ",search_params[:offer_type]['value'] 
      else
        offer_type = ""
      end


      if !search_params[:submit_date].blank?      
        offer_start_date = Date.strptime(search_params[:submit_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        if search_params[:submit_date]["search_type"]=="is exactly"       
          artwork_start_date = "offers.offer_start_date =?",offer_start_date
        elsif search_params[:submit_date]["search_type"]=="is before"        
          artwork_start_date = "offers.offer_start_date < ? ",offer_start_date
        elsif search_params[:submit_date]["search_type"]=="is after"        
          artwork_start_date = "offers.offer_start_date > ? ",offer_start_date
        end      
      else
        artwork_start_date = ""
      end 

      if !search_params[:offer_end_date].blank?      
        offer_end_date = search_params[:offer_end_date]['value']
        if offer_end_date.blank?
          artwork_end_date = ""
        else
          if search_params[:offer_end_date]["search_type"]=="is exactly"
             artwork_end_date = "offers.offer_end_date =?",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is before"
            artwork_end_date = "offers.offer_end_date < ? ",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is after"
            artwork_end_date = "offers.offer_end_date > ? ",offer_end_date
          end
        end
      else
        artwork_end_date = ""
      end

      if !search_params[:country].blank?
        if search_params[:country]['name'].blank?
          country_name = ""
        else
          country_name = "artworks.artwork_country = ?", search_params[:country]['name']
        end
      else
        country_name = ""
      end

      @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where("offers.offer_status = true").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(advanced_search_sort_by(sort_by)).paginate :per_page => per_page, :page => page
    end
  end

  def wishlist_basic_search_results(search_item, page, per_page, sort_by)
    if search_item.blank?
    end
    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
    .where("offers.offer_status = true")
    .where("artwork_descriptions.artwork_description_en ilike ? OR 
      artwork_descriptions.artwork_description_ch ilike ? OR 
      artwork_descriptions.artwork_description_fi ilike ? OR 
      artwork_descriptions.artwork_description_fr ilike ? OR 
      artwork_descriptions.artwork_description_ne ilike ? OR 
      artwork_titles.artwork_title_en ilike ? OR 
      artwork_titles.artwork_title_fi ilike ? OR 
      artwork_titles.artwork_title_ch ilike ? OR 
      artwork_titles.artwork_title_fr ilike ? OR 
      artwork_titles.artwork_title_ne ilike ? OR 
      artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    .order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end

  def search_results(search_item, page, per_page, sort_by)
    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
    .where("offers.offer_status = true")
    .where("artwork_descriptions.artwork_description_en ilike ? OR 
      artwork_descriptions.artwork_description_ch ilike ? OR 
      artwork_descriptions.artwork_description_fi ilike ? OR 
      artwork_descriptions.artwork_description_fr ilike ? OR 
      artwork_descriptions.artwork_description_ne ilike ? OR 
      artwork_titles.artwork_title_en ilike ? OR 
      artwork_titles.artwork_title_fi ilike ? OR 
      artwork_titles.artwork_title_ch ilike ? OR 
      artwork_titles.artwork_title_fr ilike ? OR 
      artwork_titles.artwork_title_ne ilike ? OR 
      artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    .order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end


  def admin_user_offers_search_advanced(search_params, page, per_page, sort_by, user_id, offer_status)
    if search_params.blank?
      Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(search_results_show_active_inactive(offer_status)).order(advanced_search_sort_by(sort_by)).paginate :per_page => per_page, :page => page
    else
      if !search_params[:artist].blank?
        if search_params[:artist]["search_type"].blank?
          artist_name = ""
        else
          if search_params[:artist]["search_type"] == "contains"
            artist_name = "artists.artist_name ilike ?","%#{search_params[:artist]['value']}%"
          elsif search_params[:artist]["search_type"] == "is exactly"       
            artist_name = "artists.artist_name=?",search_params[:artist]['value']
          elsif search_params[:artist]["search_type"] == "is not"        
            artist_name = "artists.artist_name!=?",search_params[:artist]['value']
          end
        end
      else
        artist_name = ""
      end

      if !search_params[:title].blank?
        if search_params[:title]['value'].blank?
          title_name = ""
        else
          if search_params[:title]["search_type"] == "contains"
            title_name = "artwork_titles.artwork_title_en ilike ? OR 
                       artwork_titles.artwork_title_fi ilike ? OR 
                       artwork_titles.artwork_title_ch ilike ? OR 
                       artwork_titles.artwork_title_fr ilike ? OR 
                       artwork_titles.artwork_title_ne ilike ? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is exactly"       
            title_name = "artwork_titles.artwork_title_en =? OR 
                      artwork_titles.artwork_title_fi =? OR 
                      artwork_titles.artwork_title_ch =? OR 
                      artwork_titles.artwork_title_fr =? OR 
                      artwork_titles.artwork_title_ne =? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is not"        
            title_name = "artwork_titles.artwork_title_en !=? OR 
                       artwork_titles.artwork_title_fi !=? OR 
                       artwork_titles.artwork_title_ch !=? OR 
                       artwork_titles.artwork_title_fr !=? OR 
                       artwork_titles.artwork_title_ne !=? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          end
        end
      else
        title_name = ""
      end

      if !search_params[:description].blank? 
        if search_params[:description]["search_type"].blank?
          desc_name = ""
        else
          if search_params[:description]["search_type"] == "contains"
            desc_name = "artwork_descriptions.artwork_description_ch ilike ? OR 
                      artwork_descriptions.artwork_description_fi ilike ? OR 
                      artwork_descriptions.artwork_description_fr ilike ? OR 
                      artwork_descriptions.artwork_description_ne ilike ? ","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is exactly"       
            desc_name = "artwork_descriptions.artwork_description_ch =? OR 
                      artwork_descriptions.artwork_description_fi =? OR 
                      artwork_descriptions.artwork_description_fr =? OR 
                      artwork_descriptions.artwork_description_ne =? ",search_params[:description]['value'],"%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is not"        
            desc_name = "artwork_descriptions.artwork_description_ch !=? OR 
                      artwork_descriptions.artwork_description_fi !=? OR 
                      artwork_descriptions.artwork_description_fr !=? OR 
                      artwork_descriptions.artwork_description_ne !=?  ","#{search_params[:description]['value']}","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          end
        end
      else
        desc_name = ""
      end

      if !search_params[:year_of_creation].blank? 
        if !search_params[:year_of_creation]['value'].blank?
          if search_params[:year_of_creation]["search_type"] == "is exactly" 
            year_creation = "artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['value'],search_params[:year_of_creation]['duration']
          elsif search_params[:year_of_creation]["search_type"]=="is before"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR artworks.artwork_creation_year_era = 'BC'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            end
          elsif search_params[:year_of_creation]["search_type"] == "is after"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR (artworks.artwork_creation_year_era = 'AD')"
            end
          end
        else
          year_creation = "artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['duration']
        end 
      else
        year_creation = ""
      end
    
      if !search_params[:category].blank? and search_params[:category]['name'] != "any"
        if search_params[:category]["search_type"] == "is"
          artwork_category = "artworks.artwork_category=? AND artworks.artwork_medium=?",search_params[:category]['name'],search_params[:category]['sub_name']
        elsif search_params[:category]["search_type"] == "is not" 
          artwork_category = "artworks.artwork_category!=? AND artworks.artwork_medium!=?",search_params[:category]['name'],search_params[:category]['sub_name']
        end
      else
        artwork_category = ""
      end

      if !search_params[:movement_period].blank?
        if search_params[:movement_period]["search_type"] == "contains"
          movesessionment_period = "artworks.artwork_movement_period  ilike ?","%#{search_params[:movement_period]['value']}%"
        elsif search_params[:movement_period]["search_type"] == "is exactly" 
          movement_period = "artworks.artwork_movement_period =?",search_params[:movement_period]['value']
          elsif search_params[:movement_period]["search_type"] == "is not" 
          movement_period = "artworks.artwork_movement_period !=?",search_params[:movement_period]['value']
        end
      else
        movement_period = ""
      end
   
      if !search_params[:height].blank? and !search_params[:height]['value'].blank?
        if search_params[:height]["search_type"] == "contains"
          artwork_height = "artworks.artwork_height ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:height]['value']}%",search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is exactly"       
          artwork_height = "artworks.artwork_height=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is not"        
          artwork_height = "artworks.artwork_height!=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        end
      else
        artwork_height =""
      end

      if !search_params[:width].blank? and !search_params[:width]['value'].blank? 
        if search_params[:width]["search_type"] == "contains"
          artwork_width = "artworks.artwork_width ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:width]['value']}%",search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is exactly"       
          artwork_width = "artworks.artwork_width=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is not"        
          artwork_wsessionidth = "artworks.artwork_width!=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        end
      else
        artwork_width = ""
      end

      if !search_params[:depth].blank? and !search_params[:depth]['value'].blank? 
        if search_params[:depth]["search_type"] == "contains"
          artwork_depth = "artworks.artwork_depth ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:depth]['value']}%",search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is exactly"       
          artwork_depth = "artworks.artwork_depth=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is not"        
          artwork_depth = "artworks.artwork_depth!=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        end
      else
        artwork_depth = ""
      end

      if !search_params[:signature].blank?
        if search_params[:signature]['existance'] == "exists"
          artwork_signature = "artworks.artwork_signature_check =? ",true
        else
          artwork_signature = "artworks.artwork_signature_check =? ",false
        end
      else
        artwork_signature = ""
      end
     
      if !search_params[:frame].blank?
        if search_params[:frame]['existance'] == "exists"
          artwork_frame = "artworks.artwork_frame_check =? ",true
        else
          artwork_frame = "artworks.artwork_frame_check =? ",false
        end
      else
        artwork_frame = ""
      end

      if !search_params[:certificate].blank?
        if search_params[:certificate]['existance'] == "exists"
          artwork_certificate = "artworks.artwork_certificate_check =? ",true
        else
          artwork_certificate = "artworks.artwork_certificate_check =? ",false
        end
      else
        artwork_certificate = ""  
      end

      if !search_params[:offer_type].blank?
        offer_type = "offers.offer_type =? ",search_params[:offer_type]['value'] 
      else
        offer_type = ""
      end


      if !search_params[:submit_date].blank?      
        created_at = Date.strptime(search_params[:submit_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        if search_params[:submit_date]["search_type"]=="is exactly"       
          artwork_start_date = "offers.created_at =?",created_at
        elsif search_params[:submit_date]["search_type"]=="is before"        
          artwork_start_date = "offers.created_at < ? ",created_at
        elsif search_params[:submit_date]["search_type"]=="is after"        
          artwork_start_date = "offers.created_at > ? ",created_at
        end      
      else
        artwork_start_date = ""
      end 

      if !search_params[:offer_end_date].blank?      
        offer_end_date = search_params[:offer_end_date]['value']
        if offer_end_date.blank?
          artwork_end_date = ""
        else
          if search_params[:offer_end_date]["search_type"]=="is exactly"
             artwork_end_date = "offers.offer_end_date =?",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is before"
            artwork_end_date = "offers.offer_end_date < ? ",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is after"
            artwork_end_date = "offers.offer_end_date > ? ",offer_end_date
          end
        end
      else
        artwork_end_date = ""
      end

      if !search_params[:country].blank?
        if search_params[:country]['name'].blank?
          country_name = ""
        else
          country_name = "artworks.artwork_country = ?", search_params[:country]['name']
        end
      else
        country_name = ""
      end

      @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(search_results_show_active_inactive(offer_status)).where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(advanced_search_sort_by(sort_by)).where("seller_id = ?", user_id).paginate :per_page => per_page, :page => page
    end
    
  end

  def admin_user_offers_search_basic(search_item, page, per_page, sort_by, seller_id, offer_status)
    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where("seller_id = ? ",seller_id)
    .where(search_results_show_active_inactive(offer_status))
    .where("artwork_descriptions.artwork_description_en ilike ? OR 
      artwork_descriptions.artwork_description_ch ilike ? OR 
      artwork_descriptions.artwork_description_fi ilike ? OR 
      artwork_descriptions.artwork_description_fr ilike ? OR 
      artwork_descriptions.artwork_description_ne ilike ? OR 
      artwork_titles.artwork_title_en ilike ? OR 
      artwork_titles.artwork_title_fi ilike ? OR 
      artwork_titles.artwork_title_ch ilike ? OR 
      artwork_titles.artwork_title_fr ilike ? OR 
      artwork_titles.artwork_title_ne ilike ? OR 
      artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    .order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end

  def admin_user_favourites_search_advanced(favourites_list, search_params, page, per_page, sort_by, user_id, offer_status)

    if search_params.blank?
      Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(search_results_show_active_inactive(offer_status)).order(advanced_search_sort_by(sort_by)).paginate :per_page => per_page, :page => page
    else
      if !search_params[:artist].blank?
        if search_params[:artist]["search_type"].blank?
          artist_name = ""
        else
          if search_params[:artist]["search_type"] == "contains"
            artist_name = "artists.artist_name ilike ?","%#{search_params[:artist]['value']}%"
          elsif search_params[:artist]["search_type"] == "is exactly"       
            artist_name = "artists.artist_name=?",search_params[:artist]['value']
          elsif search_params[:artist]["search_type"] == "is not"        
            artist_name = "artists.artist_name!=?",search_params[:artist]['value']
          end
        end
      else
        artist_name = ""
      end

      if !search_params[:title].blank?
        if search_params[:title]['value'].blank?
          title_name = ""
        else
          if search_params[:title]["search_type"] == "contains"
            title_name = "artwork_titles.artwork_title_en ilike ? OR 
                       artwork_titles.artwork_title_fi ilike ? OR 
                       artwork_titles.artwork_title_ch ilike ? OR 
                       artwork_titles.artwork_title_fr ilike ? OR 
                       artwork_titles.artwork_title_ne ilike ? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is exactly"       
            title_name = "artwork_titles.artwork_title_en =? OR 
                      artwork_titles.artwork_title_fi =? OR 
                      artwork_titles.artwork_title_ch =? OR 
                      artwork_titles.artwork_title_fr =? OR 
                      artwork_titles.artwork_title_ne =? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          elsif search_params[:title]["search_type"] == "is not"        
            title_name = "artwork_titles.artwork_title_en !=? OR 
                       artwork_titles.artwork_title_fi !=? OR 
                       artwork_titles.artwork_title_ch !=? OR 
                       artwork_titles.artwork_title_fr !=? OR 
                       artwork_titles.artwork_title_ne !=? ","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%","%#{search_params[:title]['value']}%"
          end
        end
      else
        title_name = ""
      end

      if !search_params[:description].blank? 
        if search_params[:description]["search_type"].blank?
          desc_name = ""
        else
          if search_params[:description]["search_type"] == "contains"
            desc_name = "artwork_descriptions.artwork_description_ch ilike ? OR 
                      artwork_descriptions.artwork_description_fi ilike ? OR 
                      artwork_descriptions.artwork_description_fr ilike ? OR 
                      artwork_descriptions.artwork_description_ne ilike ? ","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is exactly"       
            desc_name = "artwork_descriptions.artwork_description_ch =? OR 
                      artwork_descriptions.artwork_description_fi =? OR 
                      artwork_descriptions.artwork_description_fr =? OR 
                      artwork_descriptions.artwork_description_ne =? ",search_params[:description]['value'],"%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          elsif search_params[:description]["search_type"] == "is not"        
            desc_name = "artwork_descriptions.artwork_description_ch !=? OR 
                      artwork_descriptions.artwork_description_fi !=? OR 
                      artwork_descriptions.artwork_description_fr !=? OR 
                      artwork_descriptions.artwork_description_ne !=?  ","#{search_params[:description]['value']}","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%","%#{search_params[:description]['value']}%"
          end
        end
      else
        desc_name = ""
      end

      if !search_params[:year_of_creation].blank? 
        if !search_params[:year_of_creation]['value'].blank?
          if search_params[:year_of_creation]["search_type"] == "is exactly" 
            year_creation = "artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['value'],search_params[:year_of_creation]['duration']
          elsif search_params[:year_of_creation]["search_type"]=="is before"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR artworks.artwork_creation_year_era = 'BC'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            end
          elsif search_params[:year_of_creation]["search_type"] == "is after"
            if search_params[:year_of_creation]['duration'] == "AD"
              year_creation = "artworks.artwork_creation_year > '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}'"
            elsif search_params[:year_of_creation]['duration'] == "BC"
              year_creation = "(artworks.artwork_creation_year < '#{search_params[:year_of_creation]['value']}' AND artworks.artwork_creation_year_era = '#{search_params[:year_of_creation]['duration']}') OR (artworks.artwork_creation_year_era = 'AD')"
            end
          end
        else
          year_creation = "artworks.artwork_creation_year_era=?",search_params[:year_of_creation]['duration']
        end 
      else
        year_creation = ""
      end
    
      if !search_params[:category].blank? and search_params[:category]['name'] != "any"
        if search_params[:category]["search_type"] == "is"
          artwork_category = "artworks.artwork_category=? AND artworks.artwork_medium=?",search_params[:category]['name'],search_params[:category]['sub_name']
        elsif search_params[:category]["search_type"] == "is not" 
          artwork_category = "artworks.artwork_category!=? AND artworks.artwork_medium!=?",search_params[:category]['name'],search_params[:category]['sub_name']
        end
      else
        artwork_category = ""
      end

      if !search_params[:movement_period].blank?
        if search_params[:movement_period]["search_type"] == "contains"
          movesessionment_period = "artworks.artwork_movement_period  ilike ?","%#{search_params[:movement_period]['value']}%"
        elsif search_params[:movement_period]["search_type"] == "is exactly" 
          movement_period = "artworks.artwork_movement_period =?",search_params[:movement_period]['value']
          elsif search_params[:movement_period]["search_type"] == "is not" 
          movement_period = "artworks.artwork_movement_period !=?",search_params[:movement_period]['value']
        end
      else
        movement_period = ""
      end
   
      if !search_params[:height].blank? and !search_params[:height]['value'].blank?
        if search_params[:height]["search_type"] == "contains"
          artwork_height = "artworks.artwork_height ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:height]['value']}%",search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is exactly"       
          artwork_height = "artworks.artwork_height=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        elsif search_params[:height]["search_type"] == "is not"        
          artwork_height = "artworks.artwork_height!=? AND artworks.artwork_size_unit=?",search_params[:height]['value'],search_params[:height]['measurement']
        end
      else
        artwork_height =""
      end

      if !search_params[:width].blank? and !search_params[:width]['value'].blank? 
        if search_params[:width]["search_type"] == "contains"
          artwork_width = "artworks.artwork_width ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:width]['value']}%",search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is exactly"       
          artwork_width = "artworks.artwork_width=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        elsif search_params[:width]["search_type"] == "is not"        
          artwork_wsessionidth = "artworks.artwork_width!=? AND artworks.artwork_size_unit=?",search_params[:width]['value'],search_params[:width]['measurement']
        end
      else
        artwork_width = ""
      end

      if !search_params[:depth].blank? and !search_params[:depth]['value'].blank? 
        if search_params[:depth]["search_type"] == "contains"
          artwork_depth = "artworks.artwork_depth ilike ? AND artworks.artwork_size_unit=?","%#{search_params[:depth]['value']}%",search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is exactly"       
          artwork_depth = "artworks.artwork_depth=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        elsif search_params[:depth]["search_type"] == "is not"        
          artwork_depth = "artworks.artwork_depth!=? AND artworks.artwork_size_unit=?",search_params[:depth]['value'],search_params[:depth]['measurement']
        end
      else
        artwork_depth = ""
      end

      if !search_params[:signature].blank?
        if search_params[:signature]['existance'] == "exists"
          artwork_signature = "artworks.artwork_signature_check =? ",true
        else
          artwork_signature = "artworks.artwork_signature_check =? ",false
        end
      else
        artwork_signature = ""
      end
     
      if !search_params[:frame].blank?
        if search_params[:frame]['existance'] == "exists"
          artwork_frame = "artworks.artwork_frame_check =? ",true
        else
          artwork_frame = "artworks.artwork_frame_check =? ",false
        end
      else
        artwork_frame = ""
      end

      if !search_params[:certificate].blank?
        if search_params[:certificate]['existance'] == "exists"
          artwork_certificate = "artworks.artwork_certificate_check =? ",true
        else
          artwork_certificate = "artworks.artwork_certificate_check =? ",false
        end
      else
        artwork_certificate = ""  
      end

      if !search_params[:offer_type].blank?
        offer_type = "offers.offer_type =? ",search_params[:offer_type]['value'] 
      else
        offer_type = ""
      end


      if !search_params[:submit_date].blank?      
        created_at = Date.strptime(search_params[:submit_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        if search_params[:submit_date]["search_type"]=="is exactly"       
          artwork_start_date = "offers.created_at =?",created_at
        elsif search_params[:submit_date]["search_type"]=="is before"        
          artwork_start_date = "offers.created_at < ? ",created_at
        elsif search_params[:submit_date]["search_type"]=="is after"        
          artwork_start_date = "offers.created_at > ? ",created_at
        end      
      else
        artwork_start_date = ""
      end 

      if !search_params[:offer_end_date].blank?      
        offer_end_date = search_params[:offer_end_date]['value']
        if offer_end_date.blank?
          artwork_end_date = ""
        else
          if search_params[:offer_end_date]["search_type"]=="is exactly"
             artwork_end_date = "offers.offer_end_date =?",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is before"
            artwork_end_date = "offers.offer_end_date < ? ",offer_end_date
          elsif search_params[:offer_end_date]["search_type"]=="is after"
            artwork_end_date = "offers.offer_end_date > ? ",offer_end_date
          end
        end
      else
        artwork_end_date = ""
      end

      if !search_params[:country].blank?
        if search_params[:country]['name'].blank?
          country_name = ""
        else
          country_name = "artworks.artwork_country = ?", search_params[:country]['name']
        end
      else
        country_name = ""
      end

      @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).where(favourites_list).where(search_results_show_active_inactive(offer_status)).order(search_results_order_param(sort_by)).paginate :per_page => per_page, :page => page
    end
    
  end

  def admin_user_favourites_search_basic(favourites_list,search_item, page, per_page, sort_by, seller_id,offer_status)

    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
    .where(favourites_list).where(search_results_show_active_inactive(offer_status))
    .where("artwork_descriptions.artwork_description_en ilike ? OR 
      artwork_descriptions.artwork_description_ch ilike ? OR 
      artwork_descriptions.artwork_description_fi ilike ? OR 
      artwork_descriptions.artwork_description_fr ilike ? OR 
      artwork_descriptions.artwork_description_ne ilike ? OR 
      artwork_titles.artwork_title_en ilike ? OR 
      artwork_titles.artwork_title_fi ilike ? OR 
      artwork_titles.artwork_title_ch ilike ? OR 
      artwork_titles.artwork_title_fr ilike ? OR 
      artwork_titles.artwork_title_ne ilike ? OR 
      artworks.artwork_category ilike ? OR 
      artworks.artwork_medium ilike ? OR 
      artworks.artwork_country ilike ? OR 
      artworks.artwork_movement_period ilike ? OR 
      offers.offer_type ilike ? OR
      artists.artist_name ilike ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    .order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end

  def sell_art_area_data (user_id, page, per_page, sort_by, offer_show)
    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
    .where("seller_id = ?", user_id)
    .where(search_results_show_active_inactive(offer_show)).order(search_results_order_param(sort_by)).paginate :page => page, :per_page => per_page
  end

  private

    def search_results_show_active_inactive show
      case show
      when "active"
        "offers.offer_status = true"
      when "inactive"
        "offers.offer_status = false"
      when "show all offers"
        ""
      end
    end

    def search_results_order_param sort_by
      case sort_by
      when "artist name"
        "lower(artists.artist_name) asc"
      when "time left"
        "offers.offer_end_date asc"
      when "popularity"
        "offers.offer_popularity desc"
      when "date"
        "offers.offer_start_date asc"
      when "end date"
        "offers.offer_end_date asc"
      when "messages"
        ""
      else
        "" 
      end
    end
end
