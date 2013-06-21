class AddArtistIdToArtwork < ActiveRecord::Migration
  def up
    add_column :artworks, :artist_id, :integer
  end
  def down
    remove_column :artworks, :artist_id
  end
end