class ServiceDirectoryAdmin::ServicePartnersController < ApplicationController

  before_filter :authenticate_service_partner!
  def redirect_to_show
    session[:search] = ""
    session[:select] = ""
    redirect_to "/service_directory/overview"
  end

	def show
		@service_partner_new = current_service_partner
		per_page_1 = params[:per_page] || 6
	    per_page_2 = params[:per_page] || 6
	    per_page_3 = params[:per_page] || 6
	    per_page_4 = params[:per_page] || 6
	    page_1     = params[:page]     || 1
	    page_2     = params[:page]     || 1
	    page_3     = params[:page]     || 1
	    page_4     = params[:page]     || 1
	    sort_by_1  = params[:sort_by]  || ""
	    sort_by_2  = params[:sort_by]  || ""
	    sort_by_3  = params[:sort_by]  || ""
	    sort_by_4  = params[:sort_by]  || ""

	    unless params[:partner_type].blank?
	      if params[:partner_type].to_i == 4
	        @service_partner_type_4 = ServicePartner.where("partner_type = ?",4).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
	        respond_to do |format|
	          format.js { render "service_directory_admin/show/layout_part_two/data"}
	        end
	        return
	      end
	      if params[:partner_type].to_i == 3
	        @service_partner_type_3 = ServicePartner.where("partner_type = ?",3).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
	        respond_to do |format|
	          format.js { render "service_directory_admin/show/layout_part_three/data"}
	        end
	        return
	      end
	      if params[:partner_type].to_i == 2
	        @service_partner_type_2 = ServicePartner.where("partner_type = ?",2).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
	        respond_to do |format|
	          format.js { render "service_directory_admin/show/layout_part_four/data"}
	        end
	        return
	      end
	      if params[:partner_type].to_i == 1
	        @service_partner_type_1 = ServicePartner.where("partner_type = ?",1).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
	        respond_to do |format|
	          format.js { render "service_directory_admin/show/layout_part_five/data"}
	        end
	        return
	      end
	    end
	    #logger.debug(params[:partner_type].blank?)
	    @service_partner_type_1 = ServicePartner.where("partner_type = ?",1).order("country").paginate :per_page=>per_page_1, :page=>page_1
	    @service_partner_type_2 = ServicePartner.where("partner_type = ?",2).order("country").paginate :per_page=>per_page_2, :page=>page_2
	    @service_partner_type_3 = ServicePartner.where("partner_type = ?",3).order("country").paginate :per_page=>per_page_3, :page=>page_3
	    @service_partner_type_4 = ServicePartner.where("partner_type = ?",4).order("country").paginate :per_page=>per_page_4, :page=>page_4

	    respond_to do |format|
	      format.html
	    end
	end


	def search_basic
    logger.debug("in search")

    unless params[:service_partner][:search_in].blank?
      logger.debug(params[:service_partner][:search_in])
      logger.debug(params[:service_partner][:search_term])
      search_item = params[:service_partner][:search_term].to_s || ""
      logger.debug(search_item)
      search_string = "first_name ilike '%#{search_item}%'
      OR last_name ilike '%#{search_item}%'
      OR company_name ilike '%#{search_item}%'
      OR street ilike '%#{search_item}%'
      OR zip_code ilike '%#{search_item}%'
      OR city ilike '%#{search_item}%'
      OR country ilike '%#{search_item}%'
      OR telephone_number ilike '%#{search_item}%'
      OR fax_number ilike '%#{search_item}%'
      OR website ilike '%#{search_item}%'
      OR email ilike '%#{search_item}%'
      OR specialities ilike '%#{search_item}%'
      OR description ilike '%#{search_item}%'
      OR status ilike '%#{search_item}%'
      
      OR CAST(number_of_employees as TEXT) ilike '%#{search_item}%'
      OR CAST(founded as TEXT) ilike '%#{search_item}%'"
      if params[:attr].present?
        sort_str = params[:attr]
      else
        sort_str = 'country'
      end
      logger.debug(sort_str)
      logger.debug(params[:per_page_item])
      case params[:service_partner][:search_in].to_i
        when 1
          @result_data_in = 1
          #art insurance company id = 1
          @service_partners = ServicePartner.where("partner_type = ?", 1).where(search_string).order(sort_str).paginate :per_page=>params[:per_page_item] || 6, :page=> params[:page] || 1
        when 2
          @result_data_in = 2
          #Art Shipping Company id = 2
          @service_partners = ServicePartner.where("partner_type = ?", 2).where(search_string).order(sort_str).paginate :per_page=>params[:per_page_item] || 6, :page=> params[:page] || 1
        when 3
          @result_data_in = 3
          #art lawyer id = 3
          @service_partners = ServicePartner.where("partner_type = ?", 3).where(search_string).order(sort_str).paginate :per_page=>params[:per_page_item] || 6, :page=> params[:page] || 1
        when 4
          @result_data_in = 4
          #art expert id = 4
          @service_partners = ServicePartner.where("partner_type = ?", 4).where(search_string).order(sort_str).paginate :per_page=>params[:per_page_item] || 6, :page=> params[:page] || 1
      end
    end
    respond_to do |format|
      format.js { render "service_directory_admin/show/search_data/search_data"}
    end
  end


  def search_advanced
    country_search_string = ""
    speciality_search_string = ""
    description_search_string = ""
    lawyer_number_of_employees_search_string = ""
    contact_data_approval_search_string = ""
    status_search_string = ""
    logger.debug("in search_advance")
    unless params[:select][:country].blank? 
      country = "#{params[:select][:country][:name]}"
      country_search_string = "country = '#{params[:select][:country][:name]}'"
    end
    unless params[:select][:speciality].blank?
      if params[:select][:speciality]["search_type"] == "contains"
        speciality_search_string = "specialities ILIKE '%#{params[:select][:speciality]["value"]}%'"
      elsif params[:select][:speciality]["search_type"] == "is exactly"
        speciality_search_string = "specialities = '#{params[:select][:speciality]["value"]}'"
      elsif params[:select][:speciality]["search_type"] == "is not"
        speciality_search_string = "specialities NOT ILIKE '%#{params[:select][:speciality]["value"]}%'"
      end
      logger.debug(speciality_search_string)
    end
    unless params[:select][:description].blank?
      if params[:select][:description]["search_type"] == "contains"
        description_search_string = "description ILIKE '%#{params[:select][:description]["value"]}%'"
      elsif params[:select][:description]["search_type"] == "is exactly"
        description_search_string = "description = '#{params[:select][:description]["value"]}'"
      elsif params[:select][:description]["search_type"] == "is not"
        description_search_string = "description NOT ILIKE '%#{params[:select][:description]["value"]}%'"
      end
    end
    unless params[:select][:number_of_employees].blank?
      if params[:select][:number_of_employees][:search_type] == "is higher than"
        lawyer_number_of_employees_search_string = "number_of_employees > '#{params[:select][:number_of_employees]["value"]}'"
      elsif params[:select][:number_of_employees][:search_type] == "is lower than"
        lawyer_number_of_employees_search_string = "number_of_employees < '#{params[:select][:number_of_employees]["value"]}'"
      end
    end
    unless params[:select][:contact_data_approval].blank?
      if params[:select][:contact_data_approval][:search_type] == "true"
        contact_data_approval_search_string = "contact_data_approval = '#{params[:select][:contact_data_approval][:search_type]}'"
      logger.debug(contact_data_approval_search_string)
      elsif params[:select][:contact_data_approval][:search_type] == "false"
        contact_data_approval_search_string = "contact_data_approval = '#{params[:select][:contact_data_approval][:search_type]}'"
      logger.debug(contact_data_approval_search_string)
      end
    end
    unless params[:select][:status].blank?
      if params[:select][:status][:search_type] == "online"
        status_search_string = "status = '#{params[:select][:status][:search_type]}'"
        logger.debug(status_search_string)
      elsif params[:select][:status][:search_type] == "offline"
         status_search_string = "status = '#{params[:select][:status][:search_type]}'"
      end
    end
    if params[:attr].present?
      sort_str = params[:attr]
    else
      sort_str = 'country'
    end 
    @service_partners = ServicePartner.where(country_search_string).where(speciality_search_string).where(lawyer_number_of_employees_search_string).where(description_search_string).where(contact_data_approval_search_string).where(status_search_string).where("partner_type = ?", params[:service_partner][:search_in].to_i).order(sort_str).paginate :per_page=>params[:per_page_item] || 6, :page=>params[:page] || 1
    @result_data_in = params[:service_partner][:search_in].to_i
    respond_to do |format|
      format.js { render "service_directory_admin/show/search_data/search_data"}
    end
  end

  def edit_contact_data
    @service_partner = ServicePartner.find(params[:id])
  end

  def update_contact_data
    @service_partner = ServicePartner.find(params[:id])
    respond_to do |format|
      if params[:service_partner][:password].blank?
        @service_partner.update_attribute(:salutation, params[:service_partner][:salutation])
        @service_partner.update_attribute(:first_name, params[:service_partner][:first_name])
        @service_partner.update_attribute(:last_name, params[:service_partner][:last_name])
        @service_partner.update_attribute(:company_name, params[:service_partner][:company_name])
        @service_partner.update_attribute(:street, params[:service_partner][:street])
        @service_partner.update_attribute(:zip_code, params[:service_partner][:zip_code])
        @service_partner.update_attribute(:city, params[:service_partner][:city])
        @service_partner.update_attribute(:country, params[:service_partner][:country])
        @service_partner.update_attribute(:telephone_number, params[:service_partner][:telephone_number])
        @service_partner.update_attribute(:fax_number, params[:service_partner][:fax_number])
        @service_partner.update_attribute(:website, params[:service_partner][:website])
        @service_partner.update_attribute(:email, params[:service_partner][:email])
        @service_partner.update_attribute(:number_of_employees, params[:service_partner][:number_of_employees])
        @service_partner.update_attribute(:founded, params[:service_partner][:founded])
        @service_partner.update_attribute(:specialities, params[:service_partner][:specialities])
        @service_partner.update_attribute(:description, params[:service_partner][:description])
        @service_partner.update_attribute(:status, params[:service_partner][:status])
        if params[:service_partner][:contact_data_approval] != "true"
          @service_partner.update_attribute(:contact_data_approval, params[:service_partner][:contact_data_approval])
          @service_partner.update_attribute(:confirmed_at, Date.today)
        end
        Rails.logger.info(@service_partner.errors.messages.inspect)
        format.html{redirect_to "/service_directory/overview", :notice=>"Update successful"}
      else
        @service_partner.update_attribute(:salutation, params[:service_partner][:salutation])
        @service_partner.update_attribute(:first_name, params[:service_partner][:first_name])
        @service_partner.update_attribute(:last_name, params[:service_partner][:last_name])
        @service_partner.update_attribute(:company_name, params[:service_partner][:company_name])
        @service_partner.update_attribute(:street, params[:service_partner][:street])
        @service_partner.update_attribute(:zip_code, params[:service_partner][:zip_code])
        @service_partner.update_attribute(:city, params[:service_partner][:city])
        @service_partner.update_attribute(:country, params[:service_partner][:country])
        @service_partner.update_attribute(:telephone_number, params[:service_partner][:telephone_number])
        @service_partner.update_attribute(:fax_number, params[:service_partner][:fax_number])
        @service_partner.update_attribute(:website, params[:service_partner][:website])
        @service_partner.update_attribute(:email, params[:service_partner][:email])
        @service_partner.update_attribute(:password, params[:service_partner][:password])
        @service_partner.update_attribute(:number_of_employees, params[:service_partner][:number_of_employees])
        @service_partner.update_attribute(:founded, params[:service_partner][:founded])
        @service_partner.update_attribute(:specialities, params[:service_partner][:specialities])
        @service_partner.update_attribute(:description, params[:service_partner][:description])
        @service_partner.update_attribute(:status, params[:service_partner][:status])
        if params[:service_partner][:contact_data_approval] != "true"
          @service_partner.update_attribute(:contact_data_approval, params[:service_partner][:contact_data_approval])
          @service_partner.update_attribute(:confirmed_at, Date.today)
        end
        sign_in(@service_partner, :bypass=>true)
        Rails.logger.info(@service_partner.errors.messages.inspect)
        format.html{redirect_to "/service_directory/overview", :notice=>"Update successful"}
      end
    end
  end

  def contact_view
    @service_partner = ServicePartner.find(params[:id])
  end
end