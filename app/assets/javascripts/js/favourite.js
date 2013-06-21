
// will go in offer.js where yur favourites page exists
  if (location.pathname == "/offer/your-favourites") {
    $('.pagination a').live('click',function () {
      url = "/favourite/search?_=1354783878928&page=1"
      $.get(this.href, 'per_page=' + $("#offers_public_page_per_page").val(),'', 'script');
      return false;
    });
    
    $("#offers_public_page_per_page").live('change', function() {
      url = "/favourite/search?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(),'', 'script');
    });
    
    $("#offers_public_page_sort_select").live('change', function() {
      url = "/favourite/search?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(),'', 'script');
    });
    
    $("#offers_public_page_input_button").live('click', function() {
      url = "/favourite/search?_=1354783878928&page=" + $("#offers_public_page_input").val()
      $.get(url,'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(),'','script');
    });
  }

$(function() {

  if (location.pathname == "/offer/your-favourites") {
    $(document).on('click', 'div.search img', function() {
      $("#offer_search_advanced").attr('value',true)
      $(".user_favourites_container div.search").hide()
      $(".user_favourites_container div.search_advanced").show()
      if ($("#search_filters span#span_1").html() == '') {
        $("#search_filters select#advanced_select_1").children().first().next().attr("selected", "true");
        $("#search_filters select#advanced_select_1").children().first().next().change();
        $("#search_filters span#span_1 input#text_input_artist_").val($("#offer_search_item").val())
      }
    })
  }


  if (location.pathname.substr(0,22) == "/offer/your-favourites") {
    $(document).on('click', '#delete_favourite', function() {
      $(".search_data_outer_div ul li i").each(function() {
        $(this).css("display","block");
      })
      $("#delete_favourite").css("display","none")
      $("#cancel_delete_favourite").css("display","block");
    })
    $(document).on('click', '#cancel_delete_favourite', function() {
      $(".search_data_outer_div ul li i").each(function() {
        $(this).css("display","none");
      })
      $("#delete_favourite").css("display","block")
      $("#cancel_delete_favourite").css("display","none");
    })

    $(document).on('click', "i[id^=remove_favourite_]", function() {
      element = $(this)

      $.ajax({
        url: "/favourite/delete",
        data: {
          offer_id: element.attr('id').split('_').pop()
        },
        async: false,
        success: function() {
          element.parent().fadeOut(2000)
          setTimeout('element.parent().remove()',2000)
          setTimeout("location.reload()",1000)
        }
      })
    })
  }





})