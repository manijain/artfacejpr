class AddOfferIdToMessageAdmin < ActiveRecord::Migration
  def change
    add_column :message_admins, :offer_id, :integer
  end
end
