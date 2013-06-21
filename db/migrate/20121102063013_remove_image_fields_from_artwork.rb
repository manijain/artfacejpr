class RemoveImageFieldsFromArtwork < ActiveRecord::Migration
  def change
		remove_column :artworks,	:artwork_hires_image
		remove_column :artworks,	:artwork_thumbnail
		remove_column :artworks,	:artwork_detail_one
		remove_column :artworks,	:artwork_detail_two
		remove_column :artworks,	:artwork_documentation
  end
end
