class Admin::ArtistsController < ApplicationController
 
  before_filter :authenticate_admin_user!

  def new
  	@artist = Artist.new
  end

  def create
 	@artist = Artist.new do |temp|
	  temp.artist_name = params[:artist_new][:artist_first_name] + " " + params[:artist_new][:artist_last_name]
      temp.approved_status = FALSE
      temp.artist_birth_date = params[:artist_new][:artist_birth_date]
      temp.artist_death_date = params[:artist_new][:artist_death_date]
      temp.artist_salutation = params[:artist_new][:salutation]=="Mr."? "male" : "female" 
      temp.artist_description = params[:artist_new][:artist_description]
      temp.artist_birth_year = 0        # used temporary for heroku production
      temp.artist_death_year = 0        # used temporary for heroku production
    end
    #@artist.save
    #Rails.logger.info(@artist.errors.messages.inspect)

    respond_to do |format|
      if @artist.save
        format.html { redirect_to "/admin/offers", notice: 'Artist was successfully created.' }
        format.json { render json: @artist, status: :created, location: @artist }
      else
        format.html { render action: "new" }
        format.json { render json: @artist.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def edit
  	@artist = Artist.find_by_id(params[:id])
  end

  def update

  	if(params[:artist_edit][:id] == params[:artist_edit][:link_to_existing])
  		@artist = Artist.find_by_id(params[:artist_edit][:id]) 
  		@artist.update_attribute(:artist_name, params[:artist_edit][:artist_first_name] + " " + params[:artist_edit][:artist_last_name])
        @artist.update_attribute(:artist_birth_year, params[:artist_edit][:artist_birth_date])
        @artist.update_attribute(:artist_death_year, params[:artist_edit][:artist_death_date])
        @artist.update_attribute(:approved_status, TRUE)

    else
    	@artist = Artist.find_by_id(params[:artist_edit][:link_to_existing])
    	@merged_artist = Artist.find_by_id(params[:artist_edit][:id])
    	@artist.update_attribute(:artist_requests, @artist.artist_requests + @merged_artist.artist_requests)
    	@merged_artist.delete
    end  
            
    respond_to do |format|
        #if @artist.update_attributes(params[:artist_edit])
          format.html { redirect_to "/admin/offers", notice: 'Artist is successfully updated.' }
          format.json { render json: @artist, status: :created, location: @artist }
        #else
          #Rails.logger.info(@user.errors.messages.inspect)
          #format.html { redirect_to "/admin/users/#{params[:id]}/edit", notice: 'not updated.' }
          #format.json { render json: @user.errors}
        #end
    end
   end


end
