require 'test_helper'

class ForumMailerTest < ActionMailer::TestCase
  test "new_reply" do
    mail = ForumMailer.new_reply
    assert_equal "New reply", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
