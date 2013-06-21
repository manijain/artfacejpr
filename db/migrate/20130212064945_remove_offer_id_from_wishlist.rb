class RemoveOfferIdFromWishlist < ActiveRecord::Migration
  def change
    remove_column :wishlists, :offer_id
  end

end
