class CreateHeaderArtworks < ActiveRecord::Migration
  def change
    create_table :header_artworks do |t|
      t.integer :artwork_id
      t.timestamps
    end
  end
end
