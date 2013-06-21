class ChangeStructureOfArtist < ActiveRecord::Migration
  def change
  	#change_column :artists, :artist_birth_year, :date
  	#change_column :artists, :artist_birth_year, :date

  	#rename_column :artists, :artist_birth_year, :artist_birth_date
  	#rename_column :artists, :artist_death_year, :artist_death_date

  	add_column :artists, :artist_birth_date, :date
  	add_column :artists, :artist_death_date, :date
  	add_column :artists, :artist_salutation, :string
  	add_column :artists, :artist_description, :text
  	add_column :artists, :artist_requests, :integer
  end

end
