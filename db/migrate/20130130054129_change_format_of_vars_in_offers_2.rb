class ChangeFormatOfVarsInOffers2 < ActiveRecord::Migration
  def change
    change_column :offers, :offer_start_date, :datetime
    change_column :offers, :offer_end_date, :datetime
  end

end
