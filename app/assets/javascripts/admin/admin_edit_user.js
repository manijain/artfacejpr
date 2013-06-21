

$(function() {
  if (location.pathname.match(/admin\/users\/.+\/edit/) != null) {
    //alert("hello new user")
    var new_user_email_validation = new LiveValidation("user_email", {

      onValid: function()  {
        if(!$("#user_email").val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
          $("#error_new_user_email").css("display","inline")
          $("#error_new_user_email").attr("data-original-title","Please enter a valid email")
          $('#error_new_user_email').tooltip()
          valid_new_user_email = false
        }
        else {
          $('#error_new_user_email').hide()
          valid_new_user_email = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#user_email").val().length == 0) {

          $('#error_new_user_email').hide()
        } 
        else {
          $("#error_new_user_email").css("display","inline")
          $("#error_new_user_email").attr("data-original-title","Please enter the email")
          $("#error_new_user_email").tooltip()
          valid_new_user_email = false
        }
      }
    });

    new_user_email_validation.add(Validate.Presence);

    

    var new_user_first_name_validation = new LiveValidation("user_user_first_name", {

        onValid: function()  {
          if(!$("#user_user_first_name").val().match( /^[A-Za-z .0-9]+$/i)) {
            $("#error_new_user_first_name").css("display","inline")
            $("#error_new_user_first_name").attr("data-original-title","Only characters allowed")
            $('#error_new_user_first_name').tooltip()
            valid_new_user_first_name = false
          }
          else {
            $('#error_new_user_first_name').hide()
            valid_new_user_first_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_user_first_name").val().length == 0) {

            $('#error_new_user_first_name').hide()
          } 
          else {
            $("#error_new_user_first_name").css("display","inline")
            $("#error_new_user_first_name").attr("data-original-title","Please enter the user first name")
            $("#error_new_user_first_name").tooltip()
            valid_new_user_first_name = false
          }
        }
      });

    new_user_first_name_validation.add(Validate.Presence);

    var new_user_last_name_validation = new LiveValidation("user_user_last_name", {

        onValid: function()  {
          if(!$("#user_user_last_name").val().match( /^[A-Za-z .0-9]+$/i)) {
            $("#error_new_user_last_name").css("display","inline")
            $("#error_new_user_last_name").attr("data-original-title","Only characters allowed")
            $('#error_new_user_last_name').tooltip()
            valid_new_user_last_name = false
          }
          else {
            $('#error_new_user_last_name').hide()
            valid_new_user_last_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#user_user_last_name").val().length == 0) {

            $('#error_new_user_last_name').hide()
          } 
          else {
            $("#error_new_user_last_name").css("display","inline")
            $("#error_new_user_last_name").attr("data-original-title","Please enter the user last name")
            $("#error_new_user_last_name").tooltip()
            valid_new_user_last_name = false
          }
        }
      });

    new_user_last_name_validation.add(Validate.Presence);


      
    var new_user_credit_card_number_validation = new LiveValidation("subscription_credit_card", {

      onValid: function()  {
        if($("#subscription_credit_card").val().length != 16 || !$("#subscription_credit_card").val().match( /.+/i)) {
          $("#error_credit_card_number").css("display","inline")
          $("#error_credit_card_number").attr("data-original-title","Please enter valid Credit Card Number.")
          $('#error_credit_card_number').tooltip()
          valid_new_user_credit_card_number = false
        }
        else {
          $('#error_credit_card_number').hide()
          valid_new_user_credit_card_number = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#subscription_credit_card").val().length == 0) {

          $('#error_credit_card_number').hide()
        } 
        else {
          $("#error_credit_card_number").css("display","inline")
          $("#error_credit_card_number").attr("data-original-title","Please enter the Credit Card Number.")
          $("#error_credit_card_number").tooltip()
          valid_new_user_credit_card_number = false
        }
      }
    });

    new_user_credit_card_number_validation.add(Validate.Presence);


    var new_user_credit_card_owner_validation = new LiveValidation("subscription_card_owner", {

      onValid: function()  {
        if(!$("#subscription_card_owner").val().match( /^[A-Za-z]+$/i)) {
          $("#error_credit_card_owner").css("display","inline")
          $("#error_credit_card_owner").attr("data-original-title","Please enter valid Credit Card Owner.")
          $('#error_credit_card_owner').tooltip()
          valid_new_user_credit_card_owner = false
        }
        else {
          $('#error_credit_card_owner').hide()
          valid_new_user_credit_card_owner = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#subscription_card_owner").val().length == 0) {

          $('#error_credit_card_owner').hide()
        } 
        else {
          $("#error_credit_card_owner").css("display","inline")
          $("#error_credit_card_owner").attr("data-original-title","Please enter the Credit Card Owner.")
          $("#error_credit_card_owner").tooltip()
          valid_new_user_credit_card_owner = false
        }
      }
    });

    new_user_credit_card_owner_validation.add(Validate.Presence);

  }
})


if (location.pathname.match(/admin\/users\/.+\/edit/) != null) {
  function check_validations() {
    for (var i = 1; i <= 4; i++) {
      switch(i) {
          case 1:
            if($("#user_user_first_name").val()  == ""){
              alert("Please enter the User First Name")
              $("#error_new_user_first_name").css("display","inline")
              $("#error_new_user_first_name").attr("data-original-title", "Please enter the user first name")
              $("#error_new_user_first_name").tooltip()
              return false              
            } else if(!$("#user_user_first_name").val().match( /^[A-Za-z .0-9]+$/i )) {
              $("#error_new_user_first_name").css("display","inline")
              $("#error_new_user_first_name").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
              $("#error_new_user_first_name").tooltip()
              return false;
            }
            break;
          case 2:
            if($("#user_user_last_name").val()  == ""){
              alert("Please enter the User Last Name")
              $("#error_new_user_last_name").css("display","inline")
              $("#error_new_user_last_name").attr("data-original-title", "Please enter the user last name")
              $("#error_new_user_last_name").tooltip()
              return false              
            } else if(!$("#user_user_first_name").val().match( /^[A-Za-z .0-9]+$/i )) {
              $("#error_new_user_last_name").css("display","inline")
              $("#error_new_user_last_name").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
              $("#error_new_user_last_name").tooltip()
              return false;
            }
            break;
          case 3:
            if($("#user_email").val() == "") {
              alert("Please enter the Email")
              $("#error_new_user_email").css("display","inline")
              $("#error_new_user_email").attr("data-original-title","Please enter the email.")
              $("#error_new_user_email").tooltip()
              return false
            } else if (!$("#user_email").val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
              $("#error_new_user_email").css("display","inline")
              $("#error_new_user_email").attr("data-original-title","Please enter valid email")
              $("#error_new_user_email").tooltip()
              return false;
            }
            break;
          case 4:
            if($("#user_password").val() != $("#user_password_confirmation").val()) {
              alert("Password not matched, Try again") 
              return false;  
            }
            break;   
         
      }

    }

    if($('#radio_payment_type:checked').attr("value") == "credit_card"){
      
      if($("#subscription_credit_card").val() == "") {
        alert("Please enter the Credit Card Number")
        $("#error_credit_card_number").css("display","inline")
        $("#error_credit_card_number").attr("data-original-title","Please enter the Credit Card Number.")
        $("#error_credit_card_number").tooltip()
        return false
      } 
      else if ($("#subscription_credit_card").val().length != 16 || !$("#subscription_credit_card").val().match( /.+/i)) {
        $("#error_credit_card_number").css("display","inline")
        $("#error_credit_card_number").attr("data-original-title","Please enter valid Credit Card Number.")
        $("#error_credit_card_number").tooltip()
        return false;
      }

      if($("#subscription_card_owner").val() == "") {
        alert("Please enter the Credit Card Owner")
        $("#error_credit_card_owner").css("display","inline")
        $("#error_credit_card_owner").attr("data-original-title","Please enter the Credit Card Owner.")
        $("#error_credit_card_owner").tooltip()
        return false
      } 
      else if (!$("#subscription_card_owner").val().match( /^[A-Za-z]+$/i)) {
        $("#error_credit_card_owner").css("display","inline")
        $("#error_credit_card_owner").attr("data-original-title","Please enter valid Credit Card Owner.")
        $("#error_credit_card_owner").tooltip()
        return false;
      }


    }
    
    if($("#subscription_free_subscription").is(":checked"))
    {  
      if($("#subscription_subscription_renewal_date").val() == "") 
      { 
        alert("Please enter the date for free subscription");
        return false;
      }
    }
    
    if (location.pathname.match(/admin\/users\/.+\/edit/) != null) {
      f()
    };
    



  }
}


if (location.pathname.match(/admin\/users\/.+\/edit/) != null) {
  function t(){
    $('#form3 :input').not(':submit').clone().hide().appendTo('#form2');
    $('#form2 :input').not(':submit').clone().hide().appendTo('#form1');
    func3();
    if($("#subscription_free_subscription").is(":checked"))
    { 
      $('#form4 :input').not(':submit').clone().hide().appendTo('#form1');
      func4();
    }

  }

  function f(){
     $("#form1").trigger("submit.rails");
  }

  function func3(){
    $('#form2 select').each(function(){
    var $this = $(this),val = $(this).val();
    $this.clone().hide().appendTo('#form1').val(val);
   })
  }
  function func4(){
    $('#form4 select').each(function(){
    var $this = $(this),val = $(this).val();
    $this.clone().hide().appendTo('#form1').val(val);
   })
  }
}



if (location.pathname.match(/admin\/users\/.+\/edit/) != null) {

  $(document).on("click", "#admin_resend_user_invitation", function() {
  
    for (var i = 1; i <= 5; i++) {
      switch(i) {
          case 1:
            if($("#user_user_first_name").val()  == ""){
              alert("Please enter the User First Name to send Invitation")
              $("#error_new_user_first_name").css("display","inline")
              $("#error_new_user_first_name").attr("data-original-title", "Please enter the user first name")
              $("#error_new_user_first_name").tooltip()
              return false              
            } else if(!$("#user_user_first_name").val().match( /^[A-Za-z 0-9]+$/i )) {
              $("#error_new_user_first_name").css("display","inline")
              $("#error_new_user_first_name").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
              $("#error_new_user_first_name").tooltip()
              alert("see the errors")
              return false;
            }
            break;
          case 2:
            if($("#user_user_last_name").val()  == ""){
              alert("Please enter the User Last Name to send Invitation")
              $("#error_new_user_last_name").css("display","inline")
              $("#error_new_user_last_name").attr("data-original-title", "Please enter the user last name")
              $("#error_new_user_last_name").tooltip()
              return false              
            } else if(!$("#user_user_first_name").val().match( /^[A-Za-z .0-9]+$/i )) {
              $("#error_new_user_last_name").css("display","inline")
              $("#error_new_user_last_name").attr("data-original-title", "Allowed characters: A-Z .0-9 ")
              $("#error_new_user_last_name").tooltip()
              alert("see the errors")
              return false;
            }
            break;
          case 3:
            if($("#user_email").val() == "") {
              alert("Please enter the Email to send Invitation")
              $("#error_new_user_email").css("display","inline")
              $("#error_new_user_email").attr("data-original-title","Please enter the email")
              $("#error_new_user_email").tooltip()
              return false
            } else if (!$("#user_email").val().match( /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
              $("#error_new_user_email").css("display","inline")
              $("#error_new_user_email").attr("data-original-title","Please enter valid email")
              $("#error_new_user_email").tooltip()
              alert("see the errors")
              return false;
            }
            break;
          case 4:
            if($("#user_password").val() != "") {
              if (!$("#user_password").val().match( /((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i)) {
              $("#error_new_user_password").css("display","inline")
              $("#error_new_user_password").attr("data-original-title","Please enter valid password")
              $("#error_new_user_password").tooltip()
              alert("see the errors")
              return false;
             }
            }
            break; 
          case 5:
            if($("#user_password").val() != $("#user_password_confirmation").val()) {
              alert("Password not matched, Try again") 
              return false;  
            }
            break;         
      }
    }  

    if($('#radio_payment_type:checked').attr("value") == "credit_card"){
      
      if($("#subscription_credit_card").val() == "") {
        alert("Please enter the Credit Card Number")
        $("#error_credit_card_number").css("display","inline")
        $("#error_credit_card_number").attr("data-original-title","Please enter the Credit Card Number.")
        $("#error_credit_card_number").tooltip()        
        return false
      } 
      else if ($("#subscription_credit_card").val().length != 16 || !$("#subscription_credit_card").val().match( /.+/i)) {
        $("#error_credit_card_number").css("display","inline")
        $("#error_credit_card_number").attr("data-original-title","Please enter valid Credit Card Number.")
        $("#error_credit_card_number").tooltip()
        alert("see the errors")
        return false;
      }

      if($("#subscription_card_owner").val() == "") {
        alert("Please enter the Credit Card Owner")
        $("#error_credit_card_owner").css("display","inline")
        $("#error_credit_card_owner").attr("data-original-title","Please enter the Credit Card Owner.")
        $("#error_credit_card_owner").tooltip()
        return false
      } 
      else if (!$("#subscription_card_owner").val().match( /^[A-Za-z]+$/i)) {
        $("#error_credit_card_owner").css("display","inline")
        $("#error_credit_card_owner").attr("data-original-title","Please enter valid Credit Card Owner.")
        $("#error_credit_card_owner").tooltip()
        alert("see the errors")
        return false;
      }

    }

    

    $.ajax({
      url: "/admin/users/resend_invitation", 
      data: {  email: $("#user_email").val()
            },
            beforeSend: function() {
              $("#ajax-loader-big_for_offers_data").show()
              $("#overlay_div_data").show()
            },
            async: false,
            success: function(text) {              
              if (text == "true") {
                alert("Invitation reminder Sent");
                $("#ajax-loader-big_for_offers_data").hide()
                $("#overlay_div_data").hide()
                //$("#form1").trigger("submit.rails");
                }
              else if (text == "false" ) {
                alert("User with this email is alread registered");
                $("#ajax-loader-big_for_offers_data").hide()
                $("#overlay_div_data").hide()}

            }
    }) 

  })
}
