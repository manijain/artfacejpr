class AddDeletedAtToUser < ActiveRecord::Migration
  def change
    add_column :users, :deleted_at, :datetime
    add_column :users, :is_deleted, :boolean
  end
end
