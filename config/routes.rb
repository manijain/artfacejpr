Artface::Application.routes.draw do
  get "document/show"
  match "/offer/sell_art_area_messages_sorting"  => "offer#sell_art_area_messages_sorting"
  match "/offer/buy_art_area_messages_sorting"   => "offer#buy_art_area_messages_sorting"
  match "wishlist/offer_update"             => "wishlist#offer_update"
  match "wishlist/delete"                   => "wishlist#destroy"


   match "admin/forum" => "admin/forums#index"
   match "admin/reports" => "admin/reports#index"
   match "admin/admin" => "admin/admin#index"
   match "admin/admin/unknown_artist" => "admin/admin#unknown_artist"
   match "/admin/dashboard"        => "admin/dashboard#index" 
   match "/admin/users"            => "admin/users#index"
   match "/admin/users/search" => "admin/users#user_search"
   match "admin/users/send_invitation" => "admin/users#send_invitation_to_user"
   match "admin/users/resend_invitation" => "admin/users#resend_invitation_to_user"
   match "/admin/users/cancel_subscription" => "admin/users#cancel_user_subscription"
   match "/admin/users/zip_download" => "admin/users#zip_download", :as=>"admin_user_zip_download_files"
   match "/admin/users/update_settings" =>"admin/users#update_settings"
   match "/admin/users/login_as_user" => "admin/users#login_as_user", :as=> "admin_logs_in_as_user"
   match "/admin/users/user_offers/search"       => "admin/users#user_offers_search", :as => "admin_users_user_offers_search"
   match "/admin/users/user_favourites/search"       => "admin/users#user_favourites_search", :as => "admin_users_user_favourites_search"
   match "/admin/users/user_messages/search"       => "admin/users#user_messages_search", :as => "admin_users_user_messages_search"
  
   get "/admin/users/choose_subscription_type" 
   get "/admin/users/new"          => "admin/users#new"
   match "/admin/users/new"        => "admin/users#create"
   match "/admin/users/update" => "admin/users#update_wishlist"
   match "/admin/users/create_message" => "admin/users#create_message"
   match "/admin/users/delete_message/:id" => "admin/users#delete_message"
   match "/admin/users/edit_message_by_admin" => "admin/users#edit_message_by_admin"
   match "/admin/users/delete_favourite" => "admin/users#delete_favourite"
   match "/admin/users/delete_offer" => "admin/users#delete_offer"
   match "/admin/users/delete_wish" => "admin/users#delete_wish"
   match "/admin/users/add_new_wishlist"    => "admin/users#admin_add_new_wishlist"
   match "/admin/users/pagination" => "admin/users#pagination"
   match "/admin/users/user_wishlists/:id" => "admin/users#user_wishlists", :as=> "admin_users__wishlists_show"
   match "/admin/users/user_messages/:id" => "admin/users#user_messages", :as=> "admin_users__msg_show"
   match "/admin/users/user_favourites/:id" => "admin/users#user_favourites", :as=> "admin_users__fav_show"
   match "/admin/users/user_offers/:id" => "admin/users#user_offers", :as=> "admin_users_offer_show"
   match "/admin/users/user_offers_search_page" => "admin/users#user_offers_search_page"
   match "/admin/users/:id"        => "admin/users#show"

  match "/admin/users/update_settings" =>"admin/users#update_settings"
  match "/admin/users/:id/edit"   => "admin/users#edit"
  match "/admin/users/:id/update" => "admin/users#update"
  match "/admin/users/:id/forum_list" => "admin/users#forum_list"
   
  match "/admin/forums/show/:id" => "admin/forums#show"
  
  match "/admin/users/user_offers/:id" => "admin/users#user_offers", :as=> "admin_users_offer_show"
  match "/admin/users/user_offers/search" => "admin/users#user_offers_search", :as => "admin_users_user_offers_search"
  
  match "/admin/users/users_offer_show/:id" => "admin/users#users_offer_show"
  
  match "/admin/offers/edit/:id" => "admin/offers#edit"
  match "/admin/offers/update/:id" => "admin/offers#update"
  match "/admin/offers/save_image_admin" => "admin/offers#save_image_admin"
  match "/admin/offers/offer_show/:id" => "admin/offers#offer_show"
  match "/admin/offers/get_data" => "admin/offers#get_relavant_form_data"
  match "/admin/offers/find_artist_by_name" => "admin/offers#find_artist_by_name"
  match "/admin/offers/find_artist_chronology" => "admin/offers#find_artist_chronology"
  match "/admin/users/:id/forum_list_search" => "admin/users#forum_list_search"
  match "/admin/forums/new_reply" =>"admin/forums#new_reply"
  match "/admin/forums/create" => "admin/forums#forum_message_create"
  match "/admin/forums/new_reply_child" => "admin/forums#new_reply_child"
  match "/admin/forums/edit_reply" => "admin/forums#edit_reply"
  match "/admin/forums/update_reply" => "admin/forums#update_reply"
  match "/admin/forums/remove_message" => "admin/forums#remove_message"
  match "/admin/forums/new_reply_index" =>"admin/forums#new_reply_index"
  
  match "/admin/services" => "admin/services#index"
  match "/redirect_to_index/" => "admin/services#redirect_to_index"  
  match "/admin/services/search_basic"    => "admin/services#search_basic"
  match "/admin/services/search_advanced"   => "admin/services#search_advanced"
  
  match "/admin/services/new" => "admin/services#new",    :as => "admin_new_service"
  match "/admin/services/new_lawyer" => "admin/services#new_lawyer"
  match "/admin/services/create_service_partner" =>"admin/services#create_service_partner"
  match "/admin/services/new_expert" => "admin/services#new_expert"
  match "/admin/services/new_shipping_company" => "admin/services#new_shipping_company"
  match "/admin/services/new_insurance_company" => "admin/services#new_insurance_company"
  match "/admin/services/edit_lawyer/:id" => "admin/services#edit_lawyer"
  match "/admin/services/edit_expert/:id" => "admin/services#edit_expert"
  match "/admin/services/edit_shipping_company/:id" => "admin/services#edit_shipping_company"
  match "/admin/services/edit_insurance_company/:id" =>"admin/services#edit_insurance_company"
  match "/admin/services/update_service_partner/:id" =>"admin/services#update_service_partner"
  match "/admin/services/delete_service_partner" => "admin/services#delete_service_partner"
  match "/admin/services/manual_approval" => "admin/services#manual_approval"
  match "/admin/services/send_invitation" => "admin/services#send_invitation"
  match "/admin/services/resend_invitation" => "admin/services#resend_invitation"
  

  match "/admin/admin/payment_search"    => "admin/admin#payment_search", :as => "admin_admin_user_search"
  match "/admin/admin/abuse_reports"    => "admin/admin#abuse_reports", :as => "admin_admin_abusereport_search"
  get "/admin/admin/solved_report"
  get "/admin/admin/unsolved_report"
  get "/admin/admin/delete_report"
  match "/admin/admin/abuse_report_reply" => "admin/admin#abuse_report_reply", :as => "message_admin_report_abuse_reply"
  get "/admin/admin/update_plans"
  match "/admin/send_email_reminder"  => "admin/admin#send_email_reminder", :as => "admin_due_amount"



  
  match "/admin/offers"           => "admin/offers#index"
  match "/admin/offers/search"    => "admin/offers#buy_art_search", :as => "admin_offers_buy_art_search" 
  match "/admin/artists/new"       => "admin/artists#new",           :as => "admin_new_artist"
  #match "/admin/artist/create"   => "admin/artists#create",       :as => "admin_create_artist"
  post "/admin/artists/create"
  match "/admin/artist/:id/edit"  => "admin/artists#edit" #,          :as => "admin_artist_edit" 
  post "/admin/artists/update"
  get "admin/offers/delete_artist"
  get "/admin/offers/delete_offer"
  match "/admin/artists/search"   => "admin/offers#artist_search",  :as => "admin_offers_artist_search"
  #match "admin//buy-art/search"                 => "offer#buy_art_search", :as => "offer_buy_art_search"


  get "message/create"
  get "favourite/create"
  get "favourite/delete"
  get "/favourite/refresh_favourites"
  post "message_admin/report_abuse"
  match "/offer_show/new_reply"           => "message#offer_show_create_reply_box"
  match "/offer_show/save_reply"          => "message#offer_show_save_reply"
  match "/wishlist/pagination"            => "wishlist#pagination"

  match "/user/settings/"                 => "user#edit"
  match "/user/zip_download"              => "user#zip_download",   :as=>"user_zip_download_files"
  match "/user/update_settings"           => "user#update_settings"
  match "/user/cancel_subscription"       => "user#cancel_subscription"
  match "/user/edit_data"                 => "user#user_edit_data"
  # match "/admin/user_offers/search"     => "admin/offer#user_offers_search", :as => "admin_offer_user_offers_search"
  # match "/admin/user_favourites/search" => "admin/offer#user_favourites_search", :as=>"admin_offer_user_favourites_search"
  # match "/admin/user_offers/:id"           => "admin/offer#user_offers"
  # match "/admin/user_messages/:id"         => "admin/offer#user_messages"
  # match "/admin/user_favourites/:id"       => "admin/offer#user_favourites"
  # match "/admin/user_wishlists/:id"        => "admin/offer#user_wishlists"
  # match "/admin/admin_add_new_wishlist"    => "admin/offer#admin_add_new_wishlist"
  # match "/admin/user_forum_messages/:id"   => "admin/offer#user_forum_messages" 


  post "offer/update"
  post "wishlist/create"
  match "/wishlist/update"                => "wishlist#update"
  match "wishlist/add_new_wishlist"       => "wishlist#add_new_wishlist"
  match "/subscription/bank_transfer"     => "subscription#bank_transfer"
  match "/message/immediate_children"     => "message#immediate_children" 
  match "/message/contact_owner"          => "message#contact_owner", :as=>"contact_owner"

  root :to => "static#home"

  match "/set_locale"                     => "static#set_locale"
  match "/contact/validate_captcha"       => "static#validate_captcha"
  match "/user_registration/registration_check_for_email" => "user#registration_check_for_email"

  match "contact/validate_captcha"        => "static#validate_captcha"

  get "offer/new"
  match "offer/find_artist_by_name"       => "offer#find_artist_by_name"
  match "offer/find_artist_chronology"    => "offer#find_artist_chronology"
  match "offer/show/:id"                  => "offer#show"
  match "offer/show/:id/full-screen"      => "offer#show_full_screen"
  match "myoffer/show/:id"                => "offer#my_offer_show"
  match "offer/get_data"                  => "offer#get_relavant_form_data"
  match "offer/your-favourites"           => "favourite#home", :as=>"offer_user_favourites"
  match "favourite/search"                => "favourite#search", :as=>"favourite_search"
  match "offer/delete_offer"              => "offer#delete_offer"
  match "offer/edit/:id"                  => "offer#edit"
  match "offer/message_status"            => "offer#message_status"
  match "/offer/your-wishlists"           => "wishlist#home"
  match "/wishlist/search"                => "wishlist#search", :as=>"wishlist_search" 
  match "/dashboard/sell-art-area"        => "offer#sell_art_area", :as => "offer_sell_art_area"
  
  match "/forum/update_email_notification"=> "forum#update_email_notification"
  match "/forum/new-question"             => "forum#new_question", :as=>"forum_new_message"
  match "/forum"                          => "forum#redirect_to_index"
  match "/forum/home"                     => "forum#home"
  match "/forum/show/:id"                 => "forum#show"
  match "forum/verify_offer_id"           => "forum#verify_offer_id"
  match "/forum/new_reply"                => "forum#new_reply"
  match "/forum/new_reply_child"                => "forum#new_reply_child"
  match "/forum/message/create"           => "forum#forum_message_create", :as=>"forum_message_create"
  match "/forum/new_forum_message"           => "forum#post_new_forum_message", :as=>"forum_new_question"

  resources :offer
  
  match "message/destroy/:id"             => "message#destroy"
  
  match "/user_recommendation/create"     => "user_recommendation#create"
  match "/dashboard"                      => "dashboard#home"
  match "/dashboard/home"                 => "offer#home"
  match "/dashboard/sell-art"             => "offer#new"
  match "/dashboard/buy-art-area"         => "offer#buy_art_area"
  match "/recommended/register"           => "user_recommendation#recommended"
  match "/buy-art/search/redirect"        => "offer#buy_art_search_redirect"
  match "/buy-art/search"                 => "offer#buy_art_search", :as => "offer_buy_art_search"
  match "/dashboard/service"              => "service#redirect_to_index"
  match "/dashboard/service/home"         => "service#index"
  match "/service/partner/:id"            => "service#show"
  match "/service/search_basic"           => "service#search_basic"
  match "/service/search_advanced"        => "service#search_advanced"
  match "offer/save_image"                => "offer#save_image"
  match "subscription/new"                => "subscription#new"
  match "subscription/express_checkout"   => "subscription#express_checkout"
  match "subscription/confirm"            => "subscription#confirm"
  match "subscription/complete"           => "subscription#complete"
  match "home"                            => "static#home"
  match "about"                           => "static#about"
  match "memberfees"                      => "static#memberfees"
  match "offers"                          => "static#offers"
  match "contact"                         => "static#contact"
  match "terms_conditions"                => "static#terms_conditions"
  match 'checkout'                        => "subscription#checkout"

  match '/service_directory/overview' => "service_directory_admin/service_partners#show"
  match '/redirect_to_show/' => "service_directory_admin#redirect_to_show"
  match '/service_directory/search_basic' => "service_directory_admin/service_partners#search_basic"
  match '/service_directory/search_advanced' => "service_directory_admin/service_partners#search_advanced"
  match '/service_directory/edit/:id' => "service_directory_admin/service_partners#edit_contact_data"
  match '/service_directory/update/:id' => "service_directory_admin/service_partners#update_contact_data"
  match '/service_directory/contact_view/:id' =>"service_directory_admin/service_partners#contact_view"

  devise_for :admin_users, :controllers => { :sessions => "admin/sessions" },  :path => '/backend',:path_names => { :sign_in => "/af_login", :sign_out => "/logout" }
  devise_for :users, :path_names => { :sign_up => "/register", :sign_in => "/login", :sign_out => "/logout" }
  devise_for :service_partners, :controllers => { :sessions => "service_directory_admin/sessions" }, :path => '/service_directory_admin', :path_names => { :sign_in => "/login", :sign_out => "/logout" }
  
  match ':action'  => 'static#:action'
  match "*missing" => 'static#missing'
end