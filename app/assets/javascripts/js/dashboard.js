$(function() {

  if (location.pathname == "/dashboard/home") {
    $(document).on('change',"#buy_your_favourites_select", function() {
      $.ajax({
        url: "/dashboard/home",
        beforeSend: function() {
          $("#ajax-loader-big-for-favourites").show()
          $('#overlay_div_for_favourites').show()
        },
        data: {
          buy_your_favourites_sort_by: $("#buy_your_favourites_select option:selected").index()
        },
        success: function() {
          $('#overlay_div_for_favourites').hide()
          $("#ajax-loader-big-for-favourites").hide()
        }
      })
    })

    $(document).on('change',"#buy_interesting_offers_select", function() {
      $.ajax({
        url: "/dashboard/home",
        beforeSend: function() {
          $("#ajax-loader-big-for-interesting-offers").show()
          $('#overlay_div_for_interesting_offers').show()
        },
        data: {
          buy_interesting_offers_sort_by: $("#buy_interesting_offers_select option:selected").index()
        },
        success: function() {
          $('#overlay_div_for_interesting_offers').hide()
          $("#ajax-loader-big-for-interesting-offers").hide()
        }
      })
    })

    $(document).on('change', "#buy_wishlist_offers_select", function() {
      $.ajax({
        url: "/dashboard/home",
        beforeSend: function() {
          $("#ajax-loader-big-for-wishlists").show()
          $('#overlay_div_for_wishlists').show()
        },
        data: {
          buy_wishlist_offers_sort_by: $("#buy_wishlist_offers_select option:selected").index()
        },
        success: function() {
          $('#overlay_div_for_wishlists').hide()
          $("#ajax-loader-big-for-wishlists").hide()
        }
      })
    })
  }
  if (location.pathname == "/dashboard/buy-art-area") {

  //  offer home buy your favourites

    $(document).on('change', "#buy_your_favourites_select", function() {
      $.ajax({
        url: "/dashboard/buy-art-area/",
        data: {
          buy_your_favourites_sort_by: $("#buy_your_favourites_select option:selected").index()
        },
        beforeSend: function() {
          $("#ajax-loader-big_for_buy_art_favourites").show()
          $("#overlay_div_for_buy_art_favourites").show()
        },
        success: function() {
          $("#ajax-loader-big_for_buy_art_favourites").hide()
          $("#overlay_div_for_buy_art_favourites").hide()
        }
      })
    })

  // offer home buy interesting offers pagination
    $(document).on('change', "#buy_interesting_offers_select", function() {
      $.ajax({
        url: "/dashboard/buy-art-area/",
        data: {
          buy_interesting_offers_sort_by: $("#buy_interesting_offers_select option:selected").index()
        },
        beforeSend: function() {
          $("#ajax-loader-big_for_buy_art_interesting_offers").show()
          $("#overlay_div_for_buy_art_interesting_offers").show()
        },
        success: function() {
          $("#ajax-loader-big_for_buy_art_interesting_offers").hide()
          $("#overlay_div_for_buy_art_interesting_offers").hide()
        }
      })
    })  

  //
    $(document).on('change',"#buy_wishlist_offers_select", function() {
      $.ajax({
        url: "/dashboard/buy-art-area/",
        data: {
          buy_wishlist_offers_sort_by: $("#buy_wishlist_offers_select option:selected").index()
        },
        beforeSend: function() {
          $("#ajax-loader-big_for_buy_art_wishlists").show()
          $("#overlay_div_for_buy_art_wishlists").show()
        },
        success: function() {
          $("#ajax-loader-big_for_buy_art_wishlists").hide()
          $("#overlay_div_for_buy_art_wishlists").hide()
        }
      })
    })

    // offer buy art favaourites, deleting offers
    if (location.pathname == "/dashboard/home" || location.pathname == "/dashboard/buy-art-area" || location.pathname == "/dashboard/buy-art-area/" || location.pathname == "/dashboard/home/") {
      $(document).on('click',".span10favourites input#delete_favourite", function() {
        $("#favourites_ul").children().each(function() {
          $(this).children().last().css('display','inline')
        })
      })

      $(document).on('click', "i.icon-remove", function() {
        if (confirm("Do you really want to delete the offer from your favourites?")) {
          $.get("/favourite/delete/", "offer_id=" + $(this).attr('id'))
          $(this).parent().fadeOut(2000)
          id = $(this).attr('id')
          setTimeout('delete_element(id);',2000)
        }
      })
    }

  }
  // offer sell art area for deleting offers
    if (location.pathname == "/dashboard/sell-art-area") {
      $(document).on('click', ".sell-art-area-offers div.public_offers_page_step_three input#delete_offer", function() {
        $(".search_data_outer_div i.icon-remove").css("display","inline")
        $(".sell-art-area-offers div.public_offers_page_step_three input#delete_offer").css("display","none")
        $(".sell-art-area-offers div.public_offers_page_step_three input#stop_delete_offer").css("display","block")
      })

      $(document).on('click', ".sell-art-area-offers div.public_offers_page_step_three input#stop_delete_offer", function() {
        $(".search_data_outer_div i.icon-remove").css("display","none")
        $(".sell-art-area-offers div.public_offers_page_step_three input#delete_offer").css("display","block")
        $(".sell-art-area-offers div.public_offers_page_step_three input#stop_delete_offer").css("display","none")
      })

      $(document).on('click', 'i.icon-remove', function() {
        element_id = $(this).attr('id')
        if (confirm("Do you really want to delete the offer?")) {
          $(this).parent().parent().fadeOut(2000)
          $.ajax({
            url: "/offer/delete_offer", 
            data: {
              id: element_id,
              //per_page: $("#offers_public_page_per_page").val(),
              sort_by: $("#offers_public_page_sort_select").val(),
              offer_show: $("#offers_public_page_sort_active_inactive").val()
            },
            beforeSend: function() {
              $(".sell-art-area-offers div#ajax-loader-big_for_offers").show()
              $('.sell-art-area-offers div#overlay_div').show()
            },
            async: false,
            success: function() {
              $(".sell-art-area-offers div#ajax-loader-big_for_offers").hide()
              $('.sell-art-area-offers div#overlay_div').hide()
            }
          })
        }
      })
    }

})