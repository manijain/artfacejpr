class HeaderImage < ActiveRecord::Base
  attr_accessible :header_image_name, :header_image
  validates :header_image_name, :presence => true
  validates :header_image, :presence => true

  validates_attachment :header_image, :attachment_content_type => { :content_type => [ 'image/jpg', 'image/jpeg', 'image/png', 'image/gif' ] }
  
  if Rails.env == "development"
    has_attached_file :header_image,
      :styles=> {:small=> "200X200#"},
      :path => "public/images/header_images/:styles/:id/:filename"
  elsif Rails.env == "production"
    has_attached_file :header_image,
      :styles=> {:small=> "200X200#"},
      :storage => :s3,
      :s3_credentials => "#{Rails.root}/config/s3.yml",
      :path => "public/images/header_images/:styles/:id/:filename"
  end
end
