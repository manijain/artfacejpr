function kill_white_space(temp) {
  return temp.replace(/\s/g, '');
}

$(function() {

  if (location.pathname == "/dashboard/home") {
    var key_pressed;
    $(window).keydown(function(e){
      key_pressed = e.keyCode;
    })
    var user_recommendation_email_validation = new LiveValidation("user_recommendation_email", {
      onValid: function()  {
        if(!$("#user_recommendation_email").val().match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
          $("#user_recommendation_email_error").css("display","inline")
          $("#user_recommendation_email_error").attr("data-original-title","Enter proper email address")
          $('#user_recommendation_email_error').tooltip({delay: { show: 500, hide: 100 }})
        }
        else {
          $('#user_recommendation_email_error').hide()
        }
      },
      onInvalid: function(){
        if ((key_pressed == 9 && $("#user_recommendation_email").val().length == 0) || ! $("#user_recommendation_email").is(":focus")) { 
          $('#user_recommendation_email_error').hide()
        } else {
          $("#user_recommendation_email_error").css("display","inline")
          $("#user_recommendation_email_error").attr("data-original-title","Please enter the email address.")
          $("#user_recommendation_email_error").tooltip({delay: { show: 500, hide: 100 }})
        }
      }
    });
    user_recommendation_email_validation.add(Validate.Presence);
    
    var user_recommendation_name_validation = new LiveValidation("user_recommendation_name", {
      onValid: function()  {
        if(!$("#user_recommendation_name").val().match(/^([^\\w])([^0-9])*$/i)) {
          $("#user_recommendation_name_error").css("display","inline")
          $("#user_recommendation_name_error").attr("data-original-title","Only characters allowed")
          $('#user_recommendation_name_error').tooltip({delay: { show: 500, hide: 100 }})
        }
        else {
          $('#user_recommendation_name_error').hide()
        }
      },
      onInvalid: function(){
        if ((key_pressed == 9 && $("#user_recommendation_name").val().length == 0) || !$("#user_recommendation_name").is(":focus")) {
          $('#user_recommendation_name_error').hide()
        } else {
          $("#user_recommendation_name_error").css("display","inline")
          $("#user_recommendation_name_error").attr("data-original-title","Please enter the name.")
          $("#user_recommendation_name_error").tooltip({delay: { show: 500, hide: 100 }})
        }
      }
    });
    user_recommendation_name_validation.add(Validate.Presence);
    
    var user_recommendation_message_validation = new LiveValidation("user_recommendation_message", {
      onValid: function()  {
        if(!$("#user_recommendation_message").val().match(/^([^\\w])+$/i)) {
          $("#user_recommendation_message_error").css("display","inline")
          $("#user_recommendation_message_error").attr("data-original-title","Only characters allowed")
          $('#user_recommendation_message_error').tooltip({delay: { show: 500, hide: 100 }})
        }
        else {
          $('#user_recommendation_message_error').hide()
        }
      },
      onInvalid: function(){
        if ((key_pressed == 9 && $("#user_recommendation_message").val().length == 0) || !$("#user_recommendation_message").is(":focus")) {
          $('#user_recommendation_message_error').hide()
        } else {
          $("#user_recommendation_message_error").css("display","inline")
          $("#user_recommendation_message_error").attr("data-original-title","Please enter the message.")
          $("#user_recommendation_message_error").tooltip({delay: { show: 500, hide: 100 }})
        }
      }
    });
    user_recommendation_message_validation.add(Validate.Presence);



    $(document).on('click', 'div.span10recommend_artface_container form[action=\'/user_recommendation/create\'] input[type=submit]', function() {
      valid = true
      if (kill_white_space($("#user_recommendation_email").val()) == 0) {
        $("#user_recommendation_email_error").css("display","inline").attr("data-original-title", "Please enter the email address.").tooltip();
        valid = false
      } else if (!$("#user_recommendation_email").val().match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
        $("#user_recommendation_email_error").css("display","inline").attr("data-original-title", "Enter proper email address.").tooltip();
        valid = false
      }
      if (kill_white_space($("#user_recommendation_name").val()) == 0) {
        $("#user_recommendation_name_error").css("display","inline").attr("data-original-title","Please enter the name." ).tooltip();
        valid = false
      }
      

      return valid;
    })





  }



})