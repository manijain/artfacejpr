class AddColumnsToServicePartner < ActiveRecord::Migration
  def change
  	add_column :service_partners, :current_sign_in_at, :datetime
  	add_column :service_partners, :last_sign_in_at, :datetime
  	add_column :service_partners, :current_sign_in_ip, :string
  	add_column :service_partners, :last_sign_in_ip, :string
  	add_column :service_partners, :sign_in_count, :integer, :default=>0
  end
end
