class AddResetPasswordToServicePartner < ActiveRecord::Migration
  def change
  	add_column :service_partners, :remember_created_at, :datetime
  	add_column :service_partners, :reset_password_token, :string
  	add_column :service_partners, :reset_password_sent_at, :datetime
  end
end
