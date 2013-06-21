class ChangeFormatOfVarsInOffers < ActiveRecord::Migration
  def up
  	remove_column :offers, :offer_start_date
  	remove_column :offers, :offer_end_date
  	add_column :offers, :offer_start_date, :string
  	add_column :offers, :offer_end_date, :string
  end

  def down
  end
end
