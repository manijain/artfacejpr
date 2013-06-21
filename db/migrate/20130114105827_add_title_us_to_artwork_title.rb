class AddTitleUsToArtworkTitle < ActiveRecord::Migration
  def change
    add_column :artwork_titles, :title_us, :string
  end
end
