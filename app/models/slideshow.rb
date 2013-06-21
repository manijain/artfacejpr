class Slideshow < ActiveRecord::Base
  attr_accessible :image, :name, :image_text, :slide_order, :heading_text, :text
  if Rails.env == "development"
    has_attached_file :image,
      :styles=> {:small => "200x200#"},
      :path => "public/images/slideshow_images/:styles/:attachment/:id/:filename"
  elsif Rails.env == "production"
    has_attached_file :image,
      :styles=> {:small => "200x200#"},
      :storage => :s3,
      :s3_credentials => "#{Rails.root}/config/s3.yml",
      :path => "public/images/slideshow_images/:styles/:attachment/:id/:filename"
  end
end
