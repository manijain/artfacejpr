require 'test_helper'

class RecommendationMailerTest < ActionMailer::TestCase
  test "send_recommendation" do
    mail = RecommendationMailer.send_recommendation
    assert_equal "Send recommendation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
