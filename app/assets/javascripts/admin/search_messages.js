var option_array = new Array(); 
var theValue, current_value, status, search_advanced_id;
$(function() {

  if (location.pathname.substr(0,26) == "/admin/users/user_messages") {
    //filling option array in case, when its coming from session
    /*if(location.pathname.substr(0,28) != "/admin/users/user_favourites"){

    if($("#last_search_advanced").val().length > 5) {
      if(JSON.parse($("#last_search_advanced").val().replace(':value','"value"').replace('=>',':')).value == true) {
        $("select[id^=advanced_select]").each(function(){
          option_array.push(  $("#" + $(this).attr('id') + " option:selected").index())
        })
      }
    }
  }*/


   $(document).on('click', '.search form input[type=submit]', function() {
      $(".search #offer_temp_sort_one").prop('value', $("#messages_sort_id_one").val())
      $(".search #offer_temp_sort_two").prop('value', $("#messages_sort_id_two").val())
      
    })
    $(document).on('click', '.search_advanced form input[type=submit]', function() {
      $(".search_advanced #offer_temp_sort_one").prop('value', $("#messages_sort_id_one").val())
      $(".search_advanced #offer_temp_sort_two").prop('value', $("#messages_sort_id_two").val())
      
    })

    if ($("#offer_count").val() == "0") {
      $(".nav_sort_bar").hide()
    } else {
      $(".nav_sort_bar").show()
    }
    if(parseInt($("#offer_count").val()) <= parseInt($("#offers_public_page_per_page").val())) {
      $('#offers_public_page_input_button, #offers_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }

    $(".pagination").children().each(function() {
      $(this).attr("data-remote",true)
    })

    offer_count = $("#offer_count").val();
    per_page    = $("#offers_public_page_per_page").val();
    number_of_pages = parseInt(parseInt(offer_count)/parseInt(per_page))

    if (number_of_pages < 1) {
      $('#offers_public_page_input_button, #offers_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }

    if ($('#offer_count').val() == 0){
      $('#offers_public_page_input_button, #offers_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }
  }

  if (location.pathname.substr(0,26) == "/admin/users/user_messages") {
    $(".buy_art_search div.search img").click(function() {
      $("#offer_search_advanced").attr('value', true)
      $(".buy_art_search div.search").hide()
      $(".buy_art_search div.search_advanced").show()
      if ($(".buy_art_search div.search_advanced div#search_filters span#span_1").html() == '') {
        $(".buy_art_search div.search_advanced div#search_filters select#advanced_select_1").children().first().next().attr("selected", "true");
        $(".buy_art_search div.search_advanced div#search_filters select#advanced_select_1").children().first().next().change();
        $(".buy_art_search div.search_advanced div#search_filters span#span_1 input#text_input_artist_").val($("#offer_search_item").val())
      }
    })
  }

 

  //$("div#search_filters select[id^=advanced_select_]").first().children().first().attr("selected", 'true')

  if (location.pathname.substr(0,26) == "/admin/users/user_messages") {
    current_id = 1;
    html_string = $("#select_search_filter_string").html();

    $(document).on('click', ".add_search_field", function() {
      if(option_array.length == 5) {
        alert("All filters added")
        return
      }
      $(".search_advanced form div ul").append(html_string)
      $(".search_advanced form div ul").children().last().each(function() {
        current_id = current_id + 1;
        $(this).children().first().attr('id', "advanced_select_" + current_id)
        $(this).children().first().next().attr('id', "span_" + current_id)
      })
      select_new_field = _.first(_.difference(option_array_total,option_array))
      $("#advanced_select_" + current_id).children().eq(select_new_field).attr("selected", "true")
      $("#advanced_select_" + current_id).children().eq(select_new_field).change()
      for (var i = 1; i <= current_id; i++) {
        $("select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array,$(this).index())) {
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

    $('.remove_search_field').live('click',function() {  
      if (($("#search_filters ul").children().length == 1)) {
        $(".search_advanced").hide()
        $(".search").show()
        $(".search_advanced #offer_search_advanced").prop('value', false)
      } else {
        var remove_value_id=$(this).parent().children().first().attr('id');  
        option_array = $.grep(option_array, function(value) {
          return value !=  $("#"+remove_value_id + " option:selected").index();
        });  
        $(this).parent().remove();
        for (var i = 1; i <= current_id; i++) {
          $("select#advanced_select_" + i).children().each(function() {
            if (_.contains(option_array,$(this).index())) {
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
      }
    })

    $("div#search_filters select[id^=advanced_select_]").live('click', function() {
      theValue = $(this).attr('value');
    })

    $(document).on('change', "div#search_filters select[id^=advanced_select_]", function() {
      var currently_clicked = $("#" + $(this).attr('id') + " option:selected").index()
      current_value         = $("#" + $(this).attr('id') + " option:selected").index()
      search_advanced_id    = $(this).attr('id')
      if (($.inArray(current_value, option_array)!=-1) && option_array.length>0){  
        status=false;
        check_option($("#"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }
      option_array = new Array();
      status=true
      $("div#search_filters select[id^=advanced_select_]").each(function(){  
        if ($("#"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#"+$(this).attr('id') + " option:selected").index()
          option_array.push(push_data);
        }
      })
      function_text = $("#" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#span_" + $(this).attr('id').split('_')[2]
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id; i++) {
        $("select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array,$(this).index())) {
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
      switch($("div#search_filters select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
          add_validation_to_artist_name()
        break;
        case 2:
          add_validation_to_sender_name()
        break;
        case 3:
          add_validation_to_description()
        break;
        
      }
    })
  }
  

   


  // search works
  
})