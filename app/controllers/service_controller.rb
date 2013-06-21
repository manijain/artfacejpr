class ServiceController < ApplicationController
  before_filter :authenticate_user!

  def redirect_to_index
    session[:search] = ""
    session[:select] = ""
    redirect_to "/dashboard/service/home"
  end

  def index
    current_user
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
        @service_partner_type_4 = ServicePartner.where("partner_type = ?",4).paginate :per_page=>params[:per_page], :page=>params[:page]
        respond_to do |format|
          format.js { render "/service/index/layout_part_two/data"}
        end
        return
      end
      if params[:partner_type].to_i == 3
        @service_partner_type_3 = ServicePartner.where("partner_type = ?",3).paginate :per_page=>params[:per_page], :page=>params[:page]
        respond_to do |format|
          format.js { render "/service/index/layout_part_two/data"}
        end
        return
      end
      if params[:partner_type].to_i == 2
        @service_partner_type_2 = ServicePartner.where("partner_type = ?",2).paginate :per_page=>params[:per_page], :page=>params[:page]
        respond_to do |format|
          format.js { render "/service/index/layout_part_two/data"}
        end
        return
      end
      if params[:partner_type].to_i == 1
        @service_partner_type_1 = ServicePartner.where("partner_type = ?",1).paginate :per_page=>params[:per_page], :page=>params[:page]
        respond_to do |format|
          format.js { render "/service/index/layout_part_two/data"}
        end
        return
      end
    end


    @service_partner_type_1 = ServicePartner.where("partner_type = ?",1).paginate :per_page=>per_page_1, :page=>page_1
    @service_partner_type_2 = ServicePartner.where("partner_type = ?",2).paginate :per_page=>per_page_2, :page=>page_2
    @service_partner_type_3 = ServicePartner.where("partner_type = ?",3).paginate :per_page=>per_page_3, :page=>page_3
    @service_partner_type_4 = ServicePartner.where("partner_type = ?",4).paginate :per_page=>per_page_4, :page=>page_4

    respond_to do |format|
      format.html
      format.js
    end


  end

  def show
    @service_partner = ServicePartner.find(params[:id])
  end 


  def search_basic
    unless params[:service_partner][:search_in].blank?
      search_item = params[:service_partner][:search_term].to_s || ""
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
      OR CAST(number_of_employees as TEXT) ilike '%#{search_item}%'
      OR CAST(founded as TEXT) ilike '%#{search_item}%'"
      case params[:service_partner][:search_in].to_i
        when 1
          @result_data_in = 1
          #art insurance company id = 1
          @service_partners = ServicePartner.where("partner_type = ?", 4).where(search_string)
        when 2
          @result_data_in = 2
          #Art Shipping Company id = 2
          @service_partners = ServicePartner.where("partner_type = ?", 3).where(search_string)
        when 3
          @result_data_in = 3
          #art lawyer id = 3
          @service_partners = ServicePartner.where("partner_type = ?", 2).where(search_string)
        when 4
          @result_data_in = 4
          #art expert id = 4
          @service_partners = ServicePartner.where("partner_type = ?", 4).where(search_string)
      end
    end
    respond_to do |format|
      format.js { render "service/index/search_data/search_data"}
    end
  end


  def search_advanced
    country_search_string = ""
    speciality_search_string = ""
    description_search_string = ""
    lawyer_number_of_employees_search_string = ""
    
    unless params[:select][:country].blank?
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
    @service_partners = ServicePartner.where(country_search_string).where(speciality_search_string).where(lawyer_number_of_employees_search_string).where(description_search_string).where("partner_type = ?", params[:service_partner][:search_in].to_i)
    @result_data_in = params[:service_partner][:search_in].to_i
    respond_to do |format|
      format.js { render "service/index/search_data/search_data"}
    end
  end

end
