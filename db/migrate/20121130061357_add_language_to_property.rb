class AddLanguageToProperty < ActiveRecord::Migration
  def change
    add_column :properties, :language, :string, :limit=> 2
  end
end
