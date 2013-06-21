var cancel_hi_res_upload     = false
var cancel_thumbnail_upload  = false
var cancel_detail_one_upload = false
var cancel_detail_two_upload = false
var cancel_documents_upload  = false

//enable_cropping_start
  // function enable_cropping_start(temp){
  //   switch(temp) {
  //     case 0:
  //       $("#button_crop_start_hires_image").removeAttr("disabled")
  //     break;
  //     case 1:
  //       $("#button_crop_start_detail_one").removeAttr("disabled")    
  //     break;
  //     case 2:
  //       $("#button_crop_start_detail_two").removeAttr("disabled")
  //     break;
  //     case 3:
  //       $("#button_crop_start_thumbnail_image").removeAttr("disabled")
  //     break;
  //   }
  // }
//disable_cropping_start
  // function disable_cropping_start(temp) {
  //   switch(temp) {
  //     case 0:
  //       $("#button_crop_start_hires_image").attr("disabled", "true")
  //     break;
  //     case 1:
  //       $("#button_crop_start_detail_one").attr("disabled", "true")
  //     break;
  //     case 2:
  //       $("#button_crop_start_detail_two").attr("disabled", "true")
  //     break;
  //     case 3:
  //       $("#button_crop_start_thumbnail_image").attr("disabled", "true") 
  //     break;
  //   }
  // }

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

  if (location.pathname.substr(0,10) == "/offer/new" || location.pathname.substr(0,11) == "/offer/edit" || location.pathname.substr(0,14) == "/admin/offers/") {

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