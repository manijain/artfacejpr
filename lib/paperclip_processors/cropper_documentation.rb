module Paperclip
  class CropperDocumentation < Thumbnail
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
      if artwork_type.include? "artwork_documentations"
        if !target.documentation_crop_x.blank? && !target.documentation_crop_y.blank? && !target.documentation_crop_w.blank? && !target.documentation_crop_h.blank?
          ["-crop", "#{target.documentation_crop_w}x#{target.documentation_crop_h}+#{target.documentation_crop_x}+#{target.documentation_crop_y}"]
        end
      end
    end
  end
end