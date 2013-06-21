class ChangeDatetypeOfAttributesOfMessages < ActiveRecord::Migration
  def up
    change_column :messages, :created_at, :datetime
    change_column :messages, :updated_at, :datetime
  end
end
