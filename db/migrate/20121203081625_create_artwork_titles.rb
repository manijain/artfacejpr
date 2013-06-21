class CreateArtworkTitles < ActiveRecord::Migration
  def change
    create_table :artwork_titles do |t|
      t.string :title_en
      t.string :title_fi
      t.string :title_ch
      t.string :title_fr
      t.string :title_ne
      t.integer :artwork_id
      t.timestamps
    end
  end
end
