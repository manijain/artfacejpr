class CreateOffers < ActiveRecord::Migration
  def change
    create_table :offers do |t|
      t.string    :offer_type
      t.integer   :buyer_id
      t.integer   :seller_id
      t.integer   :offer_price
      t.datetime  :offer_start_date
      t.integer   :offer_popularity
      t.boolean   :offer_status
      t.string    :offer_cancellation_reason
      t.datetime  :offer_end_date
      t.timestamps
    end
  end
end
