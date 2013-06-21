
if (location.pathname.match('/admin/users/.+/forum_list')) {
  //var declaration
  var option_array = new Array(); 
  var theValue, current_value, status, search_advanced_id;
  var option_array_total = [1,2,3,4,5,6,7]

  //function declarations
  function toggle_search() {
    $("#forum_advanced_search, #forum_basic_search").toggle()
  }

}

$(function() {

  if (location.pathname.substr(0,11) == "/forum/show") {
    $(document).on('click', ".add_reply", function() {
      $.ajax({
        url: "/forum/new_reply",
        data: {
          forum_message_id : $("#parent_message_id").val()
        },
        success: function(data) {
          temp = new Function(data.responseText)
        }
      })
    })

    $(document).on('click', "#reply_main", function() {
      $(".add_reply").first().click()
    })

    $(document).on('click', "#reply_individual", function() {
      element = $(this)
      $.ajax({
        url: "/forum/new_reply_child",
        data: {
          forum_message_id : element.attr('forum_message_id')
        },
        success: function(data) {
          temp = new Function(data.responseText)
        }
      })
    })

    $(document).on('click', "input[id^=user_forum_message_notification_]", function() {
      element = $(this)
      $.ajax({
        url: "/forum/update_email_notification",
        data: {
          forum_message_notification_id : element.attr('id').split('_').pop(),
          forum_message_notification_value: element.prop("checked")
        },
        success: function(data) {
          alert("Email notification settings updated")
        } 
      })
    })


    $(document).on('click', "input[id^=new_forum_message_notification_]", function() {
      element = $(this)
      $.ajax({
        url: "/forum/update_email_notification",
        data: {
          forum_message_notification_id : element.attr('id').split('_').pop(),
          forum_message_notification_value: element.prop("checked")
        },
        success: function(data) {
          alert("Email notification settings updated")
        } 
      })
    })



  }


  if (location.pathname.match('/admin/users/.+/forum_list')) {
    //make pagination links ajaxified
    $(".pagination a").each(function() {
      $(this).attr("data-remote","true")
    })


    //forum search basic submit
    $(document).on("click", "#forum_basic_search input[type=submit]", function() {
      $("#forum_basic_search #forum_message_sort_by").val($(".nav-sort #sort_by").val())
      $("#forum_basic_search #forum_message_per_page").val($(".nav-sort #per_page").val())
    })

    //forum search advanced submit
    $(document).on("click", "#forum_advanced_search input[type=submit]", function() {
      $("#forum_advanced_search #forum_message_sort_by").val($(".nav-sort #sort_by").val())
      $("#forum_advanced_search #forum_message_per_page").val($(".nav-sort #per_page").val())
    })

    //var declaration

    filter_single_string = $("ul.search_filters").html()   // for appending extra fields in the search filters 

    current_id = 1
    //keeping count of the number of filters added in the search filter

    //page ready calls

    //basic to advanced search
    $(document).off('click', "img.search_toggle");
    $(document).on('click', "img.search_toggle", function() {
      toggle_search();
      console.log("click")
      //choose first element in advanced search
      if (kill_white_space($("ul.search_filters li span#span_1").html()) == "") {
        $("ul.search_filters li select#advanced_select_1").children().first().next().attr("selected","true").change()
        $("input#text_input_concern").val($("form#forum_basic_search input#forum_message_search_string").val())
      }
    })

    //remove fields and return to basic search if only one field is present.
    $(document).off('click', "img.remove_search_field");
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
    $(document).off('click', "img.add_search_field");
    $(document).on('click',"img.add_search_field", function() {
      if(option_array.length == 7) {
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
    $(document).off('change', "select[id^=advanced_select_]");
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
    })
  
  }



  if (location.pathname.substr(0,19) == "/forum/new-question" || location.pathname.substr(0,24) == "/forum/new_forum_message") {
    //onclick of verify offer id
    $(document).on('click','#verify_offer_id', function() {
      $.ajax({
        url:"/forum/verify_offer_id",
        beforeSend: function() {
          $(".ajax_overlay").show()
        },
        data:{
          offer_id:$("#offer_id").val()
        },
        success: function() {
          $(".ajax_overlay").hide()
        }
      })
    })

    //new question submit
    $(document).on('click','form.forum_new_message input[type=submit]',function() {
      if (kill_white_space($("#forum_message_title").val()) == "" || kill_white_space($("#forum_message_text").val()) == "") {
        alert("Please enter your question and description")
        return false;
      }
    })

  }

  //post new question from forum page.
  if (location.pathname == "/forum/home" || location.pathname == "/forum/home/") {
    $(document).on('click','.layout_part_two input#forum_new_question', function() {
      console.log(escape("/forum/new-question?question=" + $(".layout_part_two input#forum_message_title").val()))
      //window.location.pathname = escape("/forum/new-question?question=" + $(".layout_part_two input#forum_message_title").val())
    })
  }


  //navigation in forum home page

  if(location.pathname == "/forum/home"){
    $(document).on('change', "#per_page, #sort_by", function() {
      $.ajax({
        url: "/forum/home",
        dataType: 'json',
        beforeSend: function() {
          $("#forum_ajax_loader_big").show()
          $("#overlay_div_for_forum").show()
        },
        data: {
          sort_by: $("#sort_by").val(),
          per_page: $("#per_page").val(),
          page: 1
        }, 
        complete: function(data) {
          temp = new Function(data.responseText)
          temp();
          $("#forum_ajax_loader_big").hide()
          $("#overlay_div_for_forum").hide()
        }
      })
    })
  }


})


  $(function() {
    $(document).on("click", "#forum_data ul li a:eq(0)", function(){
      //alert("hello")
      console.log("clicked")
      var user_id = $("#user_id").val();
      if(window.sessionStorage)
          sessionStorage.setItem('user_id',user_id)
      //console.log(user_id)
    })
  })