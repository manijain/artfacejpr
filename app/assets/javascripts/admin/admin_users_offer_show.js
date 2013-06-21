var option_array = new Array(); 
var theValue, current_value, status, search_advanced_id;


function check_option(option_name){ 
  if (status==false){
    $("#"+search_advanced_id).attr('value',theValue)
  }
  return status
}
//add_validation_to_sender_name
  function add_validation_to_sender_name() {
    var text_input_sender_validation = new LiveValidation("text_input_sender_", {
      onValid: function()  {
        if(!$("#text_input_sender_").val().match( /^[A-Za-z .0-9]+$/)) {
          $("#error_text_input_sender_").css("display","inline")
          $("#error_text_input_sender_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_sender_').tooltip()
          valid_text_input_sender_ = false
        }
        else {
          $('#error_text_input_sender_').hide()
          valid_text_input_sender_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_sender_").val().length == 0) { 
          $('#error_text_input_sender_').hide()
        } 
        else {
          $("#error_text_input_sender_").css("display","inline")
          $("#error_text_input_sender_").attr("data-original-title","Please enter the sender name.")
          $("#error_text_input_sender_").tooltip()
          valid_text_input_sender_ = false
        }
      }
    });
    text_input_sender_validation.add(Validate.Presence);
  }
//add_validation_to_artist_name
  function add_validation_to_artist_name() {
    var text_input_artist_validation = new LiveValidation("text_input_artist_", {
      onValid: function()  {
        if(!$("#text_input_artist_").val().match( /^[A-Za-z .0-9]+$/)) {
          $("#error_text_input_artist_").css("display","inline")
          $("#error_text_input_artist_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_artist_').tooltip()
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
          $("#error_text_input_artist_").tooltip()
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
          $('#error_text_input_title_').tooltip()
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
          $("#error_text_input_title_").tooltip()
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
          $('#error_text_input_description_').tooltip()
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
          $("#error_text_input_description_").tooltip()
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
          $('#error_text_input_year_of_creation_').tooltip()
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
          $("#error_text_input_year_of_creation_").attr("data-original-title","Please enter the year of creation")
          $("#error_text_input_year_of_creation_").tooltip()
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
          $('#error_text_input_movement_period_').tooltip()
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
          $("#error_text_input_movement_period_").attr("data-original-title","Please enter the movement/period.")
          $("#error_text_input_movement_period_").tooltip()
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
        if(!$("#text_input_height_").val().match(/^[,0-9]+$/)) {
          $("#error_text_input_height_").css("display","inline")
          $("#error_text_input_height_").attr("data-original-title","Only numbers are allowed")
          $('#error_text_input_height_').tooltip()
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
          $("#error_text_input_height_").tooltip()
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
          $('#error_text_input_width_').tooltip()
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
          $("#error_text_input_width_").tooltip()
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
          $('#error_text_input_width_').tooltip()
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
          $("#error_text_input_width_").tooltip()
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
          $('#error_text_input_depth_').tooltip()
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
          $("#error_text_input_depth_").attr("data-original-title","Please enter the depth.")
          $("#error_text_input_depth_").tooltip()
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
      $('#error_text_input_submit_date_').tooltip()
    })
  }
//add_validation_to_offer_end_date
  function add_validation_to_offer_end_date() {  
    $("#date_input_offer_end_date_").on('keyup',function() {
      $(this).val('')
      $("#error_text_input_offer_end_date_").css("display","inline")
      $("#error_text_input_offer_end_date_").attr("data-original-title","Please select the date from datepicker")
      $('#error_text_input_offer_end_date_').tooltip()
    })
  }

option_array_total = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

var last_search_basic_value
var last_search_params_basic_value
var last_search_advanced_value
var last_search_params_select_value

$(function() {

  if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
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
      $(".search #offer_new_temp_sort_one").prop('value', $("#offers_public_page_sort_select").val())
      $(".search #offer_new_temp_sort_two").prop('value', $("#offers_public_page_sort_active_inactive").val())
      $(".search #offer_new_temp_sort_three").prop('value', $("#offers_public_page_per_page").val())
    })
    $(document).on('click', '.search_advanced form input[type=submit]', function() {
      $(".search_advanced #offer_new_temp_sort_one").prop('value', $("#offers_public_page_sort_select").val())
      $(".search_advanced #offer_new_temp_sort_two").prop('value', $("#offers_public_page_sort_active_inactive").val())
      $(".search_advanced #offer_new_temp_sort_three").prop('value', $("#offers_public_page_per_page").val())
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

  if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
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

  if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
    $(document).on('click' , "#buy_art_search_submit_button" , function() {
    for (var i = option_array.length - 1; i >= 0; i--) {
      switch(option_array[i]) {
        case 1:
          if($("#text_input_artist_").val()  == ""){
            alert("Please enter the Artist Name")
            $("#error_text_input_artist_").css("display","inline")
            $("#error_text_input_artist_").attr("data-original-title", "Please enter the artist name")
            $("#error_text_input_artist_").tooltip()
            return false              
          } else if(!$("#text_input_artist_").val().match( /^[A-Za-z .0-9]+$/ )) {
            $("#error_text_input_artist_").css("display","inline")
            $("#error_text_input_artist_").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
            $("#error_text_input_artist_").tooltip()
            return false;
          }
          break;
        case 2:
          if($("#text_input_title_").val() == ""){
            alert("Please enter the Title")
            $("#error_text_input_title_").css("display","inline")
            $("#error_text_input_title_").attr("data-original-title","Please enter the title.")
            $("#error_text_input_title_").tooltip()
            return false  
          } else if (!$("#text_input_title_").val().match(/^[A-Za-z .0-9 ?!-]+$/)) {
            $("#error_text_input_title_").css("display","inline")
            $("#error_text_input_title_").attr("data-original-title","Allowed characters: A-Z .0-9 ?!-")
            $("#error_text_input_title_").tooltip()
          }
          break;
        case 3:
          if($("#text_input_description_").val() == "") {
            alert("Please enter the Description")
            $("#error_text_input_description_").css("display","inline")
            $("#error_text_input_description_").attr("data-original-title","Please enter the description.")
            $("#error_text_input_description_").tooltip()
            return false
          } else if (!$("#text_input_description_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
            $("#error_text_input_description_").css("display","inline")
            $("#error_text_input_description_").attr("data-original-title","Allowed characters: A-Z .0-9 ?!-")
            $("#error_text_input_description_").tooltip()
          }
          break;
        case 4:
          if($("#text_input_year_of_creation_").val() == "") {
            alert("Please enter the year of creation")
            $("#error_text_input_year_of_creation_").css("display","inline")
            $("#error_text_input_year_of_creation_").attr("data-original-title","Please enter the year of creation")
            $("#error_text_input_year_of_creation_").tooltip()
            return false  
          } else if (!$("#text_input_year_of_creation_").val().match(/^[.,0-9]+$/)) {
            $("#error_text_input_year_of_creation_").css("display","inline")
            $("#error_text_input_year_of_creation_").attr("data-original-title","Allowed characters: [.,0-9] ")
            $("#error_text_input_year_of_creation_").tooltip()
          }
          break;
        case 7:
          if($("#text_input_movement_period_").val() == "") {
            alert("Please enter the Movement period")
            $("#error_text_input_movement_period_").css("display","inline")
            $("#error_text_input_movement_period_").attr("data-original-title","Please enter the movement/period.")
            $("#error_text_input_movement_period_").tooltip()
            return false
          }
          break;
        case 8:
          if($("#text_input_height_").val() == "") {
            alert("Please enter the Height")
            $("#error_text_input_height_").css("display","inline")
            $("#error_text_input_height_").attr("data-original-title","Please enter the height.")
            $("#error_text_input_height_").tooltip()
            return false
          } else if (!$("#text_input_height_").val().match(/^[,.0-9]+$/)) {
            $("#error_text_input_height_").css("display","inline")
            $("#error_text_input_height_").attr("data-original-title","Characters Allowed: 0-9")
            $("#error_text_input_height_").tooltip()
            return false
          }
          break;
        case 9:
          if($("#text_input_width_").val() == "") {
            alert("Please enter the Width")
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Please enter the width.")
            $("#error_text_input_width_").tooltip()
            return false
          } else if(!$("#text_input_width_").val().match(/^[,.0-9]+$/)) {
            $("#error_text_input_width_").css("display","inline")
            $("#error_text_input_width_").attr("data-original-title","Please enter the width.")
            $("#error_text_input_width_").tooltip()
            return false
          }
          break;
        case 10:
          if($("#text_input_depth_").val() == ""){
            alert("Please enter the depth")
            $("#error_text_input_depth_").css("display","inline")
            $("#error_text_input_depth_").attr("data-original-title","Please enter the depth")
            $("#error_text_input_depth_").tooltip()
            return false  
          } else if(!$("#text_input_depth_").val().match(/^[,.0-9]+$/)) {
            $("#error_text_input_depth_").css("display","inline")
            $("#error_text_input_depth_").attr("data-original-title","Please enter the depth")
            $("#error_text_input_depth_").tooltip()
          }
          break;
        case 15:
          if($("#date_input_submit_date_").val() == ""){
            alert("Please select the Submit date")
            $("#error_text_input_submit_date_").css("display","inline")
            $("#error_text_input_submit_date_").attr("data-original-title","Please select the date from datepicker")
            $('#error_text_input_submit_date_').tooltip()
            return false  
          }
          break;
        case 16:
          if($("#date_input_offer_end_date_").val() == ""){
            alert("Please select the End date")
            $("#error_text_input_offer_end_date_").css("display","inline")
            $("#error_text_input_offer_end_date_").attr("data-original-title","Please select the date from datepicker")
            $('#error_text_input_offer_end_date_').tooltip()
            return false
          }
          break;
      }
    }
    })
  }

  //$("div#search_filters select[id^=advanced_select_]").first().children().first().attr("selected", 'true')

  if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
    current_id = 1;
    html_string = $("#select_search_filter_string").html();

    $(document).on('click', ".add_search_field", function() {
      if(option_array.length == 16) {
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
          add_validation_to_title()
        break;
        case 3:
          add_validation_to_description()
        break;
        case 4:
          add_validation_to_year_of_creation()
        break;
        case 5:
          // add_validation_to_category_and_medium()
        break;
        case 6:
          // add_validation_to_offer_type()
        break;
        case 7:
          add_validation_to_movement_period()
        break;
        case 8:
          add_validation_to_height()
        break;
        case 9:
          add_validation_to_width()
        break;
        case 10:
          add_validation_to_depth()
        break;
        case 11:
          // add_validation_to_signature()
        break;
        case 12:
          // add_validation_to_frame()
        break;
        case 13:
          // add_validation_to_certificate()
        break;
        case 14:
          // add_validation_to_country()
        break;
        case 15:
          add_validation_to_submit_date()
        break;
        case 16:
          add_validation_to_offer_end_date()
        break;
      }
    })
  }
  

   
   //to delete a user offer
  if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
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
            url: "/admin/users/delete_offer", 
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
              alert("deleted")
            }
          })
        }
      })
    }


  // search works
  /*if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {

    $('.pagination a').live('click',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
        console.log('ajax start')
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        console.log('ajax complete')
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
        console.log('pagination')
      })
      var offer_search_advanced=$("#offer_new_search_advanced").attr('value')
      if ($("#offer_new_search_advanced").val() == "true") {
        $.get(
          this.href,
          'per_page=' + $("#offers_public_page_per_page").val() + "&clear_session=false&offer_new[search_advanced]=true&per_page="+$("#offers_public_page_per_page").val() + "&sort_by=" +  $("#offers_public_page_sort_select").val()+ "&offer_new[user_id]=" + $("#offer_new_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val()+ "&offer_new[id]=" +$("#offer_new_id").val(),
          '',
          'script'
        );  
      } else {
        $.get(
          this.href,
          'per_page=' + $("#offers_public_page_per_page").val() + "&clear_session=false&offer_new[search_advanced]=false&per_page="+$("#offers_public_page_per_page").val() + "&sort_by=" +  $("#offers_public_page_sort_select").val() + "&offer_new[user_id]=" + $("#offer_new_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val()+ "&offer_new[id]=" +$("#offer_new_id").val(),
          '',
          'script');
        }
      return false;
    });
    $(document).on('change',"#offers_public_page_sort_active_inactive", function() {
      var url = "/admin/users/user_offers_search_page"
      $.ajax({
        url: url,
        dataType: 'json',
        data: {
          per_page: $("#offers_public_page_per_page").val(),
          sort_by: $("#offers_public_page_sort_select").val(),
          offer_status: $("#offers_public_page_sort_active_inactive").val(),
          'offer_new[user_id]': $("#offer_new_user_id").val(),
          'offer_new[id]': $("#offer_new_offer_id").val()
        }
      })
      console.log('status')
    })
    
    $("#offers_public_page_per_page").live('change', function() {
      var offer_search_advanced=$("#offer_new_search_advanced").attr('value')
      url = "/admin/users/user_offers_search_page/" 
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
       'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val()+ '&offer_new[search_advanced]='+offer_search_advanced + "&clear_session=false&offer_new[user_id]=" + $("#offer_new_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer_new[id]=" +$("#offer_new_id").val(),
       '',
       'script');
    });
    
    $("#offers_public_page_sort_select").live('change', function() {
      var offer_search_advanced=$("#offer_new_search_advanced").attr('value')
      var url = "/admin/users/user_offers_search_page/"
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
       'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val()  + '&offer_new[search_advanced]='+offer_search_advanced + "&clear_session=false&offer_new[user_id]=" + $("#offer_new_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val()+ "&offer_new[id]=" +$("#offer_new_id").val(),
       '',
       'script');
    });
    
    $("#offers_public_page_input_button").live('click', function() {
      offer_count = $("#offer_count").val();
      per_page    = $("#offers_public_page_per_page").val();
      number_of_pages = Math.ceil(parseInt(offer_count)/parseInt(per_page))
      if (number_of_pages < parseInt($("#offers_public_page_input").val())) {
        alert("Please choose an appropriate page")
        return false;
      }

      var offer_search_advanced=$("#offer_new_search_advanced").attr('value')
      url = "/admin/users/user_offers_search_page"
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
        'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + '&offer_new[search_advanced]='+offer_search_advanced + "&clear_session=false&offer_new[user_id]=" + $("#offer_new_user_id").val() + "&offer_status=" + $("#offers_public_page_sort_active_inactive").val() + "&offer_new[id]=" +$("#offer_new_id").val(),
        '',
        'script');
    });
   

  }*/
})
/*if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/") {
  

 $(function(){
   $('.pagination a').live('click',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
        console.log("ajax start")
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        console.log("ajax complete")
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
          console.log("pagination")
        })
      })
      $.ajax({
      url: this.href,
      dataType: 'script'
    });
    return false;
   })
   });

   

   $(function(){
   $('#offers_public_page_sort_select').live('change',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.ajax({
      url: this.href,
      dataType: 'script',
      data : { per_page: $('#offers_public_page_per_page').val(), 
               sort_by: $('#offers_public_page_sort_select').val(),
               offer_show: $('#offers_public_page_sort_active_inactive').val()
            }
    });
    return false;
   })
   });

   $(function(){
   $('#offers_public_page_per_page').live('change',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.ajax({
      url: this.href,
      dataType: 'script',
      data : { per_page: $('#offers_public_page_per_page').val(), 
               sort_by: $('#offers_public_page_sort_select').val(),
               offer_show: $('#offers_public_page_sort_active_inactive').val()
            }
    });
    return false;
   })
   });

   $(function(){
   $('#offers_public_page_sort_active_inactive').live('change',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#buy_art_search_loader_gif").show()
        $("#buy_art_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#buy_art_search_loader_gif").hide()
        $("#buy_art_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.ajax({
      url: this.href,
      dataType: 'script',
      data : { per_page: $('#offers_public_page_per_page').val(), 
               sort_by: $('#offers_public_page_sort_select').val(),
               offer_show: $('#offers_public_page_sort_active_inactive').val()
            }
    });
    return false;
   })
   });

} */  
if (location.pathname.substr(0,30) == "/admin/users/users_offer_show/"){
  $(function(){
    $(".pagination a").each(function() {
      $(this).attr("data-remote","true")
    })
    $(document).on("change", "#offers_public_page_sort_select, #offers_public_page_sort_active_inactive, #offers_public_page_per_page", function(){
      $.ajax({
        url: "/admin/users/user_offers_search_page",
        dataType: 'json',
        cache: false,
        ifModified: false,
        beforeSend: function(){
          $("#buy_art_search_loader_gif").show()
          $("#buy_art_search_loader_div").show()
        },
        data: {
          sort_by: $("#offers_public_page_sort_select").val(),
          status: $("#offers_public_page_sort_active_inactive").val(),
          per_page: $("#offers_public_page_per_page").val(),
          page: 1,
          user_id: $("#offer_new_user_id").val(),
          id: $("#offer_new_id").val()
        },
        complete: function(data){
          var temp = Function(data.responseText)
          temp();
          $("#buy_art_search_loader_gif").hide()
          $("#buy_art_search_loader_div").hide()
        }
      })
    })
  })
}