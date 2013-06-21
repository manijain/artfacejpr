class Favourite < ActiveRecord::Base
  belongs_to :user
  belongs_to :offer
  attr_accessible :offer_id, :user_id
end
