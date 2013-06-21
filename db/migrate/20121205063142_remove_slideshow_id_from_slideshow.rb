class RemoveSlideshowIdFromSlideshow < ActiveRecord::Migration
  def up
    remove_column :slideshows, :ss_id
  end

  def down
  end
end
