class ColumnNamesChangedOfPayment < ActiveRecord::Migration
  def change
    rename_column :payments, :payment_type, :payment_conflict_reason
    rename_column :payments, :amount, :paid_amount
  end
end
