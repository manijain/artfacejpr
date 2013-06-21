class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
    	t.text      :artwork_title
    	t.string    :artwork_category
    	t.string    :artwork_medium
    	t.integer   :artwork_height
    	t.integer   :artwork_width
    	t.integer   :artwork_depth
    	t.string    :artwork_size_unit
    	t.integer   :artwork_creation_year
    	t.string    :artwork_creation_year_era
    	t.boolean   :artwork_certificate_check
    	t.boolean   :artwork_frame_check
    	t.boolean   :artwork_signature_check
    	t.string    :artwork_movement_period
    	t.text      :artwork_description
    	t.string    :artwork_hires_image
    	t.string    :artwork_thumbnail
    	t.string    :artwork_detail_one
    	t.string    :artwork_detail_two
    	t.string    :artwork_documentation
    	t.string    :artwork_country
      t.timestamps
    end
  end
end
