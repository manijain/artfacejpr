class ServicePartner < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :city, :company_name, :country, :description, :email, :fax_number, :first_name, :founded, :last_name, :number_of_employees, :partner_type, :password, :salutation, :specialities, :street, :telephone_number, :website, :zip_code, :created_at, :updated_at
  validates :first_name, :presence=>true
  validates :last_name, :presence=>true
  validates :street, :presence=>true
  validates :zip_code, :presence=>true
  validates :city, :presence=>true
  validates :country, :presence=>true
  validates :telephone_number, :presence=>true
  validates :fax_number, :presence=>true
  validates :email, :presence=>true, :uniqueness=>true, :format => { :with => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i }
  validates :password, :presence=>true, :format => { :with => /((?=.*\d)(?=.*[0-9])(?=.*\W).{8,})/ }

end
