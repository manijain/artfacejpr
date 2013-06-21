if (location.pathname == "/dashboard/service/home" || location.pathname == "/dashboard/service/home/") {
  var option_array_0 = new Array();
  var option_array_1 = new Array();
  var option_array_2 = new Array();
  var option_array_3 = new Array();

  var theValue_1, theValue_2, theValue_3, theValue_4
  var current_value_0, current_value_1, current_value_2, current_value_3
  var status_1, status_2, status_3, status_4
  var search_advanced_id_1, search_advanced_id_2, search_advanced_id_3,  search_advanced_id_4
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
  

  if (location.pathname == "/dashboard/service/home" || location.pathname == "/dashboard/service/home/") {
    //make all pagination links ajaxified
    $(".pagination").css("top","-65px")
  }




  if (location.pathname == "/dashboard/service/home" || location.pathname == "/dashboard/service/home/") {
    filter_single_string_0 = $(".filter_0_advanced ul").html()
    filter_single_string_1 = $(".filter_1_advanced ul").html()
    filter_single_string_2 = $(".filter_2_advanced ul").html()
    filter_single_string_3 = $(".filter_3_advanced ul").html()
    current_id_0 = 1
    current_id_1 = 1
    current_id_2 = 1
    current_id_3 = 1
    option_array_total_0 = [1,2,3]
    option_array_total_1 = [1,2,3,4]
    option_array_total_2 = [1,2,3]
    option_array_total_3 = [1,2,3]
    $(document).on('click','img.search_toggle_0',function() {
      toggle_search_0()
      if (kill_white_space($(".filter_0_advanced ul li span#span_1").html()) == "") {
        $(".filter_0_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.search_toggle_1',function() {
      toggle_search_1()
      if (kill_white_space($(".filter_1_advanced ul li span#span_1").html()) == "") {
        $(".filter_1_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.search_toggle_2',function() {
      toggle_search_2()
      if (kill_white_space($(".filter_2_advanced ul li span#span_1").html()) == "") {
        $(".filter_2_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.search_toggle_3',function() {
      toggle_search_3()
      if (kill_white_space($(".filter_3_advanced ul li span#span_1").html()) == "") {
        $(".filter_3_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })


    $(document).on('click',"img.add_search_field_0", function() {
      if(option_array_0.length == 3) {
        alert("All filters added")
        return
      }
      $(".filter_0_advanced ul").append(filter_single_string_0);
      $(".filter_0_advanced ul").children().last().each(function() {
        current_id_0 = current_id_0 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_0)
        $(this).children().first().next().attr("id","span_" + current_id_0)
      })
      select_new_field = _.first(_.difference(option_array_total_0,option_array_0))
      $(".filter_0_advanced ul li select#advanced_select_" + current_id_0).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= option_array_0.length; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_0, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })
    $(document).on('click',"img.add_search_field_1", function() {
      if(option_array_1.length == 4) {
        alert("All filters added")
        return
      }
      $(".filter_1_advanced ul").append(filter_single_string_1);
      $(".filter_1_advanced ul").children().last().each(function() {
        current_id_1 = current_id_1 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_1)
        $(this).children().first().next().attr("id","span_" + current_id_1)
      })
      select_new_field = _.first(_.difference(option_array_total_1,option_array_1))
      $(".filter_1_advanced ul li select#advanced_select_" + current_id_1).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= option_array_1.length; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_1, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })

    $(document).on('click',"img.add_search_field_2", function() {
      if(option_array_2.length == 3) {
        alert("All filters added")
        return
      }
      $(".filter_2_advanced ul").append(filter_single_string_2);
      $(".filter_2_advanced ul").children().last().each(function() {
        current_id_2 = current_id_2 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_2)
        $(this).children().first().next().attr("id","span_" + current_id_2)
      })
      select_new_field = _.first(_.difference(option_array_total_2,option_array_2))
      $(".filter_2_advanced ul li select#advanced_select_" + current_id_2).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= option_array_2.length; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_2, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })

    $(document).on('click',"img.add_search_field_3", function() {
      if(option_array_3.length == 3) {
        alert("All filters added")
        return
      }
      $(".filter_3_advanced ul").append(filter_single_string_3);
      $(".filter_3_advanced ul").children().last().each(function() {
        current_id_3 = current_id_3 + 1
        $(this).children().first().attr("id","advanced_select_" + current_id_3)
        $(this).children().first().next().attr("id","span_" + current_id_3)
      })
      select_new_field = _.first(_.difference(option_array_total_3,option_array_3))
      $(".filter_3_advanced ul li select#advanced_select_" + current_id_3).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= option_array_3.length; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_3, $(this).index())) {
            $(this).css("display","none")
          } else {
            $(this).css("display","block")
          }
        })
      }
    })

    $(document).on('click', "img.remove_search_field_0", function() {
      if ($(".filter_0_advanced ul").children().length == 1) {
        toggle_search_0();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        
        option_array_0 = $.grep(option_array_0, function(value) {
          return value != $(".filter_0_advanced ul #" + remove_value_id + " option:selected").index()
        })
        
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_0; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_0, $(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', "img.remove_search_field_1", function() {
      if ($(".filter_1_advanced ul").children().length == 1) {
        toggle_search_1();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        option_array_1 = $.grep(option_array_1, function(value) {
          return value != $(".filter_1_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_1; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_1,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', "img.remove_search_field_2", function() {
      if ($(".filter_2_advanced ul").children().length == 1) {
        toggle_search_2();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        option_array_2 = $.grep(option_array_2, function(value) {
          return value != $(".filter_2_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_2; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_2,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', "img.remove_search_field_3", function() {
      if ($(".filter_3_advanced ul").children().length == 1) {
        toggle_search_3();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        option_array_3 = $.grep(option_array_3, function(value) {
          return value != $(".filter_3_advanced ul #" + remove_value_id + " option:selected").index()
        })
        $(this).parent().remove()
      }
      for (var i = 1; i <= current_id_3; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_3,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('click', ".filter_0_advanced ul li select[id^=advanced_select_]" ,function() {
      theValue_0 = $(this).attr('value');
    })
    $(document).on('click', ".filter_1_advanced ul li select[id^=advanced_select_]" ,function() {
      theValue_1 = $(this).attr('value');
    })
    $(document).on('click', ".filter_2_advanced ul li select[id^=advanced_select_]" ,function() {
      theValue_2 = $(this).attr('value');
    })
    $(document).on('click', ".filter_3_advanced ul li select[id^=advanced_select_]" ,function() {
      theValue_3 = $(this).attr('value');
    })

    $(document).on('change', ".filter_0_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_0 = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_0         = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_0, option_array_0)!=-1) && option_array_0.length>0){  
        status=false;
        check_option($(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_0 = new Array()
      status = true

      $(".filter_0_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_0_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_0.push(push_data);
        }
      })
      function_text = $(".filter_0_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_0_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_0; i++) {
        $(".filter_0_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_0,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('change', ".filter_1_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_1 = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_1         = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_1, option_array_1)!=-1) && option_array_1.length>0){  
        status=false;
        check_option($(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_1 = new Array()
      status = true

      $(".filter_1_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_1_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_1.push(push_data);
        }
      })
      function_text = $(".filter_1_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_1_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_1; i++) {
        $(".filter_1_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_1,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('change', ".filter_2_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_2 = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_2         = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_2, option_array_2)!=-1) && option_array_2.length>0){  
        status=false;
        check_option($(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_2 = new Array()
      status = true

      $(".filter_2_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_2_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_2.push(push_data);
        }
      })
      function_text = $(".filter_2_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_2_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_2; i++) {
        $(".filter_2_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_2,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })

    $(document).on('change', ".filter_3_advanced ul li select[id^=advanced_select_]", function() {
      var currently_clicked_3 = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").index()
      current_value_3         = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").index() 
      search_advanced_id    = $(this).attr('id')

      if (($.inArray(current_value_3, option_array_3)!=-1) && option_array_3.length>0){  
        status=false;
        check_option($(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      option_array_3 = new Array()
      status = true

      $(".filter_3_advanced ul li select[id^=advanced_select_]").each(function(){  
        if ($(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $(".filter_3_advanced ul li #"+$(this).attr('id') + " option:selected").index()
          option_array_3.push(push_data);
        }
      })
      function_text = $(".filter_3_advanced ul li #" + $(this).attr('id') + " option:selected").attr("data-function")
      a = ".filter_3_advanced ul li #span_" + $(this).attr('id').split('_').pop()
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id_3; i++) {
        $(".filter_3_advanced ul li select#advanced_select_" + i).children().each(function() {
          if (_.contains(option_array_3,$(this).index())) {
            $(this).css("display","none");
          } else {
            $(this).css("display","block");
          }
        })
      }
    })
  }






})