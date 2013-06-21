class Contact < ActiveRecord::Base
  attr_accessible :concern, :email_address, :message, :name, :phone_number, :created_at, :updated_at
  validates :email_address,:presence => true, :length => { :maximum => 255 },  :format => { :with => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i }
  validates :message,      :presence => true, :length => { :maximum => 1000 }, :format => { :with => /^[A-Z ]+$/i }
  validates :name,         :presence => true, :length => { :maximum => 80 },   :format => { :with => /^[A-Z ]+$/i }
  validates :phone_number, :presence => true, :length => { :maximum => 30 },   :format => { :with => /^[0-9]+$/ }
end
