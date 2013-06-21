class Partner < ActiveRecord::Base
  attr_accessible :custom_data, :link, :name, :image
  validates :name,        :presence => true, :length=> { :maximum => 255 }, :format => { :with => /^[A-Z0-9 .',\-]+$/i}
  validates :link,        :presence => true, :length=> { :maximum => 255 }, :format => { :with => /^[A-Z0-9 .',\/\-_]+$/i}
  validates :custom_data, :length=> { :maximum => 1000 }
  if Rails.env == "development"
    has_attached_file :image,
      :styles => {:small=> "200X200#"},
      :path => "public/images/partner_images/:styles/:attachment/:id/:filename"
  elsif Rails.env == "production"
    has_attached_file :image,
      :styles => {:small=> "200X200#"},
      :storage => :s3,
      :s3_credentials => "#{Rails.root}/config/s3.yml",
      :path => "public/images/partner_images/:styles/:attachment/:id/:filename"
  end
end
