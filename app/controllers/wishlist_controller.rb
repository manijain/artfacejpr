class WishlistController < ApplicationController
  before_filter :authenticate_user!

  def update
    @wishlist = Wishlist.find(params[:wishlist][:wishlist_id])
    if params[:wishlist]["search_advanced"] == "true"
      @wishlist.update_attributes(
        :search_advanced        =>true,
        :wishlist_name          =>params[:wishlist]["wishlist_name"],
        :wishlist_search_params =>params[:search_params],
        :email_notification     =>params[:wishlist]["email_notification"]
      )
    else
      @wishlist.update_attributes(

        :wishlist_name           =>params[:wishlist][:wishlist_name],
        :wishlist_search_params  =>params[:wishlist][:wishlist_search_params] || "",
        :search_advanced         =>false,
        :email_notification      =>params[:wishlist]["email_notification"]
      )
    end
    @index_from_update = true
    @index = params[:wishlist][:index_on_page]
    temp_search
    if @wishlist.search_advanced == false
      @temp_offers = Offer.new.wishlist_basic_search_results params[:wishlist][:wishlist_search_params], 1, 99999999, ""
    else
      @temp_offers = Offer.new.advanced_search_results params[:search_params], 1, 99999999, ""
    end
    @wishlist.update_attribute :offer_list, @temp_offers.map { |e| e.id }

    if @wishlist.search_advanced == false
      @temp_artists = Artist.where("artists.artist_name ilike ?", "%#{params[:wishlist][:wishlist_search_params]}%")
    else
      @temp_artists = wishlist_advanced_artist_match(params[:search_params])
    end
    @temp_artists.each do |artist|
      artist.update_attribute(:artist_requests, artist.artist_requests + 1 ) 
    end

    redirect_to "/offer/your-wishlists"
  end

  def offer_update
    @wishlist = Wishlist.find(params[:wishlist_id])
    if @wishlist.search_advanced == false
      @offers = Offer.new.wishlist_basic_search_results @wishlist.wishlist_search_params, 1, 99999999999, ""
    else
      @offers = Offer.new.advanced_search_results @wishlist.wishlist_search_params, 1, 99999999, ""
    end
    @wishlist.update_attribute :offer_list, @offers.map { |e| e.id }
    render :text => "true"
  end


  def destroy
    render :text=> "true" if Wishlist.find(params["wishlist_id"]).destroy()
  end

  def pagination
    @current_wishlist      = Wishlist.find(params["wishlist_id"])
    wishlist_search_params = @current_wishlist.wishlist_search_params
    search_type            = @current_wishlist.search_advanced
    per_page               = params[:per_page]
    page                   = params[:page]
    sort_by                = params[:sort_by]
    @wishlist_id_on_page   = params[:wishlist_id_on_page]

    if search_type == false
      @offers = Offer.new.wishlist_basic_search_results wishlist_search_params, page, per_page, sort_by
    else
      @offers = Offer.new.advanced_search_results wishlist_search_params, page, per_page, sort_by
    end
    
    respond_to do |format|
      format.js
    end
  end


  def home
    current_user
    @user_wishlists = Wishlist.where("user_id = ?", current_user.id).order(:created_at)
    unless @user_wishlists.blank?
      @user_wishlist_last_updated = Wishlist.where("user_id = ?", current_user.id).order("updated_at desc").limit(1).first.id
    end
    @user_wishlists_count = @user_wishlists.count
    per_page    = params[:per_page]     || 6
    page        = params[:page]         || 1
    @offers = []
    @new_offers = []
    @index_from_update = false
    @user_wishlists.each_with_index do |wishlist, index|
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

  def add_new_wishlist
    @wishlist = Wishlist.create(:user_id=>current_user.id, :search_advanced=>false)
    respond_to do |format|
      format.js
    end
  end


  def search 
    @user       = current_user
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    
    wishlist_id = params[:wishlist_id] || params[:wishlist][:wishlist_id]
    @wishlist = Wishlist.find(wishlist_id)
    session[:search_item] = "" if params["clear_session"].nil? 
    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      sort_by_advance = case sort_by
       when "artist name"
         "lower(artists.artist_name) asc"
       when "date"
         "offers.offer_created_at asc"
       when "popularity"
         "offers.offer_popularity desc"
       when "date"
         "offers.offer_end_date asc"
       else
         ""
       end 
      unless params[:select].blank?
        session[:select]=params[:select]
      end       
    if !session[:select][:artist].blank?  
      if session[:select][:artist]["search_type"]=="contains"
        artist_name="artists.artist_name like ?","%#{session[:select][:artist]['value']}%"
      elsif session[:select][:artist]["search_type"]=="is exactly"       
        artist_name="artists.artist_name=?",session[:select][:artist]['value']
      elsif session[:select][:artist]["search_type"]=="is not"        
       artist_name="artists.artist_name!=?",session[:select][:artist]['value']
     end
    else
     artist_name=""
    end

     if !session[:select][:title].blank? 
       if session[:select][:title]["search_type"]=="contains"
        title_name= "artwork_titles.artwork_title_en like ? OR 
                     artwork_titles.artwork_title_fi like ? OR 
                     artwork_titles.artwork_title_ch like ? OR 
                     artwork_titles.artwork_title_fr like ? OR 
                     artwork_titles.artwork_title_ne like ? ","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
       elsif session[:select][:title]["search_type"]=="is exactly"       
        title_name="artwork_titles.artwork_title_en =? OR 
                    artwork_titles.artwork_title_fi =? OR 
                    artwork_titles.artwork_title_ch =? OR 
                    artwork_titles.artwork_title_fr =? OR 
                    artwork_titles.artwork_title_ne =? ",session[:select][:title]['value'],"%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
       elsif session[:select][:title]["search_type"]=="is not"        
        title_name="artwork_titles.artwork_title_en !=? OR 
                    artwork_titles.artwork_title_fi !=? OR 
                    artwork_titles.artwork_title_ch !=? OR 
                    artwork_titles.artwork_title_fr !=? OR 
                    artwork_titles.artwork_title_ne !=? ",session[:select][:title]['value'],"%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
      end
     else
        title_name=""
     end


     if !session[:select][:description].blank? 
       if session[:select][:description]["search_type"]=="contains"
        desc_name= "artwork_descriptions.artwork_description_ch like ? OR 
                    artwork_descriptions.artwork_description_fi like ? OR 
                    artwork_descriptions.artwork_description_fr like ? OR 
                    artwork_descriptions.artwork_description_ne like ? ","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
       elsif session[:select][:description]["search_type"]=="is exactly"       
        desc_name= "artwork_descriptions.artwork_description_ch =? OR 
                    artwork_descriptions.artwork_description_fi =? OR 
                    artwork_descriptions.artwork_description_fr =? OR 
                    artwork_descriptions.artwork_description_ne =? ",session[:select][:description]['value'],"%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
       elsif session[:select][:description]["search_type"]=="is not"        
        desc_name= "artwork_descriptions.artwork_description_ch !=? OR 
                    artwork_descriptions.artwork_description_fi !=? OR 
                    artwork_descriptions.artwork_description_fr !=? OR 
                    artwork_descriptions.artwork_description_ne !=?  ","#{session[:select][:description]['value']}","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
      end
     else
        desc_name=""
     end

     if !session[:select][:year_of_creation].blank? 
       if !session[:select][:year_of_creation]['value'].blank? 
        if session[:select][:year_of_creation]["search_type"]=="is exactly" 
         year_creation="artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        elsif session[:select][:year_of_creation]["search_type"]=="is before"       
         year_creation="artworks.artwork_creation_year < ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        elsif session[:select][:year_of_creation]["search_type"]=="is after"        
         year_cresessionation="artworks.artwork_creation_year > ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        end
       else
        year_creation="artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['duration']
       end 
     else
       year_creation=""
     end
    session
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
        movesessionment_period="artworks.artwork_movement_period  like ?","%#{session[:select][:movement_period]['value']}%"
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
         artwork_height="artworks.artwork_height like ? AND artworks.artwork_size_unit=?","%#{session[:select][:height]['value']}%",session[:select][:height]['measurement']
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
         artwork_width="artworks.artwork_width like ? AND artworks.artwork_size_unit=?","%#{session[:select][:width]['value']}%",session[:select][:width]['measurement']
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
         artwork_depth="artworks.artwork_depth like ? AND artworks.artwork_size_unit=?","%#{session[:select][:depth]['value']}%",session[:select][:depth]['measurement']
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
        offer_end_date = Date.strptime(session[:select][:offer_end_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        if session[:select][:offer_end_date]["search_type"]=="is exactly"       
         artwork_end_date="offers.offer_end_date =?",offer_end_date
        elsif session[:select][:offer_end_date]["search_type"]=="is before"        
         artwork_end_date="offers.offer_end_date < ? ",offer_end_date
        elsif session[:select][:offer_end_date]["search_type"]=="is after"        
         artwork_end_date="offers.offer_end_date > ? ",offer_end_date
        end      
     else
       artwork_end_date=""
     end

     if !session[:select][:country].blank?
      country_name="artworks.artwork_country = ?", session[:select][:country]['name']
    else
      country_name = ""
     end
     @all_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance)

     @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance).paginate :per_page => per_page, :page => page
    else
    search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:wishlist][:wishlist_search_params] || "") if request.post?
  
      @offers     = Offer.new.search_results(search_item, page, per_page, sort_by)
      @all_offers = Offer.new.search_results_complete(search_item)

      respond_to do |format|
        format.html { render "wishlist/search_data"}
        format.js { render "wishlist/search_data"}
      end

    end

  end

  def temp_search
    per_page    = params[:per_page] || 6
    page        = params[:page]     || 1
    sort_by     = params[:sort_by]  || ""
    wishlist_id = params[:wishlist_id] || params[:wishlist][:wishlist_id]
    @wishlist = Wishlist.find(wishlist_id)
    session[:search_item] = "" if params["clear_session"].nil? 
    if !params[:offer].blank? and params[:offer]['search_advanced']=='true'
      sort_by_advance = case sort_by
       when "artist name"
         "lower(artists.artist_name) asc"
       when "date"
         "offers.offer_created_at asc"
       when "popularity"
         "offers.offer_popularity desc"
       when "date"
         "offers.offer_end_date asc"
       else
         ""
       end 
      unless params[:select].blank?
        session[:select]=params[:select]
      end       
    if !session[:select][:artist].blank?  
      if session[:select][:artist]["search_type"]=="contains"
        artist_name="artists.artist_name like ?","%#{session[:select][:artist]['value']}%"
      elsif session[:select][:artist]["search_type"]=="is exactly"       
        artist_name="artists.artist_name=?",session[:select][:artist]['value']
      elsif session[:select][:artist]["search_type"]=="is not"        
       artist_name="artists.artist_name!=?",session[:select][:artist]['value']
     end
    else
     artist_name=""
    end

     if !session[:select][:title].blank? 
       if session[:select][:title]["search_type"]=="contains"
        title_name= "artwork_titles.artwork_title_en like ? OR 
                     artwork_titles.artwork_title_fi like ? OR 
                     artwork_titles.artwork_title_ch like ? OR 
                     artwork_titles.artwork_title_fr like ? OR 
                     artwork_titles.artwork_title_ne like ? ","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
       elsif session[:select][:title]["search_type"]=="is exactly"       
        title_name="artwork_titles.artwork_title_en =? OR 
                    artwork_titles.artwork_title_fi =? OR 
                    artwork_titles.artwork_title_ch =? OR 
                    artwork_titles.artwork_title_fr =? OR 
                    artwork_titles.artwork_title_ne =? ",session[:select][:title]['value'],"%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
       elsif session[:select][:title]["search_type"]=="is not"        
        title_name="artwork_titles.artwork_title_en !=? OR 
                    artwork_titles.artwork_title_fi !=? OR 
                    artwork_titles.artwork_title_ch !=? OR 
                    artwork_titles.artwork_title_fr !=? OR 
                    artwork_titles.artwork_title_ne !=? ",session[:select][:title]['value'],"%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%","%#{session[:select][:title]['value']}%"
      end
     else
        title_name=""
     end


     if !session[:select][:description].blank? 
       if session[:select][:description]["search_type"]=="contains"
        desc_name= "artwork_descriptions.artwork_description_ch like ? OR 
                    artwork_descriptions.artwork_description_fi like ? OR 
                    artwork_descriptions.artwork_description_fr like ? OR 
                    artwork_descriptions.artwork_description_ne like ? ","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
       elsif session[:select][:description]["search_type"]=="is exactly"       
        desc_name= "artwork_descriptions.artwork_description_ch =? OR 
                    artwork_descriptions.artwork_description_fi =? OR 
                    artwork_descriptions.artwork_description_fr =? OR 
                    artwork_descriptions.artwork_description_ne =? ",session[:select][:description]['value'],"%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
       elsif session[:select][:description]["search_type"]=="is not"        
        desc_name= "artwork_descriptions.artwork_description_ch !=? OR 
                    artwork_descriptions.artwork_description_fi !=? OR 
                    artwork_descriptions.artwork_description_fr !=? OR 
                    artwork_descriptions.artwork_description_ne !=?  ","#{session[:select][:description]['value']}","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%","%#{session[:select][:description]['value']}%"
      end
     else
        desc_name=""
     end

     if !session[:select][:year_of_creation].blank? 
       if !session[:select][:year_of_creation]['value'].blank? 
        if session[:select][:year_of_creation]["search_type"]=="is exactly" 
         year_creation="artworks.artwork_creation_year = ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        elsif session[:select][:year_of_creation]["search_type"]=="is before"       
         year_creation="artworks.artwork_creation_year < ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        elsif session[:select][:year_of_creation]["search_type"]=="is after"        
         year_cresessionation="artworks.artwork_creation_year > ? AND artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['value'],session[:select][:year_of_creation]['duration']
        end
       else
        year_creation="artworks.artwork_creation_year_era=?",session[:select][:year_of_creation]['duration']
       end 
     else
       year_creation=""
     end
    session
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
        movesessionment_period="artworks.artwork_movement_period  like ?","%#{session[:select][:movement_period]['value']}%"
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
         artwork_height="artworks.artwork_height like ? AND artworks.artwork_size_unit=?","%#{session[:select][:height]['value']}%",session[:select][:height]['measurement']
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
         artwork_width="artworks.artwork_width like ? AND artworks.artwork_size_unit=?","%#{session[:select][:width]['value']}%",session[:select][:width]['measurement']
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
         artwork_depth="artworks.artwork_depth like ? AND artworks.artwork_size_unit=?","%#{session[:select][:depth]['value']}%",session[:select][:depth]['measurement']
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
        offer_end_date = Date.strptime(session[:select][:offer_end_date]['value'], "%m/%d/%Y").strftime("%Y-%m-%d %H:%M:%S").to_datetime
        if session[:select][:offer_end_date]["search_type"]=="is exactly"       
         artwork_end_date="offers.offer_end_date =?",offer_end_date
        elsif session[:select][:offer_end_date]["search_type"]=="is before"        
         artwork_end_date="offers.offer_end_date < ? ",offer_end_date
        elsif session[:select][:offer_end_date]["search_type"]=="is after"        
         artwork_end_date="offers.offer_end_date > ? ",offer_end_date
        end      
     else
       artwork_end_date=""
     end

     if !session[:select][:country].blank?
      country_name="artworks.artwork_country = ?", session[:select][:country]['name']
    else
      country_name = ""
     end
     @all_offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance)

     @offers = Offer.joins("JOIN artworks ON offers.id = artworks.offer_id JOIN artists ON artworks.artist_id = artists.id JOIN artwork_descriptions ON artwork_descriptions.artwork_id = artworks.id JOIN artwork_titles ON artwork_titles.artwork_id = artworks.id").where(artist_name).where(title_name).where(desc_name).where(year_creation).where(artwork_category).where(movement_period).where(artwork_height).where(artwork_width).where(artwork_depth).where(artwork_signature).where(artwork_frame).where(artwork_certificate).where(offer_type).where(artwork_start_date).where(artwork_end_date).where(country_name).order(sort_by_advance).paginate :per_page => per_page, :page => page
    else
      search_item = (session[:search_item] || "") if request.get?
      search_item = (session[:search_item] = params[:wishlist][:wishlist_search_params] || "") if request.post?
  
      @offers     = Offer.new.search_results(search_item, page, per_page, sort_by)
      @all_offers = Offer.new.search_results_complete(search_item)
    end
  end

  def wishlist_advanced_artist_match(search_params)  
    if !search_params[:artist].blank?
      if search_params[:artist]["search_type"].blank?
        artist_name = ""
      else
        if search_params[:artist]["search_type"] == "contains"
          artist_name = "artists.artist_name ilike ?","%#{search_params[:artist]['value']}%"
        elsif search_params[:artist]["search_type"] == "is exactly"       
          artist_name = "artists.artist_name=?",search_params[:artist]['value']
        end
      end
    else
      artist_name = ""
    end
    Artist.where(artist_name)
  end

end
