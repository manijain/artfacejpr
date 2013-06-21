class CreateHeaderTexts < ActiveRecord::Migration
  def up
    create_table :header_texts do |t|
      t.string :title
      t.text :text

      t.timestamps
    end
  end
  def down
    remove_table :header_texts
  end
end
