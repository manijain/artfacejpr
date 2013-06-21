
function highlight_text() {
  setTimeout('$("#offers_messages").unhighlight().highlight($("input[name=\'offer[search_item_in_messages]\']").val());',500)
}

function to_next(message, dir) {
  if(dir == "up") {
    message.slideUp()
  } else {
    message.slideDown()
    if(message == undefined || message.length < 1 || message.next() == undefined || message.next().length < 1) {

    } else {
      $('.' + message.next().attr('class') + ' .icon-arrow-up').removeClass("icon-arrow-up").addClass("icon-arrow-down")
    } 
    return
  }
  if(message == undefined || message.length < 1 || message.next() == undefined || message.next().length < 1) {
    return 
  } else {
    if (message.css('margin-left') < message.next().css('margin-left')) {
      to_next(message.next(), dir)
    } else {
      return 
    }    
  }
}

$(function(){

  //sorting messages
  if (location.pathname == "/dashboard/sell-art-area") {
    $(document).on('change',"#messages_sort_id_one", function() {
      $.ajax({
        url: "/offer/sell_art_area_messages_sorting",
        beforeSend: function() { $(".sell-art-area-messages div#ajax-loader-big").show();
        $('.sell-art-area-messages div#overlay_div').show() },
        data: "messages_sort=true&sort_one=" + $("#messages_sort_id_one option:selected").index() + "&sort_two=" + $("#messages_sort_id_two option:selected").index(),
        success: function() {
          $('.sell-art-area-messages div#overlay_div').hide()
          $(".sell-art-area-messages div#ajax-loader-big").hide();
        }
      })
    })

    $(document).on('change',"#messages_sort_id_two", function() {
      $.ajax({
        beforeSend: function() {
          $(".sell-art-area-messages div#ajax-loader-big").show();
          $(".sell-art-area-messages div#overlay_div").show()
        },
        url: "/offer/sell_art_area_messages_sorting",
        data: "messages_sort=true&sort_one=" + $("#messages_sort_id_one option:selected").index() + "&sort_two=" + $("#messages_sort_id_two option:selected").index(),
        success: function() {
          $(".sell-art-area-messages div#overlay_div").hide()
          $(".sell-art-area-messages div#ajax-loader-big").hide();
        }
      })
    })
  }

  if (location.pathname == "/dashboard/buy-art-area") {
    $(document).on('change',"#messages_sort_id_one", function() {
      $.ajax({
        url: "/offer/buy_art_area_messages_sorting",
        beforeSend: function() { $(".sell-art-area-messages div#ajax-loader-big").show();
        $('.sell-art-area-messages div#overlay_div').show() },
        data: "messages_sort=true&sort_one=" + $("#messages_sort_id_one option:selected").index() + "&sort_two=" + $("#messages_sort_id_two option:selected").index(),
        success: function() {
          $('.sell-art-area-messages div#overlay_div').hide()
          $(".sell-art-area-messages div#ajax-loader-big").hide();
        }
      })
    })

    $(document).on('change',"#messages_sort_id_two", function() {
      $.ajax({
        beforeSend: function() {
          $(".sell-art-area-messages div#ajax-loader-big").show();
          $(".sell-art-area-messages div#overlay_div").show()
        },
        url: "/offer/buy_art_area_messages_sorting",
        data: "messages_sort=true&sort_one=" + $("#messages_sort_id_one option:selected").index() + "&sort_two=" + $("#messages_sort_id_two option:selected").index(),
        success: function() {
          $(".sell-art-area-messages div#overlay_div").hide()
          $(".sell-art-area-messages div#ajax-loader-big").hide();
        }
      })
    })
  }


  //clear messages text before searching
    if (location.pathname == "/dashboard/sell-art-area") {
      $("input[name='offer[search_item_in_messages]']").val('')
      $("#offers_messages_search_submit").click()
    }

  // deleting messages
  if (location.pathname.substr(0,11) == "/offer/show" || location.pathname == "/dashboard/sell-art-area" || location.pathname == "/dashboard/buy-art-area") {

    $(document).on('click',".messages_pagination .pagination a", function() {
      a_element = $(this)
      $.get(
        '/offer/sell_art_area_messages_sorting',
        'page=' +  a_element.attr('href').split('page=')[1])
      return false;
    })
    /// get parent messages
      $(document).on('click',".icon-arrow-down", function() {
        if ($(this).attr('id').split('_')[0] == "offer") {
          attr_temp_id = $(this).attr('id')
          var temp = $(this).attr('id') + "_message"
          $('#' + temp).slideDown()
          $(this).removeClass("icon-arrow-down").addClass("icon-arrow-up");
          $.get("/offer/message_status?offer_id=" + attr_temp_id.split("offer_")[1])
        } else {
          $(this).removeClass("icon-arrow-down").addClass("icon-arrow-up");
          element = $(this).parent().parent().parent().parent()
          to_next(element.next(), "down")
        }
        highlight_text();
      })
      $(document).on('click',".icon-arrow-up", function() {
        if ($(this).attr('id').split('_')[0] == "offer") {
          var temp = $(this).attr('id') + "_message"
          $('#' + temp).slideUp()
          $(this).removeClass("icon-arrow-up").addClass("icon-arrow-down");
        } else {
          $(this).removeClass("icon-arrow-up").addClass("icon-arrow-down");
          element = $(this).parent().parent().parent().parent()
          to_next(element.next(), "up")
        }
        highlight_text();
      })


  $(".pull-left" + "i.icon-arrow-up").live('click', function() {
    highlight_text();
    if ($(this).attr('id').substr(0,8) == "message_") {
      parent_message_id = $(this).attr('id').split('_').pop()
      $("li.child_of_message_"+parent_message_id).each(function() {
        $(this).slideUp('slow')
      })
    }
    attr_temp_id = $(this).attr('id')
    $("ul[id^=" + $(this).attr('id') + "_message]").slideUp(1500, function() {
      $("#"+attr_temp_id).removeClass("icon-arrow-up").addClass("icon-arrow-down")
    })
    
  })

    
    ///deleting messages

    $("i[id^=message_reply_]").live('click', function() {
      if ($(this).attr("data-disabled") == "disabled") {

      } else {
        $(this).attr("data-disabled","disabled")
        parent_message_id = $(this).attr('id').split('_').pop()
        message_box_html = '<div style="width:100%;" class="pull-left">'
        + '<div style="float:left;height:auto;border: 1pz solid lightgray; padding:6px; width: 98%;">'
        + '<input type="text" style="float:left;width:89%;" id="message_title_' + parent_message_id + '" placeholder="message title"></input>'
        + '<textarea style="float:left;min-height:40px;min-width:89%;height:100px;margin:0;width:89%;max-width:89%;max-height:150px;" id="message_text_' + parent_message_id + '" placeholder="your reply" maxlength="1000"></textarea>'
        + '<input type="button" value="POST" style="float: left; margin: 0px; height: 36px;" class="btn" id="message_reply_button_' + parent_message_id + '">'
        + '</div>'
        + '</div>'
        $(this).parent().parent().parent().append(message_box_html)
      }
    })

    $("input[id^=message_reply_button_]").live('click', function() {
      message_id = $(this).attr('id').split('_').pop()
      $("#message_reply_" + message_id).removeAttr("data-disabled")
      $.ajax({
        beforeSend: function() {
          $(".sell-art-area-messages div#ajax-loader-big").show();
          $(".sell-art-area-messages div#overlay_div").show()
        },
        url: "/message/create/",
        data: {
          "parent_message_id": message_id,
          "message_text": $("#message_text_" + message_id).val(),
          "is_parent": false,
          "message_title": $("#message_title_" + message_id).val()
        },
        success: function() {
          highlight_text();
          $(".sell-art-area-messages div#ajax-loader-big").hide();
          $(".sell-art-area-messages div#overlay_div").hide()
          $("#message_reply_button_" + message_id).parent().parent().remove()
        }
      })
    })



    $("i[id^=message_delete_]").live('click', function() {
      message_id = $(this).attr('id').split('_').pop()
      message_element = $(".message_" + message_id)
      message_element.fadeOut(2000)
      highlight_text();
      setTimeout("message_element.remove()",2000)
      $.get("/message/destroy/"+message_id)
    })

    ///dashboard/sell-art-area mesages sliding effect and ajax for making messages read
      // $("i.icon-arrow-down").live('click', function() {
      //   if ($(this).attr('id').substr(0,8) == "message_") {
      //     parent_message_id = $(this).attr('id').split('_').pop()
      //     $("li.child_of_message_"+parent_message_id).each(function() {
      //       $(this).slideDown('slow')
      //     })
      //   }
      //   highlight_text();
      //   attr_temp_id = $(this).attr('id')

      //   $("ul[id^=" + $(this).attr('id') + "_message]").slideDown(1500, function() {
      //     $("#"+attr_temp_id).removeClass("icon-arrow-down").addClass("icon-arrow-up")
      //     //$.get("/offer/message_status?offer_id=" + attr_temp_id.split("offer_")[1])
      //   })
      // })
      // $("i.icon-arrow-up").live('click', function() {
      //   highlight_text();
      //   if ($(this).attr('id').substr(0,8) == "message_") {
      //     parent_message_id = $(this).attr('id').split('_').pop()
      //     $("li.child_of_message_"+parent_message_id).each(function() {
      //       $(this).slideUp('slow')
      //     })
      //   }
      //   attr_temp_id = $(this).attr('id')
      //   $("ul[id^=" + $(this).attr('id') + "_message]").slideUp(1500, function() {
      //     $("#"+attr_temp_id).removeClass("icon-arrow-up").addClass("icon-arrow-down")
      //   })
      // })

    ///messages collapsing and folding
      $("#messages_unfold_collapse").live('click', function() {    
        $("i.icon-arrow-down").each(function() {
          $("ul[id^=" + $(this).attr('id') + "_message]").slideDown(1500)
          $(this).removeClass("icon-arrow-down")
          $(this).addClass("icon-arrow-up")
        })
        $(this).attr('id',"messages_collapse_unfold")
        $(this).val('COLLAPSE ALL MESSAGES')
      })

      $("#messages_collapse_unfold").live('click', function(){
        $("i.icon-arrow-up").each(function() {
          $("ul[id^=" + $(this).attr('id') + "_message]").slideUp(1500)
          $(this).removeClass("icon-arrow-up")
          $(this).addClass("icon-arrow-down")
        })
        $(this).attr('id','messages_unfold_collapse')
        $(this).val('UNFOLD ALL MESSAGES')
      })
  };

})