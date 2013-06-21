var hi_res_binary_file
var detail_one_binary_file
var detail_two_binary_file
var thumbnail_binary_file
var documents_binary_file
var detail1_boundx, detail1_boundy, detail1_jcrop_api;
var hi_res_boundx, hi_res_boundy, hi_res_jcrop_api;
var detail2_boundx, detail2_boundy, detail2_jcrop_api;
var thumbnail_boundx, thumbnail_boundy, thumbnail_jcrop_api;

//function delete_element
  function delete_element(element) {
    $("#"+element).parent().remove();
    if($("#favourites_ul").children().length == 0) {
      $("#favourites_sort_label").hide();
      $("#buy_your_favourites_select").hide();
      $("#delete_favourite").hide()
    }
  }

//function key_press for validation
  var key_pressed;
  $(window).keydown(function(e){
    key_pressed = e.keyCode;
  })

//function to get outerHTML
  jQuery.fn.outerHTML = function() {
    return $( $('<div></div>').html(this.clone()) ).html();
  }
//check_hi_res_on_load
  function check_hi_res_on_load() {
    if (($("div#original img")[0].naturalWidth < 1000) && ($("div#original img")[0].naturalHeight < 1000)) {
      setTimeout('alert("Please select the image with high resolution");',500)
      $('#original img').remove();
      $('#img_get_hi_res').val('');
    } else {
      hide_choose_file(0)
      $('#error_new_hi_res').css('display','none')
      $("#img_preview_hi_res").html($("#original").html())
      $('#large_preview_for_hires').html($('#original').html())
      $("#hi_res a").html($("#original").html());
      $("#full_screen_hi_res div.image").html($("#original").html())
      $("#small_thumb_on_upload_hi_res").prop('src', $("#original img").prop('src'))
      //saving the same image to thumbnail view too.




      $.colorbox({
        href: '#hi_res_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          if($.browser.webkit) {
            $(".hi_res_img_name").text($("#img_get_hi_res").val().substr(12))  
          } else {
            $(".hi_res_img_name").text($("#img_get_hi_res").val())
          }
          $('#hi_res_large_container').removeClass("hidden")         
          $("div#img_preview_hi_res img").addClass("max_image_width")
          $("div#large_preview_for_hires img").addClass("max_image_width")
          $("#small_thumb_on_upload_thumbnail").prop('src', $("#img_preview_hi_res img").prop('src'))
          $("#small_thumb_on_upload_thumbnail").addClass("max_image_width")
          $("#offer_new_thumbnail").hide()
          $("#offer_change_thumbnail").show()
          $("#crop_existing_thumbnail").val('true')
          $('#hi_res a img').Jcrop({
            onChange: hi_res_update_crop,
            onSelect: hi_res_update_crop,
            setSelect: [0, 0, 700, 500]
          }, function() {
            var bounds = this.getBounds();
            hi_res_boundx = bounds[0];
            hi_res_boundy = bounds[1];
            hi_res_jcrop_api = this;
          });
        },
        onClosed: function() {
          //$("#small_thumb_on_upload_thumbnail").attr('style', $("#img_preview_hi_res img").attr('style'))
          $('#hi_res_large_container').addClass("hidden")
          $('#show_hi_res_img').css('display','none')
        }
      })
    }
  }
//onFileLoad_hi_res
  function onFileLoad_hi_res_part(temp) {
    $('#img_show_hi_res').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;"  />');
    $('#crop_image_hi_res_jcrop').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
    $('#original').html('<img src="' + temp.target.result +'" style="width:inherit;height:100%;" />');
  }

  function onFileLoad_hi_res(e) {
    hi_res_binary_file = e;
    progressbar(0)
    cancel_cropping_button_enable(0)
    setTimeout('$("#progressbar_parent").hide();',10000)
    setTimeout("if(!cancel_hi_res_upload){onFileLoad_hi_res_part(hi_res_binary_file);}",10000)
    setTimeout('$("#overlay_ajax_loader_for_new_offer_files").show()',10000)
    setTimeout('$("#overlay_div_for_new_offer_files").show()',10000)
    setTimeout('if(!cancel_hi_res_upload){check_hi_res_on_load();}',15000)
    setTimeout('$("#overlay_ajax_loader_for_new_offer_files").hide();$("#overlay_div_for_new_offer_files").hide();',15000)
  }

//check_detail1_on_load
  function check_detail1_on_load() {
    if (($("div#detail1 a.pull-left img")[0].naturalWidth < 1000) && ($("div#detail1 a.pull-left img")[0].naturalHeight < 1000)) {
      setTimeout('alert("Please select the image with high resolution");',500)
      $('#detail1 a.pull-left img').remove();
      $('#img_get_detail_1').val('')
    } else {
      $("#small_thumb_on_upload_detail_1").prop('src', $("#detail1 a.pull-left img").prop('src'))
      $('#detail1').removeClass("hidden")
      $.colorbox({
        href: '#detail_1_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          hide_choose_file(2)
          $("#detail_1_large_container").removeClass("hidden")
          $("#img_preview_detail1").html($("#detail1 a.pull-left").html())
          $("#large_preview_for_detail1").html($("#detail1 a.pull-left").html())
          if($.browser.webkit) {
            $(".detail_1_img_name").text($("#img_get_detail_1").val().substr(12))  
          } else {
            $(".detail_1_img_name").text($("#img_get_detail_1").val()) 
          }
          $("#full_screen_detail_1 div.image").html($("#detail1 a.pull-left").html())
          $("div#img_preview_detail1 img").addClass("max_image_width")
          $("div#large_preview_for_detail1 img").addClass("max_image_width")
          $('#detail1 a.pull-left img').Jcrop({
            onChange: detail_one_update_crop,
            onSelect: detail_one_update_crop,
            setSelect: [0, 0, 700, 500]
          },function() {
            var bounds = this.getBounds();
            detail1_boundx = bounds[0];
            detail1_boundy = bounds[1];
            detail1_jcrop_api = this;
          });
        },
        onClosed: function() {
          $("#detail_1_large_container").addClass("hidden")
          $('#show_detail_1_img').css('display','none')  
        }
      })
    }
  }
//onFileLoad_detail_1
  function onFileLoad_detail_1_part(temp) {
    $('#crop_image_detail_one_jcrop').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
    $('#detail1 a.pull-left').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
  }

  function onFileLoad_detail_1(e) {
    $("#detail1_div").css('display', 'none');
    detail_one_binary_file = e
    progressbar(2)
    cancel_cropping_button_enable(2)
    setTimeout('$("#progressbar_parent").hide();',10000)
    setTimeout("if(!cancel_detail_one_upload){onFileLoad_detail_1_part(detail_one_binary_file);}",10000)
    setTimeout('if(!cancel_detail_one_upload){$("#overlay_ajax_loader_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_detail_one_upload){$("#overlay_div_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_detail_one_upload){check_detail1_on_load();}',15000)
    setTimeout('$("#overlay_ajax_loader_for_new_offer_files").hide();$("#overlay_div_for_new_offer_files").hide();',15000)
  }
//check_detail2_on_load
  function check_detail2_on_load() {
    if (($("div#detail2 a.pull-left img")[0].naturalWidth < 1000) && ($("div#detail2 a.pull-left img")[0].naturalHeight < 1000)) {
      setTimeout('alert("Please select the image with high resolution");',500)
      $('#detail2 img').remove()
      $('#img_get_detail_2').val('');
    } else {
      $("#small_thumb_on_upload_detail_2").prop('src', $("#detail2 a.pull-left img").prop('src'))
      hide_choose_file(3)
      $('#detail2').removeClass("hidden")
      if($.browser.webkit) {
        $(".detail_2_img_name").text($("#img_get_detail_2").val().substr(12))  
      } else {
        $(".detail_2_img_name").text($("#img_get_detail_2").val()) 
      }
      $.colorbox({
        href: '#detail_2_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $(".detail_2_img_name").text($("#img_get_detail_2").val())
          $("#img_preview_detail2 img").addClass("max_image_width")
          $("#large_preview_for_detail2").addClass("max_image_width")
          $("#img_preview_detail2").html($("#detail2 a.pull-left").html())
          $("#large_preview_for_detail2").html($("#detail2 a.pull-left").html())
          $("#full_screen_detail_2 div.image").html($("#detail2 a.pull-left").html())
          $('#detail2 a.pull-left img').Jcrop({
            onChange: detail_two_update_crop,
            onSelect: detail_two_update_crop,
            setSelect: [0, 0, 700, 500]
          },function() {
            var bounds = this.getBounds();
            detail2_boundx = bounds[0];
            detail2_boundy = bounds[1];
            detail2_jcrop_api = this;
          });
          $("#img_preview_detail2 img").css({
            'margin':0
          })
          $("#detail_2_large_container").removeClass("hidden")
        },
        onClosed: function() {
          $("#detail_2_large_container").addClass("hidden")
          // $("#img_preview_detail2").addClass("hidden"); 
          $(".detail2_img_name").text($("#img_get_detail_2").val())
          $('#show_detail_2_img').css('display','none')
        }
      })
    }
  }
//onFileLoad_detail_2
  function onFileLoad_detail_2_part(temp) {
    $('#crop_image_detail_two_jcrop').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
    $('#detail2 a.pull-left').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
  }

  function onFileLoad_detail_2(e) {
    $("#detail2_div").css('display', 'none');
    detail_two_binary_file = e
    progressbar(3)
    cancel_cropping_button_enable(3)
    setTimeout('$("#progressbar_parent").hide();',10000)
    setTimeout("if(!cancel_detail_two_upload){onFileLoad_detail_2_part(detail_two_binary_file);}",10000)
    setTimeout('if(!cancel_detail_two_upload){$("#overlay_ajax_loader_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_detail_two_upload){$("#overlay_div_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_detail_two_upload){check_detail2_on_load();}',15000)
    setTimeout('$("#overlay_ajax_loader_for_new_offer_files").hide();$("#overlay_div_for_new_offer_files").hide();',15000)
  }
//onFileLoad_documents
  function onFileLoad_documents_part(temp) {
    var temp_length = $("#img_get_documents").val().length
    var document_file_extension = $("#img_get_documents").val().substring(temp_length - 4,temp_length)
    if (document_file_extension == ".pdf") {
      $("#small_thumb_on_upload_documents").prop('src', '/images/pdf-icon.png')
      $("#img_show_documents").html('<img src="/images/pdf-icon.png"></img>')
      $('#large_preview_for_documents').html('<img src="/images/pdf-icon.jpg"></img>')
      $("#full_screen_documents div.image").html('<img src="/images/pdf-icon.jpg"></img>');
      return
    }
    if (document_file_extension == ".doc" || document_file_extension == "docx") {
      $("#small_thumb_on_upload_documents").prop('src', '/images/word_doc_icon.jpg')
      $("#img_show_documents").html('<img src="/images/word_doc_icon.jpg"></img>')
      $('#large_preview_for_documents').html('<img src="/images/word_doc_icon.jpg"></img>')
      $("#full_screen_documents div.image").html('<img src="/images/word_doc_icon.jpg"></img>');
      return
    }
    $('#img_show_documents').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;"/>');
    $('#large_preview_for_documents').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;"/>');
    $("#full_screen_documents").css({
      width: window.innerWidth,
      height: window.innerHeight
    })
    $("#full_screen_documents div.image").html('<img src="' + temp.target.result +'" style="width:100%;height:100%;"/>');
    $("#documents_name").text($("#img_get_documents").val()) 
    $('#show_documents_img').css('display','none')
    $("#error_new_documents").css('display','none')
    $("#small_thumb_on_upload_documents").prop('src', temp.target.result)
    hide_choose_file(4)
  }
  function onFileLoad_documents(e) {
    documents_binary_file = e
    cancel_cropping_button_enable(4)
    progressbar(4)
    setTimeout("if(!cancel_documents_upload){onFileLoad_documents_part(documents_binary_file);}",10000)
    setTimeout('$("#progressbar_parent").hide();',10000)
  }
//check_thumbnail_on_load
  function check_thumbnail_on_load() {
    $("#small_thumb_on_upload_thumbnail").prop('src', $("#thumbnail a img").prop('src'))
    $('#thumbnail').removeClass("hidden")
    $.colorbox({
      href: '#thumbnail_large_container',
      height: '560px',
      width: '1100px',
      inline: true,
      fixed: true,
      top: '20px',
      scrolling: false,
      onOpen: function() {
        $("#crop_existing_thumbnail").removeAttr('value')
        $("#img_preview_thumbnail").html($("#thumbnail a").html())
        $("#img_preview_thumbnail img").addClass("max_image_width")
        hide_choose_file(1)
        $("#offer_change_thumbnail").hide()
        $('#thumbnail a.pull-left img').Jcrop({
          onChange: thumbnail_update_crop,
          onSelect: thumbnail_update_crop,
          setSelect: [0, 0, 700, 500]
        },function() {
          var bounds = this.getBounds();
          thumbnail_boundx = bounds[0];
          thumbnail_boundy = bounds[1];
          thumbnail_jcrop_api = this;
        });
        $("#img_preview_thumbnail img").css({
          'margin': 0
        })
        $("#thumbnail_large_container").removeClass("hidden")
        $(".thumbnail_img_name").text($("#img_get_thumbnail").val())  
      },
      onClosed: function() {
        $("#thumbnail_large_container").addClass("hidden")
        $('#show_thumbnails_img').css('display','none') 
      }
    })
  }
// onFileLoad_thumbnail
  function onFileLoad_thumbnail_part(temp) {
    $('#img_show_thumbnail').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;"/>');
    //$('#crop_image_thumbnail_jcrop').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
    $('#thumbnail a.pull-left').html('<img src="' + temp.target.result +'" style="width:inherit;height:inherit;" />');
  }
  function onFileLoad_thumbnail(e) {
    $("#thumbnail_div").css('display', 'none');
    progressbar(1)
    cancel_cropping_button_enable(1)
    thumbnail_binary_file = e
    setTimeout('$("#progressbar_parent").hide();',10000)
    setTimeout("if(!cancel_thumbnail_upload){onFileLoad_thumbnail_part(thumbnail_binary_file);}",10000)
    setTimeout('if(!cancel_thumbnail_upload){$("#overlay_ajax_loader_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_thumbnail_upload){$("#overlay_div_for_new_offer_files").show()}',10000)
    setTimeout('if(!cancel_thumbnail_upload){check_thumbnail_on_load();}',15000)
    setTimeout('$("#overlay_ajax_loader_for_new_offer_files").hide();$("#overlay_div_for_new_offer_files").hide();',15000)
  }
// display_preview
  function display_preview(temp) {
    var reader = new FileReader();
    switch(temp.id) {
     case 'img_get_hi_res':
       reader.onload = onFileLoad_hi_res;
       reader.readAsDataURL(temp.files[0]);
     break;
     case 'img_get_detail_1':
       reader.onload = onFileLoad_detail_1;
       reader.readAsDataURL(temp.files[0]);
     break;
     case 'img_get_detail_2':
       reader.onload = onFileLoad_detail_2;
       reader.readAsDataURL(temp.files[0]);
     break;
     case 'img_get_documents':
       reader.onload = onFileLoad_documents;
       reader.readAsDataURL(temp.files[0]);
     break;
     case 'img_get_thumbnail':
       reader.onload = onFileLoad_thumbnail;
       reader.readAsDataURL(temp.files[0]);
     break;
    }
  }
// validate_new_offer_data
  function validate_new_offer_data() {
    var valid = true;
    var validations = []
    var new_artist_name     = $("#new_artist_name")
    var new_artwork_title   = $("#new_artwork_title_en")
    var new_category        = $("#new_category")
    var new_medium          = $("#new_medium")
    var new_height          = $("#new_height")
    var new_width           = $("#new_width")
    var new_depth           = $("#new_depth")
    var new_year            = $("#new_year")
    var new_description_en  = $("#new_description_en")
    var new_start_date      = $("#new_start_date")
    var new_end_date        = $("#new_end_date")
    var new_purpose         = $("#new_purpose")

    validations.push(new_artist_name)
    //validations.push(new_artwork_title)
    validations.push(new_category)
    validations.push(new_medium)
    validations.push(new_height)
    validations.push(new_width)
    validations.push(new_purpose)
    validations.push(new_start_date)
    validations.push(new_end_date)

    if ($("#new_description_ch").length > 0) {
      var new_description_ch = $("#new_description_ch")
      validations.push(new_description_ch)
    };
    if ($("#new_description_fr").length > 0) {
      var new_description_fr = $("#new_description_fr")
      validations.push(new_description_fr)
    };
    if ($("#new_description_fi").length > 0) {
      var new_description_fi = $("#new_description_fi")
      validations.push(new_description_fi)
    };
    if ($("#new_description_us").length > 0) {
      var new_description_us = $("#new_description_us")
      validations.push(new_description_us)
    };
    

    /*if (location.pathname.substr(0,10) == "/offer/new") {
      if ($("#new_certificate").attr("checked") == "checked") {
        if ($("#img_get_documents").val()=='') {
          valid = false;
          $("#error_new_documents").css('display','inline').tooltip()
        }
      } else {
        valid = true;      
        $("#error_new_documents").css('display','none') 
      }
    }*/
    function kill_white_space(temp) {
      return temp.replace(/\s/g, '');
    }
    if (location.pathname.substr(0,14) == "/admin/offers/") {
      if ($("#new_certificate").attr("checked") == "checked") {
        if (kill_white_space($("#documents_name").text()).length == 0) {
          $("#error_new_documents").css('display','inline')
          $("#error_new_documents").tooltip()
          valid = false
        } else {
          $("#error_new_documents").css('display','none')
          valid = true
        }
      }
    }

    $.each(validations, function() {
      if($(this).val() == "") {
        if($(this).attr('id') == "new_artwork_title_en") {
          $("#error_" + $(this).attr('id')).css({"display":"inline"}).tooltip({delay: { show: 500, hide: 100 }}) 
        }
        else {
          $("#error_" + $(this).attr('id')).css({"display":"inline"}).tooltip({delay: { show: 500, hide: 100 }})
          valid = false
        }
      }
      if($(this).val() == "Please choose") {
        $("#error_" + $(this).attr('id')).css({"display":"inline"}).tooltip({delay: { show: 500, hide: 100 }})
        valid = false
      }
      else {
      }
    })
    if (valid == false) {
      $(".site_wide_error").css({display: 'block'})
      $(".site_wide_error_text").text('Please check the errors.')
    } else {
      $(".site_wide_error").css({display: 'none'})    
      $(".site_wide_error_text").text('')
    }
    if (valid == false){
      $(".offer_layout_one").show();
      $(".offer_layout_two").hide();
    }
    if (location.pathname == "/offer/new") {
      if ($("#img_get_hi_res").val()==''){
        valid = false;
        $(".offer_layout_one").show();
        $(".offer_layout_two").hide();
        $("#error_new_hi_res").css('display','inline');
        $('#error_new_hi_res').tooltip()
      }
    }
    return valid
  }

$(function() {

  /*if (location.pathname.substr(0,10) == "/offer/new") {
    if (document.referrer == '' || document.referrer == undefined) {
      $(".cancel_button_new").css("display","none")
    } else {
      $(".cancel_button_new").prop("href",document.referrer)
    }

    $(document).on('click', "#button_crop_new_upload_hires_image" , function() {
      $.colorbox.close()
      $("#offer_new_hi_res").click()
    })
    $(document).on('click', "#button_crop_new_upload_thumbnail_image" , function() {
      $.colorbox.close()
      $("#offer_new_thumbnail").click()
    })
    $(document).on('click', "#button_crop_new_upload_detail_1_image" , function() {
      $.colorbox.close()
      $("#offer_new_detail_1").click()
    })
    $(document).on('click', "#button_crop_new_upload_detail_2_image" , function() {
      $.colorbox.close()
      $("#offer_new_detail_2").click()
    })

    $("#cancel_button_edit").prop("href",document.referrer)
  }
*/
  //this has to be changed later, because this is inconsistent across browsers.
  $("#img_get_hi_res,#img_get_thumbnail,#img_get_detail_1,#img_get_detail_2,#img_get_documents").val('')

// offer buy art favaourites, deleting offers



// offer sell art area for deleting offers

  if (location.pathname.substr(0,14) == "/admin/offers/" ) {
    
    //validate new medium
      var new_medium_validation = new LiveValidation("new_medium", {
        onValid: function()  {
          if ($('#new_medium :selected').index() == 0) {
            $("#error_new_medium").css("display","inline")
            $("#error_new_medium").attr("data-original-title","Please select a medium.")
            $('#error_new_medium').tooltip()
            valid_new_medium = false
          }
          else {
            $('#error_new_medium').hide()
            valid_new_medium = true
          }
        },
        onInvalid: function() {
        }
      });
      new_medium_validation.add(Validate.Presence);
    //validate new height
      var new_height_validation = new LiveValidation("new_height", {
        onValid: function()  {
          if(!$("#new_height").val().match(/^[0-9,]*$/i)) {
            $("#error_new_height").css("display","inline")
            $("#error_new_height").attr("data-original-title","Only numbers allowed")
            $('#error_new_height').tooltip()
            valid_new_height = false
          }
          else {
            $('#error_new_height').hide()
            valid_new_height = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_height").val().length == 0) { 
            $('#error_new_height').hide()
          } 
          else {
            $("#error_new_height").css("display","inline")
            $("#error_new_height").attr("data-original-title","Please enter the height.")
            $("#error_new_height").tooltip()
            valid_new_height = false
          }
        }
      });
      new_height_validation.add(Validate.Presence);
    //validate new width
      var new_width_validation = new LiveValidation("new_width", {
        onValid: function()  {
          if(!$("#new_width").val().match(/^[0-9,]*$/i)) {
            $("#error_new_width").css("display","inline")
            $("#error_new_width").attr("data-original-title","Only numbers allowed")
            $('#error_new_width').tooltip()
            valid_new_width = false
          }
          else {
            $('#error_new_width').hide()
            valid_new_width = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_width").val().length == 0) { 
            $('#error_new_width').hide()
          } 
          else {
            $("#error_new_width").css("display","inline")
            $("#error_new_width").attr("data-original-title","Please enter the width.")
            $("#error_new_width").tooltip()
            valid_new_width = false
          }
        }
      });
      new_width_validation.add(Validate.Presence);
    //validate new depth
      var new_depth_validation = new LiveValidation("new_depth", {
        onValid: function()  {
          if(!$("#new_depth").val().match(/^[0-9,]*$/i)) {
            $("#error_new_depth").css("display","inline")
            $("#error_new_depth").attr("data-original-title","Only numbers allowed")
            $('#error_new_depth').tooltip()
            valid_new_depth = false
          }
          else {
            $('#error_new_depth').hide()
            valid_new_depth = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_depth").val().length == 0) { 
            $('#error_new_depth').hide()
          } 
          else {
            $('#error_new_depth').hide()
          }
        }
      });
      new_depth_validation.add(Validate.Presence);
    //validate new year
      var new_year_validation = new LiveValidation("new_year", {
        onValid: function()  {
          if(!$("#new_year").val().match(/^[0-9]*$/i)) {
            $("#error_new_year").css("display","inline")
            $("#error_new_year").attr("data-original-title","Only numbers allowed")
            $('#error_new_year').tooltip()
            valid_new_year = false
          }
          else {
            $('#error_new_year').hide()
            valid_new_year = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_year").val().length == 0) { 
            $('#error_new_year').hide()
          } 
          else {
            $("#error_new_year").hide()
          }
        }
      });
      new_year_validation.add(Validate.Presence);
    //validate new period
      var new_period_validation = new LiveValidation("new_period", {
        onValid: function()  {
          if(!$("#new_period").val().match( /^[¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
            $("#error_new_period").css("display","inline")
            $("#error_new_period").attr("data-original-title","Only characters allowed")
            $('#error_new_period').tooltip()
            valid_new_period = false
          }
          else {
            $('#error_new_period').hide()
            valid_new_period = true
          }
        },
        onInvalid: function(){
          if (key_pressed == 9 && $("#new_period").val().length == 0) { 
            $('#error_new_period').hide()
          } else {
            $('#error_new_period').hide()
          }
        }
      });
      new_period_validation.add(Validate.Presence);
    //validate new description en
      if($("#new_description_en").length > 0) {
        var new_description_en_validation = new LiveValidation("new_description_en", {
          onValid: function()  {
            if(!$("#new_description_en").val().match( /^[ ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿl \n A-Z 0-9 !@#$%^&*(){}\[\],.\/\\;:'"><?]+$/i)) {
              $("#error_new_description_en").css("display","inline")
              $("#error_new_description_en").attr("data-original-title","Only characters allowed")
              $('#error_new_description_en').tooltip()
              valid_new_description_en = false
            }
            else {
              $('#error_new_description_en').hide()
              valid_new_description_en = true
            }
          },
          onInvalid: function(){
            if (key_pressed == 9 && $("#new_description_en").val().length == 0) { 
              $('#error_new_description_en').hide()
            } else {
              $('#error_new_description_en').hide()
            }
          }
        });
        new_description_en_validation.add(Validate.Presence);
      }
    //validate new purpose
      var new_purpose_validation = new LiveValidation("new_purpose", {
        onValid: function()  {
          if ($('#new_purpose>option:selected').index() == 0) {
            $("#error_new_purpose").css("display","inline")
            $("#error_new_purpose").attr("data-original-title","Please select a purpose.")
            $('#error_new_purpose').tooltip()
            valid_new_purpose = false
          }
          else {
            $('#error_new_purpose').hide()
            valid_new_purpose = true
          }
        },
        onInvalid: function() {
        }
      });
      new_purpose_validation.add(Validate.Presence);
    //remove divs for chooseing images option
      $(document).on('click',"i.icon-remove-circle", function() {
        $(this).parent().hide();
      })
    //  
      $(document).on('click',"#upload_thumbnail", function() {
        //$("#button_crop_stop_thumbnail_image").attr('disabled','true');
        $("#thumbnail_div").css('display','none');
        $("#crop_existing_thumbnail").val('false')
        $("#img_get_thumbnail").click();
      })
      $(document).on('click',"#upload_detail1", function() {
        //$("#button_crop_stop_detail_one").attr('disabled','true');
        $("#detail1_div").css('display','none');
        $("#crop_existing_detail_one").val('false')
        $("#img_get_detail_1").click()
      })
      $(document).on('click',"#upload_detail2", function() {
        //$("#button_crop_stop_detail_two").attr('disabled','true');
        $("#detail2_div").css('display','none');
        $("#crop_existing_detail_two").val('false')
        $("#img_get_detail_2").click()
      })
  }

  $(document).on('click',"#img_show_hi_res", function() {
    $("#large_preview_for_hires").removeClass("hidden");
    $("#large_preview_for_detail1").addClass("hidden");
    $("#large_preview_for_detail2").addClass("hidden");
    $("#large_preview_for_documents").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.hi-res").removeClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-1").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-2").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.documents").addClass("hidden");
    $("i.icon-fullscreen.icon-white.hi-res").removeClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-1").addClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-2").addClass("hidden");
    $("i.icon-fullscreen.icon-white.documents").addClass("hidden");
  })
  
  $(document).on('click',"#img_show_detail_1", function() {  
    $("#large_preview_for_hires").addClass("hidden");
    $("#large_preview_for_detail1").removeClass("hidden");
    $("#large_preview_for_detail2").addClass("hidden"); 
    $("#large_preview_for_documents").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.hi-res").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-1").removeClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-2").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.documents").addClass("hidden");
    $("i.icon-fullscreen.icon-white.hi-res").addClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-1").removeClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-2").addClass("hidden");
    $("i.icon-fullscreen.icon-white.documents").addClass("hidden");
  })
  
  $(document).on('click', "#img_show_detail_2", function() {  
    $("#large_preview_for_hires").addClass("hidden");    
    $("#large_preview_for_detail1").addClass("hidden");     
    $("#large_preview_for_detail2").removeClass("hidden");     
    $("#large_preview_for_documents").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.hi-res").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-1").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-2").removeClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.documents").addClass("hidden");
    $("i.icon-fullscreen.icon-white.hi-res").addClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-1").addClass("hidden");
    $("i.icon-fullscreen.icon-white.detail-2").removeClass("hidden");
    $("i.icon-fullscreen.icon-white.documents").addClass("hidden");

  })
  
  $(document).on('click',"#img_show_documents", function() {  
    
    if(location.pathname.substr(0,14) == "/admin/offers/"){
      if($('#img_get_documents').val().match(/pdf/) || $('#img_get_documents').val().match(/doc/) || $('#img_get_documents').val().match(/docx/))  {
        return false;
      }
    }    
  
    $("#large_preview_for_hires").addClass("hidden");    
    $("#large_preview_for_detail1").addClass("hidden");     
    $("#large_preview_for_detail2").addClass("hidden");     
    $("#large_preview_for_documents").removeClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.hi-res").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-1").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.detail-2").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-zoom-in.documents").removeClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-fullscreen.hi-res").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-fullscreen.detail-1").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-fullscreen.detail-2").addClass("hidden");
    $("#img_show_hi_res_all i.icon-white.icon-fullscreen.documents").removeClass("hidden");
  })

  $(document).on('click',"i.icon-zoom-in.hi-res", function() { 
    $.colorbox({
      href: '#hi_res',
      height: '560px',
      width: '700px',
      inline: true,
      fixed: true,
      top: '20px',
      scrolling: false,
      onOpen: function() {
        $("#hi_res").css("z-index","20000")
        $("#cboxClose").css("z-index",'20000')
        // $("i.icon-white.icon-zoom-in.hi-res").css("z-index","auto")
        // $("i.icon-white.icon-zoom-in.detail-1").css("z-index","auto")
        $("#hi_res_overlay").removeClass("hidden")
        $(".crop_preview_text").removeClass("hidden")
        $("#img_show_detail_1_parent_div div#img_show_detail_1 div#img_preview_detail1").css({
          'fixed': true,
          'height': '100%',
          'width': '100%',
          "z-index": "1000"
        })
        $('#img_show_hi_res_parent_div div#img_show_hi_res div#img_preview_hi_res').css({
          'fixed': true,
          'height': '100%',
          'width': '100%',
          "z-index": "1000"
        })
        $("#img_show_detail_2_parent_div").css({
          "position":"relative",
          "z-index":"1000"
        })
        $("#img_show_documents_parent_div").css({
          "position":"relative",
          "z-index":"1000"
        })
        $("#hi_res_large_container").removeClass("hidden")
        $("#hi_res span").hide()
      },
      onClosed: function() {
        $("#cboxClose").css("z-index",'auto')
        // $("i.icon-white.icon-zoom-in.hi-res").css("z-index","10000")
        // $("i.icon-white.icon-zoom-in.detail-1").css("z-index","10000")
        $("#hi_res_large_container").addClass("hidden").css("z-index","auto")
        $("#hi_res span").show()
        $(".crop_preview_text").addClass("hidden")
        $("#hi_res_overlay").addClass("hidden")
      }
    })
  })

  $(document).on('click', "i.icon-zoom-in.detail-1", function() { 
   $.colorbox({
     href: '#detail1',
     height: '560px',
     width: '700px',
     inline: true,
     fixed: true,
     top: '20px',
     scrolling: false,
     onOpen: function() {
              $("#cboxClose").css("z-index",'20000')
      $(".crop_preview_text").removeClass("hidden")
      $("#detail1_overlay").removeClass("hidden")
      $("#img_show_detail_1_parent_div div#img_show_detail_1 div#img_preview_detail1").css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $('#img_show_hi_res_parent_div div#img_show_hi_res div#img_preview_hi_res').css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $("#img_show_detail_2_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#img_show_documents_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#detail1").removeClass("hidden")
      $("#detail1 span").hide()
      
     },
     onClosed: function() {
      $("#cboxClose").css("z-index",'auto')
      $("#detail1_overlay").addClass("hidden")
      $("#detail1").addClass("hidden")
      $("#detail1 span").show()
      $(".crop_preview_text").addClass("hidden")
     }
   })
  })

  $(document).on('click',"i.icon-zoom-in.detail-2", function() { 
   $.colorbox({
     href: '#detail2',
     height: '560px',
     width: '700px',
     inline: true,
     fixed: true,
     top: '20px',
     scrolling: false,
     onOpen: function() {
              $("#cboxClose").css("z-index",'20000')
      $("#detail2_overlay").removeClass("hidden")
      $(".crop_preview_text").removeClass("hidden")
      $("#img_show_detail_1_parent_div div#img_show_detail_1 div#img_preview_detail1").css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $('#img_show_hi_res_parent_div div#img_show_hi_res div#img_preview_hi_res').css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $("#img_show_detail_2_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#img_show_documents_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#detail2").removeClass("hidden")
      $("#detail2 span").hide()
     },
     onClosed: function() {
              $("#cboxClose").css("z-index",'auto')
      $("#detail2").addClass("hidden")
      $("#detail2 span").show()
      $(".crop_preview_text").addClass("hidden")
      $("#detail2_overlay").addClass("hidden")
     }
   })
  })

  $(document).on('click',"i.icon-zoom-in.documents", function() {   
   $.colorbox({
     href: '#img_show_documents',
     height: '560px',
     width: '700px',
     inline: true,
     fixed: true,
     top: '20px',
     scrolling: false,
     onOpen: function() {
      $("#cboxClose").css("z-index",'20000')
      $("#img_show_detail_1_parent_div div#img_show_detail_1 div#img_preview_detail1").css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $('#img_show_hi_res_parent_div div#img_show_hi_res div#img_preview_hi_res').css({
        'fixed': true,
        'height': '100%',
        'width': '100%',
        "z-index": "1000"
      })
      $("#img_show_detail_2_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#img_show_documents_parent_div").css({
        "position":"relative",
        "z-index":"1000"
      })
      $("#img_show_documents").removeClass("hidden")
      $("#img_show_documents").css({
        "height": "100%",
        "width": "100%",
        "position": "static",
        "top":"0px",
        "right":0,
        "oveflow": "hidden",
        "padding-left": "0px"
      })
      $("#img_show_documents img").css({
        "height": "100%",
        "width": "100%",
        "margin-top": "0px",
        "margin-left": "0px",        
      })
     },
      onClosed: function() {
      $("#cboxClose").css("z-index",'auto')
      $('#img_show_documents').css({
       "z-index": "10000",
       "position": "static",
       "height": "100px",
       "width": "100px",
      })
     }
   })
  })
  $(document).on('click', "#button_crop_stop_thumbnail_image", function() {
    $("#thumbnail_crop_x, #thumbnail_crop_y, #thumbnail_crop_w, #thumbnail_crop_h").removeAttr('value');
    $("#thumbnail a img").css("visibility","visible");
    $("#small_thumb_on_upload_thumbnail").prop('src','')
    $("#img_preview_thumbnail").html('')
    $("#img_get_thumbnail").prop('value','')
    show_choose_file(1)
    thumbnail_jcrop_api.destroy();
    $.colorbox.close()
  })
  $(document).on('click',"#button_crop_stop_detail_two", function() {
    $("#detail_two_crop_x, #detail_two_crop_y, #detail_two_crop_w, #detail_two_crop_h").removeAttr('value');
    $("#detail2 a img").css("visibility","visible");
    $("#img_get_detail_2").prop('value', '')
    $("#small_thumb_on_upload_detail_2").prop('src','')
    $("#img_preview_detail2").html('')
    show_choose_file(3)
    detail2_jcrop_api.destroy();
    $.colorbox.close()
  })
  $(document).on('click',"#button_crop_stop_detail_one", function() {
    $("#detail_one_crop_x, #detail_one_crop_y, #detail_one_crop_w, #detail_one_crop_h").removeAttr('value');
    $("#detail1 a img").css("visibility","visible");
    $("#img_get_detail_1").prop('value', '');
    $("#small_thumb_on_upload_detail_1").prop('src','')
    $("#img_preview_detail1").html('')
    detail1_jcrop_api.destroy();
    show_choose_file(2)
    $.colorbox.close()
  })

   $(document).on('click',"#button_crop_stop_hires_image", function() {
    $("#hi_res_crop_x, #hi_res_crop_y, #hi_res_crop_w, #hi_res_crop_h").removeAttr('value');
    $("#img_preview_hi_res").html('')
    $("#img_get_hi_res").prop('value', '');
    $("#small_thumb_on_upload_hi_res").prop('src','')
    $.colorbox.close()
    hi_res_jcrop_api.destroy();
    show_choose_file(0)
  })
  $(document).on('click', '#offer_new_hi_res_file_delete', function() {
    $("#button_crop_stop_hires_image").click()
  })
  $(document).on('click', '#offer_new_detail_1_file_delete', function() {
    $("#button_crop_stop_detail_one").click()
  })
  $(document).on('click', '#offer_new_detail_2_file_delete', function() {
    $("#button_crop_stop_detail_two").click()
  })
  $(document).on('click', '#offer_new_thumbnail_file_delete', function() {
    $("#button_crop_stop_thumbnail_image").click()
  })
  $(document).on('click', '#offer_new_documents_file_delete', function() {
    show_choose_file(4)
    $("#small_thumb_on_upload_documents").prop('src','')
    $("#documents_name").text($("#documents_name").attr('data-text'))
    $("#img_get_documents").val('')
    $("#img_show_documents").html('')
  })

if (location.pathname.substr(0,14) == "/admin/offers/" ){

  $(document).on('click', "#crop_thumbnail", function() {
    if ($('#original').html() == '') {
      alert('Please select the high resolution image');
    } else {
      $("#button_crop_stop_thumbnail_image").attr('disabled','true');
      $("#thumbnail_div").css('display','none');
      $('#thumbnail').removeClass("hidden")
      $("#thumbnail a").html($("#original").html())
      $("#crop_existing_thumbnail").val('true')
      $.colorbox({
        href: '#thumbnail',
        height: '560px',
        width: '700px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#img_preview_thumbnail").removeClass("hidden")
          $("#img_preview_thumbnail").html($("#thumbnail a").html())
        },
        onClosed: function() {
          $('#thumbnail').addClass("hidden");
          $("#img_preview_thumbnail").addClass("hidden");
          $("#show_thumbnails_img").addClass("hidden");          
          $("#thumbnail_img_name").text($("#img_get_hi_res").val());
        }
      })
    }
  })



  $(document).on('click', "#crop_detail1", function() {
    if ($('#original').html() == '') {
      alert('Please select the high resolution image');
    } else {
      $("#button_crop_stop_detail_one").attr('disabled','true');
      $("#detail1_div").css('display','none');
      $('#detail1').removeClass("hidden")
      $("#detail1 a").html($("#original").html())
      $("#crop_existing_detail_one").val('true')
      $.colorbox({
        href: '#detail1',
        height: '560px',
        width: '700px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#img_preview_detail1").removeClass("hidden")
          $("#img_preview_detail1").html($("#detail1 a").html())
          $("#large_preview_for_detail1").html($("#detail1 a").html())
          $("#full_screen_detail_1 div").html($("#detail1 a").html())
        },
        onClosed: function() {
          $('#detail1').addClass("hidden");
          $("#img_preview_detail1").addClass("hidden");          
          $("#show_detail_1_img").addClass("hidden");
          $("#detail1_img_name").text($("#img_get_hi_res").val());
        }
      })
    }
  })


  $(document).on('click',"#crop_detail2", function() {
    if ($('#original').html() == '') {
      alert('Please select the high resolution image');
    } else {
      //$("#button_crop_stop_detail_two").attr('disabled','true');
      $("#detail2_div").css('display','none');
      $('#detail2').removeClass("hidden")
      $("#detail2 a").html($("#original").html())
      $("#crop_existing_detail_two").val('true')
      $.colorbox({
        href: '#detail2',
        height: '560px',
        width: '700px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#img_preview_detail2").removeClass("hidden")
          $("#img_preview_detail2").html($("#detail2 a").html())
          $("#large_preview_for_detail2").html($("#detail2 a").html())
          $("#full_screen_detail_2 div").html($("#detail2 a").html())
        },
        onClosed: function() {
          $('#detail2').addClass("hidden");
          $("#img_preview_detail2").addClass("hidden");
          $("#show_detail_2_img").addClass("hidden");   
          $("#detail2_img_name").text($("#img_get_hi_res").val());
        }
      })
    }
  })

  $("#button_crop_save_detail_two, #button_crop_save_hires_image,#button_crop_save_detail_one, #button_crop_save_thumbnail_image").click(function(){
      $.colorbox.close();
  })
}

if (location.pathname.substr(0,14) == "/admin/offers/") {
  function log(data) {
    $("#new_artist_name").val(data);
  }

  $( "#new_artist_name" ).autocomplete({
    source: "/admin/offers/find_artist_by_name",
    minLength: 2,
    select: function( event, ui ) {
      log( ui.item ? ui.item.value : "Nothing selected, input was " + this.value );
    }
  })._resizeMenu = function () {
      var ul = this.menu.element;
      ul.outerWidth('100px');
  }
  
  var date = $("#new_start_date").datepicker({
    dateFormat: "yy-mm-dd",
    onSelect: function(date) {
      $("#error_new_start_date").css('display','none')
      $("#new_end_date").val("");
      $("#new_end_date").datepicker('destroy');
      var date2 = new Date(date);
      date2.setDate(date2.getDate() + 30);
      var date3 = new Date(date)
      date3.setDate(date3.getDate() + 90)
      $("#new_end_date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: date2,
        maxDate: date3,
        onSelect: function() {
          $("#error_new_end_date").css('display','none')
        }
      })
    },
    minDate: 0
  })
}

  $(".offer_layout_one").show();
  $(".offer_layout_two").hide();

  function copy_to_next() {
    $.get(
      "/admin/offers/find_artist_chronology",
      'term='+ $("#new_artist_name").val(),
      function(data){
        if(data != null) {
          $("#summary_artist_name").html(data.artist_name)
          $("#summary_artist_life_span").html("(" + data.artist_birth_year + "-" + data.artist_death_year + ")")
          $("#fullscreen_artist_name").html(data.artist_name)
          $("#fullscreen_artist_name").append("(" + data.artist_birth_year + "-" + data.artist_death_year + ")")
        } else {
          $("#summary_artist_name").val($("#new_artist_name").val()) 
          $("#summary_artist_life_span").html('Chronology Unknown')
          $("#fullscreen_artist_name").html($("#new_artist_name").val() + 'Chronology Unknown' )
        }
      }
    )
    if ($("#new_artist_name").val().length < 1) {
      $("#summary_artist_name").html('');
      $("#fullscreen_artist_name").html('');
    } else {
      $("#summary_artist_name").html($("#new_artist_name").val());
      $("#fullscreen_artist_name").html($("#new_artist_name").val());
    }
    $("#summary_artist_life_span").html();
    
    $("#summary_category").html($("#new_category").val());
    $("#summary_medium").html($("#new_medium").val());
    var temp = $("#new_height").val() + "x" + $("#new_width").val() + "x" + $("#new_depth").val() + " " + $("#new_size_unit").val();
    $("#summary_size").html(temp);
    $("#fullscreen_size").html(temp);
    var temp = $("#new_year").val() + " " + $("#new_era").val();
    $("#summary_year").html(temp);
    $("#fullscreen_dateofcreation").html(temp);
    $("#summary_period").html($("#new_period").val());
    $("#fullscreen_period").html($("#new_period").val());
    var today = new Date()
    var temp = today.getFullYear().toString() + "-" +  (today.getMonth() + 1).toString() + "-" + today.getDay()
    $("#summary_submitted").text(temp)
    $("#fullscreen_submitted").text(temp)

    if ($("#new_certificate").is(":checked") == true) {
      $("#summary_certificate").html("√");
      $("#fullscreen_certificate").html("√");
    } else {
      $("#summary_certificate").html("No");
      $("#fullscreen_certificate").html("No");
    }

    if ($("#new_frame").is(":checked") == true){
      $("#summary_frame").html("√");
      $("#fullscreen_frame").html("√");
    } else {
      $("#summary_frame").html("No");
      $("#fullscreen_frame").html("No");
    }
    if ($("#new_signature").is(":checked") == true) {
      $("#summary_signature").html("√");
      $("#fullscreen_signature").html("√");
    } else {
      $("#summary_signature").html("No");
      $("#fullscreen_signature").html("No");
    }
      
    $("#summary_description").val($("#new_description_en").val());
    $("#fullscreen_description").text($("#new_description_en").val());

    if ($("#new_purpose option:selected").index() == 0) {
      $("#summary_purpose").html('')
    } else {  
      $("#summary_purpose").html($("#new_purpose").val()) 
    }

    if ($("#new_category option:selected").index() == 0){
      $("#summary_category").html('')
      $("#fullscreen_category").html('')
    } else {  
      $("#summary_category").html($("#new_category").val()) 
      $("#fullscreen_category").html($("#new_category").val()) 
    }

    if ($("#new_medium option:selected").index() == 0){
      $("#summary_medium").html('')
      $("#fullscreen_medium").html('')
    } else {  
      $("#summary_medium").html($("#new_medium").val())
      $("#fullscreen_medium").html($("#new_medium").val())
    }

    if ($("#new_country option:selected").index() == 0) {
      $("#summary_country").html('')
      $("#fullscreen_country").html('')
    } else {  
      $("#summary_country").html($("#new_country").val()) 
      $("#fullscreen_country").html($("#new_country").val()) 
    }

    if (kill_white_space($("#new_artwork_title_en").val()).length < 1 ) {
      $("#summary_painting_title").html($("#new_artwork_title_en").attr('data-value'));
      $("#fullscreen_title").html($("#new_artwork_title_en").attr('data-value'));
    } else {
      $("#summary_painting_title").html($("#new_artwork_title_en").val());
      $("#fullscreen_title").html($("#new_artwork_title_en").val());
    }

  }

  function mandatory_fields_present(){
    valid = true
    if ($("#new_artist_name").val() == ""){
      valid = false
      $("#error_new_artist_name").css("display","inline").attr("data-original-title","Please enter the artist name").tooltip()
    }
    // if ($("#new_artwork_title_en").val() == ""){
    //   valid = false
    //   $("#error_new_artwork_title_en").css("display","inline").attr("data-original-title", "Please enter the artwork title").tooltip()
    // }
    if ($("#new_category option:selected").index() == 0) {
      valid = false
      $("#error_new_category").css("display","inline").attr("data-original-title","Please choose a category").tooltip()
    }
    if ($("#new_medium option:selected").index() == 0) {
      valid = false
      $("#error_new_medium").css("display","inline").attr("data-original-title","Please choose a medium").tooltip()
    }
    if ($("#new_height").val() == "") {
      valid = false
      $("#error_new_height").css("display","inline").attr("data-original-title","Please enter the height").tooltip()
    } 
    if ($("#new_width").val() == "") {
      valid = false
      $("#error_new_width").css("display","inline").attr("data-original-title","Please enter the width").tooltip()
    } 
    if ($("#new_start_date").val() == "") {
      valid = false
      $("#error_new_start_date").css("display","inline").attr("data-original-title","please choose a start date").tooltip()
    } 
    if ($("#new_end_date").val() == "") {
      valid = false
      $("#error_new_end_date").css("display","inline").attr("data-original-title","please choose an end date").tooltip()
    } 
    if ($("#new_purpose option:selected").index() == 0) {
      valid = false
      $("#error_new_purpose").css("display","inline").attr("data-original-title","Please select a purpose").tooltip();
    }
    if (location.pathname == "/offer/new") {
      if ($("#new_certificate").is(":checked") == true) {
        if ($("#img_get_documents").val()=='') {
          valid = false;
          $("#error_new_documents").css('display','inline').tooltip()
        }
      } else {
        valid = valid && true;      
        $("#error_new_documents").css('display','none') 
      }
    }
    if (location.pathname.substr(0,14) == "/admin/offers/") {
      if ($("#new_certificate").is(":checked") == true) {
        if ($("#previous_document_present").val()=='true') {
          valid = true && valid;
          $("#error_new_documents").hide()
        } else {
          valid = false;
          $("#error_new_documents").css('display','inline').tooltip()
        }
      }
    }
    /*if (location.pathname == "/offer/new"){
      if ($("#img_get_hi_res").val()==''){
        valid = false;
        $(".offer_layout_one").show();
        $(".offer_layout_two").hide();
        $("#error_new_hi_res").css('display','inline');
        $('#error_new_hi_res').tooltip()
      }
    }*/
    if (valid == false) {
      $(".site_wide_error").show();
      $(".site_wide_error_text").text('Please check the errors.');
    } else {
      $(".site_wide_error").hide() 
    }
    return valid
  }

  $(document).on('click',"#offer_preview",function() {
    
    if($('#img_get_documents').val().match(/pdf/) || $('#img_get_documents').val().match(/doc/) || $('#img_get_documents').val().match(/docx/)) {
      $('.icon-white.icon-zoom-in.documents').hide();
    } else {
      $('.icon-white.icon-zoom-in.documents').show();
    }

    if (mandatory_fields_present()) {
      copy_to_next();
      set_style_of_preview_images()
      $(".offer_layout_one").hide();
      $(".offer_layout_two").show();
      $(".site_wide_error").css('display','none')
      $("#img_preview_hi_res").click()
      setTimeout('$("#img_preview_hi_res").click()',100)
    } else { 
      // if ($("#large_preview_for_hires").hasClass("hidden") && $("#large_preview_for_detail2").hasClass("hidden") && $("#large_preview_for_detail1").hasClass("hidden") && $("#large_preview_for_documents").hasClass("hidden")) {
      //   $("#large_preview_for_hires").removeClass("hidden");
      // } else {
        $(".offer_layout_one").show();
        $(".offer_layout_two").hide();
        $(".site_wide_error").show();
        $(".site_wide_error_text").text('Please check the errors.');
      // }
    }

    /*if (location.pathname.substr(0,10) == "/offer/new") {
      $("#img_show_hi_res").html($("#img_preview_hi_res").outerHTML());
      $("#img_show_hi_res div#img_preview_hi_res").removeClass("hidden");  
      $("#img_show_hi_res div#img_preview_hi_res").css({
        "position":"absolute",
        "width":"100px",
        "height":"100px",
        "right":"0",
        "top":"0"
      })

      $("#img_show_detail_1").html($("#img_preview_detail1").outerHTML()); 
      $("#img_show_detail_1 div#img_preview_detail1").removeClass("hidden");     
      $("#img_show_detail_1 div#img_preview_detail1").css({
        "position":"absolute",
        "width":"100px",
        "height":"100px",
        "right":"0",
        "top":"0"
      }) 

      $("#img_show_detail_2").html($("#img_preview_detail2").outerHTML());
      $("#img_show_detail_2 div#img_preview_detail2").removeClass("hidden");  
      $("#img_show_detail_2 div#img_preview_detail2").css({
        "position":"absolute",
        "width":"100px",
        "height":"100px",
        "right":"0",
        "top":"0"
      })

      $("#img_show_thumbnail").html($("#img_preview_thumbnail").outerHTML());
      $("#img_show_thumbnail div#img_preview_thumbnail").removeClass("hidden");  
      $("#img_show_thumbnail div#img_preview_thumbnail").css({
        "position":"absolute",
        "width":"100px",
        "height":"100px",
        "right":"0",
        "top":"0"
      })
    }*/

    if (location.pathname.substr(0,14) == "/admin/offers/") {
      if(parseInt($("#hi_res_crop_x").val()) > 0){
        $("#img_show_hi_res").html($("#img_preview_hi_res").outerHTML());
        $("#img_show_hi_res div#img_preview_hi_res").removeClass("hidden");  
        $("#img_show_hi_res div#img_preview_hi_res").css({
          "position":"absolute",
          "width":"100px",
          "height":"100px",
          "right":"0",
          "top":"0"
        })
      }

      if(parseInt($("#detail_one_crop_x").val()) > 0){
        $("#img_show_detail_1").html($("#img_preview_detail1").outerHTML()); 
        $("#img_show_detail_1 div#img_preview_detail1").removeClass("hidden");     
        $("#img_show_detail_1 div#img_preview_detail1").css({
          "position":"absolute",
          "width":"100px",
          "height":"100px",
          "right":"0",
          "top":"0"
        })
      }

      if(parseInt($("#detail_two_crop_x").val()) > 0) {
        $("#img_show_detail_2").html($("#img_preview_detail2").outerHTML()); 
        $("#img_show_detail_2 div#img_preview_detail2").removeClass("hidden");
        $("#img_show_detail_2 div#img_preview_detail2").css({
          "position":"absolute",
          "width":"100px",
          "height":"100px",
          "right":"0",
          "top":"0"
        })
      }
      $("#img_show_thumbnail").html($("#img_preview_thumbnail").outerHTML());
      $("#img_show_thumbnail div#img_preview_thumbnail").removeClass("hidden");  
      $("#img_show_thumbnail div#img_preview_thumbnail").css({
        "position":"absolute",
        "width":"100px",
        "height":"100px",
        "right":"0",
        "top":"0"
      })
  
    }
  });

 /* if (location.pathname.substr(0,11) == "/offer/edit" ) {    
    $.fn.serializeValues = function(user_id) {
      var values = {}
      values["current_offer[id]"]                     = $("#offer_id").val();
      values["temp[new_artist_name]"]                 = $("#new_artist_name").val();
      values["artwork[artwork_category]"]             = $("#new_category").val();
      values["artwork[artwork_medium]"]               = $("#new_medium").val();
      values["artwork[artwork_height]"]               = $("#new_height").val();
      values["artwork[artwork_width]"]                = $("#new_width").val();
      values["artwork[artwork_depth]"]                = $("#new_depth").val();
      values["artwork[artwork_size_unit]"]            = $("#new_size_unit").val();
      values["artwork[artwork_creation_year]"]        = $("#new_year").val();
      values["artwork[artwork_creation_year_era]"]    = $("#new_era").val();
      values["artwork[artwork_certificate_check]"]    = $("#new_certificate").attr("checked") == "checked"? true: false;
      values["artwork[artwork_frame_check]"]          = $("#new_frame").attr("checked") == "checked"? true: false;
      values["artwork[artwork_signature_check]"]      = $("#new_signature").attr("checked") == "checked"? true: false;
      values["artwork[artwork_movement_period]"]      = $("#new_period").val();
      if ($("#new_country option:selected").index() != 0) {
        values["artwork[artwork_country"]               = $("#new_country").val();
      }
      values["offer[offer_type]"]                     = $("#new_purpose").val();
      values["offer[offer_start_date]"]               = $("#new_start_date").val();
      values["offer[offer_end_date]"]                 = $("#new_end_date").val();
      values["offer[offer_status]"]                   = $("#new_offer_status").attr("checked") == "checked"? true: false;
      values["offer[offer_cancellation_reason]"]      = $("#new_status_desc").val();
      
      $("input[id^=new_artwork_title_]").each(function() {
        if (this.id == "new_artwork_title_en") {
          values["artwork_title[artwork_title_en]"] = this.value;
        } else if (this.id == "new_artwork_title_fr") {
          values["artwork_title[artwork_title_fr]"] = this.value;
        } else if (this.id == "new_artwork_title_fi") {
          values["artwork_title[artwork_title_fi]"] = this.value;
        } else if (this.id == "new_artwork_title_ch") {
          values["artwork_title[artwork_title_ch]"] = this.value;
        } else if (this.id == "new_artwork_title_ne") {
          values["artwork_title[artwork_title_ne]"] = this.value;
        }
      })

      $("textarea[id^=new_description_]").each(function() {
        if (this.id == "new_description_en") {
          values["artwork_description[artwork_description_en]"] = this.value;
        } else if (this.id == "new_description_fr") {
          values["artwork_description[artwork_description_fr]"] = this.value;
        } else if (this.id == "new_description_fi") {
          values["artwork_description[artwork_description_fi]"] = this.value;
        } else if (this.id == "new_description_ch") {
          values["artwork_description[artwork_description_ch]"] = this.value;
        } else if (this.id == "new_description_ne") {
          values["artwork_description[artwork_description_ne]"] = this.value;
        }
      })
      return values;
    }
    $(document).on('click',".new_offer_submit", function() {
      if (validate_new_offer_data()) {
        $.ajax({
          type: "POST",
          url: "/offer/update",
          async: false,
          dataType: 'json',
          data: $(this).serializeValues(),
          success: function(return_data) {
            if (return_data == true) {
              $("#image_form_submit_button").click();
            }
          }
        })
      } else  {
        $(".offer_layout_one").show();
        $(".offer_layout_two").hide();
      }
    })
  }

  if (location.pathname == "/offer/new" ) {
    
    $.fn.serializeValues = function(user_id) {
      var values = {}
      values["new_artist_name"]    = $("#new_artist_name").val();
      values["new_category"]       = $("#new_category").val();
      values["new_medium"]         = $("#new_medium").val();
      values["new_height"]         = $("#new_height").val();
      values["new_width"]          = $("#new_width").val();
      values["new_depth"]          = $("#new_depth").val();
      values["new_size_unit"]      = $("#new_size_unit").val();
      values["new_year"]           = $("#new_year").val();
      values["new_era"]            = $("#new_era").val();
      values["new_certificate"]    = $("#new_certificate").attr("checked") == "checked"? true: false;
      values["new_frame"]          = $("#new_frame").attr("checked") == "checked"? true: false;
      values["new_signature"]      = $("#new_signature").attr("checked") == "checked"? true: false;
      values["new_period"]         = $("#new_period").val();
      values["new_description"]    = $("#new_description").val();
      values["new_purpose"]        = $("#new_purpose").val();
      values["new_start_date"]     = $("#new_start_date").val();
      values["new_end_date"]       = $("#new_end_date").val();
     
      if ($("#new_country option:selected").index() != 0) {
        values["new_country"]      = $("#new_country").val();
      }

      $("input[id^=new_artwork_title_]").each(function() {
        if (this.id == "new_artwork_title_en") {
          values["artwork_title[artwork_title_en]"] = this.value;
        } else if (this.id == "new_artwork_title_fr") {
          values["artwork_title[artwork_title_fr]"] = this.value;
        } else if (this.id == "new_artwork_title_fi") {
          values["artwork_title[artwork_title_fi]"] = this.value;
        } else if (this.id == "new_artwork_title_ch") {
          values["artwork_title[artwork_title_ch]"] = this.value;
        } else if (this.id == "new_artwork_title_ne") {
          values["artwork_title[artwork_title_ne]"] = this.value;
        }
      })
    
      $("textarea[id^=new_description_]").each(function() {
        if (this.id == "new_description_en") {
          values["artwork_description[artwork_description_en]"] = this.value;
        } else if (this.id == "new_description_fr") {
          values["artwork_description[artwork_description_fr]"] = this.value;
        } else if (this.id == "new_description_fi") {
          values["artwork_description[artwork_description_fi]"] = this.value;
        } else if (this.id == "new_description_ch") {
          values["artwork_description[artwork_description_ch]"] = this.value;
        } else if (this.id == "new_description_ne") {
          values["artwork_description[artwork_description_ne]"] = this.value;
        }
      })
      return values;
    }

    $(document).on('click',".new_offer_submit", function() {
      if (validate_new_offer_data()) {
        $.ajax({
          type: "POST",
          url: "/offer/",
          async: false,
          dataType: 'json',
          data: $(this).serializeValues(),
          success: function(return_data) {
            if (return_data == true) {
              $("#image_form_submit_button").click();
            }
          }
        })
      } else {
        $(".offer_layout_one").show();
        $(".offer_layout_two").hide();
      }
    })
  }*/

  $(document).on('click',".new_offer_edit", function() {
    $(".offer_layout_one").show();
    $(".offer_layout_two").hide();
    remove_style_of_preview_images()
  });
  if ($("#flash_notice").html() != "") {
    $("#flash_message").show();
    setTimeout('$("#flash_message").hide()',3000);
  }
  $(document).on('click', "#offer_new_hi_res", function() {
    cancel_hi_res_upload = false
    cancel_cropping_button_enable(0)
    $("#img_get_hi_res").click()
  })
  $(document).on('click',"#offer_new_thumbnail", function() {
    cancel_thumbnail_upload  = false
    cancel_cropping_button_enable(1)
    $("#img_get_thumbnail").click()
  })
  $(document).on('click',"#offer_new_detail_1", function() {
    cancel_cropping_button_enable(2)
    cancel_detail_one_upload = false
    $("#img_get_detail_1").click()
  })
  $(document).on('click',"#offer_new_detail_2", function() {
    cancel_cropping_button_enable(3)
    cancel_detail_two_upload = false
    $("#img_get_detail_2").click()
  })
  $(document).on('click',"#offer_new_documents", function() {
    cancel_cropping_button_enable(4)
    cancel_documents_upload  = false
    $("#img_get_documents").click()
  })




//
  if (location.pathname.substr(0,19) == "/admin/offers/edit/") {
    $(function() {
      $.ajax({
        url: '/admin/offers/get_data',
        data: {
          category: $("#new_category").val()
        },
        dataType: 'text',
        type: 'POST',
        success: function(data) {
          $("#new_medium").html("")
          var string = []
          var new_data = data.split(",")
          for (var i = 0; i < new_data.length; i++) {
            string[i] = "<option>" + new_data[i].replace(/"/, '').replace('[', '').replace(']','').replace(/"/,'') + "</option>"
          }
          $("#new_medium").html("<option>Please choose</option>")
          $("#new_medium").append(string)
          $("#new_medium").children().each(function() {
            if ($(this).text()==$("#previous_selected_medium").val()){
              $(this).attr("selected","true")
            } 
          })          
        },
        error: function(data) {
        }
      })    
      if ($("#new_offer_status").attr("checked") == "checked") {
        $("#new_status_desc").css('display','none')
        $("#text_for_deactive_box").css('display','none')
      }  else{
        $("#new_status_desc").css('display','block')
        $("#text_for_deactive_box").css('display','block')
      }
      $("#new_offer_status").on('click', function() {
        if ($("#new_offer_status").attr("checked") == "checked") {
          $("#new_status_desc").css('display','none')
          $("#text_for_deactive_box").css('display','none')
        } else {
          $("#new_status_desc").css('display','block')
         $("#text_for_deactive_box").css('display','block')
        }
      })
    })
  }


//
  /*if (location.pathname.substr(0,11) == "/offer/edit") {
    $.ajax({
      url: '/offer/get_data',
      data: {
        category: $("#new_category").val()
      },
      dataType: 'text',
      type: 'POST',
      success: function(data) {
        $("#new_medium").html("")
        var string = []
        var new_data = data.split(",")
        for (var i = 0; i < new_data.length; i++) {
          string[i] = "<option>" + new_data[i].replace(/"/, '').replace('[', '').replace(']','').replace(/"/,'') + "</option>"
        }
        $("#new_medium").html("<option>Please choose</option>")
        $("#new_medium").append(string)
        $("#new_medium").children().each(function() {
          if ($(this).text()==$("#previous_selected_medium").val()){
            $(this).attr("selected","true")
          } 
        })          
      },
      error: function(data) {
      }
    })
  }*/
// change the medium to previously selected medium  edit


// inserting previously added descriptions
  $("textarea[id^=new_description_]").each(function() {
    offer_new_description_languages_selected.push($(this).attr('id').split('_')[2])
  })

// inserting previously added descriptions



//hidding summary view in the offer edit page\
/*if (location.pathname.substr(0,11) == "/offer/show"){
  $(".offer_show_container").show()
}
//
  if (location.pathname.substr(0,13) == "/myoffer/show" || location.pathname.substr(0,11) == "/offer/show" ){
    $(".offer_layout_two").show()
    
    $(document).on('click',"i.icon-white.icon-zoom-in.hi-res", function() { 
     $.colorbox({
       href: '#hi_res',
       height: '560px',
       width: '700px',
       inline: true,
       fixed: true,
       top: '20px',
       scrolling: false,
       onOpen: function() {
         $("#hi_res").removeClass("hidden")
       },
       onClosed: function() {
         $("#hi_res").addClass("hidden")
       }
     })
    })
    $(document).on('click',"i.icon-white.icon-zoom-in.detail-1", function() { 
     $.colorbox({
       href: '#detail1',
       height: '560px',
       width: '700px',
       inline: true,
       fixed: true,
       top: '20px',
       scrolling: false,
       onOpen: function() {
         $("#detail1").removeClass("hidden")
       },
       onClosed: function() {
         $("#detail1").addClass("hidden")
       }
     })
    })
    $(document).on('click',"i.icon-white.icon-zoom-in.detail-2", function() { 
     $.colorbox({
       href: '#detail2',
       height: '560px',
       width: '700px',
       inline: true,
       fixed: true,
       top: '20px',
       scrolling: false,
       onOpen: function() {
         $("#detail2").removeClass("hidden")
       },
       onClosed: function() {
         $("#detail2").addClass("hidden")
       }
     })
    })
    $(document).on('click', "i.icon-white.icon-zoom-in.documents", function() { 
     $.colorbox({
       href: '#img_show_documents',
       height: '560px',
       width: '700px',
       inline: true,
       fixed: true,
       top: '20px',
       scrolling: false
     })
    })
  }*/


//hidding summary view in the offer edit page
  
})
var cancel_hi_res_upload     = false
var cancel_thumbnail_upload  = false
var cancel_detail_one_upload = false
var cancel_detail_two_upload = false
var cancel_documents_upload  = false


//function detail_one_update_crop 
  function detail_one_update_crop(coords) {
    if (parseInt(coords.w) > 0) {
      var rx = 100/coords.w;
      var ry = 100/coords.h;
      var rx1 = 480/coords.w;
      var ry1 = 480/coords.h;
      var window_rx = $("#detail_one_crop_w").val()/coords.w //0.9 * window.innerWidth/coords.w
      var window_ry = $("#detail_one_crop_h").val()/coords.h //0.9 * window.innerHeight/coords.h
      $('#img_preview_detail1 img').css({
        width: Math.round(rx * detail1_boundx) + 'px',
        height: Math.round(ry * detail1_boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
      });
      $('#large_preview_for_detail1 img').css({
        width: Math.round(rx1 * detail1_boundx) + 'px',
        height: Math.round(ry1 * detail1_boundy) + 'px',
        marginLeft: '-' + Math.round(rx1 * coords.x) + 'px',
        marginTop: '-' + Math.round(ry1 * coords.y) + 'px'
      });

      $("#full_screen_detail_1").css({
        width: window.innerWidth,
        height: window.innerHeight
      })
      temp_margin = ($("#full_screen_detail_1").width() - $("#full_screen_detail_1 div.image").width())/2      
      $("#full_screen_detail_1 div.image").css({
        width : $("#detail_one_crop_w").val(),
        height: $("#detail_one_crop_h").val(),
        marginLeft: temp_margin
      })
      $('#full_screen_detail_1 div img').css({
        width: Math.round(window_rx * detail1_boundx) + 'px',
        height: Math.round(window_ry * detail1_boundy) + 'px',
        marginLeft: '-' + Math.round(window_rx * coords.x) + 'px',
        marginTop: '-' + Math.round(window_ry * coords.y) + 'px'
      });
      var ratio_width  = parseFloat($('#detail1 a img')[0].naturalWidth/$('#detail1 a img').width());
      var ratio_height = parseFloat($('#detail1 a img')[0].naturalHeight/$('#detail1 a img').height());
      $("#detail_one_crop_x").val(Math.round(coords.x * ratio_width));
      $("#detail_one_crop_y").val(Math.round(coords.y * ratio_height));
      $("#detail_one_crop_w").val(Math.round(coords.w * ratio_width));
      $("#detail_one_crop_h").val(Math.round(coords.h * ratio_height));
    }
  }

//function detail_two_update_crop
  function detail_two_update_crop(coords) {
    if (parseInt(coords.w) > 0) {
      var rx = 100/coords.w;
      var ry = 100/coords.h;
      var rx1 = 480/coords.w;
      var ry1 = 480/coords.h;
      var window_rx = $("detail_one_crop_w").val()/coords.w //0.9 * window.innerWidth/coords.w
      var window_ry = $("detail_one_crop_h").val()/coords.h //0.9 * window.innerHeight/coords.h
      $('#img_preview_detail2 img').css({
        width: Math.round(rx * detail2_boundx) + 'px',
        height: Math.round(ry * detail2_boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
      });
      $('#large_preview_for_detail2 img').css({
        width: Math.round(rx1 * detail2_boundx) + 'px',
        height: Math.round(ry1 * detail2_boundy) + 'px',
        marginLeft: '-' + Math.round(rx1 * coords.x) + 'px',
        marginTop: '-' + Math.round(ry1 * coords.y) + 'px'
      });

      $("#full_screen_detail_2").css({
        width: window.innerWidth,
        height: window.innerHeight
      })

      temp_margin = ($("#full_screen_detail_2").width() - $("#full_screen_detail_2 div.image").width())/2      
      
      $("#full_screen_detail_2 div.image").css({
        width : $("#detail_two_crop_w").val(),
        height: $("#detail_two_crop_h").val(),
        marginLeft: temp_margin
      })
      $('#full_screen_detail_2 div img').css({
        width: Math.round(window_rx * detail2_boundx) + 'px',
        height: Math.round(window_ry * detail2_boundy) + 'px',
        marginLeft: '-' + Math.round(window_rx * coords.x) + 'px',
        marginTop: '-' + Math.round(window_ry * coords.y) + 'px'
      });

      var ratio_width  = parseFloat($('#detail2 a img')[0].naturalWidth/$('#detail2 a img').width());
      var ratio_height = parseFloat($('#detail2 a img')[0].naturalHeight/$('#detail2 a img').height());
      $("#detail_two_crop_x").val(Math.round(coords.x * ratio_width));
      $("#detail_two_crop_y").val(Math.round(coords.y * ratio_height));
      $("#detail_two_crop_w").val(Math.round(coords.w * ratio_width));
      $("#detail_two_crop_h").val(Math.round(coords.h * ratio_height));
    }
  }

//function hi_res_update_crop
  function hi_res_update_crop(coords) {
    if (parseInt(coords.w) > 0) {
      var rx = 100/coords.w;
      var ry = 100/coords.h;
      var rx1 = 480/coords.w;
      var ry1 = 480/coords.h;
      var window_rx = $("#hi_res_crop_w").val()/coords.w
      var window_ry = $("#hi_res_crop_h").val()/coords.h  
      $('#full_screen_hi_res div img').css({
        width: Math.round(window_rx * hi_res_boundx) + 'px',
        height: Math.round(window_ry * hi_res_boundy) + 'px',
        marginLeft: '-' + Math.round(window_rx * coords.x) + 'px',
        marginTop: '-' + Math.round(window_ry * coords.y) + 'px'
      });



      var small_rx = 40/coords.w;
      var small_ry = 40/coords.h
      $('#small_thumb_on_upload_thumbnail').css({
        width: Math.round(small_rx * hi_res_boundx) + 'px',
        height: Math.round(small_ry * hi_res_boundy) + 'px',
        marginLeft: '-' + Math.round(small_rx * coords.x) + 'px',
        marginTop: '-' + Math.round(small_ry * coords.y) + 'px'
      });      


      
      // var window_rx =  0.9 * window.innerWidth/coords.w
      // var window_ry = 0.9 * window.innerHeight/coords.h
      $("#full_screen_hi_res").css({
        width: window.innerWidth,
        height: window.innerHeight,
        'text-align': 'center',
        'margin': '0 auto'
      })
      temp_margin = ($("#full_screen_hi_res").width() - $("#full_screen_hi_res div.image").width())/2

      $("#full_screen_hi_res div.image").css({
        width : $("#hi_res_crop_w").val(),
        height: $("#hi_res_crop_h").val(),
        marginLeft: temp_margin 
      })
      $('#img_preview_hi_res img').css({
        width: Math.round(rx * hi_res_boundx) + 'px',
        height: Math.round(ry * hi_res_boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
      });
      $('#large_preview_for_hires img').css({
        width: Math.round(rx1 * hi_res_boundx) + 'px',
        height: Math.round(ry1 * hi_res_boundy) + 'px',
        marginLeft: '-' + Math.round(rx1 * coords.x) + 'px',
        marginTop: '-' + Math.round(ry1 * coords.y) + 'px'
      });
      var ratio_width = parseFloat($('#hi_res a img')[0].naturalWidth/$('#hi_res a img').width());
      var ratio_height = parseFloat($('#hi_res a img')[0].naturalHeight/$('#hi_res a img').height());
      $("#hi_res_crop_x").val(Math.round(coords.x * ratio_width));
      $("#hi_res_crop_y").val(Math.round(coords.y * ratio_height));
      $("#hi_res_crop_w").val(Math.round(coords.w * ratio_width));
      $("#hi_res_crop_h").val(Math.round(coords.h * ratio_height));
    }
  }

//thumbnail_update_crop
  function thumbnail_update_crop(coords) {
    if (parseInt(coords.w) > 0) {
      var rx = 100/coords.w;
      var ry = 100/coords.h;
      $('#img_preview_thumbnail img').css({
        width: Math.round(rx * thumbnail_boundx) + 'px',
        height: Math.round(ry * thumbnail_boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
      });
      var ratio_width  = parseFloat($('#thumbnail a img')[0].naturalWidth/$('#thumbnail a img').width());
      var ratio_height = parseFloat($('#thumbnail a img')[0].naturalHeight/$('#thumbnail a img').height());
      $("#thumbnail_crop_x").val(Math.round(coords.x * ratio_width));
      $("#thumbnail_crop_y").val(Math.round(coords.y * ratio_height));
      $("#thumbnail_crop_w").val(Math.round(coords.w * ratio_width));
      $("#thumbnail_crop_h").val(Math.round(coords.h * ratio_height));
    }
  }

function show_choose_file(option) {
  switch(option) {
    case 0:
      $("#offer_new_hi_res").show()
      $("#offer_new_hi_res_file_delete").hide()
      $("#offer_new_hi_res_file_change").hide()
      break;
    case 1:
      $("#offer_new_thumbnail").show()
      $("#offer_new_thumbnail_file_delete").hide()
      $("#offer_new_thumbnail_file_change").hide()
      break;
    case 2:
      $("#offer_new_detail_1").show()
      $("#offer_new_detail_1_file_delete").hide()
      $("#offer_new_detail_1_file_change").hide()
      break;
    case 3:
      $("#offer_new_detail_2").show()
      $("#offer_new_detail_2_file_delete").hide()
      $("#offer_new_detail_2_file_change").hide()
      break;
    case 4:
      $("#offer_new_documents").show()
      $("#offer_new_documents_file_delete").hide()
      $("#offer_new_documents_file_change").hide()
      break;
  }
}

function hide_choose_file(option) {
  switch(option) {
    case 0:
      $("#offer_new_hi_res").hide()
      $("#offer_new_hi_res_file_delete").show()
      $("#offer_new_hi_res_file_change").show()
      break;
    case 1:
      $("#offer_new_thumbnail").hide()
      $("#offer_new_thumbnail_file_delete").show()
      $("#offer_new_thumbnail_file_change").show()
      break;
    case 2:
      $("#offer_new_detail_1").hide()
      $("#offer_new_detail_1_file_delete").show()
      $("#offer_new_detail_1_file_change").show()
      break;
    case 3:
      $("#offer_new_detail_2").hide()
      $("#offer_new_detail_2_file_delete").show()
      $("#offer_new_detail_2_file_change").show()
      break;
    case 4:
      $("#offer_new_documents").hide()
      $("#offer_new_documents_file_delete").show()
      $("#offer_new_documents_file_change").show()
      break;
  }
}

function hide_cancel_cropping_all() {
  $(".cancel_hi_res_upload, .cancel_detail_one_upload, .cancel_detail_two_upload, .cancel_documents_upload, .cancel_thumbnail_upload").css("display","none")
}
function cancel_cropping_button_enable(temp) {
  hide_cancel_cropping_all()
  switch(temp) {
    case 0:
      $(".cancel_hi_res_upload").css("display","block")
      break;
    case 1:
      $(".cancel_thumbnail_upload").css("display","block")
      break;
    case 2:
      $(".cancel_detail_one_upload").css("display","block")
      break;
    case 3:
      $(".cancel_detail_two_upload").css("display","block")
      break;
    case 4:
      $(".cancel_documents_upload").css("display","block")
    default:
      break;
  }
}

function set_style_of_preview_images() {
  $("#img_preview_hi_res, #img_preview_detail1, #img_preview_detail2").css({
    'margin-left': 0,
    'margin-top': 0
  })
}
function remove_style_of_preview_images() {
  $("#img_preview_hi_res, #img_preview_detail1, #img_preview_detail2").css({
    'margin-left': '53px',
    'margin-top': '10px'
  })
}

function progressbar( img_type ) {
  $("#progressbar_parent").show()
  var progressbar = $( "#progressbar" ), progressLabel = $( ".progress-label" );
  var id_for_img_type = ""
  progressbar.show()
  progressbar.progressbar({
    value: false,
    change: function() {
      switch(img_type) {
        case 0:
          id_for_img_type = "#img_get_hi_res"
        break;
        case 1:
          id_for_img_type = "#img_get_thumbnail"
        break;
        case 2:
          id_for_img_type = "#img_get_detail_1"
        break;
        case 3:
          id_for_img_type = "#img_get_detail_2"
        break;
        case 4:
          id_for_img_type = "#img_get_documents"
        break;
        default:
          id_for_img_type = ""
        break;
      }
      var temp_name = ""
      if($.browser.webkit) {
        temp_name = $(id_for_img_type).val().substr(12)  
      } else {
        temp_name = $(id_for_img_type).val()
      }
      progressLabel.text( temp_name + "( " + progressbar.progressbar( "value" ) + "%" + " of " + ($(id_for_img_type)[0].files[0].size/1048576).toFixed(2) + "MB )");
    },
    complete: function() {
      progressLabel.text( "Complete!" );
    }
  });
  function progress() {
    var val = progressbar.progressbar( "value" ) || 0;
    progressbar.progressbar( "value", val + 1 );
    if ( val < 99 ) {
      setTimeout( progress, 100 );
    }
  }
  setTimeout( progress, 0 );
}

function refresh_description_selector() {
  $("#offer_new_add_description_select_temp ul li img[id^=flag_country_]").each(function() {
    $(this).parent().show();
  })  
  _.each(offer_new_description_languages_selected, function(id) {
    $("#offer_new_add_description_select_temp ul li img#flag_country_" + id).parent().hide();  
  })

  if (offer_new_description_languages_selected.length == 5) {
    $("#offer_new_add_description_icon").hide()
  } else {
    $("#offer_new_add_description_icon").show()
  }
}

function refresh_title_selector() {
  $("ul#multiple_title_flags li img[id^=flag_country_]").each(function() {
    $(this).parent().show()
  })
  _.each(offer_new_artwork_title_languages_selected, function(id) {
    $("ul#multiple_title_flags li img#flag_country_" + id).parent().hide();
  })

  if (offer_new_artwork_title_languages_selected.length == 5) {
    $("#offer_select_multiple_title_box").hide()
  } else {
    $("#offer_select_multiple_title_box").show()
  }
}


$(function() {

  if (location.pathname.substr(0,14) == "/admin/offers/") {

    $(document).on('click', "#offer_change_thumbnail", function() {
      $("#offer_new_thumbnail").click()
    })


    $(document).on('click', "#offer_new_hi_res_file_change" , function() {
      $.colorbox({
        href: '#hi_res_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $('#hi_res_large_container').removeClass("hidden")
        },
        onClosed: function() {
          $('#hi_res_large_container').addClass("hidden")
          $('#show_hi_res_img').css('display','none')
        }
      })
    })
    $(document).on('click' ,"#offer_new_thumbnail_file_change" , function() {
      $.colorbox({
        href: '#thumbnail_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#thumbnail_large_container").removeClass("hidden")
        },
        onClosed: function() {
          $("#thumbnail_large_container").addClass("hidden")
          $('#show_thumbnails_img').css('display','none') 
        }
      })
    })
    $(document).on('click' ,"#offer_new_detail_1_file_change" , function() {
      $.colorbox({
        href: '#detail_1_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#detail_1_large_container").removeClass("hidden")
        },
        onClosed: function() {
          $('#show_detail_1_img').css('display','none')
          $("#detail_1_large_container").addClass("hidden")
        }
      })
    })
    $(document).on('click' ,"#offer_new_detail_2_file_change" , function() {
      $.colorbox({
        href: '#detail_2_large_container',
        height: '560px',
        width: '1100px',
        inline: true,
        fixed: true,
        top: '20px',
        scrolling: false,
        onOpen: function() {
          $("#detail_2_large_container").removeClass("hidden")
        },
        onClosed: function() {
          $("#detail_2_large_container").addClass("hidden")
          $('#show_detail_2_img').css('display','none')
        }
      })
    })
    $(document).on('click' ,"#offer_new_documents_file_change" , function() {
      $("#img_get_documents").click()
    })
    



    $(document).on('click',"#multiple_title_flags li img#flag_country_ch", function() {
      offer_add_new_title_box('ch')
      refresh_title_selector();
    })
    $(document).on('click',"#multiple_title_flags li img#flag_country_fr", function() {
      offer_add_new_title_box('fr')
      refresh_title_selector();
    })
    $(document).on('click',"#multiple_title_flags li img#flag_country_fi", function() {
      offer_add_new_title_box('fi')
      refresh_title_selector();
    })
    $(document).on('click',"#multiple_title_flags li img#flag_country_ne", function() {
      offer_add_new_title_box('ne')
      refresh_title_selector();
    })
    $(document).on('click',"#multiple_title_flags li img#flag_country_us", function() {
      offer_add_new_title_box('us')
      refresh_title_selector();
    })


    $(document).on('click',"#multiple_title_box li img[id^=remove_title_]", function() {
      offer_new_artwork_title_languages_selected = _.difference(offer_new_artwork_title_languages_selected, $(this).attr('id').split('_').pop())
      $(this).parent().remove()
      refresh_title_selector();
    })
  }

  //hide cancel button in case there is no back link

  //remove the textarea for description

  $(document).on('click',"ul#new_offer_step_four_ul li img[id^=remove_description_]", function() {
    offer_new_description_languages_selected = _.difference(offer_new_description_languages_selected, $(this).attr('id').split('_').pop())
    $(this).parent().remove()
    refresh_description_selector()
  })


  $(document).on('click',"#offer_new_add_description_select_temp ul li img#flag_country_ch", function() {
    offer_add_new_description_box('ch')
    refresh_description_selector()
  })  

  $(document).on('click',"#offer_new_add_description_select_temp ul li img#flag_country_fr", function() {
    offer_add_new_description_box('fr')
    refresh_description_selector()
  })

  $(document).on('click',"#offer_new_add_description_select_temp ul li img#flag_country_fi", function() {
    offer_add_new_description_box('fi')
    refresh_description_selector()
  })

  $(document).on('click',"#offer_new_add_description_select_temp ul li img#flag_country_ne", function() {
    offer_add_new_description_box('ne')
    refresh_description_selector()
  })


  $(document).on('change',"#img_get_hi_res", function() {
    display_preview(document.getElementById("img_get_hi_res"))
  })
  $(document).on('change',"#img_get_thumbnail", function() {
    display_preview(document.getElementById("img_get_thumbnail"))
  })
  $(document).on('change',"#img_get_detail_1", function() {
    display_preview(document.getElementById("img_get_detail_1"))
  })
  $(document).on('change',"#img_get_detail_2", function() {
    display_preview(document.getElementById("img_get_detail_2"))
  })
  $(document).on('change',"#img_get_documents", function() {
    display_preview(document.getElementById("img_get_documents"))
  })
  

  $(document).on('click', ".cancel_hi_res_upload", function() {
    cancel_hi_res_upload = true
    $("#progressbar_parent").hide()
    $("#img_get_hi_res").prop('value','')
    show_choose_file(0)
    $("#offer_new_hi_res_file_delete").click()
  })
  $(document).on('click', ".cancel_thumbnail_upload", function() {
    $("#progressbar_parent").hide()
    cancel_thumbnail_upload  = true
    $("#img_get_thumbnail").prop('value','')
    show_choose_file(1)
    $("#offer_new_thumbnail_file_delete").click()
  })
  $(document).on('click', ".cancel_detail_one_upload", function() {
    cancel_detail_one_upload = true
    $("#progressbar_parent").hide()
    $("#img_get_detail_1").val('')
    show_choose_file(2)
    $("#offer_new_detail_1_file_delete").click()
  })
  $(document).on('click', ".cancel_detail_two_upload", function() {
    $("#progressbar_parent").hide()
    cancel_detail_two_upload = true
    $("#img_get_detail_2").val('')
    show_choose_file(3)
    $("#offer_new_detail_2_file_delete").click()
  })
  $(document).on('click', ".cancel_documents_upload", function() {
    $("#progressbar_parent").hide()
    cancel_documents_upload  = true
    $("#img_get_documents").val('')
    show_choose_file(4)
    $("#offer_new_documents_file_delete").click()
  })

});
if(location.pathname.substr(0,19) == "/admin/offers/edit/"){
  $(document).on('change', '#new_category', function(){
    if ($("#new_category").val() != "Please choose") {
      $.ajax({
        url: '/admin/offers/get_data',
        data: {
          category: $("#new_category").val()
        },
        dataType: 'text',
        type: 'POST',
        success: function(data) {
          $("#new_medium").html("")
          var string = []
          var new_data = data.split(",")
          for (var i = 0; i < new_data.length; i++) {
            string[i] = "<option>" + new_data[i].replace(/"/, '').replace('[', '').replace(']','').replace(/"/,'') + "</option>"
          }
          $("#new_medium").html("<option>Please choose</option>")
          $("#new_medium").append(string)
        },
        error: function(data) {
        }
      })
    }
  })
}