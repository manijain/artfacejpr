class Artist < ActiveRecord::Base
  has_many :artworks
  attr_accessible :artist_name, :created_at, :updated_at, :approved_status, :artist_birth_year, :artist_death_year, :artist_birth_date, :artist_death_date, :artist_salutation, :artist_description, :artist_requests
  validates :artist_name, :presence => true, :length => { :maximum => 255 }     # => :format => { :with => //}

end