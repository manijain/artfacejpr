$(function() {
  if (location.pathname == "/offer/new" || location.pathname.substr(0,11) == "/offer/edit") {
    //validate new_artist_name
      var new_artist_name_validation = new LiveValidation("new_artist_name", {
        onValid: function()  {
          if(!$("#new_artist_name").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_artist_name").css("display","inline")
            $("#error_new_artist_name").attr("data-original-title","Only characters allowed")
            $('#error_new_artist_name').tooltip()
            valid_new_artist_name = false
          }
          else {
            $('#error_new_artist_name').hide()
            valid_new_artist_name = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_artist_name").val().length == 0) {

            $('#error_new_artist_name').hide()
          } 
          else {
            $("#error_new_artist_name").css("display","inline")
            $("#error_new_artist_name").attr("data-original-title","Please enter the artist name, else \"UNKNOWN\" will be used")
            $("#error_new_artist_name").tooltip()
            valid_new_artist_name = false
          }
        }
      });
      new_artist_name_validation.add(Validate.Presence);

    //validate new_country
      var new_country_validation = new LiveValidation("new_country", {
        onValid: function()  {
          if($("#new_country :selected").index() == 0) {
            $("#error_new_country").css("display","inline")
            $("#error_new_country").attr("data-original-title","Please choose a country")
            $('#error_new_country').tooltip()
            valid_new_country = false
          }
          else {
            $('#error_new_country').hide()
            valid_new_country = true
          }
        },
        onInvalid: function(){
        }
      });
      new_country_validation.add(Validate.Presence)

    //validate new_artwork_title
      var new_artwork_title_en_validation = new LiveValidation("new_artwork_title_en", {
        onValid: function()  {
          if(!$("#new_artwork_title_en").val().match(/^[ ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_artwork_title_en").css("display","inline")
            $("#error_new_artwork_title_en").attr("data-original-title","Only characters allowed")
            $('#error_new_artwork_title_en').tooltip()
            valid_new_artwork_title_en = false
          }
          else {
            $('#error_new_artwork_title_en').hide()
            valid_new_artwork_title_en = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_artwork_title_en").val().length == 0) { 
            $('#error_new_artwork_title_en').hide()
          } 
          else {
            $('#error_new_artwork_title_en').hide()
            // $("#error_new_artwork_title_en").css("display","inline")
            // $("#error_new_artwork_title_en").attr("data-original-title","Please enter the artwork title, else \"UNTITLED\" will be used")
            // $("#error_new_artwork_title_en").tooltip()
            // valid_new_artwork_title_en = false
          }
        }
      });
      new_artwork_title_en_validation.add(Validate.Presence);

    //validate new category
      var new_category_validation = new LiveValidation("new_category", {
        onValid: function()  {
          if ($('#new_category>option:selected').index() == 0) {
            $("#error_new_category").css("display","inline")
            $("#error_new_category").attr("data-original-title","Please select a category.")
            $('#error_new_category').tooltip()
            valid_new_category = false
          }
          else {
            $('#error_new_category').hide()
            valid_new_category = true
          }
        },
        onInvalid: function() {
        }
      });
      new_category_validation.add(Validate.Presence);

    //l

  }
})