# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130527114226) do

  create_table "active_admin_comments", :force => true do |t|
    t.string   "resource_id",   :null => false
    t.string   "resource_type", :null => false
    t.integer  "author_id"
    t.string   "author_type"
    t.text     "body"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.string   "namespace"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], :name => "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], :name => "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], :name => "index_admin_notes_on_resource_type_and_resource_id"

  create_table "admin_invitations", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.integer  "admin_user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "admin_users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "name"
  end

  add_index "admin_users", ["email"], :name => "index_admin_users_on_email", :unique => true
  add_index "admin_users", ["reset_password_token"], :name => "index_admin_users_on_reset_password_token", :unique => true

  create_table "artists", :force => true do |t|
    t.string   "artist_name"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.boolean  "approved_status"
    t.string   "artist_birth_year",  :default => "0", :null => false
    t.string   "artist_death_year",  :default => "0", :null => false
    t.date     "artist_birth_date"
    t.date     "artist_death_date"
    t.string   "artist_salutation"
    t.text     "artist_description"
    t.integer  "artist_requests",    :default => 0,   :null => false
  end

  create_table "artwork_descriptions", :force => true do |t|
    t.text     "artwork_description_en", :default => ""
    t.text     "artwork_description_ch", :default => ""
    t.text     "artwork_description_fi", :default => ""
    t.text     "artwork_description_fr", :default => ""
    t.text     "artwork_description_ne", :default => ""
    t.integer  "artwork_id"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  create_table "artwork_titles", :force => true do |t|
    t.string   "artwork_title_en"
    t.string   "artwork_title_fi"
    t.string   "artwork_title_ch"
    t.string   "artwork_title_fr"
    t.string   "artwork_title_ne"
    t.integer  "artwork_id"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "artworks", :force => true do |t|
    t.string   "artwork_category"
    t.string   "artwork_medium"
    t.integer  "artwork_height"
    t.integer  "artwork_width"
    t.integer  "artwork_depth"
    t.string   "artwork_size_unit"
    t.integer  "artwork_creation_year"
    t.string   "artwork_creation_year_era"
    t.boolean  "artwork_certificate_check"
    t.boolean  "artwork_frame_check"
    t.boolean  "artwork_signature_check"
    t.string   "artwork_movement_period"
    t.string   "artwork_country"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.integer  "offer_id"
    t.string   "artwork_hires_file_name"
    t.string   "artwork_hires_content_type"
    t.integer  "artwork_hires_file_size"
    t.datetime "artwork_hires_updated_at"
    t.string   "artwork_thumbnail_file_name"
    t.string   "artwork_thumbnail_content_type"
    t.integer  "artwork_thumbnail_file_size"
    t.datetime "artwork_thumbnail_updated_at"
    t.string   "artwork_detail_one_file_name"
    t.string   "artwork_detail_one_content_type"
    t.integer  "artwork_detail_one_file_size"
    t.datetime "artwork_detail_one_updated_at"
    t.string   "artwork_detail_two_file_name"
    t.string   "artwork_detail_two_content_type"
    t.integer  "artwork_detail_two_file_size"
    t.datetime "artwork_detail_two_updated_at"
    t.string   "artwork_documentation_file_name"
    t.string   "artwork_documentation_content_type"
    t.integer  "artwork_documentation_file_size"
    t.datetime "artwork_documentation_updated_at"
    t.integer  "artist_id"
  end

  create_table "contacts", :force => true do |t|
    t.string   "name",          :limit => 40
    t.string   "concern",       :limit => 40
    t.string   "email_address", :limit => 40
    t.string   "phone_number",  :limit => 20
    t.text     "message"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
  end

  create_table "countries", :force => true do |t|
    t.string   "country_name"
    t.string   "country_code", :limit => 2
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "documents", :force => true do |t|
    t.integer  "user_id"
    t.string   "file_name"
    t.string   "file_path"
    t.string   "document_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "favourites", :force => true do |t|
    t.integer  "user_id"
    t.integer  "offer_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "forum_message_notifications", :force => true do |t|
    t.integer  "user_id"
    t.integer  "forum_message_id"
    t.boolean  "email_notification"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "forum_messages", :force => true do |t|
    t.integer  "offer_id"
    t.string   "forum_message_title"
    t.text     "forum_message_text"
    t.integer  "user_id"
    t.boolean  "email_notification"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.integer  "child_of"
    t.boolean  "is_parent"
    t.boolean  "is_edited"
    t.boolean  "is_deleted"
  end

  create_table "header_artworks", :force => true do |t|
    t.integer  "artwork_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
  end

  create_table "header_images", :force => true do |t|
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "header_image_name"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "header_movies", :force => true do |t|
    t.string   "header_movie_file_name"
    t.string   "header_movie_content_type"
    t.integer  "header_movie_file_size"
    t.datetime "header_movie_updated_at"
    t.string   "header_movie_name"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "header_texts", :force => true do |t|
    t.string   "title"
    t.text     "text"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "message_admins", :force => true do |t|
    t.string   "concern"
    t.string   "message_title"
    t.text     "message_text"
    t.integer  "user_id"
    t.boolean  "is_read"
    t.boolean  "is_parent"
    t.integer  "child_of"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.integer  "offer_id"
    t.boolean  "is_solved"
    t.string   "reply_title"
    t.text     "reply_message"
    t.boolean  "is_mailed"
    t.datetime "reply_created_at"
    t.datetime "reply_mailed_at"
  end

  create_table "messages", :force => true do |t|
    t.integer  "user_id"
    t.boolean  "is_parent"
    t.text     "message_text"
    t.string   "offer_price"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "offer_id"
    t.text     "message_title"
    t.boolean  "message_read"
    t.integer  "child_of"
    t.string   "concern"
    t.boolean  "hide_identity"
    t.string   "currency"
    t.boolean  "edit_admin"
    t.boolean  "delete_admin"
  end

  create_table "offers", :force => true do |t|
    t.string   "offer_type"
    t.integer  "buyer_id"
    t.integer  "seller_id"
    t.integer  "offer_price"
    t.datetime "offer_start_date"
    t.integer  "offer_popularity"
    t.boolean  "offer_status"
    t.string   "offer_cancellation_reason"
    t.datetime "offer_end_date"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "partners", :force => true do |t|
    t.string   "name"
    t.string   "link"
    t.text     "custom_data"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "payments", :force => true do |t|
    t.float    "transaction_amount"
    t.integer  "user_id"
    t.string   "payment_conflict_reason"
    t.float    "paid_amount"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  create_table "properties", :force => true do |t|
    t.string   "key"
    t.string   "value"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
    t.string   "language",   :limit => 2
  end

  create_table "service_partner_types", :force => true do |t|
    t.integer  "type_unique_id"
    t.string   "partner_type"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "service_partners", :force => true do |t|
    t.string   "salutation"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "company_name"
    t.string   "street"
    t.string   "zip_code"
    t.string   "city"
    t.string   "country"
    t.string   "telephone_number"
    t.string   "fax_number"
    t.string   "website"
    t.string   "email"
    t.string   "encrypted_password"
    t.text     "specialities"
    t.text     "description"
    t.integer  "number_of_employees"
    t.integer  "founded"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.integer  "partner_type"
    t.string   "status"
    t.datetime "confirmation_sent_at"
    t.datetime "confirmed_at"
    t.boolean  "contact_data_approval"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "remember_created_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
  end

  create_table "slideshows", :force => true do |t|
    t.string   "name"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_text"
    t.integer  "slide_order"
    t.string   "heading_text"
    t.text     "text"
  end

  create_table "subscription_plans", :force => true do |t|
    t.integer  "subscription_fee",               :null => false
    t.string   "subscription_name",              :null => false
    t.integer  "subscription_paintings_allowed", :null => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.string   "subscription_offers_allowed"
    t.boolean  "wishlist_allowed"
  end

  create_table "subscriptions", :force => true do |t|
    t.datetime "created_at",                                    :null => false
    t.datetime "updated_at",                                    :null => false
    t.string   "subscription_free_upgrade",  :default => ""
    t.datetime "subscription_start_date"
    t.datetime "subscription_renewal_date"
    t.integer  "user_id"
    t.integer  "subscription_plan_id"
    t.boolean  "subscription_confirmed",     :default => false
    t.integer  "recommendations_pending",    :default => 0,     :null => false
    t.integer  "recommendations_successful", :default => 0,     :null => false
    t.string   "payment_type"
    t.boolean  "auto_renewal"
    t.string   "credit_card"
    t.text     "payment_details"
    t.string   "card_owner"
    t.string   "card_expires"
    t.string   "card_type"
    t.boolean  "free_subscription"
  end

  create_table "user_recommendations", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.text     "message"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "user_settings", :force => true do |t|
    t.string   "notification_by"
    t.string   "notification_email"
    t.boolean  "show_identity"
    t.boolean  "wishlist_notification"
    t.boolean  "seller_message_notification"
    t.boolean  "buyer_message_notification"
    t.boolean  "forum_notification"
    t.boolean  "user_offer_forum_discussion"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.integer  "user_id"
    t.boolean  "admin_rights"
    t.boolean  "forum_rights"
    t.boolean  "service_dir_rights"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                           :default => "", :null => false
    t.string   "encrypted_password",              :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                   :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                                      :null => false
    t.datetime "updated_at",                                      :null => false
    t.string   "user_gender"
    t.string   "user_first_name"
    t.string   "user_last_name"
    t.string   "user_company"
    t.string   "user_street"
    t.string   "user_zip_code"
    t.string   "user_country"
    t.string   "user_phone_number"
    t.string   "user_notification_email_address"
    t.string   "user_salutation"
    t.string   "user_fax_number"
    t.string   "user_city"
    t.string   "user_tax_id"
    t.datetime "deleted_at"
    t.boolean  "is_deleted"
  end

  add_index "users", ["confirmation_token"], :name => "index_users_on_confirmation_token", :unique => true
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "wishlist_offers", :force => true do |t|
    t.integer  "wishlist_id"
    t.integer  "offer_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "wishlists", :force => true do |t|
    t.integer  "user_id"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.text     "wishlist_search_params", :default => ""
    t.boolean  "email_notification"
    t.string   "wishlist_name"
    t.boolean  "search_advanced"
    t.text     "offer_list"
  end

end
