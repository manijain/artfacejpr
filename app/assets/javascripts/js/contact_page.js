$(function() {

  var valid_name, valid_email, valid_phone, valid_message, valid_concern;
  function validate_captcha() {
    var valid = false
    $.ajax({
      type: 'POST',
      url: '/contact/validate_captcha',
      data: {
        captcha_text: $("#captcha_text").val()
      },
      async: false,
      success: function(data) {
        if (data == "true") {
          valid = true
        } else {
          valid = false
        }
      }
    })
    return valid
  }

  if (window.location.href.split('/')[3] == "contact") {
    $("#contact_page").css({'font-weight':'bold'})

    var key_pressed;
    $(window).keydown(function(e){
      key_pressed = e.keyCode;
    })

    var contact_data_name_validation = new LiveValidation("contact_data_name", {
      onValid: function()  {
        if(!$("#contact_data_name").val().match(/^([^\\w])([^0-9])*$/i)) {
          $("#contact_data_name_error").css("display","inline")
          $("#contact_data_name_error").attr("data-original-title","Please only enter characters")
          $('#contact_data_name_error').tooltip({delay: { show: 500, hide: 100 }})
          valid_name = false
        }
        else {
          $('#contact_data_name_error').hide()
          valid_name = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#contact_data_name").val().length == 0) { 
        } else {
          $("#contact_data_name_error").css("display","inline")
          $("#contact_data_name_error").attr("data-original-title","Please enter your name")
          $("#contact_data_name_error").tooltip({delay: { show: 500, hide: 100 }})
          valid_name = false
        }
      }
    });
    contact_data_name_validation.add(Validate.Presence);

    var contact_data_concern_validation = new LiveValidation("contact_data_concern", {
      onValid: function() {
        if ($('#contact_data_concern>option:selected').index() == 0) {
          $("#contact_data_concern_error").css("display","inline")
          $("#contact_data_concern_error").attr("data-original-title","Please select a concern")
          $("#contact_data_concern_error").tooltip({delay: { show: 500, hide: 100 }})
          valid_concern = false
        } else  {
          $("#contact_data_concern_error").hide()
          valid_concern = true
        }
      },
      onInvalid: function() {
        if (key_pressed == 9 && $('#contact_data_concern>option:selected').index() == 0) { 
        } else {
          $("#contact_data_concern_error").css("display","inline")
          $("#contact_data_concern_error").attr("data-original-title","Please select a concern")
          $("#contact_data_concern_error").tooltip({delay: { show: 500, hide: 100 }})
          valid_concern = false
        }
      }
    });
    contact_data_concern_validation.add(Validate.Presence);

    var contact_data_email_address_validation = new LiveValidation("contact_data_email_address", {
      onValid: function() {
        if (!$("#contact_data_email_address").val().match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
          $("#contact_data_email_address_error").css("display","inline")
          $("#contact_data_email_address_error").attr("data-original-title","Invalid email address input")
          $('#contact_data_email_address_error').tooltip({delay: { show: 500, hide: 100 }})
          valid_email = false
        }
        else
        {
          $('#contact_data_email_address_error').hide()
          $("#contact_data_email_address_error").attr("data-original-title","Please enter an email address")
          valid_email = true
        }
      },
      onInvalid: function() {
        if (key_pressed == 9 && $("#contact_data_email_address").val().length == 0) { 
        } else {
          $("#contact_data_email_address_error").attr("data-original-title","Please enter an email address")
          $("#contact_data_email_address_error").css("display","inline")
          $('#contact_data_email_address_error').tooltip({delay: { show: 500, hide: 100 }})
          valid_email = false
        }
      }
    });
    contact_data_email_address_validation.add(Validate.Presence);

    contact_data_phone_number_validation = new LiveValidation("contact_data_phone_number", {
      onValid: function() {
        if(!$("#contact_data_phone_number").val().match(/^[0-9+ ]+$/)) {
          $("#contact_data_phone_number_error").attr("data-original-title", "Allowed characters - (0-9, +)")
          $("#contact_data_phone_number_error").css("display", "inline")
          $("#contact_data_phone_number_error").tooltip({delay: { show: 500, hide: 100 }})
          valid_phone = false
        }
        else
        {
          $('#contact_data_phone_number_error').hide()
          valid_phone = true
        }
      },
      onInvalid: function() { 
        $('#contact_data_phone_number_error').hide()
      }
    });
    contact_data_phone_number_validation.add(Validate.Presence);
    
    contact_data_message_validation = new LiveValidation("contact_data_message", {
      onValid: function() {
        if(!$("#contact_data_message").val().match(/^([A-Z])*$/i)) {
          $("#contact_data_message_error").css("display","inline")
          $("#contact_data_message_error").attr("data-original-title","Please only enter alpha numeric characters")
          $('#contact_data_message_error').tooltip({delay: { show: 500, hide: 100 }})
          valid_message = false
        } else {
          $('#contact_data_message_error').hide()
          valid_message = true
        }
      },
      onInvalid: function() {
        if (key_pressed == 9 && $("#contact_data_message").val().length == 0) { 
        } else if ($("#contact_data_message").val().length == 0)
        {
          $("#contact_data_message_error").css("display","inline")
          $("#contact_data_message_error").attr("data-original-title","Please enter your message")
          $('#contact_data_message_error').tooltip({delay: { show: 500, hide: 100 }})
          
          valid_message = false
        }
      }
    });
    contact_data_message_validation.add(Validate.Presence)
  }

  if (window.location.href.split('/')[3] != "contact") {
    return 0
  }

  serialize_contact_data = function() {
    var values = {}
    values["contact[name]"]          = $("#contact_data_name").val()
    values["contact[concern]"]       = $("#contact_data_concern").val()
    values["contact[email_address]"] = $("#contact_data_email_address").val()
    values["contact[phone_number]"]  = $("#contact_data_phone_number").val()
    values["contact[message]"]       = $("#contact_data_message").val()
    return values
  }

  function send_contact_form_data() {
    var contact_form_data = serialize_contact_data()
    $.ajax({
      type: 'POST',
      url: "/contact",
      data: contact_form_data,
      success: function(data) {
        location.reload()
      },
      error: function(data) {
        location.reload()
      }
    })
  }
  

  function validate_contact_form() {
    var valid = true

    if($("#contact_data_email_address").val().length > 0) {
      if (!$("#contact_data_email_address").val().match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
        $("#contact_data_email_address_error").css("display","inline")
        $("#contact_data_email_address_error").attr("data-original-title","Invalid email address input")
        $('#contact_data_email_address_error').tooltip({delay: { show: 500, hide: 100 }})
        valid = false
      }
      else
      {
        $('#contact_data_email_address_error').hide()
        $("#contact_data_email_address_error").attr("data-original-title","Please enter an email address")
        valid = true && valid
      }      
    } else {
      $("#contact_data_email_address_error").attr("data-original-title","Please enter an email address")
      $("#contact_data_email_address_error").css("display","inline")
      $('#contact_data_email_address_error').tooltip({delay: { show: 500, hide: 100 }})
      valid = false
    }

    if ($("#contact_data_phone_number").val().length > 0) {
      if(!$("#contact_data_phone_number").val().match(/^[0-9+ ]+$/)) {
        $("#contact_data_phone_number_error").css("display","inline")
        $('#contact_data_phone_number_error').tooltip({delay: { show: 500, hide: 100 }})
        valid = false
      }
      else
      {
        $('#contact_data_phone_number_error').hide()
        valid = true && valid
      }
    } else {
      $('#contact_data_phone_number_error').hide()
        valid = true && valid
    }

    if($("#contact_data_name").val().length > 0) {
      if(!$("#contact_data_name").val().match(/^([^\\w])([^0-9])*$/i)) {
        $("#contact_data_name_error").css("display","inline")
        $("#contact_data_name_error").attr("data-original-title","Please only enter characters")
        $('#contact_data_name_error').tooltip({delay: { show: 500, hide: 100 }})
        valid = false
      }
      else
      {
        $('#contact_data_name_error').hide()
        valid = true && valid
      }
    } else {
      $("#contact_data_name_error").css("display","inline")
      $("#contact_data_name_error").attr("data-original-title","Please enter your name")
      $("#contact_data_name_error").tooltip({delay: { show: 500, hide: 100 }})
      valid = false
    }

    if ($("#contact_data_message").val().length > 0) {
      if(!$("#contact_data_message").val().match(/^([^\\w])*$/i)) {
        $("#contact_data_message_error").css("display","inline")
        $("#contact_data_message_error").attr("data-original-title","Please only enter alpha numeric characters")
        $('#contact_data_message_error').tooltip({delay: { show: 500, hide: 100 }})
        valid = false
      } else {
        $('#contact_data_message_error').hide()
        valid = true && valid
      }
    } else {
      $("#contact_data_message_error").css("display","inline")
      $("#contact_data_message_error").attr("data-original-title","Please enter your message")
      $("#contact_data_message_error").tooltip({delay: { show: 500, hide: 100 }})
      valid = false
    }
    if ($('#contact_data_concern>option:selected').index() == 0) {
      $("#contact_data_concern_error").css("display","inline")
      $("#contact_data_concern_error").attr("data-original-title","Please select a concern")
      $("#contact_data_concern_error").tooltip({delay: { show: 500, hide: 100 }})
      valid = false
    } else  {
      $("#contact_data_concern_error").hide()
      valid = true && valid
    }

    if(!valid) {
      $(".site_wide_error").css({display: 'block'})
      $(".site_wide_error_text").text("Please check the errors.")
    }
    if (valid) {
      $(".site_wide_error").css({display: 'none'})
      $(".site_wide_error_text").text('');
    }
    return valid
  }

  $("#contact_form_submit").click(function(e) {
    var name          = $("#contact_data_name").val()
    var email_address = $("#contact_data_email_address").val()
    var message       = $("#contact_data_message").val()
    html_string = '<img src="/images/ajax-loader.gif" style="width:36px;"></img>'
    $("#ajax_loader").html(html_string)

    if(validate_contact_form()) {
      if (validate_captcha()) {
        $(".site_wide_error").css({display: 'none'})
        $(".site_wide_error_text").text('');        
        send_contact_form_data()
      }
      else {
        $(".site_wide_error").css({display: 'block'})
        $(".site_wide_error_text").text("Captcha Text Invalid")
        $("#ajax_loader").html("")
      }
    }
    else {
      $("#ajax_loader").html("")
    }
  })

  $("#email_error, #name_error, #message_error").focusout(function() {
    $(".tooltip").css("display", "none")
  })

})
