class CreateHeaderImages < ActiveRecord::Migration
  def up
    create_table :header_images do |t|
      t.has_attached_file :header_image
      t.string            :header_image_name
      t.timestamps
    end
  end
  def down
    remove_table :header_images
  end
end
