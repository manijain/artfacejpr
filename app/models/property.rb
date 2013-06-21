class Property < ActiveRecord::Base
  attr_accessible :key, :value, :language
  validates :key,      :presence => true
  validates :value,    :presence => true
#  validates :language, :presence => true
end
