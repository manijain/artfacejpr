class ArtworkDescription < ActiveRecord::Base
  belongs_to :artwork
  attr_accessible :artwork_description_en, :artwork_description_ch, :artwork_description_fi, :artwork_description_fr, :artwork_description_ne, :artwork_id

   def get_description
    self["artwork_description_#{I18n.locale}".intern]
  end
end
