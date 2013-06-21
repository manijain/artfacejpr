class Payment < ActiveRecord::Base
  belongs_to :user
  attr_accessible :amount, :payment_type, :transaction_amount, :user_id, :paid_amount, :payment_conflict_reason
  validates :user_id, :presence=>true
end
