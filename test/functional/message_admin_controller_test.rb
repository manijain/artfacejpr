require 'test_helper'

class MessageAdminControllerTest < ActionController::TestCase
  test "should get report_abuse" do
    get :report_abuse
    assert_response :success
  end

end
