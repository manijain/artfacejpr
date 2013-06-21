class ChangePartnerTypeInServicePartner < ActiveRecord::Migration
  def change
    remove_column :service_partners, :partner_type
    add_column :service_partners, :partner_type, :integer
  end
end
