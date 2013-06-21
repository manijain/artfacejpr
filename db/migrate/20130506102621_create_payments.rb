class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.float :transaction_amount
      t.integer :user_id
      t.string :payment_type
      t.float :amount

      t.timestamps
    end
  end
end
