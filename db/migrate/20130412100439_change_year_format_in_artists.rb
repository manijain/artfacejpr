class ChangeYearFormatInArtists < ActiveRecord::Migration
  def change
  	change_column :artists, :artist_birth_year, :string
  	change_column :artists, :artist_death_year, :string
  end
end
