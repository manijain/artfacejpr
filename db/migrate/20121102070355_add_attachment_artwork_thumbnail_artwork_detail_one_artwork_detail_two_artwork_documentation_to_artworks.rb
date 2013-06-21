class AddAttachmentArtworkThumbnailArtworkDetailOneArtworkDetailTwoArtworkDocumentationToArtworks < ActiveRecord::Migration
  def self.up
    change_table :artworks do |t|
      t.has_attached_file :artwork_thumbnail
      t.has_attached_file :artwork_detail_one
      t.has_attached_file :artwork_detail_two
      t.has_attached_file :artwork_documentation
    end
  end

  def self.down
    drop_attached_file :artworks, :artwork_thumbnail
    drop_attached_file :artworks, :artwork_detail_one
    drop_attached_file :artworks, :artwork_detail_two
    drop_attached_file :artworks, :artwork_documentation
  end
end
