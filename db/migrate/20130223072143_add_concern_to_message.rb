class AddConcernToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :concern, :string
  end
end
