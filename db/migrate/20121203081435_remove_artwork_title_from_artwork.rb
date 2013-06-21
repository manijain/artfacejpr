class RemoveArtworkTitleFromArtwork < ActiveRecord::Migration
  def up
    remove_column :artworks, :artwork_title
  end

  def down
  end
end
