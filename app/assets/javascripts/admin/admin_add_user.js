if (location.pathname.substr(0,16) == "/admin/users/new") {
  
  function func1(){
   $("#form1").trigger("submit.rails");
  }

  function func2(){
    $('#form4 :input').not(':submit').clone().hide().appendTo('#form3');    
    $('#form3 :input').not(':submit').clone().hide().appendTo('#form2');    
    func4();
    $('#form2 :input').not(':submit').clone().hide().appendTo('#form1');
    func3();
    if($("#subscription_free_subscription").is(":checked"))
    { 
      $('#form5 :input').not(':submit').clone().hide().appendTo('#form1');
      func5();
    }
   }

  function func3(){
    $('#form2 select').each(function(){
    var $this = $(this),val = $(this).val();
    $this.clone().hide().appendTo('#form1').val(val);
   })
  }
  
  function func4(){
    $('#form3 select').each(function(){
    var $this = $(this),val = $(this).val();
    $this.clone().hide().appendTo('#form2').val(val);
   })
  }


  function func5(){
    $('#form5 select').each(function(){
    var $this = $(this),val = $(this).val();
    $this.clone().hide().appendTo('#form1').val(val);
   })
  }

}
  


$(function() {
  if (location.pathname == "/admin/users/new" ) {
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

    var new_user_password_validation = new LiveValidation("user_password", {

      onValid: function()  {
        if(!$("#user_password").val().match( /((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i)) {
          $("#error_new_user_password").css("display","inline")
          $("#error_new_user_password").attr("data-original-title","Please enter a valid password")
          $('#error_new_user_password').tooltip()
          valid_new_user_password = false
        }
        else {
          $('#error_new_user_password').hide()
          valid_new_user_password = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#user_password").val().length == 0) {

          $('#error_new_user_password').hide()
        } 
        else {
          $("#error_new_user_password").css("display","inline")
          $("#error_new_user_password").attr("data-original-title","Please enter the password")
          $("#error_new_user_password").tooltip()
          valid_new_user_password = false
        }
      }
    });

    new_user_password_validation.add(Validate.Presence);

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

if (location.pathname.substr(0,16) == "/admin/users/new" ) {

  $(document).on("click", "#admin_send_user_invitation", function() {
  
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
            if($("#user_password").val() == "") {
              alert("Please enter the Password  to send Invitation")
              $("#error_new_user_password").css("display","inline")
              $("#error_new_user_password").attr("data-original-title","Please enter the password")
              $("#error_new_user_password").tooltip()
              return false
            } else if (!$("#user_password").val().match( /((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i)) {
              $("#error_new_user_password").css("display","inline")
              $("#error_new_user_password").attr("data-original-title","Please enter valid password")
              $("#error_new_user_password").tooltip()
              alert("see the errors")
              return false;
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
   
     if($("#subscription_free_subscription").is(":checked"))
    {  
      if($("#subscription_subscription_renewal_date").val() == "") 
      { 
        alert("Please enter the date for free subscription");
        return false;
      }
    }
    

    $.ajax({
      url: "/admin/users/send_invitation", 
      data: { f_name: $("#user_user_first_name").val(),
              l_name: $("#user_user_last_name").val(),              
              email: $("#user_email").val(),
              pwd: $("#user_password").val()
            },
            beforeSend: function() {
              $("#ajax-loader-big_for_offers_data").show()
              $("#overlay_div_data").show()
            },
            async: false,
            success: function(text) {              
              if (text == "true") {
                alert("Invitation Sent");
                $("#form1").trigger("submit.rails");
                }
              else if (text == "false" ) {
                alert("User with this email is alread registered");
                $("#ajax-loader-big_for_offers_data").hide()
                $("#overlay_div_data").hide()}

            }
    }) 

  })
}

if (location.pathname.substr(0,16) == "/admin/users/new" ) {
  function check_validations() {
    for (var i = 1; i <= 5; i++) {
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
            if($("#user_password").val() == "") {
              alert("Please enter the Password")
              $("#error_new_user_password").css("display","inline")
              $("#error_new_user_password").attr("data-original-title","Please enter the password.")
              $("#error_new_user_password").tooltip()
              return false
            } else if (!$("#user_password").val().match( /((?=.*[A-Z])(?=.*[0-9])(?=.*[\[\]\(\)?!$%&\/=*+~,.;:<>-_]).{8,})/i)) {
              $("#error_new_user_password").css("display","inline")
              $("#error_new_user_password").attr("data-original-title","Please enter valid password")
              $("#error_new_user_password").tooltip()
              return false;
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


    if (location.pathname.substr(0,16) == "/admin/users/new") {
      func1()
    };
    



  }
}






if(location.pathname == "/admin/users/new") {
  $(document).on('change',"#subscription_subscription_plan_id", function() {
   
    $.ajax({
        url: "/admin/users/choose_subscription_type",
        data: {
          type: $("#subscription_subscription_plan_id").val()
        }
      })



  })
}