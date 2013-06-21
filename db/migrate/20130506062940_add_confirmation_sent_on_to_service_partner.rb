class AddConfirmationSentOnToServicePartner < ActiveRecord::Migration
  def change
  	add_column :service_partners, :confirmation_sent_at, :datetime
  	add_column :service_partners, :confirmed_at, :datetime
  	add_column :service_partners, :invitation_approved, :boolean
  end
end
