class ChangeNamesOfArtworkTitleAttributes < ActiveRecord::Migration
  def up
    rename_column :artwork_titles, :title_en, :artwork_title_en
    rename_column :artwork_titles, :title_fi, :artwork_title_fi
    rename_column :artwork_titles, :title_ch, :artwork_title_ch
    rename_column :artwork_titles, :title_fr, :artwork_title_fr
    rename_column :artwork_titles, :title_ne, :artwork_title_ne
    rename_column :artwork_titles, :title_us, :artwork_title_us
  end

  def down
  end
end
