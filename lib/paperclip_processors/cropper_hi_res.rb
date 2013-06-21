module Paperclip
  class CropperHiRes < Thumbnail
    def transformation_command
      if crop_command
        crop_command + super.join(' ').sub(/ -crop \S+/, '').split(' ') # super returns     an array like this: ["-resize", "100x", "-crop", "100x100+0+0", "+repage"]
      else
        super
      end
    end

    def crop_command
      target = @attachment.instance
      artwork_type = @attachment.to_s
      if artwork_type.include? "artwork_hires"
        if !target.hi_res_crop_x.blank? && !target.hi_res_crop_y.blank? && !target.hi_res_crop_w.blank? && !target.hi_res_crop_h.blank?
          ["-crop", "#{target.hi_res_crop_w}x#{target.hi_res_crop_h}+#{target.hi_res_crop_x}+#{target.hi_res_crop_y}"]
        end
      end
    end
  end
end