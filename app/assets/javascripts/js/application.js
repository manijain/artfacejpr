// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .



//  will go in static controller js, part of header

function localisation_select(temp) {
  $.ajax({
    url: '/set_locale/',
    type: 'GET',
    data: {
      language: temp
    },
    success: function(data) {
      location.reload()
    }
  })
}

function localisation_select_box_html() {
  return '<div class="locale_container_parent" id="localisation_select_box">'
  + '<span style="font-size:14px">'
  + 'Change language'
  + '</span>'
  + '<ul class="locale_container">'
  + '<li><img src="/images/flags/ch.png" id="flag_country_ch" onclick="localisation_select(&quot;ch&quot;)" style="width:22px;height:16px"></img></li>'
  + '<li><img src="/images/flags/fr.png" id="flag_country_fr" onclick="localisation_select(&quot;fr&quot;)" style="width:22px;"></img></li>'
  + '<li><img src="/images/flags/fi.png" id="flag_country_gb" onclick="localisation_select(&quot;fi&quot;)" style="width:22px;"></img></li>'
  + '<li><img src="/images/flags/ne.png" id="flag_country_ne" onclick="localisation_select(&quot;ne&quot;)" style="width:22px;"></img></li>'
  + '<li><img src="/images/flags/us.png" id="flag_country_us" onclick="localisation_select(&quot;en&quot;)" style="width:22px;"></img></li>'
  + '</ul>'
  + '</div>'
}

var is_open_localisation_box = "1"
$("#localisation_select_div").live('click', function() {
  if (is_open_localisation_box == "1") {
    is_open_localisation_box = "2"
    $("#localisation_select_div").html(localisation_select_box_html());
  }
  else if (is_open_localisation_box == "2") {
    $("#localisation_select_div").html('');
    is_open_localisation_box = "1"
  }
})


var offer_new_description_languages_selected = []
function offer_new_select_box_html() {
  return '<div style="background-color: #727272; float: left;padding:10px;left:-20px;top:20px;position:relative" id="offer_new_add_description_select">'
  + '<span style="font-size:14px">'
  + 'ADD TRANSLATION'
  + '</span>'
  + '<ul style="margin:0;list-style:none;width:140px;text-align:center;margin-left:2px">'
  + '<li style="float:left;width:23px;margin-right:5px;display:inline"><img src="/images/flags/ch.png" id="flag_country_ch" onclick="offer_add_new_description_box(&quot;ch&quot;)" style="width:22px;height:16px"></img></li>'
  + '<li style="float:left;width:23px;margin-right:5px;display:inline"><img src="/images/flags/fr.png" id="flag_country_fr" onclick="offer_add_new_description_box(&quot;fr&quot;)" style="width:22px;"></img></li>'
  + '<li style="float:left;width:23px;margin-right:5px;display:inline"><img src="/images/flags/fi.png" id="flag_country_gb" onclick="offer_add_new_description_box(&quot;fi&quot;)" style="width:22px;"></img></li>'
  + '<li style="float:left;width:23px;margin-right:5px;display:inline"><img src="/images/flags/ne.png" id="flag_country_ne" onclick="offer_add_new_description_box(&quot;ne&quot;)" style="width:22px;"></img></li>'
  + '<li style="float:left;width:23px;margin-right:5px;display:inline"><img src="/images/flags/us.png" id="flag_country_us" onclick="offer_add_new_description_box(&quot;us&quot;)" style="width:22px;"></img></li>'
  + '</ul>'
  + '</div>'
}

function description_box_html(ch) {
  var language ;
  switch(ch) {
    case 'fr':
      language = "French";
    break;
    case 'ch':
      language = "Ch_lang";
    break;
    case 'fi':
      language = "Fi_lang";
    break;
    case 'ne':
      language = "Ne_lang";
    break;
  }

  return '<li style="position:relative">'
  + '<img src="/images/close_button.png" alt="close" style="position:absolute;right:54px;top:50px;" class="pointer" id="remove_description_' + ch + '"/>'
  + '<span style="width: 150px;float:left;text-align:right;">'
  + 'DESCRIPTION'
  + '<br>'
  + '<span style="font-size:10px;float:right;">'
  + '<span id="new_description_language_' + ch + '" style="color:black;font-size:13px;">' + language + '</span>'
  + '<br>'
  + '<span id="new_description_character_count_' + ch + '"></span>'
  + '</span>'
  + '<span style="float:right;position:relative;top:170px;font-size:24px" id="offer_new_add_description"></span>'
  + '</span>'
  + '<textarea maxlength="1000" style="margin: 0px 0px 9px 10px;resize:none;height: 200px;width: 350px;" placeholder="PROVIDE FURTHER DETAILS ABOUT THE ARTWORK: PROVENANCE, INVOICE, CONSERVATION, POSSIBLE DETAILS ON THE AUTHENTICATION CERTFICATE OR REFERENCE TO A CATALOGUE" maxlength="1000" id="new_description_' + ch + '"></textarea>'
  + '<img style="left: -4%;position: relative;top: 185px;display:none" src="/images/exclamation_mark.png" id="error_new_description_' + ch + '" data-original-title="Please enter the description">'
  + '</li>'
}

// offer_new_select_box_alert = function() {
//   alert("Please select a language");
// }

function offer_new_add_description_function() {
  $("#offer_new_add_description_select_temp").toggle()
}

function offer_add_new_description_box(country) {
  var temp;
  switch(country) {
    case 'ch':
      var temp = true
      for (var i = 0; i < offer_new_description_languages_selected.length; i++) {
        if (offer_new_description_languages_selected[i] == "ch")
          temp = false
      }
      if (temp) {
        temp = description_box_html("ch");
        offer_new_description_languages_selected.push("ch")
        $("#new_offer_step_four_ul").append(temp);
        $("#offer_new_add_description_select_temp").toggle('slow')
        var new_description_ch_validation = new LiveValidation("new_description_ch", {
          onValid: function()  {
            if(!$("#new_description_ch").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_description_ch").css("display","inline")
              $("#error_new_description_ch").attr("data-original-title","Only characters allowed")
              $('#error_new_description_ch').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_description_ch = false
            }
            else {
              $('#error_new_description_ch').hide()
              valid_new_description_ch = true
            }
          },
          onInvalid: function(){
            $("#error_new_description_ch").css("display","inline")
            $("#error_new_description_ch").attr("data-original-title","Please enter the description.")
            $("#error_new_description_ch").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_description_ch = false
          }
        });
        new_description_ch_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break
    case 'fr':
      var temp = true
      for (var i = 0; i < offer_new_description_languages_selected.length; i++) {
        if (offer_new_description_languages_selected[i] == "fr")
          temp = false
      }
      if (temp) {
        temp = description_box_html("fr");
        offer_new_description_languages_selected.push("fr");
        $("#new_offer_step_four_ul").append(temp);
        $("#offer_new_add_description_select_temp").toggle('slow')
        var new_description_fr_validation = new LiveValidation("new_description_fr", {
          onValid: function()  {
            if(!$("#new_description_fr").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_description_fr").css("display","inline")
              $("#error_new_description_fr").attr("data-original-title","Only fraracters allowed")
              $('#error_new_description_fr').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_description_fr = false
            }
            else {
              $('#error_new_description_fr').hide()
              valid_new_description_fr = true
            }
          },
          onInvalid: function(){
            $("#error_new_description_fr").css("display","inline")
            $("#error_new_description_fr").attr("data-original-title","Please enter the description.")
            $("#error_new_description_fr").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_description_fr = false
          }
        });
      new_description_fr_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
    case 'fi':
      var temp = true
      for (var i = 0; i < offer_new_description_languages_selected.length; i++) {
        if (offer_new_description_languages_selected[i] == "fi")
          temp = false
      }
      if (temp) {
        temp = description_box_html("fi");
        offer_new_description_languages_selected.push("fi");
        $("#new_offer_step_four_ul").append(temp);
        $("#offer_new_add_description_select_temp").toggle('slow')
        var new_description_fi_validation = new LiveValidation("new_description_fi", {
        onValid: function()  {
          if(!$("#new_description_fi").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_description_fi").css("display","inline")
            $("#error_new_description_fi").attr("data-original-title","Only characters allowed")
            $('#error_new_description_fi').tooltip({delay: { show: 500, hide: 100 }})
            valid_new_description_fi = false
          }
          else {
            $('#error_new_description_fi').hide()
            valid_new_description_fi = true
          }
        },
        onInvalid: function(){
          $("#error_new_description_fi").css("display","inline")
          $("#error_new_description_fi").attr("data-original-title","Please enter the description.")
          $("#error_new_description_fi").tooltip({delay: { show: 500, hide: 100 }})
          valid_new_description_fi = false
        }
      });
      new_description_fi_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
    case 'ne':
      var temp = true
      for (var i = 0; i < offer_new_description_languages_selected.length; i++) {
        if (offer_new_description_languages_selected[i] == "ne")
          temp = false
      }
      if (temp) {
        temp = description_box_html("ne");
        offer_new_description_languages_selected.push("ne");
        $("#new_offer_step_four_ul").append(temp);
        $("#offer_new_add_description_select_temp").toggle('slow')
        var new_description_ne_validation = new LiveValidation("new_description_ne", {
        onValid: function()  {
          if(!$("#new_description_ne").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_description_ne").css("display","inline")
            $("#error_new_description_ne").attr("data-original-title","Only characters allowed")
            $('#error_new_description_ne').tooltip({delay: { show: 500, hide: 100 }})
            valid_new_description_ne = false
          }
          else {
            $('#error_new_description_ne').hide()
            valid_new_description_ne = true
          }
        },
        onInvalid: function(){
          $("#error_new_description_ne").css("display","inline")
          $("#error_new_description_ne").attr("data-original-title","Please enter the description.")
          $("#error_new_description_ne").tooltip({delay: { show: 500, hide: 100 }})
          valid_new_description_ne = false
        }
      });
      new_description_ne_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
    case 'us':
      var temp = true
      for (var i = 0; i < offer_new_description_languages_selected.length; i++) {
        if (offer_new_description_languages_selected[i] == "us")
          temp = false
      }
      if (temp) {
        temp = description_box_html("us");
        offer_new_description_languages_selected.push("us");
        $("#new_offer_step_four_ul").append(temp);
        $("#offer_new_add_description_select_temp").toggle('slow')
        var new_description_us_validation = new LiveValidation("new_description_us", {
          onValid: function()  {
            if(!$("#new_description_us").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_description_us").css("display","inline")
              $("#error_new_description_us").attr("data-original-title","Only characters allowed")
              $('#error_new_description_us').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_description_us = false
            }
            else {
              $('#error_new_description_us').hide()
              valid_new_description_us = true
            }
          },
          onInvalid: function(){
            $("#error_new_description_us").css("display","inline")
            $("#error_new_description_us").attr("data-original-title","Please enter the description.")
            $("#error_new_description_us").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_description_us = false
          }
        });
        new_description_us_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
  }
}

// adding titles in multiple languages


  function title_box_html(ch) {
    var language ;
    switch(ch) {
      case 'fr':
        language = "French";
      break;
      case 'ch':
        language = "Ch_lang";
      break;
      case 'fi':
        language = "Fi_lang";
      break;
      case 'ne':
        language = "Ne_lang";
      break;
      case 'us':
        language = "US_EN";
      break;
    }

    return '<li style="float:left;position:relative;width:inherit;">'
    + '<span style="text-align: right;width: 140px;margin: 0;display: inline;float: left;margin-right: 2px;line-height:26px;">TITLE in ' + language +'</span>'
    + '<input type="text" style="width:370px;" placeholder="UP TO 60 CHARACTERS, UNTITLED IF LEFT BLANK" maxlength="60" id="new_artwork_title_' + ch + '">'
    + '<img style="display: none;position: absolute;right: 10px;top: -5px;" src="/images/exclamation_mark.png" id="error_new_artwork_title_' + ch + '" data-original-title="Please enter the artwork title">'
    + '<img src="/images/close_button.png" alt="close" style="position:absolute;right:44px;top:4px;" class="pointer" id="remove_title_' + ch + '"/>'
    + '</li>'
}

var offer_new_artwork_title_languages_selected = []

function offer_add_new_title_box(country) {
  var temp;
  //$("#offer_new_add_title_icon").attr("onclick",'offer_new_add_title_function()')
  //$("#offer_new_add_title_select").remove()
  switch(country) {
    case 'ch':
      var temp = true
      for (var i = 0; i < offer_new_artwork_title_languages_selected.length; i++) {
        if (offer_new_artwork_title_languages_selected[i] == "ch")
          temp = false
      }
      if (temp) {
        temp = title_box_html("ch");
        offer_new_artwork_title_languages_selected.push("ch")
        $("#multiple_title_box").append(temp);
        $("#offer_new_add_title_select_temp").toggle('slow')
        var new_artwork_title_ch_validation = new LiveValidation("new_artwork_title_ch", {
          onValid: function()  {
            if(!$("#new_artwork_title_ch").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_artwork_title_ch").css("display","inline")
              $("#error_new_artwork_title_ch").attr("data-original-title","Only characters allowed")
              $('#error_new_artwork_title_ch').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_artwork_title_ch = false
            }
            else {
              $('#error_new_artwork_title_ch').hide()
              valid_new_artwork_title_ch = true
            }
          },
          onInvalid: function(){
            $("#error_new_artwork_title_ch").css("display","inline")
            $("#error_new_artwork_title_ch").attr("data-original-title","Please enter the title.")
            $("#error_new_artwork_title_ch").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_artwork_title_ch = false
          }
        });
        new_artwork_title_ch_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break
    case 'fr':
      var temp = true
      for (var i = 0; i < offer_new_artwork_title_languages_selected.length; i++) {
        if (offer_new_artwork_title_languages_selected[i] == "fr")
          temp = false
      }
      if (temp) {
        temp = title_box_html("fr");
        offer_new_artwork_title_languages_selected.push("fr");
        $("#multiple_title_box").append(temp);
        $("#offer_new_add_title_select_temp").toggle('slow')
        var new_artwork_title_fr_validation = new LiveValidation("new_artwork_title_fr", {
          onValid: function()  {
            if(!$("#new_artwork_title_fr").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_artwork_title_fr").css("display","inline")
              $("#error_new_artwork_title_fr").attr("data-original-title","Only fraracters allowed")
              $('#error_new_artwork_title_fr').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_artwork_title_fr = false
            }
            else {
              $('#error_new_artwork_title_fr').hide()
              valid_new_artwork_title_fr = true
            }
          },
          onInvalid: function(){
            $("#error_new_artwork_title_fr").css("display","inline")
            $("#error_new_artwork_title_fr").attr("data-original-title","Please enter the title.")
            $("#error_new_artwork_title_fr").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_artwork_title_fr = false
          }
        });
        new_artwork_title_fr_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
    case 'fi':
      var temp = true
      for (var i = 0; i < offer_new_artwork_title_languages_selected.length; i++) {
        if (offer_new_artwork_title_languages_selected[i] == "fi")
          temp = false
      }
      if (temp) {
        temp = title_box_html("fi");
        offer_new_artwork_title_languages_selected.push("fi");
        $("#multiple_title_box").append(temp);
        $("#offer_new_add_title_select_temp").toggle('slow')
        var new_artwork_title_fi_validation = new LiveValidation("new_artwork_title_fi", {
          onValid: function()  {
            if(!$("#new_artwork_title_fi").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_artwork_title_fi").css("display","inline")
              $("#error_new_artwork_title_fi").attr("data-original-title","Only characters allowed")
              $('#error_new_artwork_title_fi').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_artwork_title_fi = false
            } else {
              $('#error_new_artwork_title_fi').hide()
              valid_new_artwork_title_fi = true
            }
          },
          onInvalid: function(){
            $("#error_new_artwork_title_fi").css("display","inline")
            $("#error_new_artwork_title_fi").attr("data-original-title","Please enter the title.")
            $("#error_new_artwork_title_fi").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_artwork_title_fi = false
          }
        });
        new_artwork_title_fi_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
    case 'ne':
      var temp = true
      for (var i = 0; i < offer_new_artwork_title_languages_selected.length; i++) {
        if (offer_new_artwork_title_languages_selected[i] == "ne")
          temp = false
      }
      if (temp) {
        temp = title_box_html("ne");
        offer_new_artwork_title_languages_selected.push("ne");
        $("#multiple_title_box").append(temp);
        $("#offer_new_add_title_select_temp").toggle('slow')
        var new_artwork_title_ne_validation = new LiveValidation("new_artwork_title_ne", {
          onValid: function()  {
            if(!$("#new_artwork_title_ne").val().match(/^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n 0-9 A-Z !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_artwork_title_ne").css("display","inline")
              $("#error_new_artwork_title_ne").attr("data-original-title","Only characters allowed")
              $('#error_new_artwork_title_ne').tooltip({delay: { show: 500, hide: 100 }})
              valid_new_artwork_title_ne = false
            }
            else {
              $('#error_new_artwork_title_ne').hide()
              valid_new_artwork_title_ne = true
            }
          },
          onInvalid: function(){
            $("#error_new_artwork_title_ne").css("display","inline")
            $("#error_new_artwork_title_ne").attr("data-original-title","Please enter the title.")
            $("#error_new_artwork_title_ne").tooltip({delay: { show: 500, hide: 100 }})
            valid_new_artwork_title_ne = false
          }
        });
        new_artwork_title_ne_validation.add(Validate.Presence);
      } else {
        alert("Translation already added")
      }
    break;
  }
}

// adding titles in multiple languages

$(function() {

  $("#offer_select_multiple_title_box").click(function(e) {
    if(offer_new_artwork_title_languages_selected.length == 5) {
      alert('All Translations added')
    } else {
      $("#offer_new_add_title_select_temp").toggle();
    }
    e.stopPropagation();
  })
  
  $(window).click(function() {
    $("#offer_new_add_title_select_temp").hide()
    $("#offer_new_add_description_select_temp").hide()
  })

  $("input[id^=new_artwork_title_]").each(function() {
    offer_new_artwork_title_languages_selected.push($(this).attr('id').substr(-2))
  })

  $("#offer_new_add_description_icon").click(function(e) {
    if(offer_new_description_languages_selected.length == 5) {
      alert("All translations added")
    } else {
      $("#offer_new_add_description_select_temp").toggle();
    }
    e.stopPropagation();
  })

// show the currently selected language
  switch($("#localisation_select_div").children().first().text()) {
    case "ch":
      $("#localisation_select_div").css("background-color","none;")
      $("#localisation_select_div").css("background","url('/images/flags/ch.png')")
    break
    case "fr":
      $("#localisation_select_div").css("background-color","none;")
      $("#localisation_select_div").css("background","url('/images/flags/fr.png')")
    break
    case "fi":
      $("#localisation_select_div").css("background-color","none;")
      $("#localisation_select_div").css("background","url('/images/flags/fi.png')")
    break
    case "ne":
      $("#localisation_select_div").css("background-color","none;")
      $("#localisation_select_div").css("background","url('/images/flags/ne.png')")
    break
    case "en":
      $("#localisation_select_div").css("background-color","none;")
      $("#localisation_select_div").css("background","url('/images/flags/us.png')")
    break
  }
  // show the currently selected language
  function kill_white_space(temp) {
    return temp.replace(/\s/g, '');
  }

  if(kill_white_space($('#header_flash_message').text()).length > 1 ) {
    $(".site_wide_error").css("display","block");
  }


// will go in offer.js and about page.js because its going to be present in both pages
  if (location.pathname == "/offers" || location.pathname == "/about" || location.pathname == "/dashboard/home"|| location.pathname == "/dashboard/buy-art-area" ) {

    var cancel_mousemove = false;
    $(".header ul.nav-pills li.dropdown").on({
      mouseenter: function() {
        cancel_mousemove = true
      },
      mouseleave: function() {
        cancel_mousemove = false
      },
      mouseover: function() {
        cancel_mousemove = true  
      }
    })

    $(document).mousemove(function(e) {
      if (cancel_mousemove) {
        // do nothing
      } else {
        var image_1_x_1 = $("#image_1").offset().left, image_1_x_2 = image_1_x_1 + $("#image_1").width();
        var image_2_x_1 = $("#image_2").offset().left, image_2_x_2 = image_2_x_1 + $("#image_2").width();
        var image_3_x_1 = $("#image_3").offset().left, image_3_x_2 = image_3_x_1 + $("#image_3").width();
        var image_4_x_1 = $("#image_4").offset().left, image_4_x_2 = image_4_x_1 + $("#image_4").width();
        var image_1_y_1 = $("#image_1").offset().top, image_1_y_2 = image_1_y_1 + $("#image_1").height();
        var image_2_y_1 = $("#image_2").offset().top, image_2_y_2 = image_2_y_1 + $("#image_2").height();
        var image_3_y_1 = $("#image_3").offset().top, image_3_y_2 = image_3_y_1 + $("#image_3").height();
        var image_4_y_1 = $("#image_4").offset().top, image_4_y_2 = image_4_y_1 + $("#image_4").height();
        if (e.pageX >= image_1_x_1 && e.pageX <= image_1_x_2 && e.pageY >= image_1_y_1 && e.pageY <= image_1_y_2) {
          $(".overlay_1").css({'display':'block'})
          $("#image_1, #image_4").css({'opacity':0.2})
          $(".overlay_2, .overlay_3, .overlay_4").css({'display':'none'});
        } else if (e.pageX >= image_2_x_1 && e.pageX <= image_2_x_2 && e.pageY >= image_2_y_1 && e.pageY <= image_2_y_2) {
          $(".overlay_2").css({'display':'block'})
          $("#image_1, #image_4").css({'opacity':0.2})
          $(".overlay_1, .overlay_3, .overlay_4").css({'display':'none'});
        } else if (e.pageX >= image_3_x_1 && e.pageX <= image_3_x_2 && e.pageY >= image_3_y_1 && e.pageY <= image_3_y_2) {
          $(".overlay_3").css({'display':'block'})
          $("#image_1, #image_4").css({'opacity':0.2})
          $(".overlay_1, .overlay_2, .overlay_4").css({'display':'none'});
        } else if (e.pageX >= image_4_x_1 && e.pageX <= image_4_x_2 && e.pageY >= image_4_y_1 && e.pageY <= image_4_y_2) {
          $(".overlay_4").css({'display':'block'})
          $("#image_1, #image_4").css({'opacity':0.2})
          $(".overlay_1, .overlay_2, .overlay_3").css({'display':'none'});
        } else {
          $("div[class^=overlay]").css({'display':'none'})
          $("#image_1, #image_4").css({'opacity':1})
        }
      }
    })
  }
  
  
//  will go for header js

$(document).on('hover', '#login_popout_link', function() {
  if (!$("#login_popout").hasClass("active")) {
    $("#login_popout").addClass("active")
    $("#login_popout").show('fadein')
  }
})
$(document).on('click', "#login_popout", function(e) {
  if (e.target.attributes.id.nodeValue == "login_submit_btn" || e.target.attributes.id.nodeValue == "forgot_pass_link") {
    return true
  } else {
    return false;
  }
})
// $('#login_popout_link').hover(function() {
//   if (!$("#login_popout").hasClass("active")) {
//     $("#login_popout").addClass("active")
//     $("#login_popout").show('fadein')
//   }
// })
// $("#login_popout").click(function(e) {
//   if (e.target.attributes.id.nodeValue == "login_submit_btn" || e.target.attributes.id.nodeValue == "forgot_pass_link") {
//     return true
//   } else {
//     return false;
//   }
// })

$(window).click(function(e) {
  if(e.target.attributes.id) {
    if (e.target.attributes.id.nodeValue == "login_submit_btn" || e.target.attributes.id.nodeValue == "forgot_pass_link" || e.target.attributes.id.nodeValue == "login_popout" || e.target.attributes.id.nodeValue == "test_user_pass"  || e.target.attributes.id.nodeValue == "test_user_name" ) {
    } else {
      $("div[class=active]").hide();
      $("div[class=active]").removeClass("active")   
    }
  } else {
    $("div[class=active]").hide();
    $("div[class=active]").removeClass("active")
  }
})


// will go in offers page and about page because of headers
/*  $("img[id^=image_]").mouseenter(function() {
    if(!($('.container').hasClass('active'))) {
      a = "overlay_" + this.id.split('_')[1]
      $("."+a).css({'display':'block'})
      $(".container").addClass('active')
    }
    $("#image_1, #image_4").css({'opacity':0.2})
  })
 */
 
/*  $('div[class^=overlay], .container').mouseleave('live',function() {
    if($('.container').hasClass('active')) {
      $('.container').removeClass('active')
      $('div[class^=overlay]').css({'display':'none'})
    }
    $("#image_1, #image_4").css({'opacity':1})
  })*/


// will go in terms n conditions js file

  if (window.location.href.split('/')[3] == "terms_conditions") {

    $("#terms_conditions_page").css({'font-weight':'bold'})

  }

  //will go in home.js
  if (window.location.href.split('/')[3] == "#disclaimer") {
    $("#show_disclaimer").css({'font-weight': 'bold'})
  }
  if (window.location.href.split('/')[3] == "#privacy_statement") {
    $("#show_privacy_statement").css({'font-weight': 'bold'})
  }

  $("textarea[id^=new_description]").live('keyup',function(e) {
    var country = this.id[this.id.length - 2] + this.id[this.id.length - 1]
    remaining_characters = 1000 - $("#"+this.id).val().length
    $("#new_description_character_count_"+country).html(remaining_characters + " Characters remaining")
  })


  $("#now_on_artface").rhinoslider();


//  function move_slide_text_right() {
//    console.log("!")
//    $( '#about_page_text_slider' ).trigger('nextSlide')
//  }
//  function move_slide_text_left() {
//    console.log("?")
//    $( '#about_page_text_slider' ).trigger('prevSlide')
//  }


  $("#about_page_slide_show_slider").rhinoslider({
    showTime: 3000,
    effect: "slide",
    effectTime: 1000,
    autoPlay: false,
    controlsPrevNext: true,
    pauseOnHover: false,
    showBullets: "never",
    slideNextDirection: "toLeft",
    slidePrevDirection: "toRight",
    //callBeforeNext: function() {return move_slide_text_right()},
    //callBeforePrev: function() {return move_slide_text_left()}
  });

  // $('.pagination a').attr('data-remote', 'true');

  if(location.pathname == "/offers") {
    $('.pagination a').live('click',function () {
      $.get(this.href, 'per_page=' + $("#offers_public_page_per_page").val(), function() {
        html_string = $(".pagination").html()
      $("#pagination_links_copy").html(html_string)
       }, 'script');
      return false;
    })
    html_string = $(".pagination").html()
    $("#pagination_links_copy").html(html_string)
    
    $(document).ajaxStart(function() {
      $("#overlay_div_for_static_offers").css("display", "block")
      $("#ajax_loader_big_for_static_offers").css("display", "block")
    })
    $(document).ajaxStart(function() {
      $("#overlay_div_for_static_offers").css("display", "none")
      $("#ajax_loader_big_for_static_offers").css("display", "none")
    })

    $("#offers_public_page_per_page").live('change', function() {
      url = "/offers?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(), function() {
        html_string = $(".pagination").html()
      $("#pagination_links_copy").html(html_string)
       }, 'script');
      html_string = $(".pagination").html()
      $("#pagination_links_copy").html(html_string)
    })
    $("#offers_public_page_sort_select").live('change', function() {
      url = "/offers?_=1354783878928&page=1"
      $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(), function() {
        html_string = $(".pagination").html()
      $("#pagination_links_copy").html(html_string)
       }, 'script');
      html_string = $(".pagination").html()
      $("#pagination_links_copy").html(html_string)
    })
    $(document).on('click',"#offers_public_page_input_button", function() {
      var offer_count = $("#offer_count").val()
      var per_page = $("#offers_public_page_per_page").val()
      var number_of_pages = Math.ceil(parseInt(offer_count)/parseInt(per_page))
      if(number_of_pages > parseInt($("#offers_public_page_input").val())) {
        url = "/offers?_=1354783878928&page=" + $("#offers_public_page_input").val()
        $.get(url, 'per_page=' + $("#offers_public_page_per_page").val() + '&sort_by=' + $("#offers_public_page_sort_select").val(), function() {
          html_string = $(".pagination").html()
        $("#pagination_links_copy").html(html_string)
         }, 'script');
        html_string = $(".pagination").html()
        $("#pagination_links_copy").html(html_string)
      } else {
        alert("Enter an appropriate page number")
      }
    })
  }

})
