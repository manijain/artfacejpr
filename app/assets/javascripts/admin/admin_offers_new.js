if (location.pathname.substr(0,13) == "/admin/offers") {
  var admin_option_array_0 = new Array();
  var admin_option_array_1 = new Array();
  

  var admin_theValue_1, admin_theValue_2
  var admin_current_value_0, admin_current_value_1
  var admin_status_1, admin_status_2
  var admin_search_advanced_id_1, admin_search_advanced_id_2
  function toggle_search_0() {
    $(".filter_0_basic, .filter_0_advanced").toggle()
  }
  function toggle_search_1() {
    $(".filter_1_basic, .filter_1_advanced").toggle()
  }
}


$(function() {
  

  if (location.pathname.substr(0,13) == "/admin/offers") {
    //make all pagination links ajaxified
    $(".pagination").css("top","-65px")
  }




  if (location.pathname.substr(0,13) == "/admin/offers") {
    filter_single_string_0 = $(".filter_0_advanced ul").html()
    filter_single_string_1 = $(".filter_1_advanced ul").html()
    
    current_id_0 = 1
    current_id_1 = 1
   
    option_array_total_0 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    option_array_total_1 = [1,2,3,4,5,6]
    
   

    $(document).on('click','img.admin_search_toggle_0',function() {
      console.log("plus click");
      toggle_search_0()
     // $("#offer_search_advanced").attr('value', true)
      if (kill_white_space($(".filter_0_advanced ul li span#span_1").html()) == "") {
        $(".filter_0_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.admin_search_toggle_1',function() {
      toggle_search_1()
      //$("#artist_search_artist_advanced").attr('value', true)
      if (kill_white_space($(".filter_1_advanced ul li span#span_1").html()) == "") {
        $(".filter_1_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })



    $(document).on('click',"img.admin_add_search_field_0", function() {

      if(admin_option_array_0.length == 16) {
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
      if(admin_option_array_1.length == 5) {
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




    $(document).on('click', "img.admin_remove_search_field_0", function() {

      if ($(".filter_0_advanced ul").children().length == 1) {
        toggle_search_0();
        //$("#offer_search_advanced").attr('value', false)
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
        //$("#artist_search_artist_advanced").attr('value', false)
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




    $(document).on('click', ".filter_0_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_0 = $(this).attr('value');
    })
    $(document).on('click', ".filter_1_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_1 = $(this).attr('value');
    })


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


  }



})








if (location.pathname.substr(0,13) == "/admin/offers") {

  $(document).on('click', "#offer_basic_search_btn", function() {
    $("#offers_per_page_select").val("24");
    $("#buy_interesting_offers_select").val("artist name"); 
    $("#show_active_offers_select").val("All");
    $("#layout_select").val("small preview");
    $("#offer_search_advanced").attr('value', false)
    
    //$("#payment_basic_search").attr('value','true');
    //$("#payment_advanced_search").attr('value','false');
  });

  $(document).on('click', "#offer_advanced_search_btn", function() {
    $("#offers_per_page_select").val("24");
    $("#buy_interesting_offers_select").val("artist name");
    $("#show_active_offers_select").val("All");
    $("#layout_select").val("small preview");
    $("#offer_search_advanced").attr('value', true)
    //$("#payment_advanced_search").attr('value','true');
    //$("#payment_basic_search").attr('value','false');
  });

  $(document).on('click', "#artist_basic_search_btn", function() {
    $("#artists_per_page_select").val("12");
    $("#artist_names_select").val("First Name"); 
    $("#first_published_select").val("All");
    $("#artist_search_artist_advanced").attr('value', false)
    $('#cancel_delete_artist').css('display','none')
    //$("#report_basic_search").attr('value','true');
    //$("#report_advanced_search").attr('value','false');
  });

  $(document).on('click', "#artist_advanced_search_btn", function() {
    $("#artists_per_page_select").val("12");
    $("#artist_names_select").val("First Name");
    $("#first_published_select").val("All");
    $("#artist_search_artist_advanced").attr('value', true)
    $('#cancel_delete_artist').css('display','none')
    //$("#report_advanced_search").attr('value','true');
    //$("#report_basic_search").attr('value','false');
  });


}

 



  

if(location.pathname.substr(0,13) == "/admin/offers"){

  $(function() { 
    $(document).on('click',".span10interesting_offers_first_div ul div.pagination a", function() {
    //$('.span10interesting_offers_first_div ul div.pagination a').live('click',function(e) {
      //e.preventDefault();
      $.ajax({
        url: this.href,
        beforeSend: function() {
              console.log("admin/offers + offers + before search data")
          },
        dataType: 'script',
        data: {
          'offer[search_advanced]': $("#offer_search_advanced").attr('value'),
          choice: 6
        }
      });
      return false;
    });
    });

    $(".span10interesting_offers_first_div ul div.pagination a").each(function() {
       $(this).attr("data-remote","true")
     })


    $(document).on('change',"#buy_interesting_offers_select, #show_active_offers_select", function() {
        $.ajax({
          url: "/admin/offers/search",
          beforeSend: function() {
          //  $("#ajax-loader-big-for-interesting-offers").show()
          //  $('#overlay_div_for_interesting_offers').show()
          },
          data: {
            buy_interesting_offers_sort_by: $("#buy_interesting_offers_select option:selected").index(),
            show_active_offers_select: $("#show_active_offers_select option:selected").index(),
            offers_per_page_select: $("#offers_per_page_select option:selected").val(),
            'offer[search_advanced]': $("#offer_search_advanced").attr('value'),
            choice: 6
          },
          success: function() {
            $("#layout_select").val("small preview")
          }
        })

      })


    

    $(document).on('change',"#offers_per_page_select", function() {
      $.ajax({
        url: "/admin/offers/search",
        beforeSend: function() {
        //  $("#ajax-loader-big-for-interesting-offers").show()
        //  $('#overlay_div_for_interesting_offers').show()
        },
        data: {
          buy_interesting_offers_sort_by: $("#buy_interesting_offers_select option:selected").index(),
          show_active_offers_select: $("#show_active_offers_select option:selected").index(),
          offers_per_page_select: $("#offers_per_page_select option:selected").val(),
          'offer[search_advanced]': $("#offer_search_advanced").attr('value'),
          choice: 6
        },
        success: function() {
          $("#layout_select").val("small preview")
        //  $('#overlay_div_for_interesting_offers').hide()
        //  $("#ajax-loader-big-for-interesting-offers").hide()
        },
        //$.get(url,
        //  'offers_per_page_select=' + $("#offers_per_page_select option:selected").val() + '&buy_interesting_offers_sort_by=' + $("#buy_interesting_offers_select option:selected").index() + '&offer[search_advanced]='+$("#offer_search_advanced").attr('value') + '&show_active_offers_select=' + $("#show_active_offers_select option:selected").index() + '&choice=6',
        //  '',
        //  'script');
      })
    })


    $(document).on('change', '.span10interesting_offers select#layout_select', function() {
        temp_var = $(".span10interesting_offers select#layout_select option:selected").index()

        switch(temp_var) {
          case 0:
            $(".span10interesting_offers div.search_data_outer_div ul li").addClass("small_preview").removeClass("medium_preview").removeClass("large_preview")
            break;
          case 1:
            $(".span10interesting_offers div.search_data_outer_div ul li").removeClass("small_preview").addClass("medium_preview").removeClass("large_preview")
            break;
          case 2:
            $(".span10interesting_offers div.search_data_outer_div ul li").removeClass("small_preview").removeClass("medium_preview").addClass("large_preview")
            break;
        }
      })


    $(document).on('click', '#delete_offer', function() {
        $("div.span10interesting_offers_first_div ul li span i").each(function() {
          $(this).css("display","block");
        })

        $("#delete_offer").css("display","none")
        $("#cancel_delete_offer").css("display","block");
      })

    $(document).on('click', '#cancel_delete_offer', function() {
        $("div.span10interesting_offers_first_div ul li span i").each(function() {
          $(this).css("display","none");
        })

        $("#cancel_delete_offer").css("display","none")
        $("#delete_offer").css("display","block");
      })


    $(document).on('click', "i[id^=remove_offer_]", function() {
        element = $(this)
        $.ajax({
          url: "/admin/offers/delete_offer",
          data: {
            offer_id: element.attr('id').split('_').pop(),
            choice: 2
          },
          success: function(text) {
            element.parent().fadeOut(2000)
            setTimeout('element.parent().parent().remove()',2000)
            if( text == "true") { alert("Offer deleted successfully")}
            //setTimeout("location.reload()",1000)
          }
        })
      })





    $(function() {
      $('.span10artist_names_first_div div.pagination a').live('click',function(e) {
        //e.preventDefault();
        $.ajax({
          url: this.href,
          beforeSend: function() {
                console.log("admin/artist + artist + before search data")
            },
          dataType: 'script',
          data: {
            choice: 2,
            'artist[search_artist_advanced]': $("#artist_search_artist_advanced").attr("value")
          },
          success: function() {
            $("#cancel_delete_artist").css("display","none")
            $("#delete_artist").css("display","block");
            artist_functions();
            //  $('#overlay_div_for_interesting_offers').hide()
            //  $("#ajax-loader-big-for-interesting-offers").hide()
          }
        });
        return false;
      });
    });

    $(".span10artist_names_first_div div.pagination a").each(function() {
       $(this).attr("data-remote","true")
    })

    $(document).on('change',"#artist_names_select", function() {
      $.ajax({
        url: "/admin/artists/search",
        beforeSend: function() {
        //  $("#ajax-loader-big-for-interesting-offers").show()
        //  $('#overlay_div_for_interesting_offers').show()
        },
        data: {
          artist_names_select_sortby: $("#artist_names_select option:selected").index(),
          first_published_select_sortby: $("#first_published_select option:selected").index(),
          artists_per_page_select: $("#artists_per_page_select option:selected").val(),
          'artist[search_artist_advanced]': $("#artist_search_artist_advanced").attr("value"),
          choice: 2
        },
        success: function() {
          $("#cancel_delete_artist").css("display","none")
          $("#delete_artist").css("display","block");
          artist_functions();
        //  $('#overlay_div_for_interesting_offers').hide()
        //  $("#ajax-loader-big-for-interesting-offers").hide()
        }
      })

    })


    $(document).on('change',"#first_published_select", function() {
      $.ajax({
        url: "/admin/artists/search",
        beforeSend: function() {
        //  $("#ajax-loader-big-for-interesting-offers").show()
        //  $('#overlay_div_for_interesting_offers').show()
        },
        data: {
          artist_names_select_sortby: $("#artist_names_select option:selected").index(),
          first_published_select_sortby: $("#first_published_select option:selected").index(),
          artists_per_page_select: $("#artists_per_page_select option:selected").val(),
          'artist[search_artist_advanced]': $("#artist_search_artist_advanced").attr("value"),
          choice: 2
        },
        success: function() {
          $("#cancel_delete_artist").css("display","none")
          $("#delete_artist").css("display","block");
          artist_functions();
        //  $('#overlay_div_for_interesting_offers').hide()
        //  $("#ajax-loader-big-for-interesting-offers").hide()
        }
      })
    })

    $(document).on('change',"#artists_per_page_select", function() {
      $.ajax({
        url: "/admin/artists/search",
        beforeSend: function() {
        //  $("#ajax-loader-big-for-interesting-offers").show()
        //  $('#overlay_div_for_interesting_offers').show()
        },
        data: {
          artist_names_select_sortby: $("#artist_names_select option:selected").index(),
          first_published_select_sortby: $("#first_published_select option:selected").index(),
          artists_per_page_select: $("#artists_per_page_select option:selected").val(),
          'artist[search_artist_advanced]': $("#artist_search_artist_advanced").attr("value"),
          choice: 2
        },
        success: function() {
          $("#cancel_delete_artist").css("display","none")
          $("#delete_artist").css("display","block");
          artist_functions();
        //  $('#overlay_div_for_interesting_offers').hide()
        //  $("#ajax-loader-big-for-interesting-offers").hide()
        }
      })
    })


    $(document).on('click', '#delete_artist', function() {
      $("div.span10artist_names_first_div ul li span i").each(function() {
        $(this).css("display","block");
      })

      $("#delete_artist").css("display","none")
      $("#cancel_delete_artist").css("display","block");
    })

    $(document).on('click', '#cancel_delete_artist', function() {
      $("div.span10artist_names_first_div ul li span i").each(function() {
        $(this).css("display","none");
      })

      $("#cancel_delete_artist").css("display","none")
      $("#delete_artist").css("display","block");
    })


    $(document).on('click', "i[id^=remove_artist_]", function() {
      element = $(this)
      $.ajax({
        url: "/admin/offers/delete_artist",
        data: {
          artist_id: element.attr('id').split('_').pop(),
          choice: 2
        },
        success: function(text) {
          element.parent().fadeOut(2000)
          setTimeout('element.parent().parent().remove()',2000)
          if(text == "true") {
            alert("Artist deleted successfully")
          }
        }
      })
    })


    
    


}

function artist_functions() {
  artist_count = $("#artist_count").val();
  artist_per_page    = $("#artists_per_page_select").val();
  artist_number_of_pages = parseInt(parseInt(artist_count)/parseInt(artist_per_page))
  //console.log("artist_count="+ $("#artist_count").val())
  
  if(parseInt($("#artist_count").val()) < parseInt($("#artists_per_page_select").val())) {
  //console.log("111111")
  $('.artist_text_page').css('display','none')
  }
  
  if (artist_number_of_pages < 1) {
  //console.log("2222222")
  $('.artist_text_page').css('display','none')
  }
  
  if (parseInt($("#artist_count").val()) == 0){
  //console.log("333333333")
  $('.artist_text_page, #delete_artist').css('display','none')
  }
  else{
  //console.log("44444444")
  $('#delete_artist').css('display','block')
  $('#cancel_delete_artist').css('display','none')

  }
}


function offer_functions() {
  offer_count = $("#offer_count").val();
  offer_per_page    = $("#offers_per_page_select").val();
  offer_number_of_pages = parseInt(parseInt(offer_count)/parseInt(offer_per_page))

  if(parseInt(offer_count) < parseInt(offer_per_page)) {
  $('.offer_text_page').css('display','none')
  }
  if (offer_number_of_pages < 1) {
  $('.offer_text_page').css('display','none')
  }
  if (parseInt(offer_count) == 0){
  $('.offer_text_page, #delete_offer').css('display','none')
  }
  else{
  $('#delete_offer').css('display','block')
  }
}

function painter_function() {
  painter_count = $("#painters_count").val();
  painter_per_page = $("#items_per_page_select").val();
  painter_number_of_pages = parseInt(parseInt(painter_count)/parseInt(painter_per_page))

  if(parseInt(painter_count) < parseInt(painter_per_page)) {
    $('.painters_text_page').css('display','none')
  }
  if (painter_number_of_pages < 1) {
    $('.painters_text_page').css('display','none')
  }
  if (parseInt(painter_count) == 0){
    $('.painters_text_page').css('display','none')
  }
}



if(location.pathname.substr(0,13) == "/admin/offers") {
    $(document).on('click' , "#offer_basic_search_btn" , function() {
      
    })    


    $(document).on('click' , "#offer_advanced_search_btn" , function() {
      //console.log("offer_option_array = "+option_array)
      for (var i = admin_option_array_0.length - 1; i >= 0; i--) {
        switch(admin_option_array_0[i]) {
          case 1:
            if($("#text_input_artist_").val()  == ""){
              alert("Please enter the Artist Name")
              $("#error_text_input_artist_").css("display","inline")
              $("#error_text_input_artist_").attr("data-original-title", "Please enter the artist name.")
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
              return false;
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
              return false
            }
            break;
          case 4:
            if($("#text_input_year_of_creation_").val() == "") {
              alert("Please enter the year of creation")
              $("#error_text_input_year_of_creation_").css("display","inline")
              $("#error_text_input_year_of_creation_").attr("data-original-title","Please enter the year of creation.")
              $("#error_text_input_year_of_creation_").tooltip()
              return false  
            } else if (!$("#text_input_year_of_creation_").val().match(/^[.,0-9]+$/)) {
              $("#error_text_input_year_of_creation_").css("display","inline")
              $("#error_text_input_year_of_creation_").attr("data-original-title","Allowed characters: [.,0-9] ")
              $("#error_text_input_year_of_creation_").tooltip()
              return false
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
              return false
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


if(location.pathname.substr(0,13) == "/admin/offers") {
  //$(document).on('click' , "#artist_basic_search_btn" , function() {
  //    if($(".basic_search_term:eq(1)").val()  == "") {
  //      alert("Please enter the search term.")
  //      return false
  //    }
  //  }) 




  $(document).on('click' , "#artist_advanced_search_btn" , function() {
    //console.log("artist_option_array = "+artist_option_array)
    for (var i = admin_option_array_1.length - 1; i >= 0; i--) {
      switch(admin_option_array_1[i]) {
        case 1:
          if($("#text_input_artist_name_").val()  == ""){
            alert("Please enter the Artist Name")
            $("#error_text_input_artist_name_").css("display","inline")
            $("#error_text_input_artist_name_").attr("data-original-title", "Please enter the artist name")
            $("#error_text_input_artist_name_").tooltip()
            return false              
          } else if(!$("#text_input_artist_name_").val().match( /^[A-Za-z .0-9]+$/ )) {
            $("#error_text_input_artist_name_").css("display","inline")
            $("#error_text_input_artist_name_").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
            $("#error_text_input_artist_name_").tooltip()
            return false;
          }
          break;
        case 5:
          if($("#text_input_description_artist_").val() == "") {
            alert("Please enter the Description")
            $("#error_text_input_description_artist_").css("display","inline")
            $("#error_text_input_description_artist_").attr("data-original-title","Please enter the description.")
            $("#error_text_input_description_artist_").tooltip()
            return false
          } else if (!$("#text_input_description_artist_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
            $("#error_text_input_description_artist_").css("display","inline")
            $("#error_text_input_description_artist_").attr("data-original-title","Allowed characters: A-Z .0-9 ?!-")
            $("#error_text_input_description_artist_").tooltip()
            return false
          }
          break;
        case 3:
          if($("#date_input_date_of_birth_").val() == ""){
            alert("Please select the date of birth")
            $("#error_text_input_date_of_birth_").css("display","inline")
            $("#error_text_input_date_of_birth_").attr("data-original-title","Please select the date from datepicker")
            $('#error_text_input_date_of_birth_').tooltip()
            return false
          }
          break;
        case 4:
          if($("#date_input_date_of_death_").val() == ""){
            alert("Please select the date of death")
            $("#error_text_input_date_of_death_").css("display","inline")
            $("#error_text_input_date_of_death_").attr("data-original-title","Please select the date from datepicker")
            $('#error_text_input_date_of_death_').tooltip()
            return false
          }
          break;
      }
    }
  })

}







  

$(document).ready(function() {
  $('#text_input_artist_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_artist_').val().length == 0){
      $('#error_text_input_artist_').css('display', 'inline')
      $('#error_text_input_artist_').attr('data-original-title', 'Please enter artist name')
      $('#error_text_input_artist_').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist_').hide()
    }
    if(!$('#text_input_artist_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_text_input_artist_').css('display', 'inline')
      $('#error_text_input_artist_').attr('data-original-title', 'Allowed characters: A-Z .0-9 ')
      $('#error_text_input_artist_').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist_').hide()
    }
  });

  $('#text_input_title_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_title_').val().length == 0){
      $('#error_text_input_title_').css('display', 'inline')
      $('#error_text_input_title_').attr('data-original-title', 'Please enter the title')
      $('#error_text_input_title_').tooltip()
      return false
    }
    else{
      $('#error_text_input_title_').hide()
    }
    if(!$('#text_input_title_').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
      $('#error_text_input_title_').css('display', 'inline')
      $('#error_text_input_title_').attr('data-original-title', 'Allowed characters: A-Z .0-9 ?!-')
      $('#error_text_input_title_').tooltip()
      return false
    }
    else{
      $('#error_text_input_title_').hide()
    }
  });

  $('#text_input_description_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_description_').val().length == 0){
      $('#error_text_input_description_').css('display', 'inline')
      $('#error_text_input_description_').attr('data-original-title', 'Please enter the description.')
      $('#error_text_input_description_').tooltip()
      return false
    }
    else{
      $('#error_text_input_description_').hide()
    }
    if(!$('#text_input_description_').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
      $('#error_text_input_description_').css('display', 'inline')
      $('#error_text_input_description_').attr('data-original-title', 'Allowed characters: A-Z .0-9 ?!-')
      $('#error_text_input_description_').tooltip()
      return false
    }
    else{
      $('#error_text_input_description_').hide()
    }
  });

  $('#text_input_year_of_creation_').live('keyup', function(){
    var isTrue = false
    if($('#text_input_year_of_creation_').val().length == 0){
      $('#error_text_input_year_of_creation_').css('display', 'inline')
      $('#error_text_input_year_of_creation_').attr('data-original-title', 'Please enter the year of creation.')
      $('#error_text_input_year_of_creation_').tooltip()
      return false
    }
    else{
      $('#error_text_input_year_of_creation_').hide()
    }
    if(!$('#text_input_year_of_creation_').val().match( /^[.,0-9]+$/ )){
      $('#error_text_input_year_of_creation_').css('display', 'inline')
      $('#error_text_input_year_of_creation_').attr('data-original-title', 'Allowed characters: [.,0-9] ')
      $('#error_text_input_year_of_creation_').tooltip()
      return false
    }
    else{
      $('#error_text_input_year_of_creation_').hide()
    }
  });

  $('#text_input_movement_period_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_movement_period_').val().length == 0){
      $('#error_text_input_movement_period_').css('display', 'inline')
      $('#error_text_input_movement_period_').attr('data-original-title', 'Please enter the movement/period.')
      $('#error_text_input_movement_period_').tooltip()
      return false
    }
    else{
      $('#error_text_input_movement_period_').hide()
    }
  });

  $('#text_input_height_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_height_').val().length == 0) {
      $('#error_text_input_height_').css('display', 'inline')
      $('#error_text_input_height_').attr('data-original-title', 'Please enter the height.')
      $('#error_text_input_height_').tooltip()
      return false
    }
    else{
      $('#error_text_input_height_').hide()
    }
    if(!$('#text_input_height_').val().match( /^[,.0-9]+$/ )){
      $('#error_text_input_height_').css('display', 'inline')
      $('#error_text_input_height_').attr('data-original-title', 'Characters Allowed: 0-9')
      $('#error_text_input_height_').tooltip()
      return false
    }
    else{
      $('#error_text_input_height_').hide()
    }
  });

  $('#text_input_width_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_width_').val().length == 0) {
      $('#error_text_input_width_').css('display', 'inline')
      $('#error_text_input_width_').attr('data-original-title', 'Please enter the height.')
      $('#error_text_input_width_').tooltip()
      return false
    }
    else{
      $('#error_text_input_width_').hide()
    }
    if(!$('#text_input_width_').val().match( /^[,.0-9]+$/ )){
      $('#error_text_input_width_').css('display', 'inline')
      $('#error_text_input_width_').attr('data-original-title', 'Characters Allowed: 0-9')
      $('#error_text_input_width_').tooltip()
      return false
    }
    else{
      $('#error_text_input_width_').hide()
    }
  });

  $('#text_input_depth_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_depth_').val().length == 0){
      $('#error_text_input_depth_').css('display', 'inline')
      $('#error_text_input_depth_').attr('data-original-title', 'Please enter the height.')
      $('#error_text_input_depth_').tooltip()
      return false
    }
    else{
      $('#error_text_input_depth_').hide()
    }
    if(!$('#text_input_depth_').val().match( /^[,.0-9]+$/ )){
      $('#error_text_input_depth_').css('display', 'inline')
      $('#error_text_input_depth_').attr('data-original-title', 'Characters Allowed: 0-9')
      $('#error_text_input_depth_').tooltip()
      return false
    }
    else{
      $('#error_text_input_depth_').hide()
    }
  });

  $('#date_input_submit_date_').live('keyup', function() {
    var isTrue = false
    if($('#date_input_submit_date_').val().length == 0){
      $('#error_text_input_submit_date_').css('display', 'inline')
      $('#error_text_input_submit_date_').attr('data-original-title', 'Please select the date from datepicker')
      $('#error_text_input_submit_date_').tooltip()
      return false
    }
    else{
      $('#error_text_input_submit_date_').hide()
    }
  });

  $('#date_input_offer_end_date_').live('keyup', function() {
    var isTrue = false
    if($('#date_input_offer_end_date_').val().length == 0){
      $('#error_text_input_offer_end_date_').css('display', 'inline')
      $('#error_text_input_offer_end_date_').attr('data-original-title', 'Please select the date from datepicker')
      $('#error_text_input_offer_end_date_').tooltip()
      return false
    }
    else{
      $('#error_text_input_offer_end_date_').hide()
    }
  })


  $('#text_input_artist_name_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_artist_name_').val().length == 0){
      $('#error_text_input_artist_name_').css('display', 'inline')
      $('#error_text_input_artist_name_').attr('data-original-title', 'Please enter artist name')
      $('#error_text_input_artist_name_').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist_name_').hide()
    }
    if(!$('#text_input_artist_name_').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_text_input_artist_name_').css('display', 'inline')
      $('#error_text_input_artist_name_').attr('data-original-title', 'Allowed characters: A-Z .0-9 ')
      $('#error_text_input_artist_name_').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist_name_').hide()
    }
  });

  $('#text_input_description_artist_').live('keyup', function() {
    var isTrue = false
    if($('#text_input_description_artist_').val().length == 0){
      $('#error_text_input_description_artist_').css('display', 'inline')
      $('#error_text_input_description_artist_').attr('data-original-title', 'Please enter the description.')
      $('#error_text_input_description_artist_').tooltip()
      return false
    }
    else{
      $('#error_text_input_description_artist_').hide()
    }
    if(!$('#text_input_description_artist_').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
      $('#error_text_input_description_artist_').css('display', 'inline')
      $('#error_text_input_description_artist_').attr('data-original-title', 'Allowed characters: A-Z .0-9 ?!-')
      $('#error_text_input_description_artist_').tooltip()
      return false
    }
    else{
      $('#error_text_input_description_artist_').hide()
    }
  });

  $('#date_input_date_of_birth_').live('keyup', function() {
    var isTrue = false
    if($('#date_input_date_of_birth_').val().length == 0){
      $('#error_text_input_date_of_birth_').css('display', 'inline')
      $('#error_text_input_date_of_birth_').attr('data-original-title', 'Please select the date from datepicker.')
      $('#error_text_input_date_of_birth_').tooltip()
      return false
    }
    else{
      $('#error_text_input_date_of_birth_').hide()
    }
  });

  $('#date_input_date_of_death_').live('keyup', function() {
    var isTrue = false
    if($('#date_input_date_of_death_').val().length == 0){
      $('#error_text_input_date_of_death_').css('display', 'inline')
      $('#error_text_input_date_of_death_').attr('data-original-title', 'Please select the date from datepicker.')
      $('#error_text_input_date_of_death_').tooltip()
      return false
    }
    else{
      $('#error_text_input_date_of_death_').hide()
    }
  });

})



//Demanded Paretners JS

$(function() {
  $('div.span10demanded_painters_first_div div.pagination a').live('click',function() {
  //$(document).on('click',"div.span10demanded_painters_first_div ul div.pagination a", function() {
    //e.preventDefault();
    $.ajax({
      url: this.href,
      beforeSend: function() {
            console.log("admin/offers and admin/all search + painters + after/before search data")
        },
      dataType: 'script',
      data: {
        choice: 3
      }
    });
    return false;
  });
  });
  
  $(".span10artist_names_first_div div.pagination a").each(function() {
    $(this).attr("data-remote","true")
  })
  

  $(document).on('change',"#select_period, #select_demanded_artist_sort_by, #items_per_page_select", function() {
      $.ajax({
        url: "/admin/offers",
        beforeSend: function() {
          //$("#ajax-loader-big-for-interesting-offers").show()
          //$('#overlay_div_for_interesting_offers').show()
        },
        data: {
          demanded_artist_sort_by: $("#select_demanded_artist_sort_by option:selected").index(),
          period: $("#select_period option:selected").index(),
          painters_per_page: $("#items_per_page_select option:selected").val(),
          choice: 3
        },
        success: function() {
          painter_function()
          //$('#overlay_div_for_interesting_offers').hide()
          //$("#ajax-loader-big-for-interesting-offers").hide()
        }
      })

    })
