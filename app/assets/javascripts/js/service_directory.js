$(document).ready(function() {
	$('#service_partner_first_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_first_name').val().length == 0){
      $('#error_service_admin_first_name').css('display', 'inline')
      $('#error_service_admin_first_name').attr('data-original-title', 'Please enter first name')
      $('#error_service_admin_first_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_first_name').hide()
    }
    if(!$('#service_partner_first_name').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_service_admin_first_name').css('display', 'inline')
      $('#error_service_admin_first_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_service_admin_first_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_first_name').hide()
    }
  });

  $('#service_partner_last_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_last_name').val().length == 0){
      $('#error_service_admin_last_name').css('display', 'inline')
      $('#error_service_admin_last_name').attr('data-original-title', 'Please enter last name')
      $('#error_service_admin_last_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_last_name').hide()
    }
    if(!$('#service_partner_last_name').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_service_admin_last_name').css('display', 'inline')
      $('#error_service_admin_last_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_service_admin_last_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_last_name').hide()
    }
  });

  $('#service_partner_company_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_company_name').val().length == 0){
      $('#error_service_admin_company_name').css('display', 'inline')
      $('#error_service_admin_company_name').attr('data-original-title', 'Please enter company name')
      $('#error_service_admin_company_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_company_name').hide()
    }
    if(!$('#service_partner_company_name').val().match( /^[A-Za-z ,.0-9 -()]+$/ )){
      $('#error_service_admin_company_name').css('display', 'inline')
      $('#error_service_admin_company_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_service_admin_company_name').tooltip()
      return false
    }
    else{
      $('#error_service_admin_company_name').hide()
    }
  });

  $('#service_partner_street').live('keyup', function(){
    var isTrue = false
    if($('#service_partner_street').val().length == 0){
      $('#error_service_admin_street').css('display', 'inline')
      $('#error_service_admin_street').attr('data-original-title', 'Please enter street')
      $('#error_service_admin_street').tooltip()
      return false
    }
    else{
      $('#error_service_admin_street').hide()
    }
    if(!$('#service_partner_street').val().match( /^[A-Za-z ,.0-9 -]+$/ )){
      $('#error_service_admin_street').css('display', 'inline')
      $('#error_service_admin_street').attr('data-original-title', 'Special characters not allowed')
      $('#error_service_admin_street').tooltip()
      return false
    }
    else{
      $('#error_service_admin_street').hide()
    }
  });

  $('#service_partner_zip_code').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_zip_code').val().length == 0){
      $('#error_service_admin_zip_code').css('display', 'inline')
      $('#error_service_admin_zip_code').attr('data-original-title', 'Please enter zip code')
      $('#error_service_admin_zip_code').tooltip()
      return false
    }
    else{
      $('#error_service_admin_zip_code').hide()
    }
    if(!$('#service_partner_zip_code').val().match( /^[0-9]+$/ )){
      $('#error_service_admin_zip_code').css('display', 'inline')
      $('#error_service_admin_zip_code').attr('data-original-title', 'Only numbers allowed')
      $('#error_service_admin_zip_code').tooltip()
      return false
    }
    else{
      $('#error_service_admin_zip_code').hide()
    }
  });

  $('#service_partner_city').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_city').val().length == 0) {
      $('#error_service_admin_city').css('display', 'inline')
      $('#error_service_admin_city').attr('data-original-title', 'Please enter city')
      $('#error_service_admin_city').tooltip()
      return false
    }
    else{
      $('#error_service_admin_city').hide()
    }
    if(!$('#service_partner_city').val().match( /^[A-Za-z ]+$/ )){
      $('#error_service_admin_city').css('display', 'inline')
      $('#error_service_admin_city').attr('data-original-title', 'Only alphabets allowed')
      $('#error_service_admin_city').tooltip()
      return false
    }
    else{
      $('#error_service_admin_city').hide()
    }
  });

  $('#service_partner_telephone_number').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_telephone_number').val().length == 0) {
      $('#error_service_admin_telephone_number').css('display', 'inline')
      $('#error_service_admin_telephone_number').attr('data-original-title', 'Please enter telephone number')
      $('#error_service_admin_telephone_number').tooltip()
      return false
    }
    else{
      $('#error_service_admin_telephone_number').hide()
    }
    if(!$('#service_partner_telephone_number').val().match( /^[0-9]+$/ )){
      $('#error_service_admin_telephone_number').css('display', 'inline')
      $('#error_service_admin_telephone_number').attr('data-original-title', 'Only numbers allowed')
      $('#error_service_admin_telephone_number').tooltip()
      return false
    }
    else{
      $('#error_service_admin_telephone_number').hide()
    }
  });

  $('#service_partner_fax_number').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_fax_number').val().length == 0){
      $('#error_service_admin_fax_number').css('display', 'inline')
      $('#error_service_admin_fax_number').attr('data-original-title', 'Please enter fax number')
      $('#error_service_admin_fax_number').tooltip()
      return false
    }
    else{
      $('#error_service_admin_fax_number').hide()
    }
    if(!$('#service_partner_fax_number').val().match( /^[0-9]+$/ )){
      $('#error_service_admin_fax_number').css('display', 'inline')
      $('#error_service_admin_fax_number').attr('data-original-title', 'Only numbers allowed')
      $('#error_service_admin_fax_number').tooltip()
      return false
    }
    else{
      $('#error_service_admin_fax_number').hide()
    }
  });

  $('#service_partner_email').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_email').val().length == 0){
      $('#error_service_admin_email').css('display', 'inline')
      $('#error_service_admin_email').attr('data-original-title', 'Please enter email address')
      $('#error_service_admin_email').tooltip()
      return false
    }
    else{
      $('#error_service_admin_email').hide()
    }
    if(!$('#service_partner_email').val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i )){
      $('#error_service_admin_email').css('display', 'inline')
      $('#error_service_admin_email').attr('data-original-title', 'Invalid email address')
      $('#error_service_admin_email').tooltip()
      return false
    }
    else{
      $('#error_service_admin_email').hide()
    }
  });

})


if(location.pathname.substr(0,23) == '/service_directory/edit') {
  function check_service_admin_validations() {
    for(var i=1; i<=10; i++){
      switch(i){
        case 1:
          if($('#service_partner_first_name').val().length == 0){
            alert('Please enter first name')
            $('#error_service_admin_first_name').css('display', 'inline')
            $('#error_service_admin_first_name').attr('data-original-title', 'Please enter first name')
            $('#error_service_admin_first_name').tooltip()
            return false
          }
          else if(!$('#service_partner_first_name').val().match( /^[A-Za-z .0-9]+$/ )){
            $('#error_service_admin_first_name').css('display', 'inline')
            $('#error_service_admin_first_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('#error_service_admin_first_name').tooltip()
            return false
          }
          break;
        case 2:
          if($('#service_partner_last_name').val().length == 0){
            alert('Please enter last name')
            $('#error_service_admin_last_name').css('display', 'inline')
            $('#error_service_admin_last_name').attr('data-original-title', 'Please enter last name')
            $('#error_service_admin_last_name').tooltip()
            return false
          }
          else if(!$('#service_partner_last_name').val().match( /^[A-Za-z .0-9]+$/ )){
            $('#error_service_admin_last_name').css('display', 'inline')
            $('#error_service_admin_last_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('#error_service_admin_last_name').tooltip()
            return false
          }
          break;
        case 3:
          if($('#service_partner_company_name').val().length == 0){
            alert('Please enter company name')
            $('#error_service_admin_company_name').css('display', 'inline')
            $('#error_service_admin_company_name').attr('data-original-title', 'Please enter company name')
            $('#error_service_admin_company_name').tooltip()
            return false
          }
          else if(!$('#service_partner_company_name').val().match( /^[A-Za-z ,.0-9 -()]+$/ )){
            $('#error_service_admin_company_name').css('display', 'inline')
            $('#error_service_admin_company_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9 -()')
            $('#error_service_admin_company_name').tooltip()
            return false
          }
          break;
        case 4:
          if($('#service_partner_street').val().length == 0){
            alert('Please enter street')
            $('#error_service_admin_street').css('display', 'inline')
            $('#error_service_admin_street').attr('data-original-title', 'Please enter street')
            $('#error_service_admin_street').tooltip()
            return false
          }
          else if(!$('#service_partner_street').val().match( /^[A-Za-z ,.0-9 -]+$/ )){
            $('#error_service_admin_street').css('display', 'inline')
            $('#error_service_admin_street').attr('data-original-title', 'Allowed characters: A-Za-z .0-9 -')
            $('#error_service_admin_street').tooltip()
            return false
          }
          break;
        case 5:
          if($('#service_partner_zip_code').val().length == 0){
            alert('Please enter zip code')
            $('#error_service_admin_zip_code').css('display', 'inline')
            $('#error_service_admin_zip_code').attr('data-original-title', 'Please enter zip code')
            $('#error_service_admin_zip_code').tooltip()
            return false
          }
          else if(!$('#service_partner_zip_code').val().match( /^[0-9]+$/ )){
            $('#error_service_admin_zip_code').css('display', 'inline')
            $('#error_service_admin_zip_code').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_service_admin_zip_code').tooltip()
            return false
          }
          break;
        case 6:
          if($('#service_partner_city').val().length == 0){
            alert('Please enter city')
            $('#error_service_admin_city').css('display', 'inline')
            $('#error_service_admin_city').attr('data-original-title', 'Please enter city')
            $('#error_service_admin_city').tooltip()
            return false
          }
          else if(!$('#service_partner_city').val().match( /^[A-Za-z ]+$/ )){
            $('#error_service_admin_city').css('display', 'inline')
            $('#error_service_admin_city').attr('data-original-title', 'Allowed characters: A-Za-z')
            $('#error_service_admin_city').tooltip()
            return false
          }
          break;
        case 7:
          if($('#service_partner_telephone_number').val().length == 0){
            alert('Please enter telephone number')
            $('#error_service_admin_telephone_number').css('display', 'inline')
            $('#error_service_admin_telephone_number').attr('data-original-title', 'Please enter telephone number')
            $('#error_service_admin_telephone_number').tooltip()
            return false
          }
          else if(!$('#service_partner_telephone_number').val().match( /^[0-9]+$/ )){
            $('#error_service_admin_telephone_number').css('display', 'inline')
            $('#error_service_admin_telephone_number').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_service_admin_telephone_number').tooltip()
            return false
          }
          break;
        case 8:
          if($('#service_partner_fax_number').val().length == 0){
            alert('Please enter fax number')
            $('#error_service_admin_fax_number').css('display', 'inline')
            $('#error_service_admin_fax_number').attr('data-original-title', 'Please enter fax number')
            $('#error_service_admin_fax_number').tooltip()
            return false
          }
          else if(!$('#service_partner_fax_number').val().match( /^[0-9]+$/ )){
            $('#error_service_admin_fax_number').css('display', 'inline')
            $('#error_service_admin_fax_number').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_service_admin_fax_number').tooltip()
            return false
          }
          break;
        case 9:
          if($('#service_partner_email').val().length == 0){
            alert('Please enter email address')
            $('#error_service_admin_email').css('display', 'inline')
            $('#error_service_admin_email').attr('data-original-title', 'Please enter email address')
            $('#error_service_admin_email').tooltip()
            return false
          }
          else if(!$('#service_partner_email').val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i )){
            $('#error_service_admin_email').css('display', 'inline')
            $('#error_service_admin_email').attr('data-original-title', 'Please enter valid email address')
            $('#error_service_admin_email').tooltip()
            return false
          }
          break;
        case 10:
          if($('#service_partner_password').val() != $('#service_partner_retype_password').val()){
            alert('Retype password')
            $('#error_service_admin_password').css('display', 'inline')
            $('#error_service_admin_password').attr('data-original-title', 'Please Retype password')
            $('#error_service_admin_password').tooltip()
            return false
          }
          break;
      }
    }
    if(location.pathname.match( /service_directory\/edit\/.*/) != null){
      f();
    }
  }
  if(location.pathname.match( /service_directory\/edit\/.*/) != null){
    function f(){
      $("#form1").trigger("submit.rails");
    }
  }
}



if (location.pathname.substr(0,27) == "/service_directory/overview") {
  var admin_option_array_0 = new Array();
  var admin_option_array_1 = new Array();
  var admin_option_array_2 = new Array();
  var admin_option_array_3 = new Array();

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
  if (location.pathname.substr(0,27) == "/service_directory/overview") {
    //make all pagination links ajaxified
    $(".pagination").css("top","-65px")
  }




  if (location.pathname.substr(0,27) == "/service_directory/overview") {
    filter_single_string_0 = $(".filter_0_advanced ul").html()
    filter_single_string_1 = $(".filter_1_advanced ul").html()
    filter_single_string_2 = $(".filter_2_advanced ul").html()
    filter_single_string_3 = $(".filter_3_advanced ul").html()
    current_id_0 = 1
    current_id_1 = 1
    current_id_2 = 1
    current_id_3 = 1
    option_array_total_0 = [1,2,3,4,5]
    option_array_total_1 = [1,2,3,4,5,6]
    option_array_total_2 = [1,2,3,4,5]
    option_array_total_3 = [1,2,3,4,5]

    $(document).on('click','img.admin_search_toggle_0',function() {
      console.log('here');
      $(this).parents('div.search').find('h3').find('span.detailed_search').text("DETAILED SEARCH");
      $(".layout_part_two div.search h3.pull-left span.result_found_2").hide();
      toggle_search_0()
      if (kill_white_space($(".filter_0_advanced ul li span#span_1").html()) == "") {
        $(".filter_0_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })
    

    $(document).on('click','img.admin_search_toggle_1',function() {
      $(this).parents('div.search').find('h3').find('span.detailed_search').text("DETAILED SEARCH");
      $(".layout_part_three div.search h3.pull-left span.result_found_3").hide();
      toggle_search_1()
      if (kill_white_space($(".filter_1_advanced ul li span#span_1").html()) == "") {
        $(".filter_1_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.admin_search_toggle_2',function() {
      $(this).parents('div.search').find('h3').find('span.detailed_search').text("DETAILED SEARCH");
      $(".layout_part_four div.search h3.pull-left span.result_found_4").hide();
      toggle_search_2()
      if (kill_white_space($(".filter_2_advanced ul li span#span_1").html()) == "") {
        $(".filter_2_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })

    $(document).on('click','img.admin_search_toggle_3',function() {
      $(this).parents('div.search').find('h3').find('span.detailed_search').text("DETAILED SEARCH");
       $(".layout_part_five div.search h3.pull-left span.result_found_5").hide();
      toggle_search_3()
      if (kill_white_space($(".filter_3_advanced ul li span#span_1").html()) == "") {
        $(".filter_3_advanced ul li select#advanced_select_1").children().first().next().attr("selected","true").change()
      }
    })


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

    $(document).on('click',"img.admin_add_search_field_2", function() {
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
    })

    $(document).on('click', "img.admin_remove_search_field_0", function() {
      if ($(".filter_0_advanced ul").children().length == 1) {
        $('#search_by_value2').val("");
        $(".layout_part_two div.search h3.pull-left span.result_found_2").hide();
        $(this).parents('div.search').find('h3').find('span.detailed_search').text("SEARCH");
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
        $('#search_by_value3').val("");
        $(".layout_part_three div.search h3.pull-left span.result_found_3").hide();
        $(this).parents('div.search').find('h3').find('span.detailed_search').text("SEARCH");
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

    $(document).on('click', "img.admin_remove_search_field_2", function() {
      if ($(".filter_2_advanced ul").children().length == 1) {
        $('#search_by_value4').val("");
        $(".layout_part_four div.search h3.pull-left span.result_found_4").hide();
        $(this).parents('div.search').find('h3').find('span.detailed_search').text("SEARCH");
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
        $('#search_by_value5').val("");
        $(".layout_part_five div.search h3.pull-left span.result_found_5").hide();
        $(this).parents('div.search').find('h3').find('span.detailed_search').text("SEARCH");
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
    })

    $(document).on('click', ".filter_0_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_0 = $(this).attr('value');
    })
    $(document).on('click', ".filter_1_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_1 = $(this).attr('value');
    })
    $(document).on('click', ".filter_2_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_2 = $(this).attr('value');
    })
    $(document).on('click', ".filter_3_advanced ul li select[id^=advanced_select_]" ,function() {
      admin_theValue_3 = $(this).attr('value');
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

      switch($(".filter_0_advanced select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
         // add_validation_to_service_partner_description()
        break;
        case 2:
          add_validation_to_service_partner_spaciality_for_art_expert()
        break;
        case 3:
          add_validation_to_service_partner_description_for_art_expert()
        break;
        case 4:
         // add_validation_to_location()
        break;
        case 5:
          // add_validation_to_status()
        break;
        case 6:
          // add_validation_to_contact_data_approval()
        break;
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
      switch($(".filter_1_advanced select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
         // add_validation_to_service_partner_description()
        break;
        case 2:
          add_validation_to_service_partner_number_of_employees_for_art_lawyer()
        break;
        case 3:
          add_validation_to_service_partner_spaciality_for_art_lawyer()
        break;
        case 4:
          add_validation_to_service_partner_description_for_art_lawyer()
        break;
        case 5:
          // add_validation_to_status()
        break;
        case 6:
          // add_validation_to_contact_data_approval()
        break;
      }
    })

    $(document).on('change', ".filter_2_advanced ul li select[id^=advanced_select_]", function() {
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
      switch($(".filter_2_advanced select[id^="+ $(this).attr('id') + "] option:selected").index()) {
        case 0:
        break;
        case 1:
         // add_validation_to_service_partner_description()
        break;
        case 2:
          add_validation_to_service_partner_spaciality_for_shipping_company()
        break;
        case 3:
          add_validation_to_service_partner_description_for_shipping_company()
        break;
        case 4:
         // add_validation_to_location()
        break;
        case 5:
          // add_validation_to_status()
        break;
        case 6:
          // add_validation_to_contact_data_approval()
        break;
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
    switch($(".filter_3_advanced select[id^="+ $(this).attr('id') + "] option:selected").index()) {
      case 0:
      break;
      case 1:
       // add_validation_to_service_partner_description()
      break;
      case 2:
        add_validation_to_service_partner_spaciality_for_insurance_company()
      break;
      case 3:
        add_validation_to_service_partner_description_for_insurance_company()
      break;
      case 4:
       // add_validation_to_location()
      break;
      case 5:
        // add_validation_to_status()
      break;
      case 6:
        // add_validation_to_contact_data_approval()
      break;
    }
       
    })
  }
})

// add_validation for description colum in advance search

  function add_validation_to_service_partner_description_for_art_expert() {
    var text_input_service_partner_validation = new LiveValidation("text_input_description_part_two", {
      onValid: function()  {
        if(!$("#text_input_description_part_two").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_description_part_two").css("display","inline")
          $("#error_text_input_description_part_two").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_description_part_two").tooltip()
          valid_text_input_description = false
        }
        else {
          $("#error_text_input_description_part_two").hide()
          valid_text_input_description = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_description_part_two").val().length == 0) { 
          $("#error_text_input_description_part_two").hide()
        } 
        else {
          $("#error_text_input_description_part_two").css("display","inline")
          $("#error_text_input_description_part_two").attr("data-original-title","Please enter description value.")
          $("#error_text_input_description_part_two").tooltip()
          valid_text_input_description = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


  function add_validation_to_service_partner_description_for_art_lawyer() {
    var text_input_service_partner_validation = new LiveValidation("text_input_description_part_three", {
      onValid: function()  {
        if(!$("#text_input_description_part_three").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_description_part_three").css("display","inline")
          $("#error_text_input_description_part_three").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_description_part_three").tooltip()
          valid_text_input_description = false
        }
        else {
          $("#error_text_input_description_part_three").hide()
          valid_text_input_description = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_description_part_three").val().length == 0) { 
          $("#error_text_input_description_part_three").hide()
        } 
        else {
          $("#error_text_input_description_part_three").css("display","inline")
          $("#error_text_input_description_part_three").attr("data-original-title","Please enter description value.")
          $("#error_text_input_description_part_three").tooltip()
          valid_text_input_description = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


  function add_validation_to_service_partner_description_for_shipping_company() {
    var text_input_service_partner_validation = new LiveValidation("text_input_description_part_four", {
      onValid: function()  {
        if(!$("#text_input_description_part_four").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_description_part_four").css("display","inline")
          $("#error_text_input_description_part_four").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_description_part_four").tooltip()
          valid_text_input_description = false
        }
        else {
          $("#error_text_input_description_part_four").hide()
          valid_text_input_description = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_description_part_four").val().length == 0) { 
          $("#error_text_input_description_part_four").hide()
        } 
        else {
          $("#error_text_input_description_part_four").css("display","inline")
          $("#error_text_input_description_part_four").attr("data-original-title","Please enter description value.")
          $("#error_text_input_description_part_four").tooltip()
          valid_text_input_description = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


  function add_validation_to_service_partner_description_for_insurance_company() {
    var text_input_service_partner_validation = new LiveValidation("text_input_description_part_five", {
      onValid: function()  {
        if(!$("#text_input_description_part_five").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_description_part_five").css("display","inline")
          $("#error_text_input_description_part_five").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_description_part_five").tooltip()
          valid_text_input_description = false
        }
        else {
          $("#error_text_input_description_part_five").hide()
          valid_text_input_description = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_description_part_five").val().length == 0) { 
          $("#error_text_input_description_part_five").hide()
        } 
        else {
          $("#error_text_input_description_part_five").css("display","inline")
          $("#error_text_input_description_part_five").attr("data-original-title","Please enter description value.")
          $("#error_text_input_description_part_five").tooltip()
          valid_text_input_description = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


// add_validation for speciality colum in advance search

 function add_validation_to_service_partner_spaciality_for_art_expert() {
    var text_input_service_partner_validation = new LiveValidation("text_input_speciality_part_two", {
      onValid: function()  {
        if(!$("#text_input_speciality_part_two").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_speciality_part_two").css("display","inline")
          $("#error_text_input_speciality_part_two").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_speciality_part_two").tooltip()
          valid_text_input_speciality = false
        }
        else {
          $("#error_text_input_speciality_part_two").hide()
          valid_text_input_speciality = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_speciality_part_two").val().length == 0) { 
          $("#error_text_input_speciality_part_two").hide()
        } 
        else {
          $("#error_text_input_speciality_part_two").css("display","inline")
          $("#error_text_input_speciality_part_two").attr("data-original-title","Please enter speciality value.")
          $("#error_text_input_speciality_part_two").tooltip()
          valid_text_input_speciality = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


  function add_validation_to_service_partner_spaciality_for_art_lawyer(){
    var text_input_service_partner_validation = new LiveValidation("text_input_speciality_part_three", {
      onValid: function()  {
        if(!$("#text_input_speciality_part_three").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_speciality_part_three").css("display","inline")
          $("#error_text_input_speciality_part_three").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_speciality_part_three").tooltip()
          valid_text_input_speciality = false
        }
        else {
          $("#error_text_input_speciality_part_three").hide()
          valid_text_input_speciality = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_speciality_part_three").val().length == 0) { 
          $("#error_text_input_speciality_part_three").hide()
        } 
        else {
          $("#error_text_input_speciality_part_three").css("display","inline")
          $("#error_text_input_speciality_part_three").attr("data-original-title","Please enter speciality value.")
          $("#error_text_input_speciality_part_three").tooltip()
          valid_text_input_speciality = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


  function add_validation_to_service_partner_spaciality_for_shipping_company() {
    var text_input_service_partner_validation = new LiveValidation("text_input_speciality_part_four", {
      onValid: function()  {
        if(!$("#text_input_speciality_part_four").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_speciality_part_four").css("display","inline")
          $("#error_text_input_speciality_part_four").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_speciality_part_four").tooltip()
          valid_text_input_speciality = false
        }
        else {
          $("#error_text_input_speciality_part_four").hide()
          valid_text_input_speciality = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_speciality_part_four").val().length == 0) { 
          $("#error_text_input_speciality_part_four").hide()
        } 
        else {
          $("#error_text_input_speciality_part_four").css("display","inline")
          $("#error_text_input_speciality_part_four").attr("data-original-title","Please enter speciality value.")
          $("#error_text_input_speciality_part_four").tooltip()
          valid_text_input_speciality = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }

  function add_validation_to_service_partner_spaciality_for_insurance_company() {
    var text_input_service_partner_validation = new LiveValidation("text_input_speciality_part_five", {
      onValid: function()  {
        if(!$("#text_input_speciality_part_five").val().match( /^[A-Za-z,.]+$/)) {
          $("#error_text_input_speciality_part_five").css("display","inline")
          $("#error_text_input_speciality_part_five").attr("data-original-title","Special characters not allowed")
          $("#error_text_input_speciality_part_five").tooltip()
          valid_text_input_speciality = false
        }
        else {
          $("#error_text_input_speciality_part_five").hide()
          valid_text_input_speciality = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_speciality_part_five").val().length == 0) { 
          $("#error_text_input_speciality_part_five").hide()
        } 
        else {
          $("#error_text_input_speciality_part_five").css("display","inline")
          $("#error_text_input_speciality_part_five").attr("data-original-title","Please enter speciality value.")
          $("#error_text_input_speciality_part_five").tooltip()
          valid_text_input_speciality = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }

  function add_validation_to_service_partner_number_of_employees_for_art_lawyer() {
    var text_input_service_partner_validation = new LiveValidation("text_input_number_of_employees", {
      onValid: function()  {
        if(!$("#text_input_number_of_employees").val().match( /^[0-9]+$/)) {
          $("#error_text_input_number_of_employees").css("display","inline")
          $("#error_text_input_number_of_employees").attr("data-original-title","Characters not allowed")
          $("#error_text_input_number_of_employees").tooltip()
          valid_text_input_number_of_employees = false
        }
        else {
          $("#error_text_input_number_of_employees").hide()
          valid_text_input_number_of_employees = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_number_of_employees").val().length == 0) { 
          $("#error_text_input_number_of_employees").hide()
        } 
        else {
          $("#error_text_input_number_of_employees").css("display","inline")
          $("#error_text_input_number_of_employees").attr("data-original-title","Please enter value.")
          $("#error_text_input_number_of_employees").tooltip()
          valid_text_input_number_of_employees = false
        }
      }
    });
    text_input_service_partner_validation.add(Validate.Presence);
  }


 if (location.pathname.substr(0,27) == "/service_directory/overview") {
    $(function() {
      $('#search_data_4 .data .pagination a').live('click',function(e) {
        e.preventDefault();
        $.ajax({
          url: this.href,
          dataType: 'script',
          beforeSend : function() {
            //console.log($("#select_input_contact_data_approval").val());
          },
          data: {
            partner_type: "4",
            service_partner: { search_in: 4 , search_term: $("#search_by_value2").val()},
            select: { country: {name : $("#select_input_country").val()}, 
            speciality: { search_type: $("#select_input_speciality").val(), value: $("#text_input_speciality_part_two").val()}, 
            description: { search_type: $("#select_input_description").val(), value: $("#text_input_description_part_two").val()}, 
            contact_data_approval:  { search_type: $("#select_input_contact_data_approval").val()}, 
            status: { search_type: $("#select_input_status").val()},
            number_of_employees: { search_type: $("#select_input_number_of_employees").val(), value: $("#text_input_number_of_employees").val()} },
           
            attr: $("#sort_by_attr2").val(),
            per_page_item: $("#per_page_item2").val()
          }
        });
        return false;
      });
    });

    $('#search_data_4 .data .pagination a').each(function() {
       $(this).attr("data-remote","true")
    })

    $(function() {
      $('#search_data_3 .data .pagination a').live('click',function(e) {
        e.preventDefault();
        $.ajax({
          url: this.href,
          dataType: 'script',
          data: {
           partner_type: "3",
           service_partner: { search_in: 3 , search_term: $("#search_by_value3").val()},
           select: { country: {name : $("#select_input_country").val()}, 
           speciality: { search_type: $("#select_input_speciality").val(), value: $("#text_input_speciality_part_three").val()}, 
           description: { search_type: $("#select_input_description").val(), value: $("#text_input_description_part_three").val()},  
           contact_data_approval:  { search_type: $("#select_input_contact_data_approval").val()}, 
           status: { search_type: $("#select_input_status").val()},
           number_of_employees: { search_type: $("#select_input_number_of_employees").val(), value: $("#text_input_number_of_employees").val()} },
           attr: $("#sort_by_attr3").val(),
           per_page_item: $("#per_page_item3").val()
          }
        });
        return false;
      });
    });

    $('#search_data_3 .data .pagination a').each(function() {
       $(this).attr("data-remote","true")
    })

    $(function() {
      $('#search_data_2 .data .pagination a').live('click',function(e) {
        e.preventDefault();
        $.ajax({
          url: this.href,
          dataType: 'script',
          data: {
           partner_type: "2",
           service_partner: { search_in: 2, search_term: $("#search_by_value4").val()},
           select: { country: {name : $("#select_input_country").val()}, 
           speciality: { search_type: $("#select_input_speciality").val(), value: $("#text_input_speciality_part_four").val()}, 
           description: { search_type: $("#select_input_description").val(), value: $("#text_input_description_part_four").val()}, 
           contact_data_approval:  { search_type: $("#select_input_contact_data_approval").val()}, 
           status: { search_type: $("#select_input_status").val()},
           number_of_employees: { search_type: $("#select_input_number_of_employees").val(), value: $("#text_input_number_of_employees").val()} },
           attr: $("#sort_by_attr4").val(),
           per_page_item: $("#per_page_item4").val()
          }
        });
        return false;
      });
    });

    $('#search_data_2 .data .pagination a').each(function() {
       $(this).attr("data-remote","true")
    })

    $(function() {
      $('#search_data_1 .data .pagination a').live('click',function(e) {
        e.preventDefault();
        $.ajax({
          url: this.href,
          dataType: 'script',
          data: {
           partner_type: "1",
           service_partner: { search_in: 1, search_term: $("#search_by_value5").val()},
           select: { country: {name : $("#select_input_country").val()}, 
           speciality: { search_type: $("#select_input_speciality").val(), value: $("#text_input_speciality_part_five").val()}, 
           description: { search_type: $("#select_input_description").val(), value: $("#text_input_description_part_five").val()}, 
           contact_data_approval:  { search_type: $("#select_input_contact_data_approval").val()}, 
           status: { search_type: $("#select_input_status").val()},
           number_of_employees: { search_type: $("#select_input_number_of_employees").val(), value: $("#text_input_number_of_employees").val()} },
           attr: $("#sort_by_attr5").val(),
           per_page_item: $("#per_page_item5").val()
          }
        });
        return false;
      });
    });

    $('#search_data_1 .data .pagination a').each(function() {
       $(this).attr("data-remote","true")
    })
  }

if (location.pathname.substr(0,27) == "/service_directory/overview") {
  
  $(document).on('change', "#sort_by_attr2, #per_page_item2", function() {
    var search_value= $("#basic_search_two").attr('value'), sort_value= $("#sort_by_attr2").val(), per_page_value= $("#per_page_item2").val();
    var country_value = $("#select_input_country").val(),
        speciality_selectbox_value = $("#select_input_speciality").val(),
        speciality_value = $("#text_input_speciality_part_two").val(),
        description_selectbox_value = $("#select_input_description").val(),
        description_value = $("#text_input_description_part_two").val(),
        number_of_emp_selectbox_value = $("#select_input_number_of_employees").val()
        number_of_employees = $("#text_input_number_of_employees").val(),
        contact_data_approval = $("#select_input_contact_data_approval").val(),
        status = $("#select_input_status").val()
    
    var urltosend = "";
    if($("#advance_search_two").attr('value') == 'true') {
        urltosend = "/service_directory/search_advanced";
      }
    else if($("#basic_search_two").attr('value') != "") {
        urltosend = "/service_directory/search_basic";
      }  
    else if($("#basic_search_two").attr('value') == "") {
        urltosend = this.href;
      } 

    $.ajax({
      url: urltosend,
      type: 'GET',
       beforeSend : function() {
            console.log($("#text_input_description").val());
          },
      data: {
          partner_type: "4",
          service_partner: { search_in: "4", search_term: search_value },
          attr: sort_value,
          per_page_item: per_page_value,
          select: { country: { name : country_value }, 
          speciality: { search_type: speciality_selectbox_value, value: speciality_value }, 
          description: { search_type: description_selectbox_value, value: description_value },
          number_of_employees: { search_type: number_of_emp_selectbox_value, value: number_of_employees},
          contact_data_approval:  { search_type: contact_data_approval}, 
          status: { search_type: status } }
      },
      success: function(data) {
        result = new Function(data.responseText);
        result();
      }
    })
  })

  $(document).on('change', "#sort_by_attr3, #per_page_item3", function() {
    var search_value= $("#basic_search_three").attr('value'), sort_value= $("#sort_by_attr3").val(),per_page_value= $("#per_page_item3").val();

    var country_value = $("#select_input_country").val(),
        speciality_selectbox_value = $("#select_input_speciality").val(),
        speciality_value = $("#text_input_speciality_part_three").val(),
        description_selectbox_value = $("#select_input_description").val(),
        description_value = $("#text_input_description_part_three").val(),
        number_of_emp_selectbox_value = $("#select_input_number_of_employees").val()
        number_of_employees = $("#text_input_number_of_employees").val(),
        contact_data_approval = $("#select_input_contact_data_approval").val(),
        status = $("#select_input_status").val()

    var urltosend = "";
    if($("#advance_search_three").attr('value') == 'true') {
        urltosend = "/service_directory/search_advanced";
      }
    else if($("#basic_search_three").attr('value') != "") {
        urltosend = "/service_directory/search_basic";
      }  
    else if($("#basic_search_three").attr('value') == "") {
        urltosend = this.href;
      }

    $.ajax({
      url: urltosend,
      type: 'GET',
      data: {
        partner_type: "3",
        service_partner: { search_in: "3", search_term: search_value },
        attr: sort_value,
        per_page_item: per_page_value,
        select: { country: { name : country_value }, 
            specility: { search_type: speciality_selectbox_value, value: speciality_value }, 
            description: { search_type: description_selectbox_value, value: description_value },
            number_of_employees: { search_type: number_of_emp_selectbox_value, value: number_of_employees},
            contact_data_approval:  { search_type: contact_data_approval}, 
            status: { search_type: status } }
      },
      success: function(data) {
        result = new Function(data.responseText)
      }
    })
  })

  $(document).on('change', "#sort_by_attr4, #per_page_item4", function() {
    var search_value= $("#basic_search_four").attr('value'), sort_value= $("#sort_by_attr4").val(),per_page_value= $("#per_page_item4").val();
    
    var country_value = $("#select_input_country").val(),
        speciality_selectbox_value = $("#select_input_speciality").val(),
        speciality_value = $("#text_input_speciality_part_four").val(),
        description_selectbox_value = $("#select_input_description").val(),
        description_value = $("#text_input_description_part_four").val(),
        number_of_emp_selectbox_value = $("#select_input_number_of_employees").val()
        number_of_employees = $("#text_input_number_of_employees").val(),
        contact_data_approval = $("#select_input_contact_data_approval").val(),
        status = $("#select_input_status").val()

    var urltosend = "";
    if($("#advance_search_four").attr('value') == 'true') {
        urltosend = "/service_directory/search_advanced";
      }
    else if($("#basic_search_four").attr('value') != "") {
        urltosend = "/service_directory/search_basic";
      }  
    else if($("#basic_search_four").attr('value') == "") {
        urltosend = this.href;
      }
          
    $.ajax({
      url: urltosend,
      type: 'GET',
      data: {
        partner_type: "2",
        attr: sort_value,
        service_partner: { search_in: "2", search_term: search_value },
        per_page_item: per_page_value,
        select: { country: { name : country_value }, 
            specility: { search_type: speciality_selectbox_value, value: speciality_value }, 
            description: { search_type: description_selectbox_value, value: description_value },
            number_of_employees: { search_type: number_of_emp_selectbox_value, value: number_of_employees},
            contact_data_approval:  { search_type: contact_data_approval}, 
            status: { search_type: status } }
      },
      success: function(data) {
        // jQuery("#search_data_3").html(data)
        result = new Function(data.responseText)
      }
    })
  })

  $(document).on('change', "#sort_by_attr5, #per_page_item5", function() {
    var search_value= $("#basic_search_five").attr('value'), sort_value= $("#sort_by_attr5").val(),per_page_value= $("#per_page_item5").val();
    
    var country_value = $("#select_input_country").val(),
        speciality_selectbox_value = $("#select_input_speciality").val(),
        speciality_value = $("#text_input_speciality_part_five").val(),
        description_selectbox_value = $("#select_input_description").val(),
        description_value = $("#text_input_description_part_five").val(),
        number_of_emp_selectbox_value = $("#select_input_number_of_employees").val()
        number_of_employees = $("#text_input_number_of_employees").val(),
        contact_data_approval = $("#select_input_contact_data_approval").val(),
        status = $("#select_input_status").val()
    
    var urltosend = "";
    if($("#advance_search_five").attr('value') == 'true') {
        urltosend = "/service_directory/search_advanced";
      }
    else if($("#basic_search_five").attr('value') != "") {
        urltosend = "/service_directory/search_basic";
      }  
    else if($("#basic_search_five").attr('value') == "") {
        urltosend = this.href;
      }        

    $.ajax({
      url: urltosend,
      type: 'GET',
      data: {
        partner_type: "1",
        attr: sort_value,
        service_partner: { search_in: "1", search_term: search_value },
        per_page_item: per_page_value,
        select: { country: { name : country_value }, 
            specility: { search_type: speciality_selectbox_value, value: speciality_value }, 
            description: { search_type: description_selectbox_value, value: description_value },
            number_of_employees: { search_type: number_of_emp_selectbox_value, value: number_of_employees},
            contact_data_approval:  { search_type: contact_data_approval}, 
            status: { search_type: status } }
      },
      success: function(data) {
        // jQuery("#search_data_3").html(data)
        result = new Function(data.responseText)
      }
    })
  })


// for basic search on-click event assign value in hidden field
  $(document).on('click', '#basic_search_for_layout_two', function() {
    var value = $("#search_by_value2").val();
    $('#basic_search_two').attr('value',value);
    // $(".layout_part_two div.search h3.pull-left span.result_found").show();
      var attr = $("#sort_by_attr2").val("country");
      var per_page_item = $("#per_page_item2").val(6);
      setTimeout(function(){
          $(".result_found_2").text($("#search_data_4 .count").text());
          $(".layout_part_two div.search h3.pull-left span.result_found_2").show();
      },500);
      //alert($(".count").text());
  })

  $(document).on('click', '#basic_search_for_layout_three', function() {
    var value = $("#search_by_value3").val();
    $('#basic_search_three').attr('value',value);
      var attr = $("#sort_by_attr3").val("country");
      var per_page_item = $("#per_page_item3").val(6);
      setTimeout(function(){
          $(".result_found_3").text($("#search_data_3 .count").text());
          $(".layout_part_three div.search h3.pull-left span.result_found_3").show();
      },500);
  })

  $(document).on('click', '#basic_search_for_layout_four', function() {
    var value = $("#search_by_value4").val();
    $('#basic_search_four').attr('value',value);
      var attr = $("#sort_by_attr4").val("country");
      var per_page_item = $("#per_page_item4").val(6);
      setTimeout(function(){
          $(".result_found_4").text($("#search_data_2 .count").text());
          $(".layout_part_four div.search h3.pull-left span.result_found_4").show();
      },500);
  })

  $(document).on('click', '#basic_search_for_layout_five', function() {
    var value = $("#search_by_value5").val();
    $('#basic_search_five').attr('value',value);
      var attr = $("#sort_by_attr5").val("country");
      var per_page_item = $("#per_page_item5").val(6);
      setTimeout(function(){
          $(".result_found_5").text($("#search_data_1 .count").text());
          $(".layout_part_five div.search h3.pull-left span.result_found_5").show();
      },500);
  })

// for advanced search on-click assign value= true in hidden field 
  $(document).on('click', '#advance_search_for_layout_two', function() {
      $('#advance_search_two').attr('value',true);
     // $(".layout_part_two div.search h3.pull-left span.result_found").hide();
      var attr = $("#sort_by_attr2").val("country");
      var per_page_item = $("#per_page_item2").val(6);

      setTimeout(function(){
          $(".result_found_2").text($("#search_data_4 .count").text());
          $(".layout_part_two div.search h3.pull-left span.result_found_2").show();
      },500);
     // alert($(".count").text());
  })


  $(document).on('click', '#advance_search_for_layout_three', function() {
      $('#advance_search_three').attr('value',true);
      var attr = $("#sort_by_attr3").val("country");
      var per_page_item = $("#per_page_item3").val(6);

      setTimeout(function(){
          $(".result_found_3").text($("#search_data_3 .count").text());
          $(".layout_part_three div.search h3.pull-left span.result_found_3").show();
      },500);       
  }) 

  $(document).on('click', '#advance_search_for_layout_four', function() {
      $('#advance_search_four').attr('value',true);
      var attr = $("#sort_by_attr4").val("country");
      var per_page_item = $("#per_page_item4").val(6); 

      setTimeout(function(){
          $(".result_found_4").text($("#search_data_2 .count").text());
          $(".layout_part_four div.search h3.pull-left span.result_found_4").show();
      },500); 
  }) 

  $(document).on('click', '#advance_search_for_layout_five', function() {
      $('#advance_search_five').attr('value',true);
      var attr = $("#sort_by_attr5").val("country");
      var per_page_item = $("#per_page_item5").val(6); 

      setTimeout(function(){
          $(".result_found_5").text($("#search_data_1 .count").text());
          $(".layout_part_five div.search h3.pull-left span.result_found_5").show();
      },500); 
  })
}