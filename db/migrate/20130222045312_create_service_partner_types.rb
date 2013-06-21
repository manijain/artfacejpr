class CreateServicePartnerTypes < ActiveRecord::Migration
  def change
    create_table :service_partner_types do |t|
      t.integer :type_unique_id
      t.string :partner_type

      t.timestamps
    end
  end
end
