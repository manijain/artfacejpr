class UserRecommendationController < ApplicationController
  def create
    user_recommendation = UserRecommendation.create(params[:user_recommendation])
    @user = current_user
    @errors = []
    if user_recommendation.errors.empty?
      @user.subscription.increment_attribute "recommendations_pending"
      RecommendationMailer.send_recommendation(@user, user_recommendation).deliver
      respond_to do |format|
        format.js
      end
    else
      @errors = user_recommendation.errors.full_messages.join("\n")
      respond_to do |format|
        format.js
      end
    end
  end

  def recommended
    if User.where(:email => params["email"]).count == 1
      flash[:notice] = "you are already registered at Artface.com"
      redirect_to new_user_session_path
    elsif UserRecommendation.where(:email => params["email"]).count == 0
      flash[:notice] = "You have never been recommended, however you can still sign up."
      redirect_to new_user_registration_path
    elsif UserRecommendation.where(:email => params["email"]).count == 1
      session[:recommended_to_email]   = params["email"]
      session[:recommended_by_user_id] = params["recommended-by"]
      redirect_to new_user_registration_path
    end
  end

end