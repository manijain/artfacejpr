class AddTextToSlideshow < ActiveRecord::Migration
  def up
    add_column :slideshows, :image_text, :string
  end
  def down
    drop_column :slideshow, :image_text
  end
end
