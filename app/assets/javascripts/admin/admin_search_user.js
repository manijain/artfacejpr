if (location.pathname == "/admin/users") {
  //var declaration
  var option_array = new Array(); 
  var theValue, current_value, status, search_advanced_id;
  var option_array_total = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  //function declarations
  function toggle_search() {
    $("#user_advanced_search, #user_basic_search").toggle()
  }

}
 
  if (location.pathname == "/admin/users") {
    $(document).on("click", "#user_advanced_search input[type=submit]", function() {
    for (var i = option_array.length - 1; i >= 0; i--) {
      switch(option_array[i]) {
        case 1:
          if($("#text_input_username_").val()  == ""){
            alert("Please enter the User Name")
            $("#error_text_input_username_").css("display","inline")
            $("#error_text_input_username_").css("right" , "750px")
            $("#error_text_input_username_").attr("data-original-title", "Please enter the user name")
            $("#error_text_input_username_").tooltip()
            return false              
          } else if(!$("#text_input_username_").val().match( /^[A-Za-z 0-9]+$/ )) {
            $("#error_text_input_username_").css("display","inline")
            $("#error_text_input_username_").css("right" , "750px")
            $("#error_text_input_username_").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
            $("#error_text_input_username_").tooltip()
            return false;
          }
          break;
        case 3:
          if($("#text_input_useraddress_").val()  == ""){
            alert("Please enter the User Address")
            $("#error_text_input_useraddress_").css("display","inline")
          $("#error_text_input_useraddress_").css("right" , "750px")
          $("#error_text_input_useraddress_").attr("data-original-title","Please enter the user address.")
          $("#error_text_input_useraddress_").tooltip()
            return false              
          } else if(!$("#text_input_useraddress_").val().match( /^[A-Za-z 0-9]+$/)) {
          $("#error_text_input_useraddress_").css("display","inline")
          $("#error_text_input_useraddress_").css("right" , "750px")
          $("#error_text_input_useraddress_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_useraddress_').tooltip()
            return false;
          }
          break;
        case 9:
          if($("#date_input_user_membership_").val()  == ""){
            alert("Please Choose the Membship Date")
            $("#error_text_input_user_membership_").css("display","inline")
            $("#error_text_input_user_membership_").css("right" , "750px")
           $("#error_text_input_user_membership_").attr("data-original-title","Please select the date from datepicker")
           $('#error_text_input_user_membership_').tooltip()
            return false              
          } 
          break;
        case 11:
          if($("#text_input_user_offers_").val()  == ""){
            alert("Please enter User offers")
             $("#error_text_input_user_offers_").css("display","inline")
          $("#error_text_input_user_offers_").css("right" , "750px")
          $("#error_text_input_user_offers_").attr("data-original-title","Please enter the offers")
          $("#error_text_input_user_offers_").tooltip()
            return false              
          } else if(!$("#text_input_user_offers_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_offers_").css("display","inline")
          $("#error_text_input_user_offers_").css("right" , "750px")
          $("#error_text_input_user_offers_").attr("data-original-title","Special characters and alphabates not allowed")
          $('#error_text_input_user_offers_').tooltip()
            return false;
          }
          break;
        case 12:
          if($("#text_input_user_messages_").val()  == ""){
            alert("Please enter the User Messages")
            $("#error_text_input_user_messages_").css("display","inline")
          $("#error_text_input_user_messages_").css("right" , "750px")
          $("#error_text_input_user_messages_").attr("data-original-title","Please enter the user messages.")
          $("#error_text_input_user_messages_").tooltip()
            return false              
          } else if(!$("#text_input_user_forum_messages_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_forum_messages_").css("display","inline")
          $("#error_text_input_user_forum_messages_").css("right" , "750px")
          $("#error_text_input_user_forum_messages_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_user_forum_messages_').tooltip()
            return false;
          }
          break;
        case 13:
          if($("#text_input_user_forum_messages_").val()  == ""){
            alert("Please enter User forum messages")
            $("#error_text_input_user_forum_messages_").css("display","inline")
          $("#error_text_input_user_forum_messages_").css("right" , "750px")
          $("#error_text_input_user_forum_messages_").attr("data-original-title","Please enter the user forum messages")
          $("#error_text_input_user_forum_messages_").tooltip()
            return false              
          } else if(!$("#text_input_user_forum_messages_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_forum_messages_").css("display","inline")
          $("#error_text_input_user_forum_messages_").css("right" , "750px")
          $("#error_text_input_user_forum_messages_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_user_forum_messages_').tooltip()
            return false;
          }
          break;
          
        
        
      }
    }
    })
  }

function add_validation_to_user_name() {
    var text_input_username_validation = new LiveValidation("text_input_username_", {
      onValid: function()  {
        if(!$("#text_input_username_").val().match( /^[A-Za-z 0-9]+$/)) {
          $("#error_text_input_username_").css("display","inline")
          $("#error_text_input_username_").css("right" , "750px")
          $("#error_text_input_username_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_username_').tooltip()
          valid_text_input_username_ = false
        }
        else {
          $('#error_text_input_username_').hide()
          valid_text_input_username_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_username_").val().length == 0) { 
          $('#error_text_input_username_').hide()
        } 
        else {
          $("#error_text_input_username_").css("display","inline")
          $("#error_text_input_username_").css("right" , "750px")
          $("#error_text_input_username_").attr("data-original-title","Please enter the user name.")
          $("#error_text_input_username_").tooltip()
          valid_text_input_username_ = false
        }
      }
    });
    text_input_username_validation.add(Validate.Presence);
  }
function add_validation_to_user_address() {
    var text_input_useraddress_validation = new LiveValidation("text_input_useraddress_", {
      onValid: function()  {
        if(!$("#text_input_useraddress_").val().match( /^[A-Za-z 0-9]+$/)) {
          $("#error_text_input_useraddress_").css("display","inline")
          $("#error_text_input_useraddress_").css("right" , "750px")
          $("#error_text_input_useraddress_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_useraddress_').tooltip()
          valid_text_input_useraddress_ = false
        }
        else {
          $('#error_text_input_useraddress_').hide()
          valid_text_input_useraddress_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_useraddress_").val().length == 0) { 
          $('#error_text_input_useraddress_').hide()
        } 
        else {
          $("#error_text_input_useraddress_").css("display","inline")
          $("#error_text_input_useraddress_").css("right" , "750px")
          $("#error_text_input_useraddress_").attr("data-original-title","Please enter the user address.")
          $("#error_text_input_useraddress_").tooltip()
          valid_text_input_address_ = false
        }
      }
    });
    text_input_useraddress_validation.add(Validate.Presence);
  }
function add_validation_to_user_membership_date() {  
    var text_input_user_membership_validation = new LiveValidation("date_input_user_membership_", {
      onValid: function() {
        if(!$("#date_input_user_membership_").val().match('(?:0[1-9]|1[0-2])/(?:0[1-9]|[12][0-9]|3[01])/(?:19|20)[0-9]{2}')) {      
          $("#error_text_input_user_membership_").css("display","inline")
          $("#error_text_input_user_membership_").css("right" , "750px")
           console.log("yes coming")
          $("#error_text_input_user_membership_").attr("data-original-title","Please select the date from datepicker")
          $('#error_text_input_user_membership_').tooltip()
          valid_date_input_user_membership_ = false
        }
        else {
          $('#error_text_input_user_membership_').hide()
          valid_date_input_user_membership_ = true
        }
      },

      onInvalid: function(){
        if ($("#date_input_user_membership_").val().length == 0) { 
          $('#error_text_input_user_membership_').hide()
        } 
        else {
          $("#error_text_input_user_membership_").css("display","inline")
          $("#error_text_input_user_membership_").css("right" , "750px")
          $("#error_text_input_user_membership_").attr("data-original-title","Please enter the offers")
          $("#error_text_input_user_membership_").tooltip()
          valid_date_input_user_membership_ = false
        }
      }
    });
    text_input_user_membership_validation.add(Validate.Presence);
  }    
    

function add_validation_to_user_offers_count() {
    var text_input_user_offers_validation = new LiveValidation("text_input_user_offers_", {
      onValid: function()  {
        if(!$("#text_input_user_offers_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_offers_").css("display","inline")
          $("#error_text_input_user_offers_").css("right" , "750px")
          $("#error_text_input_user_offers_").attr("data-original-title","Special characters and alphabates not allowed")
          $('#error_text_input_user_offers_').tooltip()
          valid_text_input_user_offers_ = false
        }
        else {
          $('#error_text_input_user_offers_').hide()
          valid_text_input_user_offers_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_user_offers_").val().length == 0) { 
          $('#error_text_input_user_offers_').hide()
        } 
        else {
          $("#error_text_input_user_offers_").css("display","inline")
          $("#error_text_input_user_offers_").css("right" , "750px")
          $("#error_text_input_user_offers_").attr("data-original-title","Please enter the offers")
          $("#error_text_input_user_offers_").tooltip()
          valid_text_input_user_offers_ = false
        }
      }
    });
    text_input_user_offers_validation.add(Validate.Presence);
  }
function add_validation_to_user_messages_count() {
    var text_input_user_messages_validation = new LiveValidation("text_input_user_messages_", {
      onValid: function()  {
        if(!$("#text_input_user_messages_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_messages_").css("display","inline")
          $("#error_text_input_user_messages_").css("right" , "750px")
          $("#error_text_input_user_messages_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_user_messages_').tooltip()
          valid_text_input_user_messages_ = false
        }
        else {
          $('#error_text_input_user_messages_').hide()
          valid_text_input_user_messages_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_user_messages_").val().length == 0) { 
          $('#error_text_input_user_messages_').hide()
        } 
        else {
          $("#error_text_input_user_messages_").css("display","inline")
          $("#error_text_input_user_messages_").css("right" , "750px")
          $("#error_text_input_user_messages_").attr("data-original-title","Please enter the user messages.")
          $("#error_text_input_user_messages_").tooltip()
          valid_text_input_user_messages_ = false
        }
      }
    });
    text_input_user_messages_validation.add(Validate.Presence);
  }
function add_validation_to_user_forum_messages_count() {
    var text_input_user_forum_messages_validation = new LiveValidation("text_input_user_forum_messages_", {
      onValid: function()  {
        if(!$("#text_input_user_forum_messages_").val().match( /^[,0-9]+$/)) {
          $("#error_text_input_user_forum_messages_").css("display","inline")
          $("#error_text_input_user_forum_messages_").css("right" , "750px")
          $("#error_text_input_user_forum_messages_").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_user_forum_messages_').tooltip()
          valid_text_input_user_forum_messages_ = false
        }
        else {
          $('#error_text_input_user_forum_messages_').hide()
          valid_text_input_user_forum_messages_ = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_user_forum_messages_").val().length == 0) { 
          $('#error_text_input_user_forum_messages_').hide()
        } 
        else {
          $("#error_text_input_user_forum_messages_").css("display","inline")
          $("#error_text_input_user_forum_messages_").css("right" , "750px")
          $("#error_text_input_user_forum_messages_").attr("data-original-title","Please enter the user forum messages")
          $("#error_text_input_user_forum_messages_").tooltip()
          valid_text_input_user_forum_messages_ = false
        }
      }
    });
    text_input_user_forum_messages_validation.add(Validate.Presence);
  }     


$(function() {

  


  if (location.pathname == "/admin/users") {
    //make pagination links ajaxified
    


    //forum search basic submit
    $(document).on("click", "#user_basic_search input[type=submit]", function() {
      $("#user_basic_search #user_sort_by").val($("#usersort").val())
      $("#user_basic_search #user_per_page").val($("#userperpage").val())
    })

    //forum search advanced submit
    $(document).on("click", "#user_advanced_search input[type=submit]", function() {
      $("#user_advanced_search #user_sort_by").val($("#usersort").val())
      $("#user_advanced_search #user_per_page").val($("#userperpage").val())
    })

    //var declaration

    filter_single_string = $("ul.search_filters").html()   // for appending extra fields in the search filters 

    current_id = 1
    //keeping count of the number of filters added in the search filter

    //page ready calls

    //basic to advanced search
    $(document).on('click', "img.search_toggle", function() {
      toggle_search();
      //choose first element in advanced search
      if (kill_white_space($("ul.search_filters li span#span_1").html()) == "") {
        $("ul.search_filters li select#advanced_select_1").children().first().next().attr("selected","true").change()
        $("input#text_input_concern").val($("form#user_basic_search input#user_search_string").val())
      }
    })

    //remove fields and return to basic search if only one field is present.
    $(document).on('click', "img.remove_search_field", function() {
      if ($("ul.search_filters").children().length == 1) {
        toggle_search();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        console.log("remove_value_id: " + remove_value_id);
        option_array = $.grep(option_array, function(value) {
          return value != $("#" + remove_value_id + " option:selected").index()
        })
        console.log("within remove search field, option array: " + option_array)
        $(this).parent().remove()
      }
    })


    //add fields clicking on the plus button in advanced search

    $(document).on('click',"img.add_search_field", function() {
      if(option_array.length == 16) {
        alert("All filters added")
        return
      }
      $("ul.search_filters").append(filter_single_string);
      $("ul.search_filters").children().last().each(function() {
        current_id = current_id + 1
        $(this).children().first().attr("id","advanced_select_" + current_id)
        $(this).children().first().next().attr("id","span_" + current_id)
      })
      select_new_field = _.first(_.difference(option_array_total,option_array))
      $("#advanced_select_" + current_id).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= option_array.length; i++) {
        $("select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array, $(this).index())) {
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
    })


    //set current value of select field

    $(document).on('click', "select[id^=advanced_select_]" ,function() {
      theValue = $(this).attr('value');
    })


    //run onchange function to append the html into the corresponding span
    $(document).on('change', "select[id^=advanced_select_]", function() {
      var currently_clicked = $("#" + $(this).attr('id') + " option:selected").index()
      current_value         = $("#" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value, option_array)!=-1) && option_array.length>0){  
        status=false;
        check_option($("#"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array = new Array()
      status = true

      $("select[id^=advanced_select_]").each(function(){  
        if ($("#"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#"+$(this).attr('id') + " option:selected").index()
          option_array.push(push_data);
        }
      })
      function_text = $("#" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#span_" + $(this).attr('id').split('_').pop()
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


      switch($("select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
          add_validation_to_user_name()
        break;
        case 2:
          //add_validation_to_user_address()
        break;
        case 3:
          add_validation_to_user_address()
        break;
        case 4:
          //add_validation_to_user_offers_count()
        break;
        case 5:
          //add_validation_to_user_messages_count()
        break;
        case 6:
          //add_validation_to_user_forum_messages_count()
        break;
        case 7:
          //add_validation_to_movement_period()
        break;
        case 8:
          //add_validation_to_height()
        break;
        case 9:
          add_validation_to_user_membership_date()
        break;
        case 10:
          //add_validation_to_depth()
        break;
        case 11:
          add_validation_to_user_offers_count()
        break;
        case 12:
          add_validation_to_user_messages_count()
        break;
        case 13:
          add_validation_to_user_forum_messages_count()
        break;
        case 14:
          // add_validation_to_country()
        break;
        case 15:
          //add_validation_to_submit_date()
        break;
        case 16:
          //add_validation_to_offer_end_date()
        break;
      }


    })
  
  }



})
