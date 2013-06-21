class CreateArtworkDescriptions < ActiveRecord::Migration
  def up
    create_table :artwork_descriptions do |t|
      t.text :artwork_description_en, :null=>:false, :default=>""
      t.text :artwork_description_ch, :null=>:false, :default=>""
      t.text :artwork_description_fi, :null=>:false, :default=>""
      t.text :artwork_description_fr, :null=>:false, :default=>""
      t.text :artwork_description_us, :null=>:false, :default=>""
      t.text :artwork_description_ne, :null=>:false, :default=>""
      t.integer :artwork_id
      t.timestamps
    end
  end

  def down
    drop_table :artwork_descriptions
  end
end