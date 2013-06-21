class AddOfferIdToArtwork < ActiveRecord::Migration
  def up
  	add_column :artworks, :offer_id, :integer
  end
  def down
  	remove_column :artworks, :offer_id
  end
end
