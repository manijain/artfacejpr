class EditOfferTable < ActiveRecord::Migration
  def change
  	change_column :offers, :offer_popularity, :integer, :default=>0
  end
end
