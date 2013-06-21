class FavouriteController < ApplicationController
  before_filter :authenticate_user!
  def create
    Favourite.create!(params[:favourite])
    render :text=>"true"
  end

  def delete
    Favourite.find_by_offer_id(params["offer_id"]).delete
    render :text => "true"
  end

  def refresh_favourites
    respond_to do |format|
      format.js
    end
  end


  def home
    @user           = current_user
    per_page        = params[:per_page] || 6
    page            = params[:page]     || 1
    sort_by         = params[:sort_by]  || ""
    search_item     = session[:search_item] = ""
    unless params[:page].blank?
      search
    end
    favourites_list = current_user.favourites.map{|favourite| favourite.offer_id}
    @offers         = Offer.new.search_results_in_favourites(favourites_list,search_item, page, per_page, sort_by)
  end

  def search
    @user       = current_user
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""

    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      sort_by_advance = case sort_by
       when "artist name"
         "lower(artists.artist_name) asc"
       when "date"
         "offers.created_at asc"
       when "popularity"
         "offers.offer_popularity desc"
       when "time left"
         "offers.offer_end_date asc"
       else
         ""
       end 
      unless params[:select].blank?
        session[:select]=params[:select]
      end

      if !session[:select][:artist].blank?
        if session[:select][:artist]["search_type"].blank?
          artist_name = ""
        else
          if session[:select][:artist]["search_type"]=="contains"
            artist_name = "artists.artist_name like ?","%#{session[:select][:artist]['value']}%"
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
        favourites_list = current_user.favourites.map{|favourite| favourite.offer_id}
        favourites_list = favourites_list.join(',')
        favourites_list_condition = "offers.id = 99999999999" if favourites_list.blank?
        favourites_list_condition = "offers.id in (#{favourites_list})" unless favourites_list.blank?
        
        @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).where(favourites_list_condition).order(sort_by_advance).paginate :per_page => per_page, :page => page
        respond_to do |format|
          format.js { render "favourite/search/search_data"}
        end
      rescue
        @offers = []
        respond_to do |format|
          format.js { render "favourite/search/search_data"}
        end
        return
      end

    else
      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:offer][:search_item] || "") if request.post?
      favourites_list = current_user.favourites.map{|favourite| favourite.offer_id}
      @offers         = Offer.new.search_results_in_favourites(favourites_list,search_item, page, per_page, sort_by)

      respond_to do |format|
        format.js { render "favourite/search/search_data"}
      end
      return
    end

  end
end