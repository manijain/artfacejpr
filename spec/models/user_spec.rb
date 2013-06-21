require 'spec_helper'

describe User do
  before(:each) do
    @valid_attributes = {
      :user_first_name   => "John",
      :user_last_name    => "Doe",
      :email             => "john@example.org",
      :password          => "abcdef!23",
      :user_company      => "Example Company",
      :user_street       => "L - 1",
      :user_zip_code     => "110087",
      :user_country      => "India",
      :user_phone_number => "124567890",
      :user_city         => "test city",
      :user_gender       => "Male"
    }
    #@existing_user = User.create!(@valid_attributes)
  end

  it "should enforce the uniqueness of new users' email" do 
    user_one = User.create(@valid_attributes)
    user_two = User.create(@valid_attributes)
    user_two.should_not be_valid
  end
end
