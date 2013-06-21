class OfferMailer < ActionMailer::Base
  default from: "cloud.test.dev@gmail.com"

  def new_artist_added(artist)
    @artist = artist
    mail(
      :to      => "cloud.test.dev@gmail.com",
      :from    => "cloud.test.dev@gmail.com",
      :subject => "New Artist Added") do |format|
        format.html { render "new_artist_added" }
      end
  end
end