Artface::Application.configure do
  config.cache_classes = true
  config.serve_static_assets = true
  config.static_cache_control = "public, max-age=3600"
  config.whiny_nils = true
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.action_dispatch.show_exceptions = false
  config.action_controller.allow_forgery_protection    = false
  config.action_mailer.delivery_method = :test
  config.active_record.mass_assignment_sanitizer = :strict
  config.active_support.deprecation = :stderr
  config.action_mailer.default_url_options = { :host => '127.0.0.1:3000' }   
  PAPERCLIP_STORAGE_OPTIONS_ARTWORK = {
    :path => "public/images/uploaded/artwork/:styles/:attachment/:id/:filename"
  }
  PAPERCLIP_STORAGE_PATH = "https://artfacedev-pro.s3.amazonaws.com/public/"
  # => temp change # => PAPERCLIP_STORAGE_PATH = "/"
end
