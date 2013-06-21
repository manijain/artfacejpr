class WishlistMailer < ActionMailer::Base
  default from: "cloud.test.dev@gmail.com"

  def new_offers new_offers_id, wishlist_id
    @new_offers_id = new_offers_id
    @wishlist = Wishlist.find(wishlist_id)
    @user = User.find(@wishlist.user_id)
    mail(
      :to      => "#{@user.email}",
      :from    => "cloud.test.dev@gmail.com",
      :subject => "New offers added matching your wishlists - #{@wishlist.wishlist_name}") do |format|
        format.html { render "new_offers"}
      end
  end
end
