Artface::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false
  config.time_zone = 'Kolkata'
  
  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = true

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  # Do not compress assets
  config.assets.compress = false
  
  # Expands the lines which load the assets
  config.serve_static_assets = true
  #config.assets.enabled = false
  config.assets.debug = true
  #config.serve_static_assets = true
  #config.assets.compile = false

  # config.action_mailer.default_url_options = { :host => 'debian.local:3000' }  
  # config.action_mailer.delivery_method = :smtp
  # config.action_mailer.perform_deliveries = true
  # config.action_mailer.raise_delivery_errors = true
  # config.action_mailer.default :charset => "utf-8"
  # config.action_mailer.smtp_settings = {
  #   address: "smtp.gmail.com",
  #   port: 587,
  #   domain: "debian.local:3000",
  #   authentication: "plain",
  #   enable_starttls_auto: true,
  #   user_name: "cloud.test.dev@gmail.com",
  #   password: "artfacedev!23"
  # }
  # devise mailer config
  # require 'tlsmail'       
  # Net::SMTP.enable_tls(OpenSSL::SSL::VERIFY_NONE)   
  # ActionMailer::Base.delivery_method = :smtp   
  # ActionMailer::Base.perform_deliveries = true   
  # ActionMailer::Base.raise_delivery_errors = true   
  # ActionMailer::Base.smtp_settings = {   
  #   :enable_starttls_auto => true,     
  #   :address        => 'smtp.gmail.com',   
  #   :port           => 587,   
  #   :tls            => true,   
  #   :domain         => '127.0.0.1:3000',    
  #   :authentication => :plain,   
  #   :user_name      => 'cloud.test.dev@gmail.com',   
  #   :password       => 'narusegawa'
  # }   


 #Below setting by Rohit because some problems in upper settings
  config.action_mailer.default_url_options = { :host => 'localhost:3000' }  
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default :charset => "utf-8"
  config.action_mailer.smtp_settings = {
    address: "smtp.gmail.com",
    port: 587,
    domain: "localhost:3000",
    authentication: "plain",
    enable_starttls_auto: true,
    user_name: "cloud.test.dev@gmail.com",
    password: "artfacedev!23"
  } 

  #config.action_mailer.default_url_options = { :host => 'localhost:3000' }  
  #config.action_mailer.delivery_method = :smtp
  #config.action_mailer.perform_deliveries = true
  #config.action_mailer.raise_delivery_errors = true
  #config.action_mailer.default :charset => "utf-8"
  #config.action_mailer.smtp_settings = {
  #  address: "smtp.gmail.com",
  #  port: 587,
  #  domain: "localhost:3000",
  #  authentication: "plain",
  #  enable_starttls_auto: true,
  #  user_name: "cloud.test.dev@gmail.com",
  #  password: "artfacedev!23"
  #} 



    
  #config.action_mailer.default_url_options = { :host => '127.0.0.1:3000' }   

  #config.after_initialize do
  #  ActiveMerchant::Billing::Base.mode = :test
  #end
  config.after_initialize do
    ActiveMerchant::Billing::Base.gateway_mode = :test
    #ActiveMerchant::Billing::PaypalGateway.pem_file = File.read(Rails.root.to_s + '/config/cert_key_pem_dev.pem')
  end
  $PAYPAL_LOGIN = " sudipt_1350612893_biz_api1.gmail.com";
  $PAYPAL_PASSWORD = "1350612919";
  #PAYPAL_CERT_PEM = File.read("#{Rails.root}/config/cert_key_pem_dev.pem")
  #config.after_initialize do
  #  ActiveMerchant::Billing::Base.mode = :test 
  #  paypal_options = {
  #    :login => "sudipt_1350612893_biz@gmail.com",
  #    :password => "350612871",
  #    :pem => PAYPAL_CERT_PEM
  #  }
  #  ::STANDARD_GATEWAY = ActiveMerchant::Billing::PaypalGateway.new(paypal_options)
  #end
  #config.paperclip_defaults = {
  #  :storage => :s3,
  #  :s3_credentials => {
  #    :bucket => ENV['artfacedev-dev'],
  #    :access_key_id => ENV['AKIAIIF2R4AR4SW6NSZQ'],
  #    :secret_access_key => ENV['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']
  #  }
  #}
  PAPERCLIP_STORAGE_OPTIONS_ARTWORK = {
    :storage => :s3,
    :s3_credentials => "#{Rails.root}/config/s3.yml",
    :path => "public/images/uploaded/artwork/:styles/:attachment/:id/:filename"
  }

  PAPERCLIP_STORAGE_PATH = "https://artfacedev-pro.s3.amazonaws.com/public/"
  # => temp change # => PAPERCLIP_STORAGE_PATH = "/"

end
