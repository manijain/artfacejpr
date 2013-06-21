class AddImageToPartners < ActiveRecord::Migration
  def up
    change_table :partners do |t|
      t.has_attached_file :image
    end
  end
  def down
    drop_attached_file :partners, :image
  end
end
