class AddAttributesToWishlist < ActiveRecord::Migration
  def change
    add_column :wishlists, :wishlist_search_params, :text, :default=>""
    add_column :wishlists, :email_notification, :boolean
    add_column :wishlists, :wishlist_name, :string
  end
end
