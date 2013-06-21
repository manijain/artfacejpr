
var artist_option_array = new Array(); 
var theValueArtist, artist_current_value, artist_status, artist_search_advanced_id;


function artist_check_option(option_name){ 
  if (artist_status==false){
    $("#"+artist_search_advanced_id).attr('value',theValueArtist)
  }
  return artist_status
}

//add_validation_to_artist_name
function artists_add_validation_to_artist_name() {
  var input_text_artist_name_validation = new LiveValidation("text_input_artist_name_", {
    onValid: function()  {
      if(!$(".manage_artist_search #text_input_artist_name_").val().match( /^[A-Za-z .0-9]+$/)) {
        $(".manage_artist_search #error_text_input_artist_name_").css("display","inline")
        $(".manage_artist_search #error_text_input_artist_name_").attr("data-original-title","Special characters not allowed")
        $('.manage_artist_search #error_text_input_artist_name_').tooltip()
        valid_input_text_artist_name_ = false
      }
      else {
        $('.manage_artist_search #error_text_input_artist_name_').hide()
        valid_input_text_artist_name_ = true
      }
    },
    onInvalid: function(){
      if (key_pressed == 9 && $(".manage_artist_search #text_input_artist_name_").val().length == 0) { 
        $('.manage_artist_search #error_text_input_artist_name_').hide()
      } 
      else {
        $(".manage_artist_search #error_text_input_artist_name_").css("display","inline")
        $(".manage_artist_search #error_text_input_artist_name_").attr("data-original-title","Please enter the artist name.")
        $(".manage_artist_search #error_text_input_artist_name_").tooltip()
        valid_input_text_artist_name_ = false
      }
    }
  });
  input_text_artist_name_validation.add(Validate.Presence);
}

//add_validation_to_description
function artists_add_validation_to_description() {
  var input_text_description_artist_artist_validation = new LiveValidation("text_input_description_artist_", {
    onValid: function()  {
      if(!$(".manage_artist_search #text_input_description_artist_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
        $(".manage_artist_search #error_text_input_description_artist_").css("display","inline")
        $(".manage_artist_search #error_text_input_description_artist_").attr("data-original-title","Special characters not allowed")
        $('.manage_artist_search #error_text_input_description_artist_').tooltip()
        valid_input_text_description_artist_ = false
      }
      else {
        $('.manage_artist_search #error_text_input_description_artist_').hide()
        valid_input_text_description_artist_ = true
      }
    },
    onInvalid: function(){
      if (key_pressed == 9 && $(".manage_artist_search #text_input_description_artist_").val().length == 0) { 
        $('.manage_artist_search #error_text_input_description_artist_').hide()
      } 
      else {
        $(".manage_artist_search #error_text_input_description_artist_").css("display","inline")
        $(".manage_artist_search #error_text_input_description_artist_").attr("data-original-title","Please enter the description.")
        $(".manage_artist_search #error_text_input_description_artist_").tooltip()
        valid_input_text_description_artist_ = false
      }
    }
  });
  input_text_description_artist_artist_validation.add(Validate.Presence);
}

//add_validation_to_date_of_birth
function artists_add_validation_to_date_of_birth() {  
  $(".manage_artist_search #date_input_date_of_birth_").on('keyup',function() {
    $(this).val('')
    $(".manage_artist_search #error_text_input_date_of_birth_").css("display","inline")
    $(".manage_artist_search #error_text_input_date_of_birth_").attr("data-original-title","Please select the date from datepicker")
    $('.manage_artist_search #error_text_input_date_of_birth_').tooltip()
  })
}
//add_validation_to_date_of_birth
function artists_add_validation_to_date_of_death() {  
  $(".manage_artist_search #date_input_date_of_death_").on('keyup',function() {
    $(this).val('')
    $(".manage_artist_search #error_text_input_date_of_death_").css("display","inline")
    $(".manage_artist_search #error_text_input_date_of_death_").attr("data-original-title","Please select the date from datepicker")
    $('.manage_artist_search #error_text_input_date_of_death_').tooltip()
  })
}

artist_option_array_total = [1,2,3,4,5]

var last_search_basic_value
var last_search_params_basic_value
var last_search_advanced_value
var last_search_params_select_value

$(function() {

  if (location.pathname.substr(0,13) == "/admin/offers") {
    //filling option array in case, when its coming from session
 
    

  //if($("#last_search_advanced").val().length > 5) {
  //  if(JSON.parse($("#last_search_advanced").val().replace(':value','"value"').replace('=>',':')).value == true) {
  //    $("select[id^=advanced_select]").each(function(){
  //      artist_option_array.push(  $("#" + $(this).attr('id') + " option:selected").index())
  //    })
  //  }
  //}
  


  /*
   $(document).on('click', '.manage_artist_search .search form input[type=submit]', function() {
      $(".manage_artist_search .search #offer_temp_sort_one").prop('value', $("#offers_public_page_sort_select").val())
      $(".manage_artist_search .search #offer_temp_sort_two").prop('value', $("#offers_public_page_sort_active_inactive").val())
      $(".manage_artist_search .search #offer_temp_sort_three").prop('value', $("#artists_per_page_select").val())
    })
    $(document).on('click', '.manage_artist_search div.search_advanced form input[type=submit]', function() {
      $(".manage_artist_search div.search_advanced #offer_temp_sort_one").prop('value', $("#offers_public_page_sort_select").val())
      $(".manage_artist_search div.search_advanced #offer_temp_sort_two").prop('value', $("#offers_public_page_sort_active_inactive").val())
      $(".manage_artist_search div.search_advanced #offer_temp_sort_three").prop('value', $("#artists_per_page_select").val())
    })
  */

    if ($("#artist_count").val() == "0") {
      $(".nav_sort_bar").hide()
    } else {
      $(".nav_sort_bar").show()
    }
    if(parseInt($("#artist_count").val()) <= parseInt($("#artists_per_page_select").val())) {
      $('#artists_public_page_input_button, #artists_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }

    $(".pagination").children().each(function() {
      $(this).attr("data-remote",true)
    })

    artist_count = $("#artist_count").val();
    per_page    = $("#artists_per_page_select").val();
    number_of_pages = parseInt(parseInt(artist_count)/parseInt(per_page))

    if (number_of_pages < 1) {
      $('#artists_public_page_input_button, #artists_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }

    if ($('#artist_count').val() == 0){
      $('#artists_public_page_input_button, #artists_public_page_input, #text_for_page_number, #text_page').css('display','none')
    }
  }

  if(location.pathname.substr(0,13) == "/admin/offers") {
    $(".manage_artist_search div.search img").click(function() {
      $(".manage_artist_search #artist_search_artist_advanced").attr('value', true)
      $(".manage_artist_search div.search").hide()
      $(".manage_artist_search div.search_advanced").show()
      if ($(".manage_artist_search div.search_advanced div#artist_search_filters span#span_1").html() == '') {
        $(".manage_artist_search div.search_advanced div#artist_search_filters select#advanced_select_1").children().first().next().attr("selected", "true");
        $(".manage_artist_search div.search_advanced div#artist_search_filters select#advanced_select_1").children().first().next().change();
        $(".manage_artist_search div.search_advanced div#artist_search_filters span#span_1 input#text_input_artist_name_").val($("#artist_search_artist_basic").val())
      
        //$(".manage_artist_search .add_search_field").trigger("click")
        //$('.manage_artist_search ul li:eq(0) .remove_search_field').trigger("click")
        //$('.manage_artist_search ul li:eq(1) .remove_search_field').trigger("click")

      }
    })
  }

  $(document).on('click' , ".manage_artist_search #manage_artist_search_submit_button" , function() {
    //console.log("artist_option_array = "+artist_option_array)
    for (var i = artist_option_array.length - 1; i >= 0; i--) {
      switch(artist_option_array[i]) {
        case 1:
          if($(".manage_artist_search #text_input_artist_name_").val()  == ""){
            alert("Please enter the Artist Name")
            $(".manage_artist_search #error_text_input_artist_name_").css("display","inline")
            $(".manage_artist_search #error_text_input_artist_name_").attr("data-original-title", "Please enter the artist name")
            $(".manage_artist_search #error_text_input_artist_name_").tooltip()
            return false              
          } else if(!$(".manage_artist_search #text_input_artist_name_").val().match( /^[A-Za-z .0-9]+$/ )) {
            $(".manage_artist_search #error_text_input_artist_name_").css("display","inline")
            $(".manage_artist_search #error_text_input_artist_name_").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
            $(".manage_artist_search #error_text_input_artist_name_").tooltip()
            return false;
          }
          break;
        case 5:
          if($(".manage_artist_search #text_input_description_artist_").val() == "") {
            alert("Please enter the Description")
            $(".manage_artist_search #error_text_input_description_artist_").css("display","inline")
            $(".manage_artist_search #error_text_input_description_artist_").attr("data-original-title","Please enter the description.")
            $(".manage_artist_search #error_text_input_description_artist_").tooltip()
            return false
          } else if (!$(".manage_artist_search #text_input_description_artist_").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
            $(".manage_artist_search #error_text_input_description_artist_").css("display","inline")
            $(".manage_artist_search #error_text_input_description_artist_").attr("data-original-title","Allowed characters: A-Z .0-9 ?!-")
            $(".manage_artist_search #error_text_input_description_artist_").tooltip()
          }
          break;
        case 3:
          if($(".manage_artist_search #date_input_date_of_birth_").val() == ""){
            alert("Please select the date of birth")
            $(".manage_artist_search #error_text_input_date_of_birth_").css("display","inline")
            $(".manage_artist_search #error_text_input_date_of_birth_").attr("data-original-title","Please select the date from datepicker")
            $('.manage_artist_search #error_text_input_date_of_birth_').tooltip()
            return false
          }
          break;
        case 4:
          if($(".manage_artist_search #date_input_date_of_death_").val() == ""){
            alert("Please select the date of death")
            $(".manage_artist_search #error_text_input_date_of_death_").css("display","inline")
            $(".manage_artist_search #error_text_input_date_of_death_").attr("data-original-title","Please select the date from datepicker")
            $('.manage_artist_search #error_text_input_date_of_death_').tooltip()
            return false
          }
          break;
      }
    }
  })

  //$("div#search_filters select[id^=advanced_select_]").first().children().first().attr("selected", 'true')

  if (location.pathname.substr(0,13) == "/admin/offers") {
    artist_current_id = 1;
    artist_html_string = $(".manage_artist_search #select_search_filter_string").html();


    $(document).on('click', ".manage_artist_search .add_search_field", function() {
      if(artist_option_array.length == 5) {
        alert("All filters added")
        return
      }


      $(".manage_artist_search .search_advanced form div ul").append(artist_html_string)
      $(".manage_artist_search .search_advanced form div ul").children().last().each(function() {
        //console.log(artist_current_id)
        artist_current_id = artist_current_id + 1;

        $(this).children().first().attr('id', "advanced_select_" + artist_current_id)
        $(this).children().first().next().attr('id', "span_" + artist_current_id)
      })
      select_new_artist_field = _.first(_.difference(artist_option_array_total,artist_option_array))
      //console.log("select artist new field =" +select_new_artist_field)
      $(".manage_artist_search #advanced_select_" + artist_current_id).children().eq(select_new_artist_field).attr("selected", "true")
      $(".manage_artist_search #advanced_select_" + artist_current_id).children().eq(select_new_artist_field).change()
      //console.log("Artist =" + artist_option_array)
      for (var i = 1; i <= artist_current_id; i++) {
        $(".manage_artist_search select#advanced_select_" + i).children().each(function() {
          if (_.contains(artist_option_array,$(this).index())) {
            //console.log("if")
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            //console.log("else")
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })
   

    $('.manage_artist_search .remove_search_field').live('click',function() {  
      if (($(".manage_artist_search #artist_search_filters ul").children().length == 1)) {
        $(".manage_artist_search div.search_advanced").hide()
        $(".manage_artist_search .search").show()
        $(".manage_artist_search div.search_advanced #artist_search_artist_advanced").prop('value', false)
      } else {
        var remove_value_id=$(this).parent().children().first().attr('id');  
        artist_option_array = $.grep(artist_option_array, function(value) {
          return value !=  $("#"+remove_value_id + " option:selected").index();
        });  
        //console.log("artist = " +artist_option_array)
        $(this).parent().remove();
        for (var i = 1; i <= artist_current_id; i++) {
          $(".manage_artist_search select#advanced_select_" + i).children().each(function() {
            if (_.contains(artist_option_array,$(this).index())) {
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

    $("div#artist_search_filters select[id^=advanced_select_]").live('click', function() {
      theValueArtist = $(this).attr('value');
    })

    $(document).on('change', "div#artist_search_filters select[id^=advanced_select_]", function() {
      var currently_clicked = $("#" + $(this).attr('id') + " option:selected").index()
      artist_current_value         = $("#" + $(this).attr('id') + " option:selected").index()
      artist_search_advanced_id    = $(this).attr('id')
      //console.log(artist_current_value)
      //console.log(artist_option_array)
      //console.log($.inArray(artist_current_value, artist_option_array))
      if (($.inArray(artist_current_value, artist_option_array)!=-1) && artist_option_array.length>0){  
        artist_status=false;
        artist_check_option($("#"+$(this).attr('id') + " option:selected").val())
        alert("Artist filter Already added")
        return
      }
      artist_option_array = new Array();
      artist_status=true
      $("div#artist_search_filters select[id^=advanced_select_]").each(function(){  
        if ($("#"+$(this).attr('id') + " option:selected").index()!=0){
          var artist_push_data = $("#"+$(this).attr('id') + " option:selected").index()
          artist_option_array.push(artist_push_data);
        }
      })
      var artist_function_text = $("#" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#span_" + $(this).attr('id').split('_')[2]
      console.log(a);
      var temp = new Function(artist_function_text)
      temp();
      for (var i = 1; i <= artist_current_id; i++) {
        $(".manage_artist_search select#advanced_select_" + i).children().each(function() {
          if (_.contains(artist_option_array,$(this).index())) {
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
      switch($("#artist_search_filters select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
          artists_add_validation_to_artist_name()
        break;
        case 3:
          artists_add_validation_to_date_of_birth()
        break;
        case 4:
          artists_add_validation_to_date_of_death()
        break;
        case 5:
          artists_add_validation_to_description()
        break;
      }
    })
  }


  //will go in offer.hs where buy art search works
  if (location.pathname.substr(0,13) == "/admin/offers") {

    $(function() {
      $('.span10artist_names_first_div ul div.pagination a').live('click',function(e) {
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
          }
        });
        return false;
      });
    });

    $(".span10artist_names_first_div ul div.pagination a").each(function() {
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
})







/*
    $('.pagination a').live('click',function () {
      $(this).attr("data-remote", "true")
      $(document).ajaxStart(function(){
        $("#manage_artist_search_loader_gif").show()
        $("#manage_artist_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#manage_artist_search_loader_gif").hide()
        $("#manage_artist_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      var offer_search_advanced=$("#offer_search_advanced").attr('value')
      if ($("#offer_search_advanced").val() == "true") {
        $.get(
          this.href,
          'per_page=' + $("#artists_per_page_select").val() + "&clear_session=false&offer[search_advanced]=true&per_page="+$("#artists_per_page_select").val() + "&sort_by=" +  $("#offers_public_page_sort_select").val()+ "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_artist_status=" + $("#offers_public_page_sort_active_inactive").val(),
          '',
          'script'
        );  
      } else {
        $.get(
          this.href,
          'per_page=' + $("#artists_per_page_select").val() + "&clear_session=false&offer[search_advanced]=false&per_page="+$("#artists_per_page_select").val() + "&sort_by=" +  $("#offers_public_page_sort_select").val() + "&offer[user_id]=" + $("#offer_user_id").val() + "&offer_artist_status=" + $("#offers_public_page_sort_active_inactive").val(),
          '',
          'script');
        }
      return false;
    });
    $(document).on('change',"#offers_public_page_sort_active_inactive", function() {
      $.ajax({
        url: "/admin/user_offers/search?_=1354783878928&page=1",
        data: {
          per_page: $("#artists_per_page_select").val(),
          sort_by: $("#offers_public_page_sort_select").val(),
          offer_artist_status: $("#offers_public_page_sort_active_inactive").val(),
          'offer[user_id]': $("#offer_user_id").val()
        }
      })
    })
   
/* 
    $("#artists_per_page_select").live('change', function() {
      var offer_search_advanced=$("#offer_search_advanced").attr('value')
      url = "/admin/offers/search"
      $(document).ajaxStart(function(){
        $("#manage_artist_search_loader_gif").show()
        $("#manage_artist_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#manage_artist_search_loader_gif").hide()
        $("#manage_artist_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
       //'per_page=' + $("#artists_per_page_select").val() + '&sort_by=' + $("#offers_public_page_sort_select").val()+ '&offer[search_advanced]='+offer_search_advanced + "&clear_session=false&offer[user_id]=" + $("#offer_user_id").val() + "&offer_artist_status=" + $("#offers_public_page_sort_active_inactive").val(),
       //'',
       //'script');

       'buy_interesting_offers_sort_by=' + $("#offers_public_page_sort_select option:selected").val() + '&show_active_offers_select=' + $("#show_active_offers_select option:selected").index() + '&offers_per_page_select=' + $("#artists_per_page_select option:selected").val() + '&choice=6&offer[search_advanced]='+ offer_search_advanced,
        '',
       'script');
    });
    
    $("#offers_public_page_sort_select").live('change', function() {
      var offer_search_advanced=$("#offer_search_advanced").attr('value')
      url = "/admin/offers/search"
      
      $(document).ajaxStart(function(){
        $("#manage_artist_search_loader_gif").show()
        $("#manage_artist_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#manage_artist_search_loader_gif").hide()
        $("#manage_artist_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
      // 'per_page=' + $("#artists_per_page_select").val() + '&sort_by=' + $("#offers_public_page_sort_select").val()  + '&offer[search_advanced]='+offer_search_advanced + "&clear_session=false&offer[user_id]=" + $("#offer_user_id").val() + "&offer_artist_status=" + $("#offers_public_page_sort_active_inactive").val(),
      // '',
      // 'script');

       'buy_interesting_offers_sort_by=' + $("#offers_public_page_sort_select option:selected").val() + '&show_active_offers_select=' + $("#show_active_offers_select option:selected").index() + '&offers_per_page_select=' + $("#artists_per_page_select option:selected").val() + '&choice=6&offer[search_advanced]='+ offer_search_advanced,
       '',
       'script');
    });
    
    $("#artists_public_page_input_button").live('click', function() {
      artist_count = $("#artist_count").val();
      per_page    = $("#artists_per_page_select").val();
      number_of_pages = Math.ceil(parseInt(artist_count)/parseInt(per_page))
      if (number_of_pages < parseInt($("#artists_public_page_input").val())) {
        alert("Please choose an appropriate page")
        return false;
      }

      var offer_search_advanced=$("#artist_search_artist_advanced").attr('value')
      url = "/admin/user_offers/search?_=1354783878928&page=" + $("#artists_public_page_input").val()
      $(document).ajaxStart(function(){
        $("#manage_artist_search_loader_gif").show()
        $("#manage_artist_search_loader_div").show()
      })
      $(document).ajaxComplete(function(){
        $("#manage_artist_search_loader_gif").hide()
        $("#manage_artist_search_loader_div").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
      })
      $.get(url,
        'per_page=' + $("#artists_per_page_select").val() + '&sort_by=' + $("#offers_public_page_sort_select").val() + '&offer[search_advanced]='+offer_search_advanced + "&clear_session=false&offer[user_id]=" + $("#offer_user_id").val() + "&offer_artist_status=" + $("#offers_public_page_sort_active_inactive").val(),
        '',
        'script');
    });
*/
   
