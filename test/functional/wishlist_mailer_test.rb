require 'test_helper'

class WishlistMailerTest < ActionMailer::TestCase
  test "new_offers" do
    mail = WishlistMailer.new_offers
    assert_equal "New offers", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
