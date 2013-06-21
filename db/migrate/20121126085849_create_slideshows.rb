class CreateSlideshows < ActiveRecord::Migration
  def change
    create_table :slideshows do |t|
      t.string :name
      t.integer :ss_id
      t.has_attached_file :image

      t.timestamps
    end
  end
end
