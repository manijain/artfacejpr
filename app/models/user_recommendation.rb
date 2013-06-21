class UserRecommendation < ActiveRecord::Base
  attr_accessible :email, :message, :name, :user_id

  before_validation :validate_email_presence
  
  belongs_to :user
  
  validates :email,
            :presence => true,
            :length => { :maximum => 255 },
            :uniqueness => { :message => "- User already recommended"},
            :format => { :with => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i }
  
  validates :message,
            :length => { :maximum => 10000 }
  
  validates :name,
            :presence => true,
            :length => { :maximum => 255 }
  
  def validate_email_presence
    if User.where(:email => self.email).count == 1
      errors.add :base, "Email address already registered with artface"
      return false
    end
  end
end
