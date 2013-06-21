class AddApprovedStatusToArtist < ActiveRecord::Migration
  def up
    add_column :artists, :approved_status, :boolean
  end
  def down
    remove_column :artists, :approved_status
  end
end
