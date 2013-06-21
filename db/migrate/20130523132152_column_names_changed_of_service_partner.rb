class ColumnNamesChangedOfServicePartner < ActiveRecord::Migration
  def change
    rename_column :service_partners, :password, :encrypted_password
  end
end
