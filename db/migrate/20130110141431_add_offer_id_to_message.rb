class AddOfferIdToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :offer_id, :integer
  end
end
