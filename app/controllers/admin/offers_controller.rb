class Admin::OffersController < ApplicationController
 
  before_filter :authenticate_admin_user!
  require 'will_paginate/array' 

  def delete_artist
    Artist.find_by_id(params["artist_id"].to_i).delete
    render :text => "true"
  end

  def delete_offer
    Offer.find_by_id(params["offer_id"].to_i).delete
    render :text => "true"
  end


  def index
    # Offers
    session[:search_item] = ""
    session[:select] = ""
    session[:select_artists] = ""
    session[:search_artist_basic] = ""


    #logger.debug("bbbbbbbbbbbbbb")
    #logger.debug(params["buy_interesting_offers_sort_by"])
    if (params["buy_interesting_offers_sort_by"].nil? && params["show_active_offers_select"].nil? && params["offers_per_page_select"].nil?)
    
      @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc")
      @buy_interesting_offers = @buy_interesting_offers.paginate :page => params[:page] || 1, :per_page => 24
      
    else
     
      buy_interesting_offers_sort_by = params["buy_interesting_offers_sort_by"].to_i || 0
      show_active_offers_select      = params["show_active_offers_select"].to_i || 0

      case buy_interesting_offers_sort_by
      when 0
        @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc")  
      when 1
        @buy_interesting_offers = Offer.order("offer_start_date asc")
      when 2
        @buy_interesting_offers = Offer.order("offer_popularity desc")
      when 3
        @buy_interesting_offers = Offer.order("offer_end_date")
      else
        @buy_interesting_offers = @buy_interesting_offers
      end

      case show_active_offers_select
      when 0
        @buy_interesting_offers = @buy_interesting_offers.all
      when 1
        @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => TRUE)
      when 2
        @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => FALSE)
      end

      @buy_interesting_offers = @buy_interesting_offers.paginate :page => params[:page] || 1, :per_page => params[:offers_per_page_select] || 24
    end
    
    # Demanded painters
    if (params["demanded_artist_sort_by"].nil? && params["period"].nil? && params["painters_per_page"].nil?)
      @demanded_painters = Artist.order("artist_name asc")
      @demanded_painters = @demanded_painters.paginate :page=> params[:page] || 1, :per_page => 6
    else
      demanded_artist_sort_by     = params["demanded_artist_sort_by"].to_i || 0
      period                      = params["period"].to_i || 0

      case demanded_artist_sort_by
      when 0
        @demanded_painters = Artist.order("artist_name asc")
      when 1
        @demanded_painters = Artist.order("approved_status desc")
      when 2
        @demanded_painters = Artist.order("approved_status asc")
      end

      case period
      when 0
        @demanded_painters = @demanded_painters.all
      when 1
        @demanded_painters = @demanded_painters.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (WEEK from created_at) = #{Date.today.cweek-1}")
      when 2
        @demanded_painters = @demanded_painters.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (MONTH from created_at) = #{Date.today.month-1}")
      when 3
        @demanded_painters = @demanded_painters.where("extract (YEAR from created_at) = #{Date.today.year-1}")
      end

      @demanded_painters = @demanded_painters.paginate :page=> params[:page] || 1, :per_page => params[:painters_per_page] || 6
    end

    # Manage artists
    if (params["artist_names_select_sortby"].nil? && params["first_published_select_sortby"].nil? && params["artists_per_page_select"].nil?)
      @artist_names = Artist.order("artist_name")
      @artist_names = @artist_names.paginate :page => params[:page] || 1, :per_page => 12      
    else
      artist_names_select_sortby         = params["artist_names_select_sortby"].to_i || 0
      first_published_select_sortby      = params["first_published_select_sortby"].to_i || 0

      case artist_names_select_sortby
      when 0
        @artist_names = Artist.order("artist_name")
      when 1
        @artist_names = Artist.order("split_part(artist_name, ' ',2)")
      when 2
        @artist_names = Artist.order("artist_birth_year")
      when 3
        @artist_names = Artist.order("artist_death_year")
      when 4
        @artist_names = Artist.order("approved_status desc")
      when 5
        @artist_names = Artist.order("approved_status asc")

      end

      case first_published_select_sortby
      when 0
        @artist_names = @artist_names.all
      when 1
        @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (WEEK from created_at) = #{Date.today.cweek-1}")
      when 2
        @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (MONTH from created_at) = #{Date.today.month-1}")
      when 3
        @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year-1}")
      end

      @artist_names = @artist_names.paginate :page => params[:page] || 1, :per_page => params[:artists_per_page_select] || 12
    end

    respond_to do |format|
        format.js { render "admin/offers/index"}          # Make it comment after working on demanded painters
        format.html
    end
    return
  end

  

  def buy_art_search    

    if (params[:offer].blank? && params["buy_interesting_offers_sort_by"].nil? && params["show_active_offers_select"].nil? && params["offers_per_page_select"].nil?)
      @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id").order("lower(artists.artist_name) asc")
      @buy_interesting_offers = @buy_interesting_offers.paginate :page => params[:page] || 1, :per_page => 24
    else
      buy_interesting_offers_sort_by = params["buy_interesting_offers_sort_by"].to_i || 0
      show_active_offers_select      = params["show_active_offers_select"].to_i || 0

      #logger.debug(params["buy_interesting_offers_sort_by"])
      #logger.debug("aaaaaaaaaaaaaaaaaaaaaaa")
      if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
        #logger.debug("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        session["last_search_advanced"] = true
        session["last_search_basic"] = false
        sort_by_advance = case buy_interesting_offers_sort_by
        when 0
          "lower(artists.artist_name) asc"
        when 1
          "offers.offer_start_date asc"
        when 2
          "offers.offer_popularity desc" 
        when 3
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
                        artwork_titles.artwork_title_ne =? ",session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value']
            elsif session[:select][:title]["search_type"]=="is not"        
              title_name ="artwork_titles.artwork_title_en !=? OR 
                         artwork_titles.artwork_title_fi !=? OR 
                         artwork_titles.artwork_title_ch !=? OR 
                         artwork_titles.artwork_title_fr !=? OR 
                         artwork_titles.artwork_title_ne !=? ",session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value'],session[:select][:title]['value']
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
                        artwork_descriptions.artwork_description_ne =? ",session[:select][:description]['value'],session[:select][:description]['value'],session[:select][:description]['value'],session[:select][:description]['value']
            elsif session[:select][:description]["search_type"]=="is not"        
              desc_name = "artwork_descriptions.artwork_description_ch !=? OR 
                        artwork_descriptions.artwork_description_fi !=? OR 
                        artwork_descriptions.artwork_description_fr !=? OR 
                        artwork_descriptions.artwork_description_ne !=?  ",session[:select][:description]['value'],session[:select][:description]['value'],session[:select][:description]['value'],session[:select][:description]['value']
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
      
        if !session[:select][:category].blank?
          if session[:select][:category]['name']=="any"
            if session[:select][:category]["search_type"]=="is"
              artwork_category=""
            elsif session[:select][:category]["search_type"]=="is not" 
              artwork_category="artworks.artwork_category=?","1111111111111111111"
            end
          elsif session[:select][:category]['name']!="any"
            if session[:select][:category]["search_type"]=="is"
              artwork_category="artworks.artwork_category=? AND artworks.artwork_medium=?",session[:select][:category]['name'],session[:select][:category]['sub_name']
            elsif session[:select][:category]["search_type"]=="is not" 
              artwork_category="artworks.artwork_category!=? AND artworks.artwork_medium!=?",session[:select][:category]['name'],session[:select][:category]['sub_name']
            end
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
          if session[:select][:height]["search_type"]=="is exactly"
            artwork_height="artworks.artwork_height = ? AND artworks.artwork_size_unit=?",session[:select][:height]['value'],session[:select][:height]['measurement']
          elsif session[:select][:height]["search_type"]=="is smaller than"       
            artwork_height="artworks.artwork_height < ? AND artworks.artwork_size_unit=?",session[:select][:height]['value'],session[:select][:height]['measurement']
          elsif session[:select][:height]["search_type"]=="is larger than"        
            artwork_height="artworks.artwork_height > ? AND artworks.artwork_size_unit=?",session[:select][:height]['value'],session[:select][:height]['measurement']
          end
        else
          artwork_height=""
        end

        if !session[:select][:width].blank? and !session[:select][:width]['value'].blank? 
          if session[:select][:width]["search_type"]=="is exactly"
            artwork_width="artworks.artwork_width = ? AND artworks.artwork_size_unit=?",session[:select][:width]['value'],session[:select][:width]['measurement']
          elsif session[:select][:width]["search_type"]=="is smaller than"       
            artwork_width="artworks.artwork_width < ? AND artworks.artwork_size_unit=?",session[:select][:width]['value'],session[:select][:width]['measurement']
          elsif session[:select][:width]["search_type"]=="is larger than"        
            artwork_wsessionidth="artworks.artwork_width > ? AND artworks.artwork_size_unit=?",session[:select][:width]['value'],session[:select][:width]['measurement']
          end
        else
          artwork_width=""
        end     

        if !session[:select][:depth].blank? and !session[:select][:depth]['value'].blank? 
          if session[:select][:depth]["search_type"]=="is exactly"
            artwork_depth="artworks.artwork_depth = ? AND artworks.artwork_size_unit=?",session[:select][:depth]['value'],session[:select][:depth]['measurement']
          elsif session[:select][:depth]["search_type"]=="is smaller than"       
            artwork_depth="artworks.artwork_depth < ? AND artworks.artwork_size_unit=?",session[:select][:depth]['value'],session[:select][:depth]['measurement']
          elsif session[:select][:depth]["search_type"]=="is larger than"        
            artwork_depth="artworks.artwork_depth > ? AND artworks.artwork_size_unit=?",session[:select][:depth]['value'],session[:select][:depth]['measurement']
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
          offer_end_date = Date.strptime(session[:select][:offer_end_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
      
          if session[:select][:offer_end_date]["search_type"]=="is exactly"
            artwork_end_date = "offers.offer_end_date =?",offer_end_date
          elsif session[:select][:offer_end_date]["search_type"]=="is before"
            artwork_end_date = "offers.offer_end_date < ? ",offer_end_date
          elsif session[:select][:offer_end_date]["search_type"]=="is after"
            artwork_end_date = "offers.offer_end_date > ? ",offer_end_date
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
          @buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance) #.paginate :per_page => per_page, :page => page
        rescue
          @buy_interesting_offers = []
        end
        #@buy_interesting_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name)
       
        case show_active_offers_select
        when 0
          @buy_interesting_offers = @buy_interesting_offers.all
        when 1
          @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => TRUE)
        when 2
          @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => FALSE)
        end



        @buy_interesting_offers.each do |asdf|
          logger.debug(asdf.id)
        end
        #logger.debug("llllllllllllllll")
        #logger.debug(params[:offers_per_page_select])
        #logger.debug(sort_by_advance)
        #logger.debug(@buy_interesting_offers.count)
        @buy_interesting_offers = @buy_interesting_offers.paginate :page => params[:page] || 1, :per_page => params[:offers_per_page_select] || 24
        #logger.debug(@buy_interesting_offers.total_entries)
        #respond_to do |format|
        #  format.js { render "admin/offers/buy_art_search"}
        #  format.html
        #end

      else
        #logger.debug("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        session["last_search_basic"] = true
        session["last_search_advanced"] = false

        search_item = (session[:search_item] || "") if request.get?
        search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
        @buy_interesting_offers     = basic_search_results(search_item, buy_interesting_offers_sort_by)

        case show_active_offers_select
        when 0
          @buy_interesting_offers = @buy_interesting_offers.all
        when 1
          @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => TRUE)
        when 2
          @buy_interesting_offers = @buy_interesting_offers.where(:offer_status => FALSE)
        end
        
        @buy_interesting_offers = @buy_interesting_offers.paginate :page => params[:page] || 1, :per_page => params[:offers_per_page_select] || 24
      
        #respond_to do |format|
        #  format.js { render "admin/offers/buy_art_search"}
        #  format.html
        #end
      end

    end

    respond_to do |format|
      format.js { render "admin/offers/buy-art/interesting_offers/interesting_offers"}
      #format.html
    end
    return
  end

  def basic_search_results(search_item, sort_by)
    Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id")
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
    .order(basic_search_results_order_param(sort_by))
  end

  def basic_search_results_order_param sort_by
      case sort_by
      when 0
        "lower(artists.artist_name) asc"
      when 1
        "offers.offer_start_date asc"
      when 2
        "offers.offer_popularity desc"
      when 3
        "offers.offer_end_date asc"
      else
        "" 
      end
    end


  def artist_search

    if (params[:artist].blank? && params["artist_names_select_sortby"].nil? && params["first_published_select_sortby"].nil? && params["artists_per_page_select"].nil?)      
      @artist_names = Artist.order("artist_name")
      @artist_names = @artist_names.paginate :page => params[:page] || 1, :per_page => 12   
    else
      artist_names_select_sortby         = params["artist_names_select_sortby"].to_i || 0
      first_published_select_sortby      = params["first_published_select_sortby"].to_i || 0

      if !params[:artist].blank? and params[:artist]['search_artist_advanced']=='true'
        #logger.debug("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        session["last_search_advanced"] = true
        session["last_search_basic"] = false


        unless params[:select].blank?
          session[:select_artists] = params[:select]
        end

        
       # logger.debug(params[:select])
       # logger.debug(session[:select_artists])

        if !session[:select_artists][:artist_name].blank?
          if session[:select_artists][:artist_name]["search_type"].blank?
            artist_name = ""
          else
            if session[:select_artists][:artist_name]["search_type"]=="contains"
              artist_name = "artists.artist_name ilike ?","%#{session[:select_artists][:artist_name]['value']}%"
            elsif session[:select_artists][:artist_name]["search_type"]=="is exactly"       
              artist_name = "artists.artist_name=?",session[:select_artists][:artist_name]['value']
            elsif session[:select_artists][:artist_name]["search_type"]=="is not"        
              artist_name = "artists.artist_name!=?",session[:select_artists][:artist_name]['value']
            end
          end
        else
          artist_name = ""
        end

        if !session[:select_artists][:gender].blank?
          if session[:select_artists][:gender]["search_type"]=="is"
            gender="artists.artist_salutation = ?",session[:select_artists][:gender]['value']
          elsif session[:select_artists][:gender]["search_type"]=="is not" 
            gender="artists.artist_salutation !=?",session[:select_artists][:gender]['value']
          end
        else
          gender= ""
        end

        if !session[:select_artists][:description_artist].blank? 
          if session[:select_artists][:description_artist]["search_type"].blank?
            desc_name = ""
          else
            if session[:select_artists][:description_artist]["search_type"]=="contains"
              desc_name = "artists.artist_description ilike ?","%#{session[:select_artists][:description_artist]['value']}%"
            elsif session[:select_artists][:description_artist]["search_type"]=="is exactly"       
              desc_name = "artists.artist_description = ?","%#{session[:select_artists][:description_artist]['value']}%"
            elsif session[:select_artists][:description_artist]["search_type"]=="is not"        
              desc_name = "artists.artist_description != ?","%#{session[:select_artists][:description_artist]['value']}%"
            end
          end
        else
          desc_name = ""
        end

        if !session[:select_artists][:date_of_birth].blank?      
          dob_formatted_value = Date.strptime(session[:select_artists][:date_of_birth]['value'], "%m/%d/%Y").strftime("%Y-%m-%d").to_date
          
          logger.debug(dob_formatted_value)
          logger.debug("0000000000000000")

          if session[:select_artists][:date_of_birth]["search_type"]=="is"       
           date_of_birth="artists.artist_birth_date =?", dob_formatted_value
          elsif session[:select_artists][:date_of_birth]["search_type"]=="is before"        
           date_of_birth="artists.artist_birth_date < ? ", dob_formatted_value
          elsif session[:select_artists][:date_of_birth]["search_type"]=="is after"        
           date_of_birth="artists.artist_birth_date > ? ", dob_formatted_value
          end      
       else
         date_of_birth=""
       end 

        if !session[:select_artists][:date_of_death].blank?      
          dod_formatted_value = Date.strptime(session[:select_artists][:date_of_death]['value'], "%m/%d/%Y").strftime("%Y-%m-%d").to_date
          
          if session[:select_artists][:date_of_death]["search_type"]=="is"       
           date_of_death="artists.artist_death_date =?", dod_formatted_value
          elsif session[:select_artists][:date_of_death]["search_type"]=="is before"        
           date_of_death="artists.artist_death_date < ? ", dod_formatted_value
          elsif session[:select_artists][:date_of_death]["search_type"]=="is after"        
           date_of_death="artists.artist_death_date > ? ", dod_formatted_value
          end      
       else
         date_of_death=""
       end 

      

        begin
         # @artist_names = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance) #.paginate :per_page => per_page, :page => page
          @artist_names = Artist.where(artist_name).where(gender).where(desc_name).where(date_of_birth).where(date_of_death)
        rescue
          @artist_names = []
        end
        

      else


        session["last_search_basic"] = true
        session["last_search_advanced"] = false


        search_item = (session[:search_artist_basic] || "") if request.get?
        search_item = (session[:search_artist_basic] = params[:artist][:search_artist_basic] || "") if request.post?

        #logger.debug(search_item)

        @artist_names     = artist_basic_search_results(search_item)

          
        #logger.debug(@artist_names.total_entries)
      end
        

      case artist_names_select_sortby
        when 0
          @artist_names = @artist_names.order("artist_name")
        when 1
          @artist_names = @artist_names.order("split_part(artist_name, ' ',2)")
        when 2
          @artist_names = @artist_names.order("artist_birth_year")
        when 3
          @artist_names = @artist_names.order("artist_death_year")
        when 4
          @artist_names = @artist_names.order("approved_status desc")
        when 5
          @artist_names = @artist_names.order("approved_status asc") 
        end

        case first_published_select_sortby
        when 0
          @artist_names = @artist_names.all
        when 1
          @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (WEEK from created_at) = #{Date.today.cweek-1}")
        when 2
          @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year}").where("extract (MONTH from created_at) = #{Date.today.month-1}")
        when 3
          @artist_names = @artist_names.where("extract (YEAR from created_at) = #{Date.today.year-1}")
        end
      
        @artist_names = @artist_names.paginate :page => params[:page] || 1, :per_page => params[:artists_per_page_select] || 12
        @artist_names.each do |asdf|
          #logger.debug(asdf.id)
        end
    end

    respond_to do |format|
      format.js { render "admin/offers/manage-artist/artist-names/artist_names"}
      #format.html
    end
    return
  end

  def artist_basic_search_results(search_item)
    Artist.where("artists.artist_name ILIKE ? OR 
      artists.artist_birth_year ILIKE ? OR 
      artists.artist_death_year ILIKE ? ", "%#{search_item}%", "%#{search_item}%", "%#{search_item}%")
    #.order(basic_search_results_order_param(sort_by))
  end


  def edit
    @user = User.find(params[:user_id])
    @offer = Offer.find(params[:id])
    @artwork = Artwork.where(:offer_id => @offer.id).first
    logger.debug @artwork.artist_id
    @artist = Artist.where(:id => @artwork.artist_id).first
    @title = ArtworkTitle.where(:artwork_id => @artwork.id).first
    @description = ArtworkDescription.where(:artwork_id => @artwork.id).first
    logger.debug @title.id
    logger.debug 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    current_user_subscription_plan = Subscription.find(:all, :conditions=>["user_id = ?", @user.id]).first.subscription_plan_id.to_i
    current_user_total_offers = SubscriptionPlan.find(:all, :conditions => ["id = ?", current_user_subscription_plan]).first.subscription_paintings_allowed.to_i
    curent_offers_live = Offer.find(:all, :conditions=>["seller_id = ?", @user.id]).count
    @offers_left = current_user_total_offers - curent_offers_live
    redirect_to "admin/users/user_offers_show/#{params[:id]}" unless @offer.seller_id == @user.id
    temp_attributes = @offer.artwork.artwork_description.attributes
    
    @descriptions_hash = {}
    @descriptions_hash.merge!("en"=>temp_attributes["artwork_description_en"]) unless temp_attributes["artwork_description_en"].to_s.blank?
    @descriptions_hash.merge!("ne"=>temp_attributes["artwork_description_ne"]) unless temp_attributes["artwork_description_ne"].to_s.blank?
    @descriptions_hash.merge!("fr"=>temp_attributes["artwork_description_fr"]) unless temp_attributes["artwork_description_fr"].to_s.blank?
    @descriptions_hash.merge!("fi"=>temp_attributes["artwork_description_fi"]) unless temp_attributes["artwork_description_fi"].to_s.blank?
    @descriptions_hash.merge!("ch"=>temp_attributes["artwork_description_ch"]) unless temp_attributes["artwork_description_ch"].to_s.blank?

    temp_attributes = @offer.artwork.artwork_title.attributes
    logger.debug temp_attributes
    @titles_hash = {}
    @titles_hash.merge!("en"=>temp_attributes["artwork_title_en"])
    @titles_hash.merge!("ne"=>temp_attributes["artwork_title_ne"]) unless temp_attributes["artwork_title_ne"].to_s.blank?
    @titles_hash.merge!("fr"=>temp_attributes["artwork_title_fr"]) unless temp_attributes["artwork_title_fr"].to_s.blank?
    @titles_hash.merge!("fi"=>temp_attributes["artwork_title_fi"]) unless temp_attributes["artwork_title_fi"].to_s.blank?
    @titles_hash.merge!("ch"=>temp_attributes["artwork_title_ch"]) unless temp_attributes["artwork_title_ch"].to_s.blank?
    logger.debug @titles_hash
  end

  def update
    offer = Offer.find(params["id"])
    user = User.find(params[:artist][:user_id])
    #offer = Offer.find(params[:current_offer]["id"])
    artist = Artist.where("LOWER(artist_name) = ?", params["new_artist_name"].to_s.downcase).first
    logger.debug(offer)
    logger.debug(artist)
    if artist.nil?
      artist = Artist.create(:artist_name => params["new_artist_name"].to_s)
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
    if offer.offer_status == false
      offer.offer_cancellation_reason = " "
      offer.save
    end
    render :text => "true"
    #redirect_to "/admin/offers/edit/#{params[:id]}"
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

  def save_image_admin
    user = User.find(params[:artwork][:user_id])
    session[:my_id] = user.id
    #offer = Offer.find(params[:id])
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
    #redirect_to "/offers/show/#{session[:offer_id]}"
    #redirect_to action_name_resource_path({:param_1 => 'value_1', :param_2 => 'value_2'})
    
    redirect_to "/admin/offers/offer_show/#{session[:offer_id]}"
    # flash[:notice] = "Your offer has been added."
    # respond_to do |format|
    #   format.html { }
    #   format.js { render "offers/edit/redirect"}
    # end
  end

  def show_full_screen
    @user = User.find(params[:user_id])
    @offer = Offer.find(params[:id])
  end

  def offer_show
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_show  = params[:offer_show]   || ""

    logger.debug(session[:my_id]) 
    @user = User.find(session[:my_id])
    @offer = Offer.find(params[:id])
    @offers = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, offer_show)
    if @offer.seller_id != @user.id
      redirect_to "/admin/offers/offer_show/#{params[:id]}"
    end
    
  end




  def user_offers
    session["user_offers_user_id"] = params[:id]
    @user = User.find(params[:id])
    per_page    = params[:per_page] || 18
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_show  = params[:offer_show]   || ""
    unless params[:page].blank?
      user_offers_search
    end
    @offers_online_count = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, "show all offers").count
    @offers              = Offer.new.sell_art_area_data(@user.id, page, per_page, sort_by, offer_show)
  end

  def user_favourites
    session["user_favourites_user_id"] = params[:id]
    @user           = User.find(params[:id])
    per_page        = params[:per_page] || 6
    page            = params[:page]     || 1
    sort_by         = params[:sort_by]  || ""
    search_item     = session[:search_item] = ""
    offer_status = params[:offer_status] || "show all offers"
    unless params[:page].blank?
      user_favourites_search
    end
    favourites_list = @user.favourites.map{|favourite| favourite.offer_id}
    favourites_list = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    @offers = Offer.new.admin_user_favourites_search_basic(favourites_list_condition,search_item, page, per_page, sort_by,session["user_favourites_user_id"], offer_status)
  end

  def user_wishlists

    @user           = User.find(params[:id])
    @user_wishlists = Wishlist.where("user_id = ?", @user.id).order(:created_at)
    unless @user_wishlists.blank?
      @user_wishlist_last_updated = Wishlist.where("user_id = ?", @user.id).order("updated_at desc").limit(1).first.id
    end
    @user_wishlists_count = @user_wishlists.count
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    @offers = []
    @new_offers = []
    temp_new_offers_in_wishlist = []
    @index_from_update = false
    @user_wishlists.each_with_index do |wishlist, index|
      logger.debug "wishlist: " + wishlist.inspect
      if wishlist.offer_list.blank?
        if wishlist.search_advanced == false
          temp_new_offers_in_wishlist = Offer.new.wishlist_basic_search_results wishlist.wishlist_search_params,1,99999999,""
        elsif wishlist.search_advanced == true
          temp_new_offers_in_wishlist = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
        end
        unless temp_new_offers_in_wishlist.blank?
          temp_new_offers_in_wishlist = temp_new_offers_in_wishlist.map { |e| e.id }
        end
        @new_offers[index] = Wishlist.new.wishlist_new_offers wishlist
        if @new_offers[index] == 0
          if wishlist.offer_list.length == 0
            @offers[index] = []
          elsif wishlist.offer_list.length == 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join('')})").paginate :per_page => per_page, :page=>page
          elsif wishlist.offer_list.length > 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join(',')})").paginate :per_page => per_page, :page=>page
          end
        elsif @new_offers[index] == 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join('')})").paginate :per_page => per_page, :page=>page
        elsif @new_offers[index] > 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join(',')})").paginate :per_page => per_page, :page=>page
        end
      else
        if wishlist.search_advanced == false
          temp_new_offers_in_wishlist = Offer.new.wishlist_basic_search_results wishlist.wishlist_search_params,1,99999999,""
        elsif wishlist.search_advanced == true
          temp_new_offers_in_wishlist = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
        end
        unless temp_new_offers_in_wishlist.blank?
              temp_new_offers_in_wishlist = temp_new_offers_in_wishlist.map { |e| e.id }
        end
        @new_offers[index] = Wishlist.new.wishlist_new_offers wishlist
        if @new_offers[index] == 0
          if wishlist.offer_list.length == 0
            @offers[index] = []
          elsif wishlist.offer_list.length == 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join('')})").paginate :per_page => per_page, :page=>page
          elsif wishlist.offer_list.length > 1
            @offers[index] = Offer.where("id in (#{wishlist.offer_list.join(',')})").paginate :per_page => per_page, :page=>page
          end
        elsif @new_offers[index] == 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join('')})").paginate :per_page => per_page, :page=>page
        elsif @new_offers[index] > 1
          @offers[index] = Offer.where("id in (#{temp_new_offers_in_wishlist.join(',')})").paginate :per_page => per_page, :page=>page
        end
      end
    end
  end


  def order_messages temp_params
    case temp_params
    when "date"
      "forum_messages.created_at desc"
    when "artist"
      "artists.artist_name, forum_messages.created_at"
    when "author"
      "CONCAT(users.user_first_name, users.user_last_name)"
    else
      "forum_messages.created_at desc"
    end 
  end


  def search_basic temp_params
    if !temp_params.blank?
      if temp_params[:search_basic] == "true"
        search_string = temp_params[:forum_message][:search_string]
        if search_string.to_i.to_s == search_string
          "forum_messages.offer_id = '#{search_string}'"
        else
          "forum_messages.forum_message_title ilike '%#{search_string}%'
          OR forum_messages.forum_message_text ilike '%#{search_string}%'
          OR users.user_first_name ilike '#{search_string}'
          OR users.user_last_name ilike '#{search_string}'"
        end
      else
        ""
      end
    else
      ""
    end
  end
  

  def search_advanced temp_params
    if !temp_params.blank?
      unless temp_params[:concern].blank?
        if temp_params[:concern][:search_type] == "contains"
          search_concern = "forum_messages.forum_message_title ilike '%#{temp_params[:concern][:value]}%'"
        elsif temp_params[:concern][:search_type] == "is exactly"
          search_concern = "forum_messages.forum_message_title = '#{temp_params[:concern][:value]}'"
        elsif temp_params[:concern][:search_type] == "is not"
          search_concern = "forum_messages.forum_message_title != '#{temp_params[:concern][:value]}'"
        end
      else
        search_concern = ""
      end
      unless temp_params[:date_of_post].blank?
        if temp_params[:date_of_post][:search_type] == "is before"
          search_date_of_post = "forum_messages.created_at < '#{temp_params[:date_of_post][:value]}'"
        elsif temp_params[:date_of_post][:search_type] == "is after"
          search_date_of_post = "forum_messages.created_at > '#{temp_params[:date_of_post][:value]}'"
        elsif temp_params[:date_of_post][:search_type] == "is exactly"
          search_date_of_post = "forum_messages.created_at = '#{temp_params[:date_of_post][:value]}'"
        end
      else
        search_date_of_post = ""
      end

      unless temp_params[:offer_id].blank?
        if temp_params[:offer_id][:value].to_i.to_s == temp_params[:offer_id][:value]
          if temp_params[:offer_id][:search_type] == "is"
            search_offer_id = "forum_messages.offer_id = '#{temp_params[:offer_id][:value]}' "
          elsif temp_params[:offer_id][:search_type] == "is not"
            search_offer_id = "forum_messages.offer_id != '#{temp_params[:offer_id][:value]}'"
          end
        else
          search_offer_id = "forum_messages.offer_id = 0"
        end
      else
        search_offer_id = ""
      end

      unless temp_params[:artist_name].blank?
        if temp_params[:artist_name][:search_type] == "contains"
          search_artist_name = "artists.artist_name ilike '%#{temp_params[:artist_name][:value]}'%"
        elsif temp_params[:artist_name][:search_type] == "is exactly"
          search_artist_name = "artists.artist_name = '#{temp_params[:artist_name][:value]}'"
        elsif temp_params[:artist_name][:search_type] == "is not"
          search_artist_name = "artists.artist_name != '#{temp_params[:artist_name][:value]}'"
        end
      else
        search_artist_name = ""
      end

      unless temp_params[:title].blank?
        if temp_params[:title][:search_type] == "contains"
          search_title = "forum_messages.forum_message_title ilike '#{temp_params[:title][:value]}'"
        elsif temp_params[:title][:search_type] == "is exactly"
          search_title = "forum_messages.forum_message_title = '#{temp_params[:title][:value]}'"
        elsif temp_params[:title][:search_type] == "is not"
          search_title = "forum_messages.forum_message_title != '#{temp_params[:title][:value]}'"
        end
      else
        search_title = ""
      end

      unless temp_params[:description].blank?
        if temp_params[:description][:search_type] == "contains"
          search_description = "forum_messages.forum_message_text ilike '#{temp_params[:description][:value]}'"
        elsif temp_params[:description][:search_type] == "is exactly"
          search_description = "forum_messages.forum_message_text = '#{temp_params[:description][:value]}'"
        elsif temp_params[:description][:search_type] == "is not"
          search_description = "forum_messages.forum_message_text != '#{temp_params[:description][:value]}'"
        end
      else
        search_description = ""
      end

      unless temp_params[:author].blank?
        if temp_params[:author][:search_type] == "contains"
          search_author = "users.user_first_name ilike '#{temp_params[:author][:value]}' OR users.user_last_name ilike '#{temp_params[:author][:value]}' "
        elsif temp_params[:author][:search_type] == "is exactly"
          search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) = '#{temp_params[:author][:value]}'"
        elsif temp_params[:author][:search_type] == "is not"
          search_author = "CONCAT(users.user_first_name, ' ', users.user_last_name) != '#{temp_params[:author][:value]}'"
        end
      else
        search_author = ""
      end
      if search_concern.nil? && search_date_of_post.nil? && search_offer_id.nil? && search_artist_name.nil? && search_title.nil? && search_description.nil? && search_author.nil?
        ""
      else
        "#{search_concern} AND #{search_date_of_post} AND #{search_offer_id} AND #{search_artist_name} AND #{search_title} AND #{search_description} AND #{search_author}".gsub /AND  AND/, ""
      end
    else
      ""
    end
  end


  def user_forum_messages
    
    @user           = User.find(params[:id])
    per_page = params[:per_page] || 6
    page     = params[:page]     || 1
    sort_by  = params[:sort_by]  || ""
  
    if params[:search_advanced] == "true"
      session[:select] = params[:select]
      session[:search] = ""
    end

    if params[:search_basic] == "true"
      session[:search] = params
      session[:select] = ""
    end
    
    @forum_messages = ForumMessage.joins("JOIN artworks on artworks.offer_id = forum_messages.offer_id JOIN users ON users.id = forum_messages.user_id JOIN artists on artists.id = artworks.artist_id").where("forum_messages.is_parent = true").where(search_basic(session[:search])).where(search_advanced(session[:select])).order(order_messages(sort_by))
    @forum_messages = @forum_messages.paginate :page => page, :per_page => per_page
    
    respond_to do |format|
      format.html
      format.js { render "admin/offer/user_forum_messages/data"}

    end
  end


  def user_messages

    @user = User.find(params[:id])
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_show  = params[:offer_show]   || ""

    @offer_sell_art_area_messages = []
    @offer_sell = Offer.where("seller_id = ?", @user.id)
    @offer_sell.each do |offer|
      unless offer.messages.blank?
        @offer_sell_art_area_messages.push(offer)
      end
    end


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

    @offer_with_messages = Offer.where("seller_id = #{@user.id}").collect{ |offer| offer if offer.messages.exists? }.delete_if{|temp| temp == nil}
  end

  def sell_art_area_traversal_tree message, index
    if message.class == Message
      temp_message = Message.new
      temp_message.intialize_parent_count
      temp_message.nested_messages_count message
      @message_array[index] << {:message=>message,:count=>temp_message.get_count}
      if message.sub_messages.blank?
        return 
      elsif message.sub_messages.count == 1
        sell_art_area_traversal_tree message.sub_messages.first, index
      elsif message.sub_messages.count > 1
        message.sub_messages.each do |a|
          sell_art_area_traversal_tree a, index
        end
      end
    end
  end


  def user_offers_search
    
    if !params[:offer].blank?
      if params[:offer]["user_id"].blank?
        @user       = User.find(session["user_offers_user_id"])
      else
          @user   = User.find(session["user_offers_user_id"])
      end
    end
    per_page     = params[:per_page] || 18
    page         = params[:page]     || 1
    sort_by      = params[:sort_by]  || ""
    offer_status = params[:offer_status] || "show all offers"
    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      session["last_search_advanced"] = true
      session["last_search_basic"] = false

      unless params[:select].blank?
        session[:select]=params[:select]
      end

      @offers = Offer.new.admin_user_offers_search_advanced(session[:select], page, per_page, sort_by, @user.id)


    else

      session["last_search_basic"] = true
      session["last_search_advanced"] = false

      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      @offers     = Offer.new.admin_user_offers_search_basic(search_item, page, per_page, sort_by,@user.id, offer_status)
    end

    respond_to do |format|
      format.js {render "admin/offer/user_offers/user_offers_search"}
    end
    return
  end

  def user_favourites_search

    if !params[:offer].blank?
      if params[:offer]["user_id"].blank?
        @user       = User.find(session["user_favourites_user_id"])
      else
          @user   = User.find(session["user_favourites_user_id"])
      end
    end
    
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    offer_status = params[:offer_status] || "show all offers"
    favourites_list = @user.favourites.map{|favourite| favourite.offer_id}
    favourites_list = favourites_list.join(',')
    favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
    favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
    
    if request.post?
      if params[:offer]['search_advanced'] == 'true'
        session["last_search_advanced"] = true
        session["last_search_basic"] = false
      else
        session["last_search_advanced"] = false
        session["last_search_basic"] = true
      end
    end

    if (params[:offer]['search_advanced']=='true')
      unless params[:select].blank?
        session[:select]=params[:select]
      end

      @offers  = Offer.new.admin_user_favourites_search_advanced(favourites_list_condition,session[:select], page, per_page, sort_by,session["user_favourites_user_id"],offer_status)

      respond_to do |format|
        format.js { render "admin/offer/user_favourites/search_data"}
      end
    else
      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      @offers = Offer.new.admin_user_favourites_search_basic(favourites_list_condition,search_item, page, per_page, sort_by,session["user_favourites_user_id"], offer_status)

      respond_to do |format|
        format.js {render "admin/offer/user_favourites/search_data"}
      end
      return
    end

  end

  def admin_add_new_wishlist
    @user = User.find(params[:user_id])
    @wishlist = Wishlist.create(:user_id=>@user.id, :search_advanced=>false)
    respond_to do |format|
      format.js { render "admin/offer/user_wishlists/add_new_wishlist" }
    end
    
  end






  
end