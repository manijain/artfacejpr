
  if (location.pathname.substr(0,28) == "/admin/users/user_favourites") {
    $('.pagination a').live('click',function () {
      url = "/admin/users/user_favourites/search?_=1354783878928&page=1"
      $.get(this.href, 'per_page=' + $("#offers_public_page_per_page").val() + "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer[search_advanced]=" + $("#offer_search_advanced").val()   ,'', 'script');
      return false;
    });
    
    $("#offers_public_page_per_page").live('change', function() {
      url = "/admin/users/user_favourites/search?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer[search_advanced]=" + $("#offer_search_advanced").val()   ,'', 'script');

    });
    
    $("#offers_public_page_sort_select").live('change', function() {
      url = "/admin/users/user_favourites/search?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer[search_advanced]=" + $("#offer_search_advanced").val()  ,'', 'script');

    });
    
    $("#offers_public_page_input_button").live('click', function() {
      url = "/admin/users/user_favourites/search?_=1354783878928&page=" + $("#offers_public_page_input").val()
      $.get(url,'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer[search_advanced]=" + $("#offer_search_advanced").val()  , '','script');

    });
  }


$(function() {

  if (location.pathname.substr(0,28) == "/admin/users/user_favourites") {


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


    $(document).on('change',"#offers_public_page_sort_active_inactive", function() {
      $.ajax({
        url: "/admin/users/user_favourites/search?_=1354783878928&page=1",
        data: {
          per_page: $("#offers_public_page_per_page").val(),
          sort_by: $("#offers_public_page_sort_select").val(),
          offer_status: $("#offers_public_page_sort_active_inactive").val(),
          'offer[user_id]': $("#offer_user_id").val(),
          'offer[search_advanced]': $("#offer_search_advanced").val()
        }
      })
    })

  }


  if (location.pathname.substr(0,28) == "/admin/users/user_favourites") {
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
     if (confirm("Do you really want to delete the favourite?")) {
      $.ajax({
        url: "/admin/users/delete_favourite",
        data: {
          offer_id: element.attr('id').split('_').pop()
        },
        async: false,
        success: function() {
          
          element.parent().fadeOut(2000)
          setTimeout('element.parent().remove()',2000)
          $(".search_data_outer_div ul li i").each(function() {
          $(this).css("display","none");
          })
          $("#delete_favourite").css("display","block")
          $("#cancel_delete_favourite").css("display","none");
          
          //setTimeout("location.reload()",1000)
        }
      })
     }
     else
     {
      $(".search_data_outer_div ul li i").each(function() {
          $(this).css("display","none");
          })
          $("#delete_favourite").css("display","block")
          $("#cancel_delete_favourite").css("display","none");
      }
    })
  }

})