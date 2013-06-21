class CreateProperties < ActiveRecord::Migration
  def up
    create_table :properties do |t|
      t.string :key
      t.string :value
      t.timestamps
    end
  end
  def down
    drop_table :properties    
  end
end
