if (location.pathname == "/admin/admin") {
  var admin_option_array_0 = new Array();
  var admin_option_array_1 = new Array();
  //var admin_option_array_2 = new Array();
  //var admin_option_array_3 = new Array();

  var admin_theValue_1, admin_theValue_2, admin_theValue_3, admin_theValue_4
  var admin_current_value_0, admin_current_value_1, admin_current_value_2, admin_current_value_3
  var admin_status_1, admin_status_2, admin_status_3, admin_status_4
  var admin_search_advanced_id_1, admin_search_advanced_id_2, admin_search_advanced_id_3,  admin_search_advanced_id_4
  function toggle_search_0() {
    $(".filter_0_basic, .filter_0_advanced").toggle()
  }
  function toggle_search_1() {
    $(".filter_1_basic, .filter_1_advanced").toggle()
  }
  function toggle_search_2() {
    $(".filter_2_basic, .filter_2_advanced").toggle()
  }
  function toggle_search_3() {
    $(".filter_3_basic, .filter_3_advanced").toggle()
  }
}


$(function() {
  

  if (location.pathname == "/admin/admin") {
    //make all pagination links ajaxified
    $(".pagination").css("top","-65px")
  }




  if (location.pathname == "/admin/admin") {
    filter_single_string_0 = $(".filter_0_advanced ul").html()
    filter_single_string_1 = $(".filter_1_advanced ul").html()
    // = $(".filter_2_advanced ul").html()
    //filter_single_string_3 = $(".filter_3_advanced ul").html()
    current_id_0 = 1
    current_id_1 = 1
    //current_id_2 = 1
    //current_id_3 = 1
    option_array_total_0 = [1,2,3,4,5]
    option_array_total_1 = [1,2,3,4,5,6]
    //option_array_total_2 = [1,2,3,4,5]
    //option_array_total_3 = [1,2,3,4,5]

    $(document).on('click','img.admin_search_toggle_0',function() {
      toggle_search_0()
      if (kill_white_space($(".filter_0_advanced ul li span#span_1").html()) == "") {
        $(".filter_0_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.admin_search_toggle_1',function() {
      toggle_search_1()
      if (kill_white_space($(".filter_1_advanced ul li span#span_1").html()) == "") {
        $(".filter_1_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    /*$(document).on('click','img.admin_search_toggle_2',function() {
      toggle_search_2()
      if (kill_white_space($(".filter_2_advanced ul li span#span_1").html()) == "") {
        $(".filter_2_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.admin_search_toggle_3',function() {
      toggle_search_3()
      if (kill_white_space($(".filter_3_advanced ul li span#span_1").html()) == "") {
        $(".filter_3_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })*/


    $(document).on('click',"img.admin_add_search_field_0", function() {

      if(admin_option_array_0.length == 5) {
        alert("All filters added")
        return
      }
      $(".filter_0_advanced ul").append(filter_single_string_0);
      $(".filter_0_advanced ul").children().last().each(function() {
        current_id_0 = current_id_0 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_0)
        $(this).children().first().next().attr("id","span_" + current_id_0)
      })
      select_new_field = _.first(_.difference(option_array_total_0,admin_option_array_0))
      $(".filter_0_advanced ul li select#advanced_select_" + current_id_0).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= admin_option_array_0.length; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_0, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })
    $(document).on('click',"img.admin_add_search_field_1", function() {
      if(admin_option_array_1.length == 6) {
        alert("All filters added")
        return
      }
      $(".filter_1_advanced ul").append(filter_single_string_1);
      $(".filter_1_advanced ul").children().last().each(function() {
        current_id_1 = current_id_1 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_1)
        $(this).children().first().next().attr("id","span_" + current_id_1)
      })
      select_new_field = _.first(_.difference(option_array_total_1,admin_option_array_1))
      $(".filter_1_advanced ul li select#advanced_select_" + current_id_1).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= admin_option_array_1.length; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_1, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })

    /*$(document).on('click',"img.admin_add_search_field_2", function() {
      if(admin_option_array_2.length == 5) {
        alert("All filters added")
        return
      }
      $(".filter_2_advanced ul").append(filter_single_string_2);
      $(".filter_2_advanced ul").children().last().each(function() {
        current_id_2 = current_id_2 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_2)
        $(this).children().first().next().attr("id","span_" + current_id_2)
      })
      select_new_field = _.first(_.difference(option_array_total_2,admin_option_array_2))
      $(".filter_2_advanced ul li select#advanced_select_" + current_id_2).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= admin_option_array_2.length; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_2, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })

    $(document).on('click',"img.admin_add_search_field_3", function() {
      if(admin_option_array_3.length == 5) {
        alert("All filters added")
        return
      }
      $(".filter_3_advanced ul").append(filter_single_string_3);
      $(".filter_3_advanced ul").children().last().each(function() {
        current_id_3 = current_id_3 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_3)
        $(this).children().first().next().attr("id","span_" + current_id_3)
      })
      select_new_field = _.first(_.difference(option_array_total_3,admin_option_array_3))
      $(".filter_3_advanced ul li select#advanced_select_" + current_id_3).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= admin_option_array_3.length; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_3, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })*/

    $(document).on('click', "img.admin_remove_search_field_0", function() {

      if ($(".filter_0_advanced ul").children().length == 1) {
        toggle_search_0();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        
        admin_option_array_0 = $.grep(admin_option_array_0, function(value) {
          return value != $(".filter_0_advanced ul #" + remove_value_id + " option:selected").index()
        })
        
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_0; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_0, $(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', "img.admin_remove_search_field_1", function() {
      if ($(".filter_1_advanced ul").children().length == 1) {
        toggle_search_1();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        admin_option_array_1 = $.grep(admin_option_array_1, function(value) {
          return value != $(".filter_1_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_1; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_1,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    /*$(document).on('click', "img.admin_remove_search_field_2", function() {
      if ($(".filter_2_advanced ul").children().length == 1) {
        toggle_search_2();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        admin_option_array_2 = $.grep(admin_option_array_2, function(value) {
          return value != $(".filter_2_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_2; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_2,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', "img.admin_remove_search_field_3", function() {
      if ($(".filter_3_advanced ul").children().length == 1) {
        toggle_search_3();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        admin_option_array_3 = $.grep(admin_option_array_3, function(value) {
          return value != $(".filter_3_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_3; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_3,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })*/

    $(document).on('click', ".filter_0_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_0 = $(this).attr('value');
    })
    $(document).on('click', ".filter_1_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_1 = $(this).attr('value');
    })
    /*$(document).on('click', ".filter_2_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_2 = $(this).attr('value');
    })
    $(document).on('click', ".filter_3_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_3 = $(this).attr('value');
    })*/

    $(document).on('change', ".filter_0_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_0 = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      admin_current_value_0  = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(admin_current_value_0, admin_option_array_0)!=-1) && admin_option_array_0.length>0){ 
        status=false;
        check_option($(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      admin_option_array_0 = new Array()
      status = true

      $(".filter_0_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          admin_option_array_0.push(push_data);
        }
      })
      function_text = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_0_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_0; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_0,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('change', ".filter_1_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_1 = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      admin_current_value_1         = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(admin_current_value_1, admin_option_array_1)!=-1) && admin_option_array_1.length>0){  
        status=false;
        check_option($(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      admin_option_array_1 = new Array()
      status = true

      $(".filter_1_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          admin_option_array_1.push(push_data);
        }
      })
      function_text = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_1_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_1; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_1,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    /*$(document).on('change', ".filter_2_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_2 = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      admin_current_value_2         = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(admin_current_value_2, admin_option_array_2)!=-1) && admin_option_array_2.length>0){  
        status=false;
        check_option($(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      admin_option_array_2 = new Array()
      status = true

      $(".filter_2_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          admin_option_array_2.push(push_data);
        }
      })
      function_text = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_2_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_2; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_2,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })


    $(document).on('change', ".filter_3_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_3 = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      admin_current_value_3         = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(admin_current_value_3, admin_option_array_3)!=-1) && admin_option_array_3.length>0){  
        status=false;
        check_option($(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      admin_option_array_3 = new Array()
      status = true

      $(".filter_3_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          admin_option_array_3.push(push_data);
        }
      })
      function_text = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_3_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_3; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(admin_option_array_3,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })*/
  }



})



if (location.pathname == "/admin/admin") {

  $(document).on('click', "#payment_basic_search_btn", function() {
    $("#admin_payment_per_page_item").val("6");
    $("#admin_payment_sort_by_attr").val("first name");
    $("#payment_basic_search").attr('value','true');
    $("#payment_advanced_search").attr('value','false');
  });

  $(document).on('click', "#payment_advanced_search_btn", function() {
    $("#admin_payment_per_page_item").val("6");
    $("#admin_payment_sort_by_attr").val("first name");
    $("#payment_advanced_search").attr('value','true');
    $("#payment_basic_search").attr('value','false');
  });

  $(document).on('click', "#report_basic_search_btn", function() {
    $("#admin_report_per_page_item").val("6");
    $("#admin_report_sort_by_attr").val("first name");
    $("#report_basic_search").attr('value','true');
    $("#report_advanced_search").attr('value','false');
  });

  $(document).on('click', "#report_advanced_search_btn", function() {
    $("#admin_report_per_page_item").val("6");
    $("#admin_report_sort_by_attr").val("first name");
    $("#report_advanced_search").attr('value','true');
    $("#report_basic_search").attr('value','false');
  });

  $(document).on('change', "#admin_payment_sort_by_attr, #admin_payment_per_page_item", function() {
    //var search_value= $("#search_by_value").val(),
    //var sort_value= $("#admin_sort_by_attr").val(),
    //var per_page_value= $("#admin_per_page_item").val();
    $.ajax({
      url: "/admin/admin/payment_search",
      type: 'GET',
      data: {
        sort_by: $("#admin_payment_sort_by_attr").val(),
        per_page: $("#admin_payment_per_page_item").val(),
        payment_basic_search: $("#payment_basic_search").attr("value"),
        payment_advanced_search: $("#payment_advanced_search").attr("value"),
        'user[search_basic]': "",
        'user[search_advanced]': ""
        //search_item: search_value
      },
      success: function(data) {
        // jQuery("#search_data_3").html(data)
       // result = new Function(data.responseText)
      }
    })
  })


  $(document).on('change', "#admin_report_sort_by_attr, #admin_report_per_page_item", function() {
    //var search_value= $("#search_by_value").val(),
    //var sort_value= $("#admin_sort_by_attr").val(),
    //var per_page_value= $("#admin_per_page_item").val();
    $.ajax({
      url: "/admin/admin/abuse_reports",
      type: 'GET',
      data: {
        report_sort_by: $("#admin_report_sort_by_attr").val(),
        report_per_page: $("#admin_report_per_page_item").val(),
        report_basic_search: $("#report_basic_search").attr("value"),
        report_advanced_search: $("#report_advanced_search").attr("value"),
        'message_admin[search_basic]': "",
        'message_admin[search_advanced]': ""
        //search_item: search_value
      },
      success: function(data) {
        // jQuery("#search_data_3").html(data)
       // result = new Function(data.responseText)
      }
    })
  })


  $(function() { 
  $(document).on('click',"#search_data_4 .pagination a", function(e) {
    e.preventDefault();
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: {
            sort_by: $("#admin_payment_sort_by_attr").val(),
            per_page: $("#admin_payment_per_page_item").val(),
            payment_basic_search: $("#payment_basic_search").attr("value"),
            payment_advanced_search: $("#payment_advanced_search").attr("value"),
            'user[search_basic]': "",
            'user[search_advanced]': "",
            choice: 4
            //partner_type: 4
          }
      })
    });
    return false;
  });
 
  $("#search_data_4 .pagination a").each(function() {
     $(this).attr("data-remote","true")
   })
  

  $(function() { 
  $(document).on('click',"#search_data_3 .pagination a", function(e) {
  //$('.span10interesting_offers_first_div ul div.pagination a').live('click',function(e) {
    e.preventDefault();
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: {
        report_sort_by: $("#admin_report_sort_by_attr").val(),
        report_per_page: $("#admin_report_per_page_item").val(),
        report_basic_search: $("#report_basic_search").attr("value"),
        report_advanced_search: $("#report_advanced_search").attr("value"),
        'message_admin[search_basic]': "",
        'message_admin[search_advanced]': "",
        choice: 3
          }
      })
    });
    return false;
  });
 
  $("#search_data_3 .pagination a").each(function() {
     $(this).attr("data-remote","true")
   })

  /*$(function() { 
  $(document).on('click',"#search_data_2 .pagination a", function() {
  //$('.span10interesting_offers_first_div ul div.pagination a').live('click',function(e) {
    //e.preventDefault();
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: {
            partner_type: 2
          }
      })
    });
    return false;
  });
 
  $("#search_data_2 .pagination a").each(function() {
     $(this).attr("data-remote","true")
   })

  $(function() { 
  $(document).on('click',"#search_data_1 .pagination a", function() {
  //$('.span10interesting_offers_first_div ul div.pagination a').live('click',function(e) {
    //e.preventDefault();
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: {
            partner_type: 1
          }
      })
    });
    return false;
  });
 
  $("#search_data_1 .pagination a").each(function() {
     $(this).attr("data-remote","true")
   })
}*/


  

  $(document).on('click', "a[id^=solved_]", function() {
    element = $(this)
    id = element.attr('id').split('_').pop()
    $.ajax({
      url: "/admin/admin/solved_report",
      data: {
        report_id: element.attr('id').split('_').pop(),
        //choice: 2
      },
      success: function(text) {
        if( text == "true") { $("#is_solved_"+id).css("display","block")} 
      }
    })
  })

  $(document).on('click', "a[id^=unsolved_]", function() {
    element = $(this)
    id = element.attr('id').split('_').pop()
    $.ajax({
      url: "/admin/admin/unsolved_report",
      data: {
        report_id: element.attr('id').split('_').pop(),
        //choice: 2
      },
      success: function(text) {
        if( text == "true") { $("#is_solved_"+id).css("display","none")} 
      }
    })
  })

  $(document).on('click', "a[id^=delete_]", function() {
    element = $(this)
    id = element.attr('id').split('_').pop()
    $.ajax({
      url: "/admin/admin/delete_report",
      data: {
        report_id: element.attr('id').split('_').pop(),
        //choice: 2
      },
      success: function(text) {
        element.parent().fadeOut(2000)
        setTimeout('element.parent().parent().remove()',2000)
        if( text == "true") { alert("Abuse report deleted successfully.")} 
        //setTimeout("location.reload()",1000)
      }
    })
  })

  $(document).on('click', "a[id^=container_]", function() {
    $(this).parent('span').parent('li').find("#report_abuse_reply_container").slideDown()
    $(this).parent().css("display","none")
    $(this).parent().parent().children('span.container_close').css("display","block")
  })

  $(document).on('click', "a[id^=container_close_]", function() {
    $(this).parent().parent().find("div#report_abuse_reply_container").slideUp()
    $(this).parent().css("display","none")
    //$(this).parent().parent().children('span.container_close').css("display","block")
  })


  $(document).on('click', "input[id^=cancel_report_abuse_reply_]", function() {
    $(this).parent().parent().parent().parent().slideUp()
    $(this).parent().parent().parent().parent().parent().find("span.container_close").css("display","none")
    //$(this).parent().parent().parent().parent().parent().find("span.container_").css("display","block")
  })


  $(document).on('click', "a[id^=reminder_]", function(e) {
    e.preventDefault();
    console.log("clicked")
    var amount_due = $(this).parent().parent().find("span:eq(0)").text().split("€")[1].trim();
    var user_id = $(this).attr("id").split("_")[1];
    $(document).ajaxStart(function(){
      $("#mail_loader_gif").show()
      $("#mail_loader_div").show()
    })
    $(document).ajaxComplete(function(){
      $("#mail_loader_gif").hide()
      $("#mail_loader_div").hide()
    })
    $.ajax({
      url: "/admin/send_email_reminder",
      beforeSend: function() {
        console.log("before")
      },
      data: {
        user_id: user_id,
        amount_due: amount_due
      },
      success: function() {
        alert("Mail send successfully")
      }
    })
  })

  $(document).off('click', "input[id^=send_reply_btn]");
  $(document).on('click', "input[id^=send_reply_btn]", function(e) {
    
    $(document).ajaxStart(function(){
      $("#reply_mail_loader_gif").show()
      $("#reply_mail_loader_div").show()
    })
    $(document).ajaxComplete(function(){
      $("#reply_mail_loader_gif").hide()
      $("#reply_mail_loader_div").hide()
    })
    
  })















  
  $(document).on('mouseover', '.main_li', function(e) {
    e.preventDefault();
    if ($(this).find("div#report_abuse_reply_container").css("display") == "none"){
      $(this).find(".delete_img").css("display","block");
      $(this).find(".container_open").css("display","block");
      $(this).find(".unsolved_img").css("display","block");
      $(this).find(".solved_img").css("display","block");
    }
    else{
      $(this).find(".unsolved_img").css("display","none");
      $(this).find(".solved_img").css("display","none");
      $(this).find(".delete_img").css("display","none");
    }
  })

  $(document).on('mouseout', '.main_li', function(e) {
    e.preventDefault();
    if ($(this).find("div#report_abuse_reply_container").css("display") == "none")
    {
      $(this).find(".delete_img").css("display","none");
      $(this).find(".container_open").css("display","none");
      $(this).find(".unsolved_img").css("display","none");
      $(this).find(".solved_img").css("display","none");
    }
    else{
      $(this).find(".unsolved_img").css("display","none");
      $(this).find(".solved_img").css("display","none");
      $(this).find(".delete_img").css("display","none");
    }
  })

  
  $(document).on('click', 'p[id^=fee_row_], p[id^=paintings_allowed_row_], p[id^=offers_allowed_row_], p[id^=wishlists_allowed_row_]', function() {   
    if($(this).attr("id").slice(0, -1) == "wishlists_allowed_row_"){
      $(this).parent().find("p").css("display","block")
    }
    else{
      $(this).parent().find("p input").css("display","block")
    }
    $(this).css("display","none");
  })


  $(document).on('click','#update_button', function() {

    $.ajax({
      url: "/admin/admin/update_plans",
      //type: 'GET',
       beforeSend : function() {
            $('#ajax-loader-big_for_services_data').show();
            $('#overlay_div_data').show();
          },
      data: {
        plan: { 
          basic: {
            annual_fee : $("#row_1 span p input#fee_row_text").val() , 
            painting_allowed : $("#row_1 span p input#paintings_row_text").val(),
            offers_allowed : $("#row_1 span p input#offers_row_text").val(),
            wishlist_allowed : $("#row_1 span p input#wishlists_row_checkbox").is(':checked') },
          plus: {
            annual_fee : $("#row_2 span p input#fee_row_text").val() , 
            painting_allowed : $("#row_2 span p input#paintings_row_text").val(),
            offers_allowed : $("#row_2 span p input#offers_row_text").val(),
            wishlist_allowed : $("#row_2 span p input#wishlists_row_checkbox").is(':checked') },
        
          pro: {
            annual_fee : $("#row_3 span p input#fee_row_text").val() , 
            painting_allowed : $("#row_3 span p input#paintings_row_text").val(),
            offers_allowed : $("#row_3 span p input#offers_row_text").val(),
            wishlist_allowed : $("#row_3 span p input#wishlists_row_checkbox").is(':checked') },
          
          premium: {
            annual_fee : $("#row_4 span p input#fee_row_text").val() , 
            painting_allowed : $("#row_4 span p input#paintings_row_text").val(),
            offers_allowed : $("#row_4 span p input#offers_row_text").val(),
            wishlist_allowed : $("#row_4 span p input#wishlists_row_checkbox").is(':checked') },
          
          no_limit: {
            annual_fee : $("#row_5 span p input#fee_row_text").val() , 
            painting_allowed : $("#row_5 span p input#paintings_row_text").val(),
            offers_allowed : $("#row_5 span p input#offers_row_text").val(),
            wishlist_allowed : $("#row_5 span p input#wishlists_row_checkbox").is(':checked') }
          }
      },
      success: function(data) {
        // jQuery("#search_data_3").html(data)
        //result = new Function(data.responseText);
        //result();
        $('#ajax-loader-big_for_services_data').hide()
        $('#overlay_div_data').hide();
      }
    })

  })
















  

$(document).ready(function() {
  $('.filter_0_advanced #text_input_username_').live('keyup', function() {
    var isTrue = false
    if($('.filter_0_advanced #text_input_username_').val().length == 0){
      $('.filter_0_advanced #error_text_input_username_').css('display', 'inline')
      $('.filter_0_advanced #error_text_input_username_').attr('data-original-title', 'Please enter first name')
      $('.filter_0_advanced #error_text_input_username_').tooltip()
      return false
    }
    else{
      $('.filter_0_advanced #error_text_input_username_').hide()
    }
    if(!$('.filter_0_advanced #text_input_username_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('.filter_0_advanced #error_text_input_username_').css('display', 'inline')
      $('.filter_0_advanced #error_text_input_username_').attr('data-original-title', 'Special characters not allowed')
      $('.filter_0_advanced #error_text_input_username_').tooltip()
      return false
    }
    else{
      $('.filter_0_advanced #error_text_input_username_').hide()
    }
  });

  $('.filter_0_advanced #date_input_time_span_starts_').live('keyup', function() {
    $('.filter_0_advanced #error_text_input_time_span_starts_').css('display', 'inline')
    $('.filter_0_advanced #error_text_input_time_span_starts_').attr('data-original-title', 'Please choose date from the Datepicker')
    $('.filter_0_advanced #error_text_input_time_span_starts_').tooltip()
  });

  $('.filter_0_advanced #date_input_time_span_ends_').live('keyup', function() {
    $('.filter_0_advanced #error_text_input_time_span_ends_').css('display', 'inline')
    $('.filter_0_advanced #error_text_input_time_span_ends_').attr('data-original-title', 'Please choose date from the Datepicker')
    $('.filter_0_advanced #error_text_input_time_span_ends_').tooltip()
  }); 
})

if(location.pathname == '/admin/admin') {
  $(document).on('click', '#payment_advanced_search_btn', function(){
    for(var i=1; i<=3; i++){
      switch(i){
        case 1:
          if($('.filter_0_advanced #text_input_username_').val().length == 0){
            alert('Please enter user name')
            $('.filter_0_advanced #error_text_input_username_').css('display', 'inline')
            $('.filter_0_advanced #error_text_input_username_').attr('data-original-title', 'Please enter user name')
            $('.filter_0_advanced #error_text_input_username_').tooltip()
            return false
          }
          else if(!$('.filter_0_advanced #text_input_username_').val().match( /^[A-Za-z .0-9]+$/ )){
            $('.filter_0_advanced #error_text_input_username_').css('display', 'inline')
            $('.filter_0_advanced #error_text_input_username_').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('.filter_0_advanced #error_text_input_username_').tooltip()
            return false
          }
          break;
        case 2:
          if($('.filter_0_advanced #date_input_time_span_starts_').val() == ""){
            alert('Please enter date of post')
            $('.filter_0_advanced #error_text_input_time_span_starts_').css('display', 'inline')
            $('.filter_0_advanced #error_text_input_time_span_starts_').attr('data-original-title', 'Please choose date from Datepicker')
            $('.filter_0_advanced #error_text_input_time_span_starts_').tooltip()
            return false;
          }
          break;
          case 3:
          if($('.filter_0_advanced #date_input_time_span_ends_').val() == ""){
            alert('Please enter date of post')
            $('.filter_0_advanced #error_text_input_time_span_ends_').css('display', 'inline')
            $('.filter_0_advanced #error_text_input_time_span_ends_').attr('data-original-title', 'Please choose date from Datepicker')
            $('.filter_0_advanced #error_text_input_time_span_ends_').tooltip()
            return false;
          }
          break;
      }
    }

//    if(location.pathname.match( /admin\/services\/.*/) != null){
//      f();
//    }
//  }
//  if(location.pathname.match( /admin\/services\/.*/) != null){
//    function f(){
//      $("#form1").trigger("submit.rails");
//    }
  })

  


  $(document).off('click', '#send_invitation')
  $(document).on('click', '#send_invitation', function() {
    var today = new Date
    $.ajax({
      url: "/admin/services/send_invitation",
      data: {
        email: $('#service_partner_email').val(),
        password: $('#service_partner_password').val(),
        name: $('#service_partner_first_name').val()
      },
      success: function() {
        alert('invitation sent')
        $('#service_partner_confirmation_sent_at').val(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate())
      }
    })
  })
}
}

$(document).ready(function() {
  $('.filter_1_advanced #text_input_username_').live('keyup', function() {
    var isTrue = false
    if($('.filter_1_advanced #text_input_username_').val().length == 0){
      $('.filter_1_advanced #error_text_input_username_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_username_').attr('data-original-title', 'Please enter first name')
      $('.filter_1_advanced #error_text_input_username_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_username_').hide()
    }
    if(!$('.filter_1_advanced #text_input_username_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('.filter_1_advanced #error_text_input_username_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_username_').attr('data-original-title', 'Special characters not allowed')
      $('.filter_1_advanced #error_text_input_username_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_username_').hide()
    }
  });

  $('.filter_1_advanced #text_input_artistname_').live('keyup', function() {
    var isTrue = false
    if($('.filter_1_advanced #text_input_artistname_').val().length == 0){
      $('.filter_1_advanced #error_text_input_artistname_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_artistname_').attr('data-original-title', 'Please enter artist name')
      $('.filter_1_advanced #error_text_input_artistname_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_artistname_').hide()
    }
    if(!$('.filter_1_advanced #text_input_artistname_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('.filter_1_advanced #error_text_input_artistname_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_artistname_').attr('data-original-title', 'Special characters not allowed')
      $('.filter_1_advanced #error_text_input_artistname_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_artistname_').hide()
    }
  });

  $('.filter_1_advanced #text_input_description_').live('keyup', function() {
    var isTrue = false
    if($('.filter_1_advanced #text_input_description_').val().length == 0){
      $('.filter_1_advanced #error_text_input_description_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_description_').attr('data-original-title', 'Please enter description')
      $('.filter_1_advanced #error_text_input_description_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_description_').hide()
    }
    if(!$('.filter_1_advanced #text_input_description_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('.filter_1_advanced #error_text_input_description_').css('display', 'inline')
      $('.filter_1_advanced #error_text_input_description_').attr('data-original-title', 'Special characters not allowed')
      $('.filter_1_advanced #error_text_input_description_').tooltip()
      return false
    }
    else{
      $('.filter_1_advanced #error_text_input_description_').hide()
    }
  });


  $('.filter_1_advanced #date_input_time_span_starts_').live('keyup', function() {
    $('.filter_1_advanced #error_text_input_time_span_starts_').css('display', 'inline')
    $('.filter_1_advanced #error_text_input_time_span_starts_').attr('data-original-title', 'Please choose date from the Datepicker')
    $('.filter_1_advanced #error_text_input_time_span_starts_').tooltip()
  });

  $('.filter_1_advanced #date_input_time_span_ends_').live('keyup', function() {
    $('.filter_1_advanced #error_text_input_time_span_ends_').css('display', 'inline')
    $('.filter_1_advanced #error_text_input_time_span_ends_').attr('data-original-title', 'Please choose date from the Datepicker')
    $('.filter_1_advanced #error_text_input_time_span_ends_').tooltip()
  }); 
})

if(location.pathname == '/admin/admin') {
  $(document).on('click', '#report_advanced_search_btn', function(){
    for(var i=1; i<=5; i++){
      switch(i){
        case 1:
          if($('.filter_1_advanced #text_input_username_').val().length == 0){
            alert('Please enter user name')
            $('.filter_1_advanced #error_text_input_username_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_username_').attr('data-original-title', 'Please enter user name')
            $('.filter_1_advanced #error_text_input_username_').tooltip()
            return false
          }
          else if(!$('.filter_1_advanced #text_input_username_').val().match( /^[A-Za-z .0-9]+$/ )){
            $('.filter_1_advanced #error_text_input_username_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_username_').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('.filter_1_advanced #error_text_input_username_').tooltip()
            return false
          }
          break;
        case 2:
          if($('.filter_1_advanced #text_input_artistname_').val().length == 0){
            alert('Please enter artist name')
            $('.filter_1_advanced #error_text_input_artistname_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_artistname_').attr('data-original-title', 'Please enter artist name')
            $('.filter_1_advanced #error_text_input_artistname_').tooltip()
            return false
          }
          else if(!$('.filter_1_advanced #text_input_artistname_').val().match( /^[A-Za-z .0-9]+$/ )){
            $('.filter_1_advanced #error_text_input_artistname_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_artistname_').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('.filter_1_advanced #error_text_input_artistname_').tooltip()
            return false
          }
          break;
        case 3:
          if($('.filter_1_advanced #text_input_description_').val().length == 0){
            alert('Please enter description')
            $('.filter_1_advanced #error_text_input_description_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_description_').attr('data-original-title', 'Please enter description')
            $('.filter_1_advanced #error_text_input_description_').tooltip()
            return false
          }
          else if(!$('.filter_1_advanced @error_text_input_description_').val().match( /^[A-Za-z .0-9]+$/ )){
            $('.filter_1_advanced #error_text_input_description_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_description_').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('.filter_1_advanced #error_text_input_description_').tooltip()
            return false
          }
        case 4:
          if($('.filter_1_advanced #date_input_time_span_starts_').val() == ""){
            alert('Please enter date of post')
            $('.filter_1_advanced #error_text_input_time_span_starts_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_time_span_starts_').attr('data-original-title', 'Please choose date from Datepicker')
            $('.filter_1_advanced #error_text_input_time_span_starts_').tooltip()
            return false;
          }
          break;
          case 5:
          if($('.filter_1_advanced #date_input_time_span_ends_').val() == ""){
            alert('Please enter date of post')
            $('.filter_1_advanced #error_text_input_time_span_ends_').css('display', 'inline')
            $('.filter_1_advanced #error_text_input_time_span_ends_').attr('data-original-title', 'Please choose date from Datepicker')
            $('.filter_1_advanced #error_text_input_time_span_ends_').tooltip()
            return false;
          }
          break;
      }
    }
  })
}
