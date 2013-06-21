class CreateWishlistOffer < ActiveRecord::Migration
  def change
    create_table :wishlist_offers do |t|
      t.integer :wishlist_id
      t.integer :offer_id

      t.timestamps
    end
  end
end
