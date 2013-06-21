class AddOfferListToWishlist < ActiveRecord::Migration
  def change
    add_column :wishlists, :offer_list, :text
  end
end
