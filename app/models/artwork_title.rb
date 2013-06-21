class ArtworkTitle < ActiveRecord::Base
  belongs_to :artwork
  attr_accessible :artwork_title_en, :artwork_title_fi, :artwork_title_ch, :artwork_title_fr, :artwork_title_ne, :artwork_id

  def get_title
    self["artwork_title_#{I18n.locale}".intern]
  end
end
