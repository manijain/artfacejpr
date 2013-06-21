class AddSearchTypeToWishlist < ActiveRecord::Migration
  def change
    add_column :wishlists, :search_advanced, :boolean
  end
end
