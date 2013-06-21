class AddPaymentAttributesToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :credit_card, :string
    add_column :subscriptions, :payment_details, :text
    add_column :subscriptions, :card_owner, :string
    add_column :subscriptions, :card_expires, :string
    add_column :subscriptions, :card_type, :string
  end
end
