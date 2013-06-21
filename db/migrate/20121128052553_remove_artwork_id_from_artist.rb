class RemoveArtworkIdFromArtist < ActiveRecord::Migration
  def up
    remove_column :artists, :artwork_id
  end

  def down
  end
end
