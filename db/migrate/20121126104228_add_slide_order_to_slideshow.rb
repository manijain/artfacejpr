class AddSlideOrderToSlideshow < ActiveRecord::Migration
  def up
    add_column :slideshows, :slide_order, :integer
  end
  def down
    drop_column :slideshows, :slide_order
  end
end
