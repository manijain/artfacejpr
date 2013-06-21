class User < ActiveRecord::Base
  has_one :subscription, :dependent => :destroy
  has_one :user_setting, :dependent => :destroy
  has_many :offers, :foreign_key => 'seller_id', :dependent => :destroy
  has_many :user_recommendation, :dependent => :destroy
  has_many :favourites, :dependent => :destroy
  has_many :messages, :dependent => :destroy
  has_many :forum_messages  
  has_one :payment
  has_many :documents, :dependent => :destroy
  has_many :message_admin
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

  attr_accessible :email, :password, :password_confirmation, :remember_me, :user_first_name, :user_last_name, :user_company, :user_street, :user_zip_code, :user_country, :user_phone_number, :user_fax_number, :user_salutation, :user_city, :user_tax_id, :user_gender
  validates :email, :uniqueness => true, :presence => true #, :format => { :with => /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i }
  validates :password, :presence => true #, :format => { :with =>/((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i }

  def self.scheduled_removal
    User.all.each do |user|
      if !user.confirmation_token.nil?
        system_time = DateTime.parse(Time.now.to_s).to_time.to_i
        user_time = DateTime.parse(user.created_at.to_s).to_time.to_i
        time_remaining = system_time - user_time
        if ( time_remaining >  172800)
          SubscriptionMailer.time_expired(user).deliver
          puts "User with id: #{user.id} deleted."
          user.update_attribute :deleted_at, Time.now
          user.update_attribute :is_deleted, true
        end
      end
    end
  end
end
