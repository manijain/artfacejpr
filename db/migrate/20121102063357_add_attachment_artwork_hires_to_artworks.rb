class AddAttachmentArtworkHiresToArtworks < ActiveRecord::Migration
  def self.up
    change_table :artworks do |t|
      t.has_attached_file :artwork_hires
    end
  end

  def self.down
    drop_attached_file :artworks, :artwork_hires
  end
end
