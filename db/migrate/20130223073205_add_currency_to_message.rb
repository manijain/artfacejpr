class AddCurrencyToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :currency, :string
  end
end
