class AddHideIdentityToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :hide_identity, :boolean
  end
end
