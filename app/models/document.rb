class Document < ActiveRecord::Base
  attr_accessible :document_type, :file_name, :file_path, :user_id
  belongs_to :user
  
  def create_user_invoice user_id
    rendered_invoice = ActionView::Base.new(Rails.root.join("app","views")).render(
      :partial => "document/invoices/pdf/pdf_invoice", :show_as_html => true, :locals => { :document => self }
    )
    pdf = WickedPdf.new.pdf_from_string rendered_invoice 
    file_name = "invoice_#{user_id}_#{Time.now.to_date}.pdf"
    save_path = "tmp/#{file_name}"
    File.open(save_path, 'wb') do |file|
      file << pdf
    end
    self.update_attribute :file_name, file_name
    aws_credentials = {
      :aws_access_key_id => 'AKIAIIF2R4AR4SW6NSZQ',
      :aws_secret_access_key => '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'
    }
    data = File.open(save_path)
    storage = Fog::Storage.new(aws_credentials.merge(:provider => 'AWS'))
    storage.get_bucket("artfacedev-pro")
    storage.put_object("artfacedev-pro", "public/documents/invoice/#{user_id}/#{file_name}", data)
    expire_day = Time.mktime(2029, 1, 1).to_i
    file_url = storage.get_object_url("artfacedev-pro","public/documents/invoice/#{user_id}/#{file_name}",expire_day)
    self.update_attribute :file_path, file_url
    save_path
  end

  def add_welcome_document_to_user user_id
    data = open('https://artfacedev-pro.s3.amazonaws.com/public/documents/static_documents/welcome.pdf')
    aws_credentials = {
      :aws_access_key_id => 'AKIAIIF2R4AR4SW6NSZQ',
      :aws_secret_access_key => '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'
    }
    file_name = "WELCOME TO ARTFACE.pdf"
    self.update_attribute :file_name, file_name
    storage = Fog::Storage.new(aws_credentials.merge(:provider => 'AWS'))
    storage.get_bucket("artfacedev-pro")
    storage.put_object("artfacedev-pro", "public/documents/invoice/#{user_id}/#{file_name}", data)
    expire_day = Time.mktime(2029, 1, 1).to_i
    file_url = storage.get_object_url("artfacedev-pro","public/documents/invoice/#{user_id}/#{file_name}",expire_day)
    self.update_attribute :file_path, file_url
  end

  def add_terms_document_to_user user_id
    data = open('https://artfacedev-pro.s3.amazonaws.com/public/documents/static_documents/terms.pdf')
    aws_credentials = {
      :aws_access_key_id => 'AKIAIIF2R4AR4SW6NSZQ',
      :aws_secret_access_key => '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'
    }
    file_name = "TERMS AND CONDITIONS.pdf"
    self.update_attribute :file_name, file_name
    storage = Fog::Storage.new(aws_credentials.merge(:provider => 'AWS'))
    storage.get_bucket("artfacedev-pro")
    storage.put_object("artfacedev-pro", "public/documents/invoice/#{user_id}/#{file_name}", data)
    expire_day = Time.mktime(2029, 1, 1).to_i
    file_url = storage.get_object_url("artfacedev-pro","public/documents/invoice/#{user_id}/#{file_name}",expire_day)
    self.update_attribute :file_path, file_url

  end






end
