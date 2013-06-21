class MessageAdminController < ApplicationController
  def report_abuse
    MessageAdmin.create(params[:message_admin])
    respond_to do |format|
      format.js
    end
  end
end