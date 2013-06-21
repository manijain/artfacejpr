module OfferHelper
  def new_offer_form_data
    @category = Property.where("key = 'category' and language = ?", I18n.locale)
    @purpose  = Property.where("key = 'purpose' and language = ?", I18n.locale)
    @unit     = Property.where("key = 'unit' and language = ?", I18n.locale)
    @medium   = Property.where("key = 'medium' and language = ?", I18n.locale)
  end

  def country_select_data
    @countries = Country.find(:all, :order=>:country_name)
  end
  def humanize_time secs
    [[60, :seconds], [60, :minutes], [24, :hours], [1000, :days]].map{ |count, name|
      if secs > 0
        secs, n = secs.divmod(count)
        "#{n.to_i} #{name}"
      end
    }.compact.reverse.join(' ')[0..-22]
  end

end