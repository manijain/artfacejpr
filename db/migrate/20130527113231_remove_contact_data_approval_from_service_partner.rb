class RemoveContactDataApprovalFromServicePartner < ActiveRecord::Migration
  def change
  	remove_column :service_partners, :contact_data_approval
  end


end
