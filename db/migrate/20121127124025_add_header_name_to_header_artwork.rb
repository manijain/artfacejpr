class AddHeaderNameToHeaderArtwork < ActiveRecord::Migration
  def up
    add_column :header_artworks, :name, :string
  end
  def down
    add_column :header_artworks, :name
  end
end
