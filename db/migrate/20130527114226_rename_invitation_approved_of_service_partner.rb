class RenameInvitationApprovedOfServicePartner < ActiveRecord::Migration
  def change
  	rename_column :service_partners, :invitation_approved, :contact_data_approval
  end
end
