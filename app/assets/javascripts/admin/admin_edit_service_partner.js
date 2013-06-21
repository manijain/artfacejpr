

$(document).ready(function() {
  $('#service_partner_first_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_first_name').val().length == 0){
      $('#error_partner_first_name').css('display', 'inline')
      $('#error_partner_first_name').attr('data-original-title', 'Please enter first name')
      $('#error_partner_first_name').tooltip()
      return false
    }
    else{
      $('#error_partner_first_name').hide()
    }
    if(!$('#service_partner_first_name').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_partner_first_name').css('display', 'inline')
      $('#error_partner_first_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_partner_first_name').tooltip()
      return false
    }
    else{
      $('#error_partner_first_name').hide()
    }
  });

  $('#service_partner_last_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_last_name').val().length == 0){
      $('#error_partner_last_name').css('display', 'inline')
      $('#error_partner_last_name').attr('data-original-title', 'Please enter last name')
      $('#error_partner_last_name').tooltip()
      return false
    }
    else{
      $('#error_partner_last_name').hide()
    }
    if(!$('#service_partner_last_name').val().match( /^[A-Za-z .0-9]+$/ )){
      $('#error_partner_last_name').css('display', 'inline')
      $('#error_partner_last_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_partner_last_name').tooltip()
      return false
    }
    else{
      $('#error_partner_last_name').hide()
    }
  });

  $('#service_partner_company_name').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_company_name').val().length == 0){
      $('#error_partner_company_name').css('display', 'inline')
      $('#error_partner_company_name').attr('data-original-title', 'Please enter company name')
      $('#error_partner_company_name').tooltip()
      return false
    }
    else{
      $('#error_partner_company_name').hide()
    }
    if(!$('#service_partner_company_name').val().match( /^[A-Za-z ,.0-9 -()]+$/ )){
      $('#error_partner_company_name').css('display', 'inline')
      $('#error_partner_company_name').attr('data-original-title', 'Special characters not allowed')
      $('#error_partner_company_name').tooltip()
      return false
    }
    else{
      $('#error_partner_company_name').hide()
    }
  });

  $('#service_partner_street').live('keyup', function(){
    var isTrue = false
    if($('#service_partner_street').val().length == 0){
      $('#error_partner_street').css('display', 'inline')
      $('#error_partner_street').attr('data-original-title', 'Please enter street')
      $('#error_partner_street').tooltip()
      return false
    }
    else{
      $('#error_partner_street').hide()
    }
    if(!$('#service_partner_street').val().match( /^[A-Za-z ,.0-9 -]+$/ )){
      $('#error_partner_street').css('display', 'inline')
      $('#error_partner_street').attr('data-original-title', 'Special characters not allowed')
      $('#error_partner_street').tooltip()
      return false
    }
    else{
      $('#error_partner_street').hide()
    }
  });

  $('#service_partner_zip_code').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_zip_code').val().length == 0){
      $('#error_partner_zip_code').css('display', 'inline')
      $('#error_partner_zip_code').attr('data-original-title', 'Please enter zip code')
      $('#error_partner_zip_code').tooltip()
      return false
    }
    else{
      $('#error_partner_zip_code').hide()
    }
    if(!$('#service_partner_zip_code').val().match( /^[0-9]+$/ )){
      $('#error_partner_zip_code').css('display', 'inline')
      $('#error_partner_zip_code').attr('data-original-title', 'Only numbers allowed')
      $('#error_partner_zip_code').tooltip()
      return false
    }
    else{
      $('#error_partner_zip_code').hide()
    }
  });

  $('#service_partner_city').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_city').val().length == 0) {
      $('#error_partner_city').css('display', 'inline')
      $('#error_partner_city').attr('data-original-title', 'Please enter city')
      $('#error_partner_city').tooltip()
      return false
    }
    else{
      $('#error_partner_city').hide()
    }
    if(!$('#service_partner_city').val().match( /^[A-Za-z ]+$/ )){
      $('#error_partner_city').css('display', 'inline')
      $('#error_partner_city').attr('data-original-title', 'Only alphabets allowed')
      $('#error_partner_city').tooltip()
      return false
    }
    else{
      $('#error_partner_city').hide()
    }
  });

  $('#service_partner_telephone_number').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_telephone_number').val().length == 0) {
      $('#error_partner_telephone_number').css('display', 'inline')
      $('#error_partner_telephone_number').attr('data-original-title', 'Please enter telephone number')
      $('#error_partner_telephone_number').tooltip()
      return false
    }
    else{
      $('#error_partner_telephone_number').hide()
    }
    if(!$('#service_partner_telephone_number').val().match( /^[0-9]+$/ )){
      $('#error_partner_telephone_number').css('display', 'inline')
      $('#error_partner_telephone_number').attr('data-original-title', 'Only numbers allowed')
      $('#error_partner_telephone_number').tooltip()
      return false
    }
    else{
      $('#error_partner_telephone_number').hide()
    }
  });

  $('#service_partner_fax_number').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_fax_number').val().length == 0){
      $('#error_partner_fax_number').css('display', 'inline')
      $('#error_partner_fax_number').attr('data-original-title', 'Please enter fax number')
      $('#error_partner_fax_number').tooltip()
      return false
    }
    else{
      $('#error_partner_fax_number').hide()
    }
    if(!$('#service_partner_fax_number').val().match( /^[0-9]+$/ )){
      $('#error_partner_fax_number').css('display', 'inline')
      $('#error_partner_fax_number').attr('data-original-title', 'Only numbers allowed')
      $('#error_partner_fax_number').tooltip()
      return false
    }
    else{
      $('#error_partner_fax_number').hide()
    }
  });

  $('#service_partner_email').live('keyup', function() {
    var isTrue = false
    if($('#service_partner_email').val().length == 0){
      $('#error_partner_email').css('display', 'inline')
      $('#error_partner_email').attr('data-original-title', 'Please enter email address')
      $('#error_partner_email').tooltip()
      return false
    }
    else{
      $('#error_partner_email').hide()
    }
    if(!$('#service_partner_email').val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i )){
      $('#error_partner_email').css('display', 'inline')
      $('#error_partner_email').attr('data-original-title', 'Invalid email address')
      $('#error_partner_email').tooltip()
      return false
    }
    else{
      $('#error_partner_email').hide()
    }
  });

  
})

if(location.pathname.substr(0,21) == '/admin/services/edit_') {
  function check_partner_validations() {
    for(var i=1; i<=10; i++){
      switch(i){
        case 1:
          if($('#service_partner_first_name').val().length == 0){
            alert('Please enter first name')
            $('#error_partner_first_name').css('display', 'inline')
            $('#error_partner_first_name').attr('data-original-title', 'Please enter first name')
            $('#error_partner_first_name').tooltip()
            return false
          }
          else if(!$('#service_partner_first_name').val().match( /^[A-Za-z .0-9]+$/ )){
            $('#error_partner_first_name').css('display', 'inline')
            $('#error_partner_first_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('#error_partner_first_name').tooltip()
            return false
          }
          break;
        case 2:
          if($('#service_partner_last_name').val().length == 0){
            alert('Please enter last name')
            $('#error_partner_last_name').css('display', 'inline')
            $('#error_partner_last_name').attr('data-original-title', 'Please enter last name')
            $('#error_partner_last_name').tooltip()
            return false
          }
          else if(!$('#service_partner_last_name').val().match( /^[A-Za-z .0-9]+$/ )){
            $('#error_partner_last_name').css('display', 'inline')
            $('#error_partner_last_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9')
            $('#error_partner_last_name').tooltip()
            return false
          }
          break;
        case 3:
          if($('#service_partner_company_name').val().length == 0){
            alert('Please enter company name')
            $('#error_partner_company_name').css('display', 'inline')
            $('#error_partner_company_name').attr('data-original-title', 'Please enter company name')
            $('#error_partner_company_name').tooltip()
            return false
          }
          else if(!$('#service_partner_company_name').val().match( /^[A-Za-z ,.0-9 -()]+$/ )){
            $('#error_partner_company_name').css('display', 'inline')
            $('#error_partner_company_name').attr('data-original-title', 'Allowed characters: A-Za-z .0-9 -()')
            $('#error_partner_company_name').tooltip()
            return false
          }
          break;
        case 4:
          if($('#service_partner_street').val().length == 0){
            alert('Please enter street')
            $('#error_partner_street').css('display', 'inline')
            $('#error_partner_street').attr('data-original-title', 'Please enter street')
            $('#error_partner_street').tooltip()
            return false
          }
          else if(!$('#service_partner_street').val().match( /^[A-Za-z ,.0-9 -]+$/ )){
            $('#error_partner_street').css('display', 'inline')
            $('#error_partner_street').attr('data-original-title', 'Allowed characters: A-Za-z .0-9 -')
            $('#error_partner_street').tooltip()
            return false
          }
          break;
        case 5:
          if($('#service_partner_zip_code').val().length == 0){
            alert('Please enter zip code')
            $('#error_partner_zip_code').css('display', 'inline')
            $('#error_partner_zip_code').attr('data-original-title', 'Please enter zip code')
            $('#error_partner_zip_code').tooltip()
            return false
          }
          else if(!$('#service_partner_zip_code').val().match( /^[0-9]+$/ )){
            $('#error_partner_zip_code').css('display', 'inline')
            $('#error_partner_zip_code').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_partner_zip_code').tooltip()
            return false
          }
          break;
        case 6:
          if($('#service_partner_city').val().length == 0){
            alert('Please enter city')
            $('#error_partner_city').css('display', 'inline')
            $('#error_partner_city').attr('data-original-title', 'Please enter city')
            $('#error_partner_city').tooltip()
            return false
          }
          else if(!$('#service_partner_city').val().match( /^[A-Za-z ]+$/ )){
            $('#error_partner_city').css('display', 'inline')
            $('#error_partner_city').attr('data-original-title', 'Allowed characters: A-Za-z')
            $('#error_partner_city').tooltip()
            return false
          }
          break;
        case 7:
          if($('#service_partner_telephone_number').val().length == 0){
            alert('Please enter telephone number')
            $('#error_partner_telephone_number').css('display', 'inline')
            $('#error_partner_telephone_number').attr('data-original-title', 'Please enter telephone number')
            $('#error_partner_telephone_number').tooltip()
            return false
          }
          else if(!$('#service_partner_telephone_number').val().match( /^[0-9]+$/ )){
            $('#error_partner_telephone_number').css('display', 'inline')
            $('#error_partner_telephone_number').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_partner_telephone_number').tooltip()
            return false
          }
          break;
        case 8:
          if($('#service_partner_fax_number').val().length == 0){
            alert('Please enter fax number')
            $('#error_partner_fax_number').css('display', 'inline')
            $('#error_partner_fax_number').attr('data-original-title', 'Please enter fax number')
            $('#error_partner_fax_number').tooltip()
            return false
          }
          else if(!$('#service_partner_fax_number').val().match( /^[0-9]+$/ )){
            $('#error_partner_fax_number').css('display', 'inline')
            $('#error_partner_fax_number').attr('data-original-title', 'Numbers allowed: 0-9')
            $('#error_partner_fax_number').tooltip()
            return false
          }
          break;
        case 9:
          if($('#service_partner_email').val().length == 0){
            alert('Please enter email address')
            $('#error_partner_email').css('display', 'inline')
            $('#error_partner_email').attr('data-original-title', 'Please enter email address')
            $('#error_partner_email').tooltip()
            return false
          }
          else if(!$('#service_partner_email').val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i )){
            $('#error_partner_email').css('display', 'inline')
            $('#error_partner_email').attr('data-original-title', 'Please enter valid email address')
            $('#error_partner_email').tooltip()
            return false
          }
          break;
        case 10:
          if($('#service_partner_password').val() != $('#service_partner_retype_password').val()){
            alert('Retype password')
            $('#error_partner_password').css('display', 'inline')
            $('#error_partner_password').attr('data-original-title', 'Please Retype password')
            $('#error_partner_password').tooltip()
            return false
          }
          break;
      }
    }
    if(location.pathname.match( /admin\/services\/.*/) != null){
      f();
    }
  }
  if(location.pathname.match( /admin\/services\/.*/) != null){
    function f(){
      $("#form1").trigger("submit.rails");
    }
  }

  $(document).off('click', 'a[^=delete_service_partner_]')
  $(document).on('click', 'a[id^=delete_service_partner_]', function() {
    var element = $(this).attr('id').split('_').pop()
    if(confirm("Do you really want to delete this contact?")){
      $.ajax({
        url: "/admin/services/delete_service_partner",
        data: {
          id: element
        },
        success: function(return_data){
          if(return_data == 'true'){
            alert('contact deleted')
            location.pathname = "/admin/services"
          }
        }
      })
    }
  })

  $(document).off('click', 'a[id^=manual_approval_]')
  $(document).on('click', 'a[id^=manual_approval_]', function() {
    var element = $(this).attr('id').split('_').pop()
    var today = new Date()
    $.ajax({
      url: "/admin/services/manual_approval",
      data: {
        id: element
      },
      success: function(return_data){
        if(return_data == 'true'){
          $('p.head3_admin_service_p').replaceWith('approved on ' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate())
        }
      }
    })
  })

  $(document).on('click', '#previous_lawyer', function() {
    var url = "/admin/services/edit_lawyer/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice : 1
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path ="/admin/services/edit_lawyer/" + return_data
          location.pathname = new_path
        }
        else{
          alert('This is first record.')
        }
      }
    })
  })

  $(document).on('click', '#next_lawyer', function() {
    var url = "/admin/services/edit_lawyer/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 2
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = "/admin/services/edit_lawyer/" + return_data
          location.pathname = new_path
        }
        else{
          alert('This is last record')
        }
      }
    })
  })

  $(document).on('click', "#previous_expert", function() {
    var url = "/admin/services/edit_expert/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 1,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_expert/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is first record')
        }
      }
    })
  })

  $(document).on('click', "#next_expert", function() {
    var url = "/admin/services/edit_expert/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 2,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_expert/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is last record')
        }
      }
    })
  })

  $(document).on('click', "#previous_shipping_company", function() {
    var url = "/admin/services/edit_shipping_company/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 1,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_shipping_company/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is first record')
        }
      }
    })
  })

  $(document).on('click', "#next_shipping_company", function() {
    var url = "/admin/services/edit_shipping_company/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 2,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_shipping_company/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is last record')
        }
      }
    })
  })

  $(document).on('click', "#previous_insurance_company", function() {
    var url = "/admin/services/edit_insurance_company/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 1,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_insurance_company/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is first record')
        }
      }
    })
  })

  $(document).on('click', "#next_insurance_company", function() {
    var url = "/admin/services/edit_insurance_company/" + $('#partner_id').val()
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        id: $('#partner_id').val(),
        choice: 2,
      },
      success: function(return_data){
        if(return_data != '0'){
          new_path = '/admin/services/edit_insurance_company/' + return_data
          location.pathname = new_path
        }
        else{
          alert('This is last record')
        }
      }
    })
  })

  $(document).off('click', '#resend_invitation')
  $(document).on('click', '#resend_invitation', function() {
    $.ajax({
      url: "/admin/services/resend_invitation",
      data: {
        email: $('#service_partner_email').val(),
        name: $('#service_partner_first_name').val()
      },
      beforeSend: function(){
        $("#ajax-loader-big_for_services_data").show()
        $("#overlay_div_data").show()
      },
      success: function() {
        alert('Invitation sent again')
        $("#ajax-loader-big_for_services_data").hide()
        $("#overlay_div_data").hide()
      }
    })
  })
}
