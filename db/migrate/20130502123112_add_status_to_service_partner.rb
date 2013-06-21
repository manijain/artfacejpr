class AddStatusToServicePartner < ActiveRecord::Migration
  def change
  	add_column :service_partners, :status, :string
  	add_column :service_partners, :contact_data_approval, :string
  end
end
