class HeaderArtwork < ActiveRecord::Base
  
  belongs_to :artwork
  attr_accessible :artwork_id, :name
  before_create :header_artwork_validation

  # => for limiting the number of header images for each slideshow
  def header_artwork_validation
    if HeaderArtwork.where("name = ?", self.name).count >= 4
      errors.add(:base, 'Only 4 records can be selected for header artwork with a particular name')
      return false
    end
  end
end
