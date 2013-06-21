class RemoveDescriptionFromArtwork < ActiveRecord::Migration
  def up
    remove_column :artworks, :artwork_description
  end

  def down
  end
end
