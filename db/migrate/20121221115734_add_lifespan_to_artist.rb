class AddLifespanToArtist < ActiveRecord::Migration
  def up
    add_column :artists, :artist_birth_year, :integer, :null=>false, :default=>0
    add_column :artists, :artist_death_year, :integer, :null=>false, :default=>0
  end
  def down
    remove_column :artists, :artist_birth_year
    remove_column :artists, :artist_death_year
  end
end
