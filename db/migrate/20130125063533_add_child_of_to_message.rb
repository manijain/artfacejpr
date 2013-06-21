class AddChildOfToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :child_of, :integer
  end
end
