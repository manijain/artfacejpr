if (location.pathname == "/dashboard/sell-art-area") {
  function show_ajax_loader() {
  	$(".sell-art-area-offers div#ajax-loader-big_for_offers").show()
    $('.sell-art-area-offers div#overlay_div').show()
  }
  function hide_ajax_loader() {
	  $('.sell-art-area-offers div#overlay_div').hide()
	  $(".sell-art-area-offers div#ajax-loader-big_for_offers").hide()      
  }
}

$(function() {
	if (location.pathname == "/dashboard/sell-art-area") {
    $(document).on('submit', "#sort_id_four form", function() {
      $("#offer_sort_option_one").val($("#messages_sort_id_one option:selected").index())
      $("#offer_sort_option_two").val($("#messages_sort_id_two option:selected").index())
    })

		//load default values
		$("#offers_public_page_sort_select").children().first().attr("selected","true").change()
		$("#offers_public_page_sort_active_inactive").children().first().attr("selected","true").change()
		$("#offers_public_page_sort_active_inactive").children().eq(3).attr("selected","true").change()
		$("#basic_search_layout_select").children().first().attr("selected","true").change()


    $('.public_offers_page_step_three .pagination a').live('click',function () {
      $.get(this.href, 'per_page=' + $("#offers_public_page_per_page").val(),'', 'script');
      return false;
    });

    $("#offers_public_page_sort_select").live('change', function() {
      $.ajax({
        url: "/dashboard/sell-art-area?_=1354783878928&page=1",
        beforeSend: function() {show_ajax_loader()},
        data: 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer_show=" + $("#offers_public_page_sort_active_inactive").val(),
        success: function() {hide_ajax_loader()}
      })
    })  

    $("#offers_public_page_sort_active_inactive").live('change', function() {
      $.ajax({
        url: "/dashboard/sell-art-area?_=1354783878928&page=1",
  	    beforeSend: function() {show_ajax_loader()},
        data: 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer_show=" + $("#offers_public_page_sort_active_inactive").val(),
        success: function() {hide_ajax_loader()}
      })
    })

    $("#offers_public_page_per_page").live('change', function() {
      $.ajax({
        url: "/dashboard/sell-art-area?_=1354783878928&page=1",
        beforeSend: function() {show_ajax_loader()},
        data: 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer_show=" + $("#offers_public_page_sort_active_inactive").val(),
        success: function() {hide_ajax_loader()}
      })
    })  

    $("#offers_public_page_input_button").live('click', function() {
      offer_count = $("#offer_count").val();
      per_page    = $("#offers_public_page_per_page").val();
      number_of_pages = Math.ceil(parseInt(offer_count)/parseInt(per_page))
      if (number_of_pages < parseInt($("#offers_public_page_input").val())) {
        alert("Please choose an appropriate page")
        return false;
      }

      $.ajax({
        url: "/dashboard/sell-art-area?_=1354783878928&page=" + $("#offers_public_page_input").val(),
        beforeSend: function() {show_ajax_loader()},
        data: 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer_show=" + $("#offers_public_page_sort_active_inactive").val(),
        success: function() {hide_ajax_loader()}
      })
    })
  }
})