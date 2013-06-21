class AddArtworkIdToArtist < ActiveRecord::Migration
  def up
  	add_column :artists, :artwork_id, :integer
  end
  def down
  	remove_column :artists, :artwork_id
  end
end
