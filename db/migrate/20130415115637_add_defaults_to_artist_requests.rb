class AddDefaultsToArtistRequests < ActiveRecord::Migration
  def change
  	change_column :artists, :artist_requests, :integer, :null=>false, :default=>0
  end
end
