class Artwork < ActiveRecord::Base
  belongs_to :offer, :dependent=> :destroy
  has_one :artwork_description, :dependent => :destroy
  belongs_to :artist
  has_one :artwork_title, :dependent => :destroy
  attr_accessible :artwork_title, :artwork_category, :artwork_medium, :artwork_height, :artwork_width, :artwork_depth, :artwork_size_unit, :artwork_creation_year, :artwork_creation_year_era, :artwork_certificate_check, :artwork_frame_check, :artwork_signature_check, :artwork_movement_period, :artwork_description, :artwork_country, :created_at, :updated_at, :offer_id,:artwork_hires, :offer_start_date, :offer_end_date, :artist_id
  attr_accessor :hi_res_crop_x, :hi_res_crop_y, :hi_res_crop_h, :hi_res_crop_w,
                :thumbnail_crop_x, :thumbnail_crop_y, :thumbnail_crop_h, :thumbnail_crop_w,
                :detail_one_crop_x, :detail_one_crop_y, :detail_one_crop_h, :detail_one_crop_w,
                :detail_two_crop_x, :detail_two_crop_y, :detail_two_crop_h, :detail_two_crop_w,
                :documentation_crop_x, :documentation_crop_y, :documentation_crop_h, :documentation_crop_w

  has_attached_file :artwork_hires, {
    :styles => {
      :small => "100x100\!",
      :medium => "230x",
      :large => "360x",
      :crop => "3000x3000>"
    },
    :processors => [:CropperHiRes],
  }.merge(PAPERCLIP_STORAGE_OPTIONS_ARTWORK)
  
  has_attached_file :artwork_detail_two, {
    :styles => {
      :small => "100x100\!",
      :medium => "230x",
      :large => "360x",
      :crop => "3000x3000>"
    },
    :processors => [:CropperDetailTwo],
  }.merge(PAPERCLIP_STORAGE_OPTIONS_ARTWORK)

  has_attached_file :artwork_documentation, {
    :styles => {
      :small => "100x100\!",
      :medium => "230x",
      :large => "360x",
      :crop => "3000x3000>"
    }
  }.merge(PAPERCLIP_STORAGE_OPTIONS_ARTWORK)

  has_attached_file :artwork_detail_one, {
    :styles => {
      :small => "100x100\!",
      :medium => "230x",
      :large => "360x",
      :crop => "3000x3000>"
    },
    :processors => [:CropperDetailOne],
  }.merge(PAPERCLIP_STORAGE_OPTIONS_ARTWORK)

  has_attached_file :artwork_thumbnail, {
    :styles => {
      :small => "100x100\!",
      :medium => "230x",
      :large => "360x",
      :crop => "3000x3000>"
    },
    :processors => [:CropperThumbnail]
  }.merge(PAPERCLIP_STORAGE_OPTIONS_ARTWORK)

end


#  def cropping?
#    a = !thumbnail_crop_x.blank? && !thumbnail_crop_y.blank? && !thumbnail_crop_w.blank? && !thumbnail_crop_h.blank?
#  end
#
#  def reprocess_avatar
#    artwork_thumbnail.reprocess!
#  end


#  has_attached_file :artwork_hires,
#                    :storage => :s3,
#                    :s3_credentials => "#{Rails.root}/config/s3.yml",
#                    :path => "/:attachment/:id/:filename"
#  has_attached_file :artwork_thumbnail,
#                    :storage => :s3,
#                    :s3_credentials => "#{Rails.root}/config/s3.yml",
#                    :path => "/:attachment/:id/:filename"
#  has_attached_file :artwork_detail_one,
#                    :storage => :s3,
#                    :s3_credentials => "#{Rails.root}/config/s3.yml",
#                    :path => "/:attachment/:id/:filename"
#  has_attached_file :artwork_detail_two,
#                    :storage => :s3,
#                    :s3_credentials => "#{Rails.root}/config/s3.yml",
#                    :path => "/:attachment/:id/:filename"
#  has_attached_file :artwork_documentation,
#                    :storage => :s3,
#                    :s3_credentials => "#{Rails.root}/config/s3.yml",
#                    :path => "/:attachment/:id/:filename"
  #if Rails.env.development?
  #  has_attached_file :artwork_hires,
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_thumbnail,
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_detail_one,
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_detail_two,
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_documentation,
  #    :path => "/:attachment/:id/:filename"
  #end
  #if Rails.env.production?
  #  has_attached_file :artwork_hires,
  #    :storage => :s3,
  #    :s3_credentials => "#{Rails.root}/config/s3.yml",
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_thumbnail,
  #    :storage => :s3,
  #    :s3_credentials => "#{Rails.root}/config/s3.yml",
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_detail_one,
  #    :storage => :s3,
  #    :s3_credentials => "#{Rails.root}/config/s3.yml",
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_detail_two,
  #    :storage => :s3,
  #    :s3_credentials => "#{Rails.root}/config/s3.yml",
  #    :path => "/:attachment/:id/:filename"
  #  has_attached_file :artwork_documentation,
  #    :storage => :s3,
  #    :s3_credentials => "#{Rails.root}/config/s3.yml",
  #    :path => "/:attachment/:id/:filename"
  #end
