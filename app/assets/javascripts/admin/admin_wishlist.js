if(location.pathname.substr(0,27) == "/admin/users/user_wishlists") {
  var wishlists_on_page // number of wishlists in the page
  var option_array_0 = new Array();
  var option_array_1 = new Array();
  var option_array_2 = new Array();
  var option_array_3 = new Array();
  var option_array_4 = new Array();
  var option_array_5 = new Array();
  var option_array_6 = new Array();
  var option_array_7 = new Array();
  var option_array_8 = new Array();
  var option_array_9 = new Array();
  var current_id_0 = 1
  var current_id_1 = 1
  var current_id_2 = 1
  var current_id_3 = 1
  var current_id_4 = 1
  var current_id_5 = 1
  var current_id_6 = 1
  var current_id_7 = 1
  var current_id_8 = 1
  var current_id_9 = 1
  var option_array_total_0 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_6 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_7 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_8 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var option_array_total_9 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  var theValue_0, theValue_1, theValue_2, theValue_3, theValue_4, theValue_5, theValue_6, theValue_7, theValue_8, theValue_9
  var current_value_0, current_value_1, current_value_2, current_value_3, current_value_4, current_value_5, current_value_6, current_value_7, current_value_8, current_value_9
  var search_advanced_id_0, search_advanced_id_1, search_advanced_id_2,  search_advanced_id_3, search_advanced_id_4, search_advanced_id_5, search_advanced_id_6,  search_advanced_id_7, search_advanced_id_7, search_advanced_id_9

  function set_search_filters() {
    $("div[id^=wishlist_new]").each(function() {
      wishlist_id = $(this).attr('id')
      if ($("#" + wishlist_id + " #current_wishlist_search_type").val() == "false") {
        $("#" + wishlist_id + " .search").show();
        $("#" + wishlist_id + " .search_advanced").hide();
      } else {
        $("#" + wishlist_id + " .search").hide();
        $("#" + wishlist_id + " .search_advanced").show();
      }
    })
  }

  function set_preview_size() {
    $("div[id^=wishlist_new]").each(function() {
      wishlist_id = $(this).attr('id')
      temp_var = $("#" + wishlist_id + " #basic_search_layout_select").val()
      if (temp_var == "Medium previews") {
        temp_var = 1
      } else if (temp_var == "Small previews") {
        temp_var = 0
      } else {
        temp_var = 2
      }

      switch(temp_var) {
        case 0:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").addClass("small_preview").removeClass("medium_preview").removeClass("large_preview")
          break;
        case 1:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").removeClass("small_preview").addClass("medium_preview").removeClass("large_preview")
          break;
        case 2:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").removeClass("small_preview").removeClass("medium_preview").addClass("large_preview")
          break;
      }
    })
  }

  //add_validation_to_artist_name
    function add_validation_to_artist_name() {
      var text_input_artist_validation = new LiveValidation("text_input_artist_", {
        onValid: function()  {
          if(!$("#text_input_artist_").val().match( /^[A-Za-z .0-9]+$/)) {
            $("#error_text_input_artist_").css("display","inline")
            $("#error_text_input_artist_").attr("data-original-title","Special characters not allowed")
            $('#error_text_input_artist_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_artist_ = false
          }
          else {
            $('#error_text_input_artist_').hide()
            valid_text_input_artist_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_artist_").val().length == 0) { 
            $('#error_text_input_artist_').hide()
          } 
          else {
            $("#error_text_input_artist_").css("display","inline")
            $("#error_text_input_artist_").attr("data-original-title","Please enter the artist name.")
            $("#error_text_input_artist_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_artist_ = false
          }
        }
      });
      text_input_artist_validation.add(Validate.Presence);
    }
  //add_validation_to_title
    function add_validation_to_title() {
      var text_input_title_validation = new LiveValidation("text_input_title_", {
        onValid: function()  {
          if(!$("#text_input_title_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
            $("#error_text_input_title_").css("display","inline")
            $("#error_text_input_title_").attr("data-original-title","Special characters not allowed")
            $('#error_text_input_title_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_title_ = false
          }
          else {
            $('#error_text_input_title_').hide()
            valid_text_input_title_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_title_").val().length == 0) { 
            $('#error_text_input_title_').hide()
          } 
          else {
            $("#error_text_input_title_").css("display","inline")
            $("#error_text_input_title_").attr("data-original-title","Please enter the title.")
            $("#error_text_input_title_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_title_ = false
          }
        }
      });
      text_input_title_validation.add(Validate.Presence);
    }
  //add_validation_to_description
    function add_validation_to_description() {
      var text_input_description_validation = new LiveValidation("text_input_description_", {
        onValid: function()  {
          if(!$("#text_input_description_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
            $("#error_text_input_description_").css("display","inline")
            $("#error_text_input_description_").attr("data-original-title","Special characters not allowed")
            $('#error_text_input_description_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_description_ = false
          }
          else {
            $('#error_text_input_description_').hide()
            valid_text_input_description_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_description_").val().length == 0) { 
            $('#error_text_input_description_').hide()
          } 
          else {
            $("#error_text_input_description_").css("display","inline")
            $("#error_text_input_description_").attr("data-original-title","Please enter the description.")
            $("#error_text_input_description_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_description_ = false
          }
        }
      });
      text_input_description_validation.add(Validate.Presence);
    }
  //add_validation_to_year_of_creation
    function add_validation_to_year_of_creation() {
      var text_input_year_of_creation_validation = new LiveValidation("text_input_year_of_creation_", {
        onValid: function()  {
          if(!$("#text_input_year_of_creation_").val().match( /^[.,0-9]+$/)) {
            $("#error_text_input_year_of_creation_").css("display","inline")
            $("#error_text_input_year_of_creation_").attr("data-original-title","Only numbers are allowed")
            $('#error_text_input_year_of_creation_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_year_of_creation_ = false
          }
          else {
            $('#error_text_input_year_of_creation_').hide()
            valid_text_input_year_of_creation_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_year_of_creation_").val().length == 0) { 
            $('#error_text_input_year_of_creation_').hide()
          } 
          else {
            $("#error_text_input_year_of_creation_").css("display","inline")
            $("#error_text_input_year_of_creation_").attr("data-original-title","Please enter the year of creation.")
            $("#error_text_input_year_of_creation_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_year_of_creation_ = false
          }
        }
      });
      text_input_year_of_creation_validation.add(Validate.Presence);
    }
  //add_validation_to_movement_period
    function add_validation_to_movement_period() {
      var text_input_movement_period_validation = new LiveValidation("text_input_movement_period_", {
        onValid: function()  {
          if(!$("#text_input_movement_period_").val().match( /^[A-Za-z .,0-9]+$/)) {
            $("#error_text_input_movement_period_").css("display","inline")
            $("#error_text_input_movement_period_").attr("data-original-title","Special characters are not allowed")
            $('#error_text_input_movement_period_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
          else {
            $('#error_text_input_movement_period_').hide()
            valid_text_input_movement_period_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_movement_period_").val().length == 0) { 
            $('#error_text_input_movement_period_').hide()
          } 
          else {
            $("#error_text_input_movement_period_").css("display","inline")
            $("#error_text_input_movement_period_").attr("data-original-title","Please enter the movement period.")
            $("#error_text_input_movement_period_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
        }
      });
      text_input_movement_period_validation.add(Validate.Presence);
    }
  //add_validation_to_height
    function add_validation_to_height() {
      var text_input_height_validation = new LiveValidation("text_input_height_", {
        onValid: function()  {
          if(!$("#text_input_height_").val().match( /^[,0-9]+$/)) {
            $("#error_text_input_height_").css("display","inline")
            $("#error_text_input_height_").attr("data-original-title","Only numbers are allowed")
            $('#error_text_input_height_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
          else {
            $('#error_text_input_height_').hide()
            valid_text_input_height_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_height_").val().length == 0) { 
            $('#error_text_input_height_').hide()
          } 
          else {
            $("#error_text_input_height_").css("display","inline")
            $("#error_text_input_height_").attr("data-original-title","Please enter the height.")
            $("#error_text_input_height_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_height_ = false
          }
        }
      });
      text_input_height_validation.add(Validate.Presence);
    }
  //add_validation_to_width
    function add_validation_to_width() {
      var text_input_width_validation = new LiveValidation("text_input_width_", {
        onValid: function()  {
          if(!$("#text_input_width_").val().match( /^[,0-9]+$/)) {
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Only numbers are allowed")
            $('#error_text_input_width_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
          else {
            $('#error_text_input_width_').hide()
            valid_text_input_width_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_width_").val().length == 0) { 
            $('#error_text_input_width_').hide()
          } 
          else {
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Please enter the width.")
            $("#error_text_input_width_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_width_ = false
          }
        }
      });
      text_input_width_validation.add(Validate.Presence);
    }
  //add_validation_to_width
    function add_validation_to_width() {
      var text_input_width_validation = new LiveValidation("text_input_width_", {
        onValid: function()  {
          if(!$("#text_input_width_").val().match( /^[,0-9]+$/)) {
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Only numbers are allowed")
            $('#error_text_input_width_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
          else {
            $('#error_text_input_width_').hide()
            valid_text_input_width_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_width_").val().length == 0) { 
            $('#error_text_input_width_').hide()
          } 
          else {
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Please enter the width.")
            $("#error_text_input_width_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_width_ = false
          }
        }
      });
      text_input_width_validation.add(Validate.Presence);
    }
  //add_validation_to_depth
    function add_validation_to_depth() {
      var text_input_depth_validation = new LiveValidation("text_input_depth_", {
        onValid: function()  {
          if(!$("#text_input_depth_").val().match( /^[,0-9]+$/)) {
            $("#error_text_input_depth_").css("display","inline")
            $("#error_text_input_depth_").attr("data-original-title","Only numbers are allowed")
            $('#error_text_input_depth_').tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_movement_period_ = false
          }
          else {
            $('#error_text_input_depth_').hide()
            valid_text_input_depth_ = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#text_input_depth_").val().length == 0) { 
            $('#error_text_input_depth_').hide()
          } 
          else {
            $("#error_text_input_depth_").css("display","inline")
            $("#error_text_input_depth_").attr("data-original-title","Please enter the depthl.")
            $("#error_text_input_depth_").tooltip({delay: { show: 500, hide: 100 }})
            valid_text_input_depth_ = false
          }
        }
      });
      text_input_depth_validation.add(Validate.Presence);
    }
  //add_validation_to_submit_date
    function add_validation_to_submit_date() {  
      $("#date_input_submit_date_").on('keyup',function() {
        $(this).val('')
        $("#error_text_input_submit_date_").css("display","inline")
        $("#error_text_input_submit_date_").attr("data-original-title","Please select the date from datepicker")
        $('#error_text_input_submit_date_').tooltip({delay: { show: 500, hide: 100 }})
      })
    }
  //add_validation_to_offer_end_date
    function add_validation_to_offer_end_date() {  
      $("#date_input_offer_end_date_").on('keyup',function() {
        $(this).val('')
        $("#error_text_input_offer_end_date_").css("display","inline")
        $("#error_text_input_offer_end_date_").attr("data-original-title","Please select the date from datepicker")
        $('#error_text_input_offer_end_date_').tooltip({delay: { show: 500, hide: 100 }})
      })
    }

}
// parseURL function
  function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
  }

function add_new_wish_toggle() {
  if( $("div[id^=wishlist_new_]").length > 9) {
    $("#add_new_wishlist").hide()
  } else {
    $("#add_new_wishlist").show()
  }
}


var current_page

$(function() {
  if (location.pathname.substr(0,27) == "/admin/users/user_wishlists") {

    // open the last updated wishlist
    $(document).ready(function() {
    var wishlist_last_id = $("#user_wishlist_last_updated").val();
    $("div[id^=wishlist_new_]").each(function() {
      if($("#" + $(this).attr('id') + " #wishlist_id").val()  == wishlist_last_id){
        $("." + $(this).attr('id') + " .icon-pencil").click()
      }
    })
  });

    var number_of_wishlist;
    add_new_wish_toggle();

    $("#advanced_select_0").each(function() {
      $("#" + $(this).attr('id')).children().eq(0).removeAttr("selected")
    })

    $(document).on('click', ".icon-arrow-up", function() {
      $(this).removeClass("icon-arrow-up").addClass("icon-arrow-down")
      wishlist_id = "wishlist_new_" + $(this).parent().parent().attr('class').split('wishlist_new_')[1]
      $("#" + wishlist_id).slideUp()
      $("#" + wishlist_id + " .search").hide()
      $("#" + wishlist_id + " .search_advanced").hide()
    })
    $(document).on('click', ".icon-arrow-down", function() {
      $(this).removeClass("icon-arrow-down").addClass("icon-arrow-up")
      wishlist_id = "wishlist_new_" + $(this).parent().parent().attr('class').split('wishlist_new_')[1]
      $("#" + wishlist_id).slideDown()
      $("#" + wishlist_id + " .search").hide()
      $("#" + wishlist_id + " .search_advanced").hide()
      // $.ajax({
      //   url: "/wishlist/offer_update",
      //   data: {
      //     wishlist_id: $("#" + wishlist_id + " #wishlist_id").val()
      //   }
      // })
    })

    $(document).on('click', ".icon-pencil", function() {
      wishlist_id = "wishlist_new_" + $(this).parent().parent().attr('class').split('wishlist_new_')[1]
      $("#" + wishlist_id).slideToggle()
      var temp = $("#" + wishlist_id + " #current_wishlist_search_type").val()
      if (temp == "false") {
        $("#" + wishlist_id + " .search").show()
        $("#" + wishlist_id + " .search_advanced").hide()
      } else {
        $("#" + wishlist_id + " .search").hide()
        $("#" + wishlist_id + " .search_advanced").show()
      }
    })

    $(document).on('click', 'input[id^=cancel_wishlist_]', function() {
      cancel_wishlist_id = $(this).attr('id').split('_').pop()

      wishlist_id = $(this).parent().parent().parent().parent().attr('id')

      if(confirm("Do you want to delete the wishlist")) {
        $.ajax({
          url: "/admin/users/delete_wish",
          data: {
            wishlist_id: cancel_wishlist_id
          },
          success: function(data) {
            if(data == "true") {
              $("#" + wishlist_id).parent().fadeOut(2000)
              setTimeout('$("#" + wishlist_id).parent().remove();add_new_wish_toggle();',2000)
            } else {
              alert("An error occured")
            }
          }
        })
      }
    })

    $(document).on('click', '.icon-remove-sign', function() {
      wishlist_id = "wishlist_new_" + $(this).parent().parent().attr('class').split('wishlist_new_')[1]
      if(confirm("Do you want to delete the wishlist")) {
        switch(parseInt(wishlist_id.split('wishlist_new_')[1])) {
          case 0:
            current_id_0 = 1
            option_array_0.length = 0
            break;
          case 1:
            current_id_1 = 1
            option_array_1.length = 0
            break;
          case 2:
            current_id_2 = 1
            option_array_2.length = 0
            break;
          case 3:
            current_id_3 = 1
            option_array_3.length = 0
            break;
          case 4:
            current_id_4 = 1
            option_array_4.length = 0
            break;
          case 5:
            current_id_5 = 1
            option_array_5.length = 0
            break;
          case 6:
            current_id_6 = 1
            option_array_6.length = 0
            break;
          case 7:
            current_id_7 = 1
            option_array_7.length = 0
            break;
          case 8:
            current_id_8 = 1
            option_array_8.length = 0
            break;
          case 9: 
            current_id_9 = 1
            option_array_9.length = 0
            break;
          default:
            break;
        }
        $.ajax({
          url: "/admin/users/delete_wish",
          data: {
            wishlist_id: $("#" + wishlist_id + " #wishlist_id").val()
          },
          success: function(data) {
            if(data == "true") {
              $("." + wishlist_id).fadeOut(2000)
              $("#" + wishlist_id).fadeOut(2000)
              setTimeout('$("." + wishlist_id).remove(); $("#" + wishlist_id).remove();add_new_wish_toggle();',2000)
            } else {
              alert("An error occured")
            }
          }
        })
      }
    })

    $(document).on('click', '.pagination a', function(e) {
      current_page = parseURL($(this).prop('href'))
      wishlist_id = $(this).parent().parent().parent().parent().parent().parent().parent().attr('id')
      $.ajax({
        url: '/admin/users/pagination',
        data: {
          wishlist_id: $("#" + wishlist_id + " #wishlist_id").val(),
          sort_by: $("#" + wishlist_id + " #offers_public_page_sort_select").val(),
          per_page: $("#" + wishlist_id + " #offers_public_page_per_page").val(),
          page: current_page.params.page, 
          wishlist_id_on_page: wishlist_id,
        },
        beforeSend: function() {
          $("#" + wishlist_id + " #buy_art_search_loader_gif").show()
          $("#" + wishlist_id + " #buy_art_search_loader_div").show()
        },
        success: function() {
          $("#" + wishlist_id + " #buy_art_search_loader_gif").hide()
          $("#" + wishlist_id + " #buy_art_search_loader_div").hide()
        }
      })
      return
    })

    $(document).on('change', "#offers_public_page_sort_select, #offers_public_page_per_page", function() {
      wishlist_id = $(this).parent().parent().parent().parent().attr('id');
      $.ajax({
        url: '/admin/users/pagination',
        data: {
          wishlist_id: $("#" + wishlist_id + " #wishlist_id").val(),
          sort_by: $("#" + wishlist_id + " #offers_public_page_sort_select").val(),
          per_page: $("#" + wishlist_id + " #offers_public_page_per_page").val(),
          page: 1, 
          wishlist_id_on_page: wishlist_id,
        },
        beforeSend: function() {
          $("#" + wishlist_id + " #buy_art_search_loader_gif").show()
          $("#" + wishlist_id + " #buy_art_search_loader_div").show()
        },
        success: function() {
          $("#" + wishlist_id + " #buy_art_search_loader_gif").hide()
          $("#" + wishlist_id + " #buy_art_search_loader_div").hide()
        }
      })
    })

    $(document).on('click', "#offers_public_page_input_button", function() {
      wishlist_id = $(this).parent().parent().parent().parent().parent().parent().attr('id')
      offer_count = ($("#" + wishlist_id +  " #offer_count").val())
      per_page    = parseInt($("#" + wishlist_id + " #offers_public_page_per_page").val())
      number_of_pages = Math.ceil(offer_count/per_page)
      if ($("#" + wishlist_id + " #offers_public_page_input").val() > number_of_pages) {
        alert("Please check the number of pages available")
      } else {
        $.ajax({
          url: '/admin/users/pagination',
          data: {
            wishlist_id: $("#" + wishlist_id + " #wishlist_id").val(),
            sort_by: $("#" + wishlist_id + " #offers_public_page_sort_select").val(),
            per_page: $("#" + wishlist_id + " #offers_public_page_per_page").val(),
            page: $("#" + wishlist_id + " #offers_public_page_input").val(), 
            wishlist_id_on_page: wishlist_id,
          },
          beforeSend: function() {
            $("#" + wishlist_id + " #buy_art_search_loader_gif").show()
            $("#" + wishlist_id + " #buy_art_search_loader_div").show()
          },
          success: function() {
            $("#" + wishlist_id + " #buy_art_search_loader_gif").hide()
            $("#" + wishlist_id + " #buy_art_search_loader_div").hide()
          }
        })
      }
    })

    set_preview_size();
    set_search_filters();

    $(document).on('change', '#basic_search_layout_select', function() {
      wishlist_id = $(this).parent().parent().parent().parent().attr('id')
      temp_var = $("#" + wishlist_id + " #basic_search_layout_select").val()
      if (temp_var == "Medium previews") {
        temp_var = 1
      } else if (temp_var == "Small previews") {
        temp_var = 0
      } else {
        temp_var = 2
      }

      switch(temp_var) {
        case 0:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").addClass("small_preview").removeClass("medium_preview").removeClass("large_preview")
          break;
        case 1:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").removeClass("small_preview").addClass("medium_preview").removeClass("large_preview")
          break;
        case 2:
          $("#" + wishlist_id + " div.search_data_outer_div ul li").removeClass("small_preview").removeClass("medium_preview").addClass("large_preview")
          break;
      }
    })

    $("div[id^=wishlist_new_]").each(function() {
      current_number_id = $(this).attr('id').split('_').pop()
      current_id = $(this).attr('id')
      $("#" + current_id + " #search_filters ul li select[id^=advanced_select_]" ).each(function() {
        if (current_number_id == 0) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if ( temp != 0 ) {
            option_array_0.push(temp)
          }
          if (option_array_0.length == 0) {
            current_id_0 = 1
          } else{
            current_id_0 = option_array_0.length
          }
        }
        if (current_number_id == 1) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()

          if (temp != 0) {
            option_array_1.push(temp)
          }
          if (option_array_1.length == 0) {
            current_id_1 = 1
          } else {
            current_id_1 = option_array_1.length
          }
        }
        if (current_number_id == 2) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_2.push(temp)
          }

          if(option_array_2.length == 0) {
            current_id_2 = 1
          } else {
            current_id_2 = option_array_2.length
          }
        }
        if (current_number_id == 3) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_3.push(temp)
          }
          if(option_array_3.length == 0) {
            current_id_3 = 1
          } else {
            current_id_3 = option_array_3.length
          }
        }
        if (current_number_id == 4) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_4.push(temp)
          }
          if(option_array_4.length == 0) {
            current_id_4 = 1
          } else {
            current_id_4 = option_array_4.length
          }
        }
        if (current_number_id == 5) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_5.push(temp)
          }
          if(option_array_5.length == 0) {
            current_id_5 = 1
          } else {
            current_id_5 = option_array_5.length
          }
        }
        if (current_number_id == 6) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_6.push(temp)
          }
          if(option_array_6.length == 0) {
            current_id_6 = 1
          } else {
            current_id_6 = option_array_6.length
          }
        }
        if (current_number_id == 7) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_7.push(temp)
          }
          if(option_array_7.length == 0) {
            current_id_7 = 1
          } else {
            current_id_7 = option_array_7.length
          }
        }
        if (current_number_id == 8) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_8.push(temp)
          }
          if(option_array_8.length == 0) {
            current_id_8 = 1
          } else {
            current_id_8 = option_array_8.length
          }
        }
        if (current_number_id == 9) {
          var temp = $("#" + $(this).attr('id') + " option:selected").index()
          if (temp != 0) {
            option_array_9.push(temp)
          }
          if(option_array_9.length == 0) {
            current_id_9 = 1
          } else {
            current_id_9 = option_array_9.length
          }
        }
      })
    })

    filter_single_string = $("#filter_string").html()

    $(document).on('click', ".basic_to_advance", function(){

      $(this).parent().parent().parent().children().first().css("display","none")
      $(this).parent().parent().parent().children().first().next().css("display","block")
      var temp_id = $(this).parent().parent().parent().attr('id')

      $("#" + temp_id + " input#wishlist_search_advanced").val(true)
      if (kill_white_space($("#" + temp_id + " span[id^=span_]").html()) == "") {
        $("#" + temp_id + " select[id^=advanced_select_]").children().first().next().attr("selected","true").change()
        $("#" + temp_id + " .search_advanced #wishlist_wishlist_name").val(($("#" + temp_id + " .search #wishlist_wishlist_name").val()))
        $("#" + temp_id + " .search_advanced #text_input_artist_").val(($("#" + temp_id + " .search #wishlist_wishlist_search_params").val()))
        $("#" + temp_id + " .search_advanced").show()
        $("#" + temp_id + " .search").hide()
      } else {
        $("#" + temp_id + " .search_advanced").show()
        $("#" + temp_id + " .search").hide()
      }
    })

    $(document).on('click',"img.add_search_field", function() {
      var wishlist_id_part = $(this).parent().parent().parent().parent().parent().parent().attr('id').split('_').pop();
      switch(parseInt(wishlist_id_part)) {
        case 0:
            if(option_array_0.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_0 = current_id_0 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_0)
              $(this).children().first().next().attr("id","span_" + current_id_0)
            })
            select_new_field = _.first(_.difference(option_array_total_0,option_array_0))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_0).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_0.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_0, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")

                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
              break;
        case 1:
            if(option_array_1.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_1 = current_id_1 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_1)
              $(this).children().first().next().attr("id","span_" + current_id_1)
            })
            select_new_field = _.first(_.difference(option_array_total_1,option_array_1))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_1).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_1.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_1, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
          
              break;
        case 2:
            if(option_array_2.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_2 = current_id_2 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_2)
              $(this).children().first().next().attr("id","span_" + current_id_2)
            })
            select_new_field = _.first(_.difference(option_array_total_2,option_array_2))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_2).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_2.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_2, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                   $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
              
              break;
        case 3:
           if(option_array_3.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_3 = current_id_3 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_3)
              $(this).children().first().next().attr("id","span_" + current_id_3)
            })
            select_new_field = _.first(_.difference(option_array_total_3,option_array_3))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_3).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_3.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_3, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
          
              break;
        case 4:
           if(option_array_4.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_4 = current_id_4 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_4)
              $(this).children().first().next().attr("id","span_" + current_id_4)
            })
            select_new_field = _.first(_.difference(option_array_total_4,option_array_4))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_4).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_4.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_4, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
              
              break;
        case 5:
           if(option_array_5.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_5 = current_id_5 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_5)
              $(this).children().first().next().attr("id","span_" + current_id_5)
            })
            select_new_field = _.first(_.difference(option_array_total_5,option_array_5))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_5).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_5.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_5, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
          
              break;
        case 6:
           if(option_array_6.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_6 = current_id_6 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_6)
              $(this).children().first().next().attr("id","span_" + current_id_6)
            })
            select_new_field = _.first(_.difference(option_array_total_6,option_array_6))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_6).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_6.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_6, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
              
              break;
        case 7:
           if(option_array_7.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_7 = current_id_7 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_7)
              $(this).children().first().next().attr("id","span_" + current_id_7)
            })
            select_new_field = _.first(_.difference(option_array_total_7,option_array_7))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_7).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_7.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_7, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
          
              break;
        case 8:
           if(option_array_8.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_8 = current_id_8 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_8)
              $(this).children().first().next().attr("id","span_" + current_id_8)
            })
            select_new_field = _.first(_.difference(option_array_total_8,option_array_8))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_8).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_8.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_8, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }
              
              break;
        case 9:
           if(option_array_9.length == 16) {
              alert("All filters added")
              return
            }
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").append(filter_single_string)
            $("#wishlist_new_" + wishlist_id_part + " #search_filters ul").children().last().each(function() {
              current_id_9 = current_id_9 + 1;
              $(this).children().first().attr("id","advanced_select_" + current_id_9)
              $(this).children().first().next().attr("id","span_" + current_id_9)
            })
            select_new_field = _.first(_.difference(option_array_total_9,option_array_9))
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + current_id_9).children().eq(select_new_field).attr("selected","true").change()
              for (var i = 1; i <= option_array_9.length; i++) {
                $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
                  if (_.contains(option_array_9, $(this).index())) {
                    $(this).css("display","none")
                    $(this).attr("disabled", "disabled")
                    $(this).css("visibility", "hidden")
                  } else {
                    $(this).css("display","block")
                    $(this).removeAttr("disabled")
                    $(this).css("visibility", "visible")
                  }
                })
              }

              break;
      }      
    })

    $(document).on('click', "img.remove_search_field", function() {
      var wishlist_id_part = $(this).parent().parent().parent().parent().parent().parent().attr('id').split('_').pop();
      switch(parseInt(wishlist_id_part)) {
        case 0:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_0 = $.grep(option_array_0, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_0; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_0, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block")
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_0 = current_id_0 - 1
          break;
        case 1:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_1 = $.grep(option_array_1, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_1; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_1, $(this).index())) {
                $(this).css("display","none")
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block")
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_1 = current_id_1 - 1
              break;
        case 2:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_2 = $.grep(option_array_2, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_2; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_2, $(this).index())) {
                $(this).css("display","none")
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block")
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_2 = current_id_2 - 1
              break;
        case 3:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_3 = $.grep(option_array_3, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_3; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_3, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block")
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_3 = current_id_3 - 1
              break;
        case 4:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_4 = $.grep(option_array_4, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_4; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_4, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_4 = current_id_4 - 1
              break;
        case 5:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_5 = $.grep(option_array_5, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_5; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_5, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_5 = current_id_5 - 1
              break;
        case 6:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_6 = $.grep(option_array_6, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_6; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_6, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_6 = current_id_6 - 1
              break;
        case 7:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_7 = $.grep(option_array_7, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_7; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_7, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_7 = current_id_7 - 1
              break;
        case 8:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_8 = $.grep(option_array_8, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_8; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_8, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_8 = current_id_8 - 1
              break;
        case 9:
          if ($("#wishlist_new_" + wishlist_id_part + " .search_advanced ul").children().length == 1) {
            $("#wishlist_new_" + wishlist_id_part + " .search").css("display","block")
            $("#wishlist_new_" + wishlist_id_part + " .search_advanced").css("display","none")
          } else {
            //remove the current field from the search filters
            var remove_value_id = $(this).parent().children().first().attr('id')
            option_array_9 = $.grep(option_array_9, function(value) {
              return value != $("#wishlist_new_" + wishlist_id_part + " ul #" + remove_value_id + " option:selected").index()
            })
            $(this).parent().remove()
          }
          for (var i = 1; i <= current_id_9; i++) {
            $("#wishlist_new_" + wishlist_id_part + " ul li select#advanced_select_" + i).children().each(function() {
              if (_.contains(option_array_9, $(this).index())) {
                $(this).css("display","none");
                $(this).attr("disabled", "disabled")
                $(this).css("visibility", "hidden")
              } else {
                $(this).css("display","block");
                $(this).removeAttr("disabled")
                $(this).css("visibility", "visible")
              }
            })
          }
          current_id_9 = current_id_9 - 1
              break;
      }
    })

    $(document).on('click', "#wishlist_new_0 ul li select[id^=advanced_select_]" ,function() {
      theValue_0 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_1 ul li select[id^=advanced_select_]" ,function() {
      theValue_1 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_2 ul li select[id^=advanced_select_]" ,function() {
      theValue_2 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_3 ul li select[id^=advanced_select_]" ,function() {
      theValue_3 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_4 ul li select[id^=advanced_select_]" ,function() {
      theValue_4 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_5 ul li select[id^=advanced_select_]" ,function() {
      theValue_5 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_6 ul li select[id^=advanced_select_]" ,function() {
      theValue_6 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_7 ul li select[id^=advanced_select_]" ,function() {
      theValue_7 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_8 ul li select[id^=advanced_select_]" ,function() {
      theValue_8 = $(this).attr('value');
    })
    $(document).on('click', "#wishlist_new_9 ul li select[id^=advanced_select_]" ,function() {
      theValue_9 = $(this).attr('value');
    })


    $(document).on('change', "#wishlist_new_0 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_0 = $("#wishlist_new_0 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_0         = $("#wishlist_new_0 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_0, option_array_0)!=-1) && option_array_0.length>0){  
        status=false;
        check_option($("#wishlist_new_0 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_0 = new Array()
      status = true

      $("#wishlist_new_0 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_0 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_0 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_0.push(push_data);
        }
      })
      function_text = $("#wishlist_new_0 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_0 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_0; i++) {
        $("#wishlist_new_0 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_0,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_1 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_1 = $("#wishlist_new_1 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_1         = $("#wishlist_new_1 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_1, option_array_1)!=-1) && option_array_1.length>0){  
        status=false;
        check_option($("#wishlist_new_1 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_1 = new Array()
      status = true

      $("#wishlist_new_1 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_1 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_1 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_1.push(push_data);
        }
      })
      function_text = $("#wishlist_new_1 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_1 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_1; i++) {
        $("#wishlist_new_1 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_1,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_2 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_2 = $("#wishlist_new_2 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_2         = $("#wishlist_new_2 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_2, option_array_2)!=-1) && option_array_2.length>0){  
        status=false;
        check_option($("#wishlist_new_2 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_2 = new Array()
      status = true

      $("#wishlist_new_2 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_2 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_2 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_2.push(push_data);
        }
      })
      function_text = $("#wishlist_new_2 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_2 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_2; i++) {
        $("#wishlist_new_2 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_2,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_3 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_3 = $("#wishlist_new_3 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_3         = $("#wishlist_new_3 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_3, option_array_3)!=-1) && option_array_3.length>0){  
        status=false;
        check_option($("#wishlist_new_3 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_3 = new Array()
      status = true

      $("#wishlist_new_3 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_3 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_3 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_3.push(push_data);
        }
      })
      function_text = $("#wishlist_new_3 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_3 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_3; i++) {
        $("#wishlist_new_3 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_3,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_4 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_4 = $("#wishlist_new_4 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_4         = $("#wishlist_new_4 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_4, option_array_4)!=-1) && option_array_4.length>0){  
        status=false;
        check_option($("#wishlist_new_4 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_4 = new Array()
      status = true

      $("#wishlist_new_4 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_4 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_4 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_4.push(push_data);
        }
      })
      function_text = $("#wishlist_new_4 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_4 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_4; i++) {
        $("#wishlist_new_4 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_4,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_5 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_5 = $("#wishlist_new_5 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_5         = $("#wishlist_new_5 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_5, option_array_5)!=-1) && option_array_5.length>0){  
        status=false;
        check_option($("#wishlist_new_5 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_5 = new Array()
      status = true

      $("#wishlist_new_5 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_5 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_5 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_5.push(push_data);
        }
      })
      function_text = $("#wishlist_new_5 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_5 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_5; i++) {
        $("#wishlist_new_5 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_5,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_6 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_6 = $("#wishlist_new_6 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_6         = $("#wishlist_new_6 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_6, option_array_6)!=-1) && option_array_6.length>0){  
        status=false;
        check_option($("#wishlist_new_6 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_6 = new Array()
      status = true

      $("#wishlist_new_6 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_6 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_6 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_6.push(push_data);
        }
      })
      function_text = $("#wishlist_new_6 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_6 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_6; i++) {
        $("#wishlist_new_6 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_6,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_7 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_7 = $("#wishlist_new_7 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_7         = $("#wishlist_new_7 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_7, option_array_7)!=-1) && option_array_7.length>0){  
        status=false;
        check_option($("#wishlist_new_7 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_7 = new Array()
      status = true

      $("#wishlist_new_7 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_7 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_7 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_7.push(push_data);
        }
      })
      function_text = $("#wishlist_new_7 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_7 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_7; i++) {
        $("#wishlist_new_7 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_7,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_8 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_8 = $("#wishlist_new_8 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_8         = $("#wishlist_new_8 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_8, option_array_8)!=-1) && option_array_8.length>0){  
        status=false;
        check_option($("#wishlist_new_8 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_8 = new Array()
      status = true

      $("#wishlist_new_8 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_8 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_8 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_8.push(push_data);
        }
      })
      function_text = $("#wishlist_new_8 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_8 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_8; i++) {
        $("#wishlist_new_8 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_8,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

    $(document).on('change', "#wishlist_new_9 ul li select[id^=advanced_select_]", function() {
      var currently_clicked_9 = $("#wishlist_new_9 ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_9         = $("#wishlist_new_9 ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_9, option_array_9)!=-1) && option_array_9.length>0){  
        status=false;
        check_option($("#wishlist_new_9 ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_9 = new Array()
      status = true

      $("#wishlist_new_9 ul li select[id^=advanced_select_]").each(function(){  
        if ($("#wishlist_new_9 ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#wishlist_new_9 ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_9.push(push_data);
        }
      })
      function_text = $("#wishlist_new_9 ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#wishlist_new_9 ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_9; i++) {
        $("#wishlist_new_9 ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_9,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })

  // to render a new partial to create a new wishlist
    $(document).on('click', "#add_new_wishlist" , function(){
      var temp_data = $(this).attr('data-user-id')
       $.ajax({
        url: "/admin/users/add_new_wishlist",
        success: function(data) {
           add_new_wish_toggle()
        },
        data: {
          user_id: temp_data
        }
      })
    })

    wishlists_on_page = $("div[id^=wishlist_new_]").length

    $(document).on('click', "#add_wishlist", function() {
      temp_return_value = true
      wishlist_id = $(this).parent().parent().parent().parent().attr('id')
      if($("#" +wishlist_id+" .search").css("display") == "block") {
        if($("#" + wishlist_id + " .search #wishlist_wishlist_name").val() == "") {
          temp_return_value = false
        }
        if ($("#"+wishlist_id+" .search #wishlist_wishlist_search_params").val() == "") {
          temp_return_value = false
        }
      } else {

      }
      if(!temp_return_value) {
        alert("please fill the fields")
      }
      return temp_return_value
    })
  }

})