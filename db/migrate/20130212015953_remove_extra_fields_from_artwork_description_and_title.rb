class RemoveExtraFieldsFromArtworkDescriptionAndTitle < ActiveRecord::Migration

  def change
  	remove_column :artwork_descriptions, :artwork_description_us
  	remove_column :artwork_titles, :artwork_title_us
  end

end
