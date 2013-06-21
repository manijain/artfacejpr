class HeaderMovie < ActiveRecord::Base
  attr_accessible :header_movie, :header_movie_name
  validates :header_movie,      :presence => true
  validates :header_movie_name, :presence => true
  validates_attachment :header_movie, :attachment_content_type => { :content_type => ['audio/webm', 'video/webm'] }
  if Rails.env == "development"
    has_attached_file :header_movie,
    :path => "public/videos/header_movies/:id/:filename"
  elsif Rails.env =="production"
    has_attached_file :header_movie,
    :storage => :s3,
    :s3_credentials => "#{Rails.root}/config/s3.yml",
    :path => "public/videos/header_movies/:id/:filename"
  end
end
