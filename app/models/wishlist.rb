class Wishlist < ActiveRecord::Base
  attr_accessible :offer_id, :user_id, :email_notification, :wishlist_name, :wishlist_search_params, :search_advanced, :offer_list
  serialize :offer_list
  serialize :wishlist_search_params

  def wishlist_new_offers wishlist
    new_offers_added = 0
    if wishlist.search_advanced == false
      new_offer_list = Offer.new.search_results_complete wishlist.wishlist_search_params
      new_offer_list = new_offer_list.map{|a| a.id}
      if wishlist.offer_list.blank?        
        return new_offer_list.count
      else
        if new_offer_list.length > wishlist.offer_list.length
          new_offers_added = new_offer_list - wishlist.offer_list
          return  new_offers_added.count
        end
      end
    elsif wishlist.search_advanced == true
      new_offer_list = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
      new_offer_list = new_offer_list.map{|a| a.id}
      if wishlist.offer_list.blank?
        return new_offer_list.count
      else
        if new_offer_list.length > wishlist.offer_list.length
          new_offers_added = new_offer_list - wishlist.offer_list
          return new_offers_added.count
        end
      end
    end
    new_offers_added
  end

  def wishlist_new_offers_for_mailer wishlist
    if wishlist.email_notification == true
      if wishlist.search_advanced == false
        new_offer_list = Offer.new.search_results_complete wishlist.wishlist_search_params
        new_offer_list = new_offer_list.map{|a| a.id}
        if new_offer_list.length > wishlist.offer_list.length
          new_offers_added = new_offer_list - wishlist.offer_list
          new_offers_added.count
          WishlistMailer.new_offers(new_offers_added, wishlist.id).deliver
        end
      elsif wishlist.search_advanced == true
        new_offer_list = Offer.new.advanced_search_results wishlist.wishlist_search_params,1,99999999,""
        new_offer_list = new_offer_list.map{|a| a.id}
        if new_offer_list.length > wishlist.offer_list.length
          new_offers_added = new_offer_list - wishlist.offer_list
          new_offers_added.count
          WishlistMailer.new_offers(new_offers_added, wishlist.id).deliver
        end
      end
    end
  end

  def self.scheduled_new_offers
    Wishlist.all.each do |wishlist|
      Wishlist.new.wishlist_new_offers_for_mailer wishlist
    end
  end


  
end
