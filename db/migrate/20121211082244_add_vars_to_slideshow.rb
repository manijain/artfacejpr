class AddVarsToSlideshow < ActiveRecord::Migration
  def up
    add_column :slideshows, :heading_text, :string
    add_column :slideshows, :text, :text
  end
  def down
    remove_column :slideshows, :heading_text
    remove_column :slideshows, :text
  end
end
