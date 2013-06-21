var subscription_plan = ""

function get_domain_name() {
  var url = window.location.href.split("#")[0]
  var url_parts = url.split('/')
  return url_parts[url_parts.length-1]
}

function set_nav() {
  var temp = get_domain_name()
  if(temp.length > 1){
    $('.c_nav_link_bar_'+temp).css({"font-weight":"bold"})
  } else{
    $('.c_nav_link_bar_home').css({"font-weight":"bold"})
  }
}

function hide_layout(layout_name) {
  $('.sign_up_layout_'+layout_name).css({"display":"none"})
}

function show_layout(layout_name) {
  $('.sign_up_layout_'+layout_name).css({"display":"block"})
}

function one_to_two() {
  if (validate_step_one() == true) {
    hide_layout('one')
    layout_one_to_two()
    show_layout('two')
  }
}

function layout_one_to_two() {
  $("#confirm_user_gender").html($("#user_salutation").val())
  $("#confirm_user_first_name").html($("#user_first_name").val())
  $("#confirm_user_last_name").html($("#user_last_name").val())
  $("#confirm_user_company").html($("#user_company").val())
  $("#confirm_user_street").html($("#user_street").val())
  $("#confirm_user_zip_code").html($("#user_zip_code").val())
  $("#confirm_user_city").html($("#user_city").val())
  $("#confirm_user_country").html($("#user_country").val())  
  $("#confirm_user_phone_number").html($("#user_phone_number").val())
  $("#confirm_user_fax_number").html($("#user_fax_number").val())
  $("#confirm_user_tax_id").html($("#user_tax_id").val())
  $("#confirm_user_email").html($("#user_email").val())
  $("#confirm_user_password").html($("#user_password").val())
  $("#email_placeholder").text($("#user_email").val())
  if ($("#radio_payment_paypal").is(":checked") == false) {
    $("#confirm_credit_card_type").html($("#card_type").val()) 
    $("#confirm_card_number").html($("#card_number").val())
    $("#confirm_card_owner").html($("#card_owner").val())
    $("#confirm_card_code").html($("#card_code").val())
    $("#confirm_card_expiry_month").html($("#card_expiry_month").val())
    $("#confirm_card_expiry_year").html($("#card_expiry_year").val())
  } else {
    $("#confirm_payment_method_card").hide()
    $("#confirm_payment_method_paypal").show()
  }
  
  $("#confirm_subscription_package_renewal").html($("#subscription_package_renewal").val())
  
  if($("#radio_payment_card").is(":checked") == true) {
    $("#confirm_subscription_method_card").css({"display":"inline"})
    $("#confirm_subscription_method_paypal").css({"display":"none"})
    $("#confirm_subscription_method_bank_transfer").css({"display":"none"})
  }
  
  if($("#radio_payment_paypal").is(":checked") == true) {
    $("#confirm_subscription_method_card").css({"display":"none"})
    $("#confirm_subscription_method_paypal").css({"display":"inline"})
    $("#confirm_subscription_method_bank_transfer").css({"display":"none"})
  }
  
  if($("#radio_payment_bank").is(":checked") == true) {
    $("#confirm_subscription_method_bank_transfer").css({"display":"inline"})
    $("#confirm_subscription_method_paypal").css({"display":"none"})
    $("#confirm_subscription_method_card").css({"display":"none"})
  }

  switch(subscription_plan) {
    case 'basic':
      $("#confirm_subscription_package").html("Basic")
      $("#confirm_annual_price").html($("#price_basic").html())
      $("#confirm_available_offers").html($("#limit_basic").html())
      $("#confirm_viewable_offers").html("unlimited")
      $("#confirm_subscription_method").html("")
    break
    case 'plus':
      $("#confirm_subscription_package").html("Plus")
      $("#confirm_annual_price").html($("#price_plus").html())
      $("#confirm_available_offers").html($("#limit_basic").html())
      $("#confirm_viewable_offers").html("unlimited")
      $("#confirm_subscription_method").html("")
    break
    case 'pro':
      $("#confirm_subscription_package").html("Pro")
      $("#confirm_annual_price").html($("#price_pro").html())
      $("#confirm_available_offers").html($("#limit_basic").html())
      $("#confirm_viewable_offers").html("unlimited")
      $("#confirm_subscription_method").html("")
    break
    case 'premium':
      $("#confirm_subscription_package").html("Premium")
      $("#confirm_annual_price").html($("#price_premium").html())
      $("#confirm_available_offers").html($("#limit_basic").html())
      $("#confirm_viewable_offers").html("unlimited")
      $("#confirm_subscription_method").html("")
    break
    case 'no_limit':
      $("#confirm_subscription_package").html("No Limit")
      $("#confirm_annual_price").html($("#price_no_limit").html())
      $("#confirm_available_offers").html("unlimited")
      $("#confirm_viewable_offers").html("unlimited")
      $("#confirm_subscription_method").html("")
    break
  }
}

function exists(temp) {
  return temp.length > 0
}

function clear_errors() {
  $("#user_password_confirmation, #user_first_name, #user_last_name, #user_company, #user_street, #user_zip_code, #user_city, #user_phone_number, #user_fax_number, #user_tax_id, #user_email, #user_password, #card_number, #card_owner, #card_code, #card_expiry_year, #card_number, #user_password").css({"box-shadow":"none"})
  $("#user_email_error_taken, #user_email_error_invalid, #password_mismatch_error, #user_country_error, #error_user_email").css({"display":"none"})
  $("#user_country").css({"font-weight": "normal"})
  $("#card_expiry_month").css({"color":"black", "font-weight":"normal"})
  $("#card_type").css({"font-weight": "normal", "color":"black"})
  $("#error_user_email").css({'display':'none'})
}

function validate_step_one() {
  clear_errors()
  var validations                = []
  var return_value               = false
  var temp_return_value          = true
  var user_gender                = $("#user_salutation")
  var user_first_name            = $("#user_first_name")
  var user_last_name             = $("#user_last_name")
  var user_company               = $("#user_company")
  var user_street                = $("#user_street")
  var user_zip_code              = $("#user_zip_code")
  var user_city                  = $("#user_city")
  var user_phone_number          = $("#user_phone_number")
  var user_fax_number            = $("#user_fax_number")
  var user_tax_id                = $("#user_tax_id")
  var user_email                 = $("#user_email")
  var user_password              = $("#user_password")
  var user_password_confirmation = $("#user_password_confirmation")
  var card_number                = $("#card_number")
  var card_owner                 = $("#card_owner")
  var card_code                  = $("#card_code")
  var card_expiry_month          = $("#card_expiry_month")
  var card_expiry_year           = $("#card_expiry_year")
  var user_country               = $("#user_country")
  var card_type                  = $("#card_type")
  validations.push(user_first_name)
  validations.push(user_last_name)
  validations.push(user_street)
  validations.push(user_zip_code)
  validations.push(user_city)
  //validations.push(user_phone_number)
  //validations.push(user_fax_number)
  validations.push(user_email)
  validations.push(user_password)


  if ($("#radio_payment_card").is(":checked")) {
    validations.push(card_number)
    validations.push(card_owner)
    validations.push(card_code)
  }

  $.each(validations, function () {
    if (this.val() == "") {
      $("#error_"+this[0].id).tooltip('destroy');
      $("#error_"+this[0].id).css({"display":"inline"}).tooltip({delay: { show: 500, hide: 100 }})
      switch("error_"+this[0].id) {
        case 'error_user_first_name':
          $("#error_user_first_name").attr({"data-original-title":"Please enter your first name"})
        break
        case 'error_user_last_name':
          $("#error_user_last_name").attr({"data-original-title":"Please enter your last name"})
        break
        case 'error_user_zip_code':
          $("#error_user_zip_code").attr({"data-original-title":"Please enter your zip code"})
        break
        case 'error_user_city':
          $("#error_user_city").attr({"data-original-title":"Please enter your city name"})
        break;
        case 'error_user_email':
          $("#error_user_email").attr({"data-original-title":"Please enter your email address"})
        break
        case 'error_user_password':
          $("#error_user_password").attr({"data-original-title":"Please enter a password"})
          break
        case 'error_user_phone_number':
            $("#error_user_phone_number").attr({"data-original-title":"Please enter a phone number"})
        break
        case 'error_card_number':
            $("#error_card_number").attr({"data-original-title":"Please enter the card number"})
        break;

        default:

        break;
      }
      temp_return_value = false
    }
    else {
      $("#error_"+this[0].id).css({"display":"none"})
    }
  })

  if (temp_return_value == false) {
    $(".site_wide_error").css({display: 'block'})
    $(".site_wide_error_text").text('Please check the errors.')
  } else {
    $(".site_wide_error").css({display: 'none'})    
    $(".site_wide_error_text").text('')
  }

  if($("#user_email").val() != '') {
    $.ajax({
      url: "/user_registration/registration_check_for_email",
      data: "email=" + $("#user_email").val(),
      async: false,
      success: function(data) {
        if (data != "false") {
          $("#error_user_email").css("display","inline")
          $("#error_user_email").attr("data-original-title","Email address already in use")
          $('#error_user_email').tooltip({delay: { show: 500, hide: 100 }})
          temp_return_value = false
        } else {
          $("#error_user_email").css("display","none")
          $("#error_user_email").attr("data-original-title","Please enter your email address")
        }
      }
    })
  }

  if ($("#radio_payment_card").is(":checked") == true) {
    if (card_number.val().length != 16 && !(card_number.val().match(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/))) {
      $("#error_card_number").tooltip('destroy')
      $("#error_card_number").css({"display":"inline"}).attr({"data-original-title": "Card number not valid"}).tooltip({delay: { show: 500, hide: 100 }});
      temp_return_value = false
    }
    if (!card_number.val().match(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/)) {
      $("#error_card_number").tooltip('destroy')
      $("#error_card_number").css({"display":"inline"}).attr({"data-original-title": "Card number not valid"}).tooltip({delay: { show: 500, hide: 100 }});
      temp_return_value = false
    }
    if (!card_owner.val().match(/^([^\\w])([^0-9])*$/i)) {
      $("#error_card_owner").tooltip('destroy')
      $("#error_card_owner").css({"display":"inline"}).attr({"data-original-title": "Only characters allowed"}).tooltip({delay: { show: 500, hide: 100 }});
      temp_return_value = false
    }
    if (!card_code.val().match(/^[0-9]{3,3}/)) {
      $("#error_card_code").tooltip('destroy')
      $("#error_card_code").css({"display":"inline"}).attr({"data-original-title": "Card code invalid"}).tooltip({delay: { show: 500, hide: 100 }});
      temp_return_value = false
    }
    $("#error_card_expiry_month").hide();
    if (card_expiry_year.val() == "2013") {
      var temp = new Date().getUTCMonth() + 1
      if (card_expiry_month.val() < temp) {
        $("#error_card_expiry_month").tooltip('destroy')
        $("#error_card_expiry_month").css({"display":"inline"}).attr({"data-original-title": "Please choose valid card expiry month"}).tooltip({delay: { show: 500, hide: 100 }});
        temp_return_value = false
      }
    }
    $("#error_card_type").hide()
    if (card_type.val() == "Credit Card type") {
      $("#error_card_type").tooltip('destroy')
      $("#error_card_type").css({"display":"inline"}).attr({"data-original-title": "Please choose a credit card type"}).tooltip({delay: { show: 500, hide: 100 }});
      temp_return_value = false
    }
  }

  if (temp_return_value == false) {
    $(".site_wide_error").css({display: 'block'})
    $(".site_wide_error_text").text('Please check the errors.')
  } else {
    $(".site_wide_error").css({display: 'none'})    
    $(".site_wide_error_text").text('')
  }
  return temp_return_value
}


function go_back() {
  hide_layout('two')
  show_layout('one')  
}

function temp() {
  hide_layout('one')
  show_layout('two')
}

$.fn.serializeObject = function() {
  var values = {}
  values["user[email]"]             = $("#user_email").val()
  values["user[password]"]          = $("#user_password").val()
  values["user[user_first_name]"]   = $("#user_first_name").val()
  values["user[user_last_name]"]    = $("#user_last_name").val()
  values["user[user_company]"]      = $("#user_company").val()
  values["user[user_street]"]       = $("#user_street").val()
  values["user[user_zip_code]"]     = $("#user_zip_code").val()
  values["user[user_country]"]      = $("#user_country").val()
  values["user[user_phone_number]"] = $("#user_phone_number").val()
  values["user[user_salutation]"]   = $("#user_salutation").val()
  values["user[user_fax_number]"]   = $("#user_fax_number").val()
  values["user[user_city]"]         = $("#user_city").val()
  values["user[user_tax_id]"]       = $("#user_tax_id").val()
  return values
}

serializeValues = function(user_id) {
  var values = {}
  values["subscription_plan"]  = subscription_plan
  values["card_type"]          = $("#card_type").val()
  values["card_number"]        = $("#card_number").val()
  values["card_owner"]         = $("#card_owner").val()
  values["card_expiry_month"]  = $("#card_expiry_month").val()
  values["card_expiry_year"]   = $("#card_expiry_year").val()
  values["user_id"]            = user_id
  values["subscription_package_renewal"]   = $("#subscription_package_renewal").val()
  if ($("#radio_payment_card").is(':checked')) {
    values["payment_type"]     = "credit_card"
  }
  else if ($("#radio_payment_paypal").is(':checked')) {
    values["payment_type"]     = "paypal_checkout"
  }
  else if ($("#radio_payment_bank").is(':checked')) {
    values["payment_type"]     = "bank_transfer"
  }
  return values
}

function show_step_four() {
  hide_layout('two')
  $(".step_four").show()
}

$(function(){

  var key_pressed;
  $(window).keydown(function(e) {
    key_pressed = e.keyCode;
  })

  var valid_user_first_name, valid_user_last_name, valid_user_zip_code, valid_user_email, valid_user_password, valid_user_phone, valid_user_company, valid_user_street, valid_user_city, valid_user_fax
  if (location.pathname == "/users/register") {

    // user_first_name_validation
      var user_first_name_validation = new LiveValidation("user_first_name", {
        onValid: function()  {
          if(!$("#user_first_name").val().match(/^([^\\w])([^0-9])*$/i)) {
            $("#error_user_first_name").css("display","inline")
            $("#error_user_first_name").attr("data-original-title","Only characters allowed")
            $('#error_user_first_name').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_first_name = false
          }
          else {
            $('#error_user_first_name').hide()
            valid_user_first_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_first_name").val().length == 0) {
          } else {
            $("#error_user_first_name").css("display","inline")
            $("#error_user_first_name").attr("data-original-title","Please enter your first name")
            $("#error_user_first_name").tooltip({delay: { show: 500, hide: 100 }})
            valid_user_first_name = false
          }      
        }
      });
      user_first_name_validation.add(Validate.Presence);
    // user_last_name_validation
      var user_last_name_validation = new LiveValidation("user_last_name", {
        onValid: function()  {
          if(!$("#user_last_name").val().match(/^([^\\w])([^0-9])*$/i)) {
            $("#error_user_last_name").css("display","inline")
            $("#error_user_last_name").attr("data-original-title","Only characters allowed")
            $('#error_user_last_name').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_last_name = false
          }
          else {
            $('#error_user_last_name').hide()
            valid_user_last_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_last_name").val().length == 0) {
          } else {
            $("#error_user_last_name").css("display","inline")
            $("#error_user_last_name").attr("data-original-title","Please enter your last name")
            $("#error_user_last_name").tooltip({delay: { show: 500, hide: 100 }})
            valid_user_first_name = false
          }
        }
      });
      user_last_name_validation.add(Validate.Presence);
    // user_zip_code_validation
      var user_zip_code_validation = new LiveValidation("user_zip_code", {
        onValid: function()  {
          if(!$("#user_zip_code").val().match(/^([^\\w])*$/i)) {
            $("#error_user_zip_code").css("display","inline")
            $("#error_user_zip_code").attr("data-original-title","Only characters allowed")
            $('#error_user_zip_code').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_zip_code = false
          }
          else {
            $('#error_user_zip_code').hide()
            valid_user_zip_code = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_zip_code").val().length == 0) {
          } else {
            $("#error_user_zip_code").css("display","inline")
            $("#error_user_zip_code").attr("data-original-title","Please enter your zip code")
            $("#error_user_zip_code").tooltip({delay: { show: 500, hide: 100 }})
            valid_user_zip_codel = false
          }
        }
      });
      user_zip_code_validation.add(Validate.Presence);
    //user_email_validation
      var user_email_validation = new LiveValidation("user_email", {
        onValid: function()  {
          if(!$("#user_email").val().match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
            $("#error_user_email").css("display","inline")
            $("#error_user_email").attr("data-original-title","Email address not valid")
            $('#error_user_email').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_email = false
          }
          else {
            $('#error_user_email').hide()
            valid_user_email = false
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_email").val().length == 0) {
          } else {
            $("#error_user_email").css("display","inline")
            $("#error_user_email").attr("data-original-title","Please enter your email address")
            $("#error_user_email").tooltip({delay: { show: 500, hide: 100 }})
            valid_user_email = false
          }
        }
      });
      user_email_validation.add(Validate.Presence);
    //user_password_validation
      var user_password_validation = new LiveValidation("user_password", {
        onValid: function()  {
          if(!$("#user_password").val().match(/((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i)) {
            $("#error_user_password").css("display","inline")
            $("#error_user_password").attr("data-original-title","Password should be in proper format")
            $('#error_user_password').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_password = false
          }
          else {
            $('#error_user_password').hide()
            valid_user_password = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_password").val().length == 0) {
          } else {
            $("#error_user_password").css("display","inline")
            $("#error_user_password").attr("data-original-title","Please enter your password")
            $("#error_user_password").tooltip({delay: { show: 500, hide: 100 }})
            valid_user_password = false
          }
        }
      });
      user_password_validation.add(Validate.Presence);
    //user_company_validation
      var user_company_validation = new LiveValidation("user_company", {
        onValid: function()  {
          if(!$("#user_company").val().match(/^([^\\w])*$/i)) {
            $("#user_company_error").css("display","inline")
            $("#user_company_error").attr("data-original-title","Invalid Company name")
            $('#user_company_error').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_company = false
          }
          else {
            $('#user_company_error').hide()
            valid_user_company = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_company").val().length == 0) {
          } else {
            $('#user_company_error').hide()
          }
        }
      });
      user_company_validation.add(Validate.Presence);
    //user_street_validation
      var user_street_validation = new LiveValidation("user_street", {
        onValid: function()  {
          if(!$("#user_street").val().match(/^[0-9A-Z -]+$/i)) {
            $("#user_street_error").css("display","inline")
            $("#user_street_error").attr("data-original-title","Invalid street number")
            $('#user_street_error').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_street = false
          }
          else {
            $('#error_user_street').hide()
            valid_user_street = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_street").val().length == 0) {
          } else {
            $("#error_user_street").css("display","inline")
            $("#error_user_street").attr("data-original-title","Please enter street number")
            $('#error_user_street').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_street = false
          }
        }
      });
      user_street_validation.add(Validate.Presence);
    //user_city_validation
      var user_city_validation = new LiveValidation("user_city", {
        onValid: function() {
          if(!$("#user_city").val().match(/^[^\\w -]+$/i)) {
            $("#error_user_city").css("display","inline")
            $("#error_user_city").attr("data-original-title","Invalid input")
            $('#error_user_city').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_city = false
          }
          else {
            $('#error_user_city').hide()
          }
        },
        onInvalid: function() {
          if (key_pressed == 9 && $("#user_city").val().length == 0) {
          } else {
            $("#error_user_city").css("display","inline")
            $("#error_user_city").attr("data-original-title","Please enter your city ")
            $('#error_user_city').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_city = false
          }
        }
      });
      user_city_validation.add(Validate.Presence);
    //user_phone_validation
      var user_phone_validation = new LiveValidation("user_phone_number", {
        onValid: function() {
          if(!$("#user_phone_number").val().match(/^[0-9 +-]+$/)) {
            $("#error_user_phone_number").css("display","inline")
            $("#error_user_phone_number").attr("data-original-title","Only numbers allowed")
            $('#error_user_phone_number').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_phone = false
          }
          else {
            $('#error_user_phone_number').hide()
            valid_user_phone = true
          }
        },
        onInvalid: function() {
          $('#error_user_phone_number').hide()
        }
      });
      user_phone_validation.add(Validate.Presence);
    //user_fax_validation
      var user_fax_validation = new LiveValidation("user_fax_number", { 
        onValid: function() {
          if(!$("#user_fax_number").val().match(/^[0-9 +-]+$/)) {
            $("#error_user_fax_number").css("display","inline")
            $("#error_user_fax_number").attr("data-original-title","Only numbers allowed")
            $('#error_user_fax_number').tooltip({delay: { show: 500, hide: 100 }})
            valid_user_fax = false
          }
          else {
            $('#error_user_fax_number').hide()
            $("#error_user_fax_number").attr("data-original-title", "Please enter your fax number")
            valid_user_fax = true
          }
        },
        onInvalid: function() {
          $('#error_user_fax_number').hide()
          $("#error_user_fax_number").attr("data-original-title", "Please enter your fax number")
        }
      });
      user_fax_validation.add(Validate.Presence);
    //user_card_number_validation
      var user_card_number_validation = new LiveValidation("card_number", { 
        onValid: function() {
          if ($("#card_number").val().length > 11 && $("#card_number").val().length < 17) {
            if(!$("#card_number").val().match(/(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/)) {
              $("#error_card_number").css("display","inline")
              $("#error_card_number").attr("data-original-title","Enter valid card number")
              $('#error_card_number').tooltip({delay: { show: 500, hide: 100 }})
              valid_user_fax = false
            } else {
              $("#error_card_number").css("display","none")
              $("#error_card_number").attr("data-original-title","Enter valid card number")
              $('#error_card_number').tooltip({delay: { show: 500, hide: 100 }})
            }
          } else {
            $("#error_card_number").css("display","inline")
            $("#error_card_number").attr("data-original-title","Enter valid card number")
            $('#error_card_number').tooltip({delay: { show: 500, hide: 100 }})
          }
        },
        onInvalid: function() {
          if (key_pressed == 9 && $("#card_number").val().length == 0) {
          } else {
            $("#error_card_number").css("display","inline")
            $("#error_card_number").attr("data-original-title","Please enter your card number")
            $('#error_card_number').tooltip({delay: { show: 500, hide: 100 }})
          }
        }
      });
      user_card_number_validation.add(Validate.Presence);
    //user_card_owner_validation
      var user_card_owner_validation = new LiveValidation("card_owner", { 
        onValid: function() {
          if(!$("#card_owner").val().match(/^([^\\w])*$/i)) {
            $("#error_card_owner").css("display","inline")
            $("#error_card_owner").attr("data-original-title","Only characters allowed")
            $('#error_card_owner').tooltip({delay: { show: 500, hide: 100 }})
            valid_card_owner = false
          }
          else {
            $('#error_card_owner').hide()
            $("#error_card_owner").attr("data-original-title", "Please enter card owner name")
            valid_card_owner = true
          }
        },
        onInvalid: function() {
          if (key_pressed == 9 && $("#card_owner").val().length == 0) {
          } else {
            $('#error_card_owner').css("display","inline")
            $("#error_card_owner").attr("data-original-title", "Please enter card owner name")
            $('#error_card_owner').tooltip({delay: { show: 500, hide: 100 }})
          }
        }
      });
      user_card_owner_validation.add(Validate.Presence);
    //user_card_code_validation
      var user_card_code_validation = new LiveValidation("card_code", { 
        onValid: function() {
          if(!$("#card_code").val().match(/^[0-9]{3,4}$/)) {
            $("#error_card_code").css("display","inline")
            $("#error_card_code").attr("data-original-title","Verification code invalid")
            $('#error_card_code').tooltip({delay: { show: 500, hide: 100 }})
            valid_card_code = false
          }
          else {
            $('#error_card_code').hide()
            $("#error_card_code").attr("data-original-title", "Please enter verification code")
            valid_card_code = true
          }
        },
        onInvalid: function() {
          if (key_pressed == 9 && $("#card_code").val().length == 0) {
          } else {
            $('#error_card_code').css("display","inline")
            $("#error_card_code").attr("data-original-title", "Please enter verification code")
            $('#error_card_code').tooltip({delay: { show: 500, hide: 100 }})
          }
        }
      });
      user_card_code_validation.add(Validate.Presence);
  }

  $("#form_submit").click(function(e){
    if (document.getElementById("terms_agree_check").checked == false) {
      alert("Please accept the terms and conditions.")
      return 0
    }
    var user_info = $(this).serializeObject()
    $.ajax({
      type: "POST",
      url: "/users",
      data: user_info,
      success: function(json){
        var user_id = json.id
        if ($("#radio_payment_card").is(":checked")) {
          var checkout_info = serializeValues(user_id)
          $.ajax({
            type: 'POST',
            url: "/checkout",
            async: false,
            data: checkout_info,
            dataType: "json",
            success: function(json) {
              hide_layout('one')
              hide_layout('two')
              show_step_four()
            },
            error: function(json) {
              
            }
          })
        } else if ($("#radio_payment_bank").is(":checked")) {
          values = {}
          values["subscription[user_id]"] = user_id 
          values["subscription[subscription_plan_id]"] = subscription_plan
          values["subscription_package_renewal"]   = $("#subscription_package_renewal").val()
          if ($("#radio_payment_card").is(':checked')) {
            values["payment_type"]     = "credit_card"
          }
          else if ($("#radio_payment_paypal").is(':checked')) {
            values["payment_type"]     = "paypal_chechout"
          }
          else if ($("#radio_payment_bank").is(':checked')) {
            values["payment_type"]     = "bank_transfer"
          }
          $.post(
            "/subscription/bank_transfer",
            values,
            function(data) {
              if(data == "true") {
                hide_layout('one')
                hide_layout('two')
                show_step_four()
              }
            } 
          )
        }
        else {
          window.location.href = "/subscription/new/?user_id=" + user_id + "&plan=" + subscription_plan
        }
      },
      error: function(json) {
        var obj = jQuery.parseJSON(json.responseText)
        if(typeof(obj.errors) == "object") {
          if (exists(obj.errors.email)) {
            show_layout('one')
            hide_layout('two')
            $("#user_email").css({"box-shadow":"0px 0px 4px blue"})
            switch(String(obj.errors.email)) {
              case 'has already been taken':
                $("#user_email_error_taken").css({"display":"inline"})
                $("#error_user_email").css({'display':'inline'})
                $("#error_user_email").tooltip('destroy')
                $("#error_user_email").attr('data-original-title', 'Email address already in use')
                $("#error_user_email").tooltip({delay: { show: 500, hide: 100 }})
              break
            }
          }
        }
      },
      dataType: "json"
    })
  })

  $("#radio_payment_card").click(function() {
    $("#radio_payment_card_div_two, #radio_payment_paypal_div_one, #radio_payment_bank_div_one").css({"display":"none"})
    $("#radio_payment_card_div_one, #radio_payment_paypal_div_two, #radio_payment_bank_div_two").css({"display":"inline"})
  })
  
  
  $("#radio_payment_paypal").click(function() {
    $("#radio_payment_card_div_one, #radio_payment_paypal_div_two, #radio_payment_bank_div_one").css({"display":"none"})
    $("#radio_payment_bank_div_two, #radio_payment_card_div_two, #radio_payment_paypal_div_one").css({"display":"inline"})
  })
  
  $("#radio_payment_bank").click(function() {
    $("#radio_payment_paypal_div_two, #radio_payment_bank_div_one, #radio_payment_card_div_two").css({"display":"inline"})
    $("#radio_payment_bank_div_two, #radio_payment_paypal_div_one, #radio_payment_card_div_one").css({"display":"none"})
  })

  $("#user_toggle_password_visibility").click(function() {
    if($("#user_toggle_password_visibility").is(":checked")) {
      $("#user_password").prop('type',"text")
    } else {
      $("#user_password").prop('type',"password")
    }
  })

})


function register_copy_to_next(temp) {
  $("span[id^=plan_], span[id^=price_], span[id^=limit_]").hide()
  $("#plan_"+temp+", #price_"+temp+", #limit_"+temp).css({"display":"inline"})
}

function sign_up_all(plan) {
  $(".sign_up_layout_zero").hide()
  show_layout('one')
  subscription_plan = plan
  register_copy_to_next(plan)
}

function show_step_zero() {
  $(".sign_up_layout_zero").show()
}

function temptemp() {
  set_nav()
  if (window.location.pathname == "/users/register") {
    hide_layout('one')
    hide_layout('two')
  }

  if (!!window.location.href.split('=')[1]) {
    hide_layout('one')
    hide_layout('two')
    sign_up_all((window.location.href.split('='))[1])
  }
}

window.onload = temptemp

function go_step_one() {
  hide_layout('one')
  hide_layout('two')
  show_step_zero()
}


function go_back_section(section) { 
  switch(section) {
    case 1:
      go_step_one()
    break
    case 1:
      go_back()
    break
    case 2:
      go_back()
      $("#user_first_name, #user_last_name, #user_company, #user_street, #user_zip_code, #user_country, #user_city").css({"box-shadow":"0px 0px 4px red"})      
    case 3:
      go_back()
      $("#user_phone_number, #user_fax_number, #user_tax_id").css({"box-shadow":"0px 0px 4px red"})
    break
    case 4:
      go_back()
      $("#user_email, #user_password").css({"box-shadow":"0px 0px 4px red"})
    break
    case 5:
      go_back()
      $("#radio_payment_bank_div_two, #radio_payment_paypal_div_two, #radio_payment_card_div_two").css({"display":"inline"})
      $("#radio_payment_bank_div_one, #radio_payment_paypal_div_one, #radio_payment_card_div_one").css({"display":"none"})
    break
    default:
    break
  }
}