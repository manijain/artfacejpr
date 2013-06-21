class Admin::ServicesController < ApplicationController
  require 'will_paginate/array'
  before_filter :authenticate_admin_user!

  def redirect_to_index
    session[:search] = ""
    session[:select] = ""
    redirect_to "/admin/services"
  end



  def index
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
          format.js { render "admin/services/index/layout_part_two/data"}
        end
        return
      end
      if params[:partner_type].to_i == 3
        @service_partner_type_3 = ServicePartner.where("partner_type = ?",3).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
        respond_to do |format|
          format.js { render "admin/services/index/layout_part_three/data"}
        end
        return
      end
      if params[:partner_type].to_i == 2
        @service_partner_type_2 = ServicePartner.where("partner_type = ?",2).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
        respond_to do |format|
          format.js { render "admin/services/index/layout_part_four/data"}
        end
        return
      end
      if params[:partner_type].to_i == 1
        @service_partner_type_1 = ServicePartner.where("partner_type = ?",1).order(params[:attr]).paginate :per_page=>params[:per_page_item], :page=>params[:page]
        respond_to do |format|
          format.js { render "admin/services/index/layout_part_five/data"}
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


  def show
    @service_partner = ServicePartner.find(params[:id])
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
      format.js { render "admin/services/index/search_data/search_data"}
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
        lawyer_number_of_employees_search_string = "number_of_employees > '#{params[:select][:number_of_employees]["value"].to_i}'"
      elsif params[:select][:number_of_employees][:search_type] == "is lower than"
        lawyer_number_of_employees_search_string = "number_of_employees < '#{params[:select][:number_of_employees]["value"].to_i}'" 
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
      format.js { render "admin/services/index/search_data/search_data"}
    end
  end

  def new_lawyer
    @service_partner = ServicePartner.new
  end

  def create_service_partner
    @service_partner = ServicePartner.new do |temp|
      temp.salutation = params[:service_partner][:salutation]
      temp.first_name = params[:service_partner][:first_name]
      temp.last_name = params[:service_partner][:last_name]
      temp.company_name = params[:service_partner][:company_name]
      temp.street = params[:service_partner][:street]
      temp.zip_code = params[:service_partner][:zip_code]
      temp.city = params[:service_partner][:city]
      temp.country = params[:service_partner][:country]
      temp.telephone_number = params[:service_partner][:telephone_number]
      temp.fax_number = params[:service_partner][:fax_number]
      temp.website = params[:service_partner][:website]
      temp.email = params[:service_partner][:email]
      temp.password = params[:service_partner][:password]
      temp.number_of_employees = params[:service_partner][:number_of_employees]
      temp.founded = params[:service_partner][:founded]
      temp.specialities = params[:service_partner][:specialities]
      temp.description = params[:service_partner][:description]
      temp.partner_type = params[:service_partner][:partner_type]
      temp.confirmation_sent_at = params[:service_partner][:confirmation_sent_at]
    end
    @service_partner.save
    Rails.logger.info(@service_partner.errors.messages.inspect)
    respond_to do |format|
      if @service_partner.save
        logger.debug('in if')
        Rails.logger.info(@service_partner.errors.messages.inspect)
        format.html{redirect_to "/admin/services", :notice=>"Partner added successfully"}
      else
        logger.debug('in else')
        Rails.logger.info(@service_partner.errors.messages.inspect)
        if params[:service_partner][:partner_type] == "3"
          format.html{render action: "new_lawyer", :notice=>"Partner not created"}
        elsif params[:service_partner][:partner_type] == "4"
          format.html{render action: "new_expert", :notice=>"Partner not created"}
        elsif params[:service_partner][:partner_type] == "1"
          format.html{render action: "new_insurance_company", :notice=>"Partner not created"}
        elsif params[:service_partner][:partner_type] == "2"
          format.html{render action: "new_shipping_company", :notice=>"Partner not created"}
        end
      end
    end
  end

  def new_expert
    @service_partner = ServicePartner.new
  end

  def new_shipping_company
    @service_partner = ServicePartner.new
  end

  def new_insurance_company
    @service_partner = ServicePartner.new
  end

  def edit_lawyer
    if params[:choice] == '1'
      id = params[:id]
      @service_partner = ServicePartner.where('id < ?', params[:id]).where(:partner_type=>"3").order('id DESC').first
      if @service_partner.nil?
        render :text=>'0'
      else
        logger.debug(@service_partner.id)
        logger.debug 'aaaaaaaaaaaaaaaaaaaaaaa'
        render :text=>@service_partner.id
      end
    elsif params[:choice] == '2'
      id = params[:id]
      @service_partner = ServicePartner.where('id > ?', params[:id]).where(:partner_type=>"3").order('id ASC').first
      if @service_partner.nil?
        render :text=> '0'
      else
        render :text=>@service_partner.id
      end
    else
      @service_partner = ServicePartner.find(params[:id])
    end
  end

  def edit_expert
    if params[:choice] == '1'
      id = params[:id]
      @service_partner = ServicePartner.where('id < ?', params[:id]).where(:partner_type=>"4").order('id DESC').first
      if @service_partner.nil?
        render :text=>'0'
      else
        render :text=>@service_partner.id
      end
    elsif params[:choice] == '2'
      id = params[:id]
      @service_partner = ServicePartner.where('id > ?', params[:id]).where(:partner_type=>"4").order('id ASC').first
      if @service_partner.nil?
        render :text=>'0'
      else
        render :text=>@service_partner.id
      end
    else
      @service_partner = ServicePartner.find(params[:id])
    end
  end

  def edit_shipping_company
    if params[:choice] == '1'
      id = params[:id]
      @service_partner = ServicePartner.where('id < ?', params[:id]).where(:partner_type=>"2").order('id DESC').first
      if @service_partner.nil?
        render :text=>"0"
      else
        render :text=>@service_partner.id
      end
    elsif params[:choice] =='2'
      id = params[:id]
      @service_partner = ServicePartner.where('id > ?', params[:id]).where(:partner_type=>"2").order('id ASC').first
      if @service_partner.nil?
        render :text=>'0'
      else
        render :text=>@service_partner.id
      end
    else
      @service_partner = ServicePartner.find(params[:id])
    end
  end

  def edit_insurance_company
    if params[:choice] == '1'
      id = params[:id]
      @service_partner = ServicePartner.where('id < ?', params[:id]).where(:partner_type=>"1").order('id DESC').first
      if @service_partner.nil?
        render :text=>"0"
      else
        render :text=>@service_partner.id
      end
    elsif params[:choice] =='2'
      id = params[:id]
      @service_partner = ServicePartner.where('id > ?', params[:id]).where(:partner_type=>"1").order('id ASC').first
      if @service_partner.nil?
        render :text=>'0'
      else
        render :text=>@service_partner.id
      end
    else
      @service_partner = ServicePartner.find(params[:id])
    end
  end

  def update_service_partner
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
      end
      Rails.logger.info(@service_partner.errors.messages.inspect)
      format.html{redirect_to "/admin/services", notice: "Partner updated successfully"}
    end
  end

  def delete_service_partner
    ServicePartner.find(params[:id]).delete
    render :text => "true"
  end

  def manual_approval
    @service_partner = ServicePartner.find(params[:id])
    @service_partner.update_attribute(:contact_data_approval, 'true')
    @service_partner.update_attribute(:confirmed_at, Date.today)
    render :text=>'true'
  end

  def send_invitation
    @token = true
    ServicePartner.all.each do |check|
      if check.email == params[:email]
        @token = false
        break
      end
    end
    if @token == true
      @email = params[:email]
      @password = params[:password]
      @name = params[:name]
      ServicesMailer.send_invitation(@email, @password, @name).deliver
      render :text=>"true"
    else
      render :text=>"false"
    end
  end

  def resend_invitation
    @email = params[:email]
    @name = params[:name]
    @service_partner = ServicePartner.where(:email=>params[:email]).first
    @service_partner.update_attribute :confirmation_sent_at, Date.today
    ServicesMailer.resend_invitation(@email, @name).deliver
    render :text=>"true"
  end

end
