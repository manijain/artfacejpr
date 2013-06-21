class HeaderText < ActiveRecord::Base
  attr_accessible :text, :title
  validates :text,  :presence => true, :length => { :maximum => 1000 }, :format => { :with => /^[A-Z0-9 .,-]+$/i }
  validates :title, :presence => true, :length => { :maximum => 255  }, :format => { :with => /^[A-Z0-9 .,-]+$/i }
end
