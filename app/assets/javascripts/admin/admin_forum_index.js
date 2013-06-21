
if (location.pathname == "/admin/forum") {
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

  if (location.pathname == "/admin/forum" ) {
    //make pagination links ajaxified
    $(".pagination").css("top","-65px")
  }

  if (location.pathname == "/admin/forum") {
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
      $('div.layout_part_three').find('h3 span').eq(0).text("DETAILED SEARCH");
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
        $('div.layout_part_three').find('h3').text("FORUM SEARCH");
        $('#forum_message_search_string').val("");
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
})



  //post new question from forum page.

  if (location.pathname == "/admin/forum") {

    $(document).off("click", "#admin_forum_basic_search")
    $(document).on('click', '#admin_forum_basic_search', function() {
      console.log("in basic")
      var value = $("#forum_message_search_string").val();
      $('#admin_basic_forum_search_value').attr('value',value);
        var sort_by = $("#sort_by").val("date");
        var per_page = $("#per_page").val(6);
        setTimeout(function(){
            // alert($("#search_data_4 .count").text());
            $(".forum_result").text($("#forum_data .count").text());
            $(".layout_part_three h3.pull-left span.forum_result").show();
        },500);
    })

    $(document).off("click", "#admin_forum_advanced_search")
    $(document).on('click', '#admin_forum_advanced_search', function() {
      console.log("in advanced"),
      $("#admin_advanced_forum_search_value").attr('value',true);
        var sort_by = $("#sort_by").val("date");
        var per_page = $("#per_page").val(6);
      setTimeout(function(){
          $(".forum_result").text($("#forum_data .count").text());
          $(".layout_part_three h3.pull-left span.forum_result").show();
      },500);
    })  
  }



  //navigation in forum home page

  if(location.pathname == "/admin/forum"){


    $('.pagination a').live('click',function () {       
    
    $.ajax({
      url: this.href,
      dataType: 'script',      
      beforeSend: function() {
        $(this).attr("data-remote", "true")
        $("#forum_ajax_loader_big").show()
          $("#overlay_div_for_forum").show()
        },
        async: false,
      success: function() {
          $("#forum_ajax_loader_big").hide()
          $("#overlay_div_for_forum").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
        }
    });
    return false;
    })    


    $(document).on('change', "#per_page, #sort_by", function() {
      $.ajax({
        url: "/admin/forum",
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




  $(function() {
    $(document).on("click", "#forum_data ul li a:eq(0)", function(){
      //alert("hello")
      //console.log("clicked")
      var user_id = $("#user_id").val();
      if(window.sessionStorage)
          sessionStorage.setItem('user_id',user_id)
      //console.log(user_id)
    })
  })



  if (location.pathname == "/admin/forum") {
    //current_user_id = sessionStorage.getItem('user_id')
    //$('#user_id').val(current_user_id)
    $(document).off("click", "#reply_individual_index")
    $(document).on("click", "#reply_individual_index", function(){
      console.log($(this).attr('forum_message_id'))
      var element = $(this).attr('forum_message_id')
      $.ajax({
        beforeSend: function(){
          // console.log(element)
        },
        url: "/admin/forums/new_reply_index",
        data: {
          forum_message_id: element
        },
        success: function(data){
          temp = new Function(data.responseText)
        }
      })
    })

    $(document).off("click", "#remove_individual_index")
    $(document).on("click", "#remove_individual_index", function(){
      console.log("right")
      var element = $(this).attr('forum_message_id'),
      $this = $(this);
      if(confirm("Do you really want to delete the message?")){
        $.ajax({
          url: "/admin/forums/remove_message",
          beforeSend: function(){
            console.log(element)
          },
          data: {
            forum_message_id: element
          },
          success: function(){
            alert('message deleted ');
            //$this.parent("li[id^=\'forum_message_id_\']").append("This post has been deleted by the forum admin.")
            //$this.parent("li").append("This post has been deleted by the forum admin.")
            $this.parent("li").find("p.pull-left").text("This post has been deleted by the forum admin.")
            $this.parent("li").find("li").eq(1).hide();
          }
        })
      }
    })
    
    $(document).on("mouseover", "#forum_data .data li[id^=\'forum_message_id_\']", function(){
      $(this).find('#reply_individual_index').css('display', 'block')
      $(this).find('#remove_individual_index').css('display', 'block')
    })

    $(document).on("mouseout", "#forum_data .data li[id^=\'forum_message_id_\']", function(){
      $(this).find('#reply_individual_index').css('display', 'none')
      $(this).find('#remove_individual_index').css('display', 'none')
    })
  }









  // // $(function() {
  // //   $(document).on("click", "#forum_data ul li a:eq(0)", function(){
  // //     //alert("hello")
      
  // //     var user_id = $("#user_id").val();
  // //     if(window.sessionStorage)
  // //         sessionStorage.setItem('user_id',user_id)
  // //     //console.log(user_id)
  // //   })
  // // })

  // if (location.pathname == "/admin/forum"){
  //   //current_user_id = sessionStorage.getItem('user_id')
  //   //$('#user_id').val(current_user_id)
  //   $(document).on("click", ".reply_forum_messages", function(){
  //     var element = $(".reply_forum_messages").attr("forum_message_id");
  //     $.ajax({
  //       url: "/admin/forums/new_reply",
  //       data: {
  //         forum_message_id: element
  //       },
  //       success: function(data){
  //         console.log('in success')
  //         temp = new Function(data.responseText)
  //         temp();
  //       }
  //     })
  //   })

  //   // var reply_count = 0;
  //   // $(document).on("click", ".reply_forum_messages", function(){
  //   //   reply_count = reply_count + 1;
  //   //   element = $(this)
  //   //   if (reply_count == 1){
  //   //     $.ajax({
  //   //       url: "/admin/forums/new_reply_child",
  //   //       data: {
  //   //         forum_message_id : element.attr('forum_message_id')
  //   //       },
  //   //       success: function(data){
  //   //         temp = new Function(data.responseText)
  //   //       }
  //   //     })
  //   //   }
  //   // })

  //   $(document).on("click", ".delete_forum_messages", function(){
  //     var element = $(".delete_forum_messages").attr("forum_message_id")
  //     // $this = $(this);
  //     if (confirm("Do you really want to delete the message?")){
  //       $.ajax({
  //         url: "/admin/forums/remove_message",
  //         beforeSend: function() {
  //           alert($(".delete_forum_messages").attr("forum_message_id"));
  //         },
  //         data: {
  //           forum_message_id: element
  //         },
  //         success: function(){
  //           alert('message deleted ');
  //           //$this.parent("li[id^=\'forum_message_\']").append("This post has been deleted by the forum admin.")
  //           $(".message_area ul.unstyled li.width_100").eq(1).text("This post has been deleted by the forum admin.");
  //           $(".message_area ul.unstyled li.width_100").eq(0).hide();
  //         }
  //       })
  //     }
  //   })

  //   $(document).on("mouseover", "#forum_data .data li.main_forum_li[id^=\'forum_message_id\']", function(){
  //     $(this).find('.reply_forum_messages').css('display', 'block')
  //     $(this).find('.delete_forum_messages').css('display', 'block')
  //   })

  //   $(document).on("mouseout", "#forum_data .data li.main_forum_li[id^=\'forum_message_id\']", function(){
  //     $(this).find('.reply_forum_messages').css('display', 'none')
  //     $(this).find('.delete_forum_messages').css('display', 'none')
  //   })
  // }