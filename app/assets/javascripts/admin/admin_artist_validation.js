
$(function() {
  if (location.pathname == "/admin/artists/new" || location.pathname == "/admin/artists/create") {
   
      var new_artist_first_name_validation = new LiveValidation("artist_new_artist_first_name", {

        onValid: function()  {
          if(!$("#artist_new_artist_first_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_artist_first_name").css("display","inline")
            $("#error_new_artist_first_name").attr("data-original-title","Only characters allowed")
            $('#error_new_artist_first_name').tooltip()
            valid_new_artist_first_name = false
          }
          else {
            $('#error_new_artist_first_name').hide()
            valid_new_artist_first_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#artist_new_artist_first_name").val().length == 0) {

            $('#error_new_artist_first_name').hide()
          } 
          else {
            $("#error_new_artist_first_name").css("display","inline")
            $("#error_new_artist_first_name").attr("data-original-title","Please enter the artist name")
            $("#error_new_artist_first_name").tooltip()
            valid_new_artist_first_name = false
          }
        }
      });
      new_artist_first_name_validation.add(Validate.Presence);

      var new_artist_last_name_validation = new LiveValidation("artist_new_artist_last_name", {

        onValid: function()  {
          if(!$("#artist_new_artist_last_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_artist_last_name").css("display","inline")
            $("#error_new_artist_last_name").attr("data-original-title","Only characters allowed")
            $('#error_new_artist_last_name').tooltip()
            valid_new_artist_last_name = false
          }
          else {
            $('#error_new_artist_last_name').hide()
            valid_new_artist_last_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#artist_new_artist_last_name").val().length == 0) {

            $('#error_new_artist_last_name').hide()
          } 
          else {
            $("#error_new_artist_last_name").css("display","inline")
            $("#error_new_artist_last_name").attr("data-original-title","Please enter the artist name")
            $("#error_new_artist_last_name").tooltip()
            valid_new_artist_last_name = false
          }
        }
      });
      new_artist_last_name_validation.add(Validate.Presence);
  }
})


if (location.pathname == "/admin/artists/new" || location.pathname == "/admin/artists/create") {
  
  $(document).on('click', "#submit_new_artist", function() {
    if($("#artist_new_artist_first_name").val() == "") {
      alert("Please enter the artist first name")
      $("#error_new_artist_first_name").css("display","inline")
      $("#error_new_artist_first_name").attr("data-original-title","Please enter the artist first name.")
      $("#error_new_artist_first_name").tooltip()
      return false
    } 
    else if (!$("#artist_new_artist_first_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
      $("#error_new_artist_first_name").css("display","inline")
      $("#error_new_artist_first_name").attr("data-original-title","Please enter valid artist first name.")
      $("#error_new_artist_first_name").tooltip()
      return false;
    }

    if($("#artist_new_artist_last_name").val() == "") {
      alert("Please enter the artist last name")
      $("#error_new_artist_last_name").css("display","inline")
      $("#error_new_artist_last_name").attr("data-original-title","Please enter the artist last name.")
      $("#error_new_artist_last_name").tooltip()
      return false
    } 
    else if (!$("#artist_new_artist_last_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
      $("#error_new_artist_last_name").css("display","inline")
      $("#error_new_artist_last_name").attr("data-original-title","Please enter valid artist last name.")
      $("#error_new_artist_last_name").tooltip()
      return false;
    }

  })
}




$(function() {
  if (location.pathname.match(/admin\/artist\/.+\/edit/) != null) {
   
      edit_artist_first_name_validation = new LiveValidation("artist_edit_artist_first_name", {

        onValid: function()  {
          if(!$("#artist_edit_artist_first_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_edit_artist_first_name").css("display","inline")
            $("#error_edit_artist_first_name").attr("data-original-title","Only characters allowed")
            $('#error_edit_artist_first_name').tooltip()
            valid_edit_artist_first_name = false
          }
          else {
            $('#error_edit_artist_first_name').hide()
            valid_edit_artist_first_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#artist_edit_artist_first_name").val().length == 0) {

            $('#error_edit_artist_first_name').hide()
          } 
          else {
            $("#error_edit_artist_first_name").css("display","inline")
            $("#error_edit_artist_first_name").attr("data-original-title","Please enter the artist name")
            $("#error_edit_artist_first_name").tooltip()
            valid_edit_artist_first_name = false
          }
        }
      });
      edit_artist_first_name_validation.add(Validate.Presence);

      edit_artist_last_name_validation = new LiveValidation("artist_edit_artist_last_name", {

        onValid: function()  {
          if(!$("#artist_edit_artist_last_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_edit_artist_last_name").css("display","inline")
            $("#error_edit_artist_last_name").attr("data-original-title","Only characters allowed")
            $('#error_edit_artist_last_name').tooltip()
            valid_edit_artist_last_name = false
          }
          else {
            $('#error_edit_artist_last_name').hide()
            valid_edit_artist_last_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#artist_edit_artist_last_name").val().length == 0) {

            $('#error_edit_artist_last_name').hide()
          } 
          else {
            $("#error_edit_artist_last_name").css("display","inline")
            $("#error_edit_artist_last_name").attr("data-original-title","Please enter the artist name")
            $("#error_edit_artist_last_name").tooltip()
            valid_edit_artist_last_name = false
          }
        }
      });
      edit_artist_last_name_validation.add(Validate.Presence);

  }



  if (location.pathname.match(/admin\/artist\/.+\/edit/) != null) {
    $(document).on('click', "#submit_edit_artist", function() {
      if (parseInt(location.pathname.split("/")[3]) == $("#artist_edit_link_to_existing").val()) {
        if($("#artist_edit_artist_first_name").val() == "") {
          alert("Please enter the artist first name")
          $("#error_edit_artist_first_name").css("display","inline")
          $("#error_edit_artist_first_name").attr("data-original-title","Please enter the artist first name.")
          $("#error_edit_artist_first_name").tooltip()
          return false
        } 
        else if (!$("#artist_edit_artist_first_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
          $("#error_edit_artist_first_name").css("display","inline")
          $("#error_edit_artist_first_name").attr("data-original-title","Please enter valid artist first name.")
          $("#error_edit_artist_first_name").tooltip()
          return false;
        }

        if($("#artist_edit_artist_last_name").val() == "") {
          alert("Please enter the artist last name")
          $("#error_edit_artist_last_name").css("display","inline")
          $("#error_edit_artist_last_name").attr("data-original-title","Please enter the artist last name.")
          $("#error_edit_artist_last_name").tooltip()
          return false
        } 
        else if (!$("#artist_edit_artist_last_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
          $("#error_edit_artist_last_name").css("display","inline")
          $("#error_edit_artist_last_name").attr("data-original-title","Please enter valid artist last name.")
          $("#error_edit_artist_last_name").tooltip()
          return false;
        }
        
      }
      else{
          edit_artist_first_name_validation.destroy();
          edit_artist_last_name_validation.destroy();
        }
    })
  }









})


