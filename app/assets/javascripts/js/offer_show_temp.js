var full_screen_ddpowerzoomer = false;

$(function() {
  if(location.pathname.substr(0,11) == "/offer/show") {

    $(document).on('click', 'i[id^=reply_message_]', function() {
      temp_parent_message_id = $(this).attr('id').split('_').pop()
      $.ajax({
        url: "/offer_show/new_reply",
        data: {
          parent_message_id: temp_parent_message_id
        }
      })
    })

    
  var check = true;
  $(document).on("click", "#contact_owner_1", function() {
    if(check) {
      check = false;
      $("#contact_owner_container").animate({ top: 134 });
      $("#contact_owner_container").css('display','block')
    } else {
      check = true;
      $("#contact_owner_container").animate({ top: 660 });
      setTimeout(function() {
       $("#contact_owner_container").css('display','none')
      }, 400);
    }
  });


  $(document).on("click", "#cancel_contact_owner_1", function() {
    $("#contact_owner_container form")[0].reset();
     check = true;
    $("#contact_owner_container").animate({ top: 660 });
      setTimeout(function() {
          $("#contact_owner_container").css('display','none')
      }, 400);
    });
  $(document).on("click", "#complete_view_popup", function(e) {
 
    var url = $(this).attr("href");
    var windowName = "Artface";//$(this).attr("name");
    newwindow = window.open(url,windowName,'height=480,width=720px');
    if (window.focus) {
      newwindow.focus();
    };
    e.preventDefault();
  });
}
  
  if(location.pathname.substr(0,11) == "/offer/show" || location.pathname.substr(0,10) == "/offer/new" || location.pathname.substr(0,13) == "/myoffer/show" || location.pathname.substr(0,11) == "/offer/edit") {

    var offer_show_zoom = true;
  
  // if(location.pathname.substr(0,11) == "/offer/show" ||){
  //   $(document).on('click',"#full_screen_img_show_documents", function() {  
  //   if($('#img_get_documents').val().match(/pdf/) || $('#img_get_documents').val().match(/doc/) || $('#img_get_documents').val().match(/docx/))
  //     {
  //       return false;
  //     }
  //   });
  // }

  $(document).on("click",".icon-fullscreen.icon-white.hi-res", function(e) {
    $(".full_screen").css('display','block')
    document.body.style.overflow=false?"":"hidden";
    $("#full_screen_hi_res").removeClass('hidden')
    $("#full_screen_detail_1, #full_screen_detail_2, #full_screen_documents").addClass('hidden')
  });
  $(document).on("click",".icon-fullscreen.icon-white.detail-1", function(e) {
    $(".full_screen").css('display','block')
    document.body.style.overflow=false?"":"hidden";
    $("#full_screen_detail_1").removeClass('hidden')
    $("#full_screen_hi_res, #full_screen_detail_2, #full_screen_documents").addClass('hidden')
  });
  $(document).on("click",".icon-fullscreen.icon-white.detail-2", function(e) {
    $(".full_screen").css('display','block')
    document.body.style.overflow=false?"":"hidden";
    $("#full_screen_detail_2").removeClass('hidden')
    $("#full_screen_hi_res, #full_screen_detail_1, #full_screen_documents").addClass('hidden')
  });
  $(document).on("click",".icon-fullscreen.icon-white.documents", function(e) {
    $(".full_screen").css('display','block')
    document.body.style.overflow=false?"":"hidden";
    $("#full_screen_documents").removeClass('hidden')
    $("#full_screen_hi_res, #full_screen_detail_1, #full_screen_detail_2").addClass('hidden')
  });

  $(document).on("click","#full_screen_hi_res_change", function(e) {
    $("#full_screen_hi_res").removeClass('hidden')
    $("#full_screen_detail_1, #full_screen_detail_2, #full_screen_documents").addClass('hidden')
    if(offer_show_zoom == false){
      $('#offer_show_zoom_button').click();
    }
    $("#offer_show_zoom_box").show()
    $("#offer_show_zoom_button_box").hide();
  });

  $(document).on("click","#full_screen_detail_1_change", function(e) {
    $("#full_screen_hi_res, #full_screen_detail_2, #full_screen_documents").addClass('hidden')
    $("#full_screen_detail_1").removeClass('hidden')
    if(offer_show_zoom == false){
      $('#offer_show_zoom_button').click();
    }
    $("#offer_show_zoom_box").show()
    $("#offer_show_zoom_button_box").hide(); 
  });

  $(document).on("click","#full_screen_detail_2_change", function(e) {
    $("#full_screen_hi_res, #full_screen_detail_1, #full_screen_documents").addClass('hidden')
    $("#full_screen_detail_2").removeClass('hidden')
    if(offer_show_zoom == false){
    $('#offer_show_zoom_button').click();
    
  }
  $("#offer_show_zoom_box").show()
  $("#offer_show_zoom_button_box").hide();
  });

  $(document).on("click","#full_screen_documents_change", function(e) {
    $("#full_screen_hi_res, #full_screen_detail_1, #full_screen_detail_2").addClass('hidden')
    $("#full_screen_documents").removeClass('hidden')
    if(offer_show_zoom == false){
    $('#offer_show_zoom_button').click();
    
    }
    $("#offer_show_zoom_box").show()
    $("#offer_show_zoom_button_box").hide();
  });

      
  $("#full_screen_detail_1_2,#full_screen_detail_2_3,#full_screen_documents_4").addClass('hidden')
  
  $(document).on("click","#full_screen_close_popup, #back_to_regular_view", function(e) {
    $(".full_screen").hide();
    offer_show_zoom = true;
    $('#full_screen_remove_magnifier_zoom').click();
    $("#magnifier_zoom,#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom,#offer_show_zoom_in").css('display','none');
    $(".image").css('cursor','')
    document.body.style.overflow=true?"":"hidden";
    e.stopPropagation();
  });

  $(document).on("click",".offer_show_data_color", function(e) {
    var data_color = $(this).attr('data-color')
    $('#full_screen_hi_res_1,#full_screen_hi_res, #full_screen_detail_1, #full_screen_detail_2, #full_screen_documents').css('background-color', data_color)
    e.stopPropagation();
  });

  $(document).on("click","#offer_show_info_box,#offer_show_color_box,#offer_show_zoom_box,#offer_show_zoom_button_box", function(e) {
    e.stopPropagation();
  });
   
  $(document).on("click","#offer_show_info", function(e) {
    $("#offer_show_zoom_box,#offer_show_color_box,#offer_show_zoom_button_box").hide();
    $("#offer_show_info_box").toggle()
    $("#offer_show_info_box").toggleClass("active")
    $("#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','none')
    e.stopPropagation();
  });
  
  $(document).on("click","#offer_show_zoom", function(e) {
    $("#offer_show_info_box,#offer_show_color_box,#offer_show_zoom_button_box").hide();
    $("#offer_show_zoom_box").toggle()
    $("#offer_show_zoom_box").toggleClass("active")
    $("#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','none')
    e.stopPropagation();
  });
  
  $(document).on("click","#offer_show_color", function(e) {
     $("#offer_show_zoom_box,#offer_show_info_box,#offer_show_zoom_button_box").hide();
     $("#offer_show_color_box").toggle()
     $("#offer_show_color_box").toggleClass("active")
     $("#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','none')
     $("#offer_show_color_box").find('ul').find('li').css('cursor','pointer')
     e.stopPropagation();
  });

  $(".full_screen_img_hover").on("hover", function(e) {
    $("#offer_show_zoom_in").css('display','none')
    if (e.type == "mouseenter") {
      $(".full_screen_icon_img_hover").css('display','block');
    } else if(e.type == "mouseleave") { 
      if($("#offer_show_info_box,#offer_show_zoom_box,#offer_show_color_box,#offer_show_zoom_button_box").hasClass("active") == true) {
        return false;
      }
      $(".full_screen_icon_img_hover").css('display','none');
      $("#offer_show_color_box,#offer_show_zoom_box,#offer_show_info_box,#offer_show_zoom_button_box").css('display','none');
    }
    e.stopPropagation();
  });
  
  $(".full_screen_icon_img_hover").on("hover", function(e) {
    if (e.type == "mouseenter") {
      $(".full_screen_icon_img_hover").css('display','block');
    } else if(e.type == "mouseleave"){ 
      if($("#offer_show_info_box,#offer_show_zoom_box,#offer_show_color_box,#offer_show_zoom_button_box").hasClass("active") == true) {
        return false;
      }
      $(".full_screen_icon_img_hover").css('display','none');
    }
  });

  $("#full_screen_hi_res_1").on("hover", function(e) {
    $("#offer_show_zoom_in").css('display','none')
  });
  
  $("#full_screen_remove_magnifier_zoom").click(function(e){
    $("#magnifier_zoom,#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom,#offer_show_zoom_in").css('z-index','-1');
    $(".image").css('cursor','')
    return false;
  })

  $("#full_screen_plus_magnifier_zoom").click(function(e){
    full_screen_ddpowerzoomer = true
    ddpowerzoomer.movemagnifier(e, false, "in")
    return false;
  })

  $("#full_screen_minus_magnifier_zoom").click(function(e){
    full_screen_ddpowerzoomer = true
    ddpowerzoomer.movemagnifier(e, false, "out")  
    return false;
  })
    
  $(document).on("click","#full_screen_hi_res_1", function(e) {
    $("#magnifier_zoom,#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','none')
    $("#offer_show_info_box,#offer_show_color_box,#offer_show_zoom_box,#offer_show_zoom_button_box").removeClass("active")
  });

  $(document).on("click", function(e) {
    if(e.target.id == "full_screen_icon_img_hover") {
    } else {
      $("#offer_show_info_box,#offer_show_zoom_box, #offer_show_color_box, #offer_show_zoom_button_box").hide();
    }
  })

    
  $(document).on("mouseleave", "#offer_show_zoom_in", function() {
    $("#offer_show_zoom_in").css("display","none")
  })

  $(document).on("mouseleave", ".image", function() {
    $("#offer_show_zoom_in").css("display","none")
  })

  $(document).on("mouseleave", ".full_screen_img_hover", function() {
    $("#offer_show_zoom_in").css("display","none")
  })

  function offershow() {

    $("#magnifier_zoom, #full_screen_remove_magnifier_zoom, #full_screen_plus_magnifier_zoom, #full_screen_minus_magnifier_zoom").css('z-index','2222221');
    $("#offer_show_zoom_in").css('z-index','2222222');
    $("#magnifier_zoom").css('left','0').css('top','-300px')
    $(".image").css('cursor','none')
    $("#magnifier_zoom").css('cursor','none')
    $(".image").unbind('mousemove').mousemove(function(e){
      $("#offer_show_zoom_in").css("display","block")  
      var mouseX = e.pageX;
      var mouseY = e.pageY;
      $("#offer_show_zoom_in").css({'top':mouseY,'left':mouseX})
    });
    
    $("#magnifier_zoom").unbind('mousemove').mousemove(function(e){
      $("#offer_show_zoom_in").css("display","block")  
      var mouseX = e.pageX;
      var mouseY = e.pageY;
      $("#offer_show_zoom_in").css({'top':mouseY,'left':mouseX})
    });
    
    $(document).on("click",".image", function(e) {
      //var mouseX = e.pageX;
      //var mouseY = e.pageY;

    
    

      // $("#full_screen_remove_magnifier_zoom").css({'top':mouseY - 60,'left':mouseX + 75})
      // $("#full_screen_minus_magnifier_zoom").css({'top':mouseY + 55,'left':mouseX + 66})
      // $("#full_screen_plus_magnifier_zoom").css({'top':mouseY + 30,'left':mouseX + 83})


      $("#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','block')
      $("#offer_show_info_box,#offer_show_color_box,#offer_show_zoom_box,#offer_show_zoom_button_box").removeClass("active")
      e.stopPropagation();
    });
    if (!$("#full_screen_hi_res").hasClass("hidden")) {

      jQuery(document).ready(function($){ //fire on DOM ready
        $('#full_screen_hi_res .image img').addpowerzoom({
          magnifiersize:[150,150]
        })
      })  
    }
    if (!$("#full_screen_detail_1").hasClass("hidden")) {
      jQuery(document).ready(function($){ //fire on DOM ready
        $('#full_screen_detail_1 .image img').addpowerzoom({
          magnifiersize:[150,150]
        })
      })
    }
    if (!$("#full_screen_detail_2").hasClass("hidden")) {
      jQuery(document).ready(function($){ //fire on DOM ready
        $('#full_screen_detail_2 .image img').addpowerzoom({
          magnifiersize:[150,150]
        })
      })
    }
    if (!$("#full_screen_documents").hasClass("hidden")) {
      jQuery(document).ready(function($){ //fire on DOM ready
        $('#full_screen_documents .image img').addpowerzoom({
          magnifiersize:[150,150]
        })
      })
    }
    
  }


  $(document).on("click","#offer_show_zoom_button", function(e) {

    offer_show_zoom = false;

    $("#offer_show_zoom_box,#offer_show_info_box,#offer_show_color_box").hide();
    $("#offer_show_zoom_button_box").toggle();
    $("#offer_show_zoom_button_box").toggleClass("active")
    $("#full_screen_remove_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_minus_magnifier_zoom").css('display','none')
    offershow();
    e.stopPropagation();
  });


  $("#full_screen_minus_magnifier_zoom,#full_screen_plus_magnifier_zoom,#full_screen_remove_magnifier_zoom").on("hover", function(e) {
    if (e.type == "mouseenter") {
      $("#full_screen_minus_magnifier_zoom").css('cursor','pointer')
      $("#offer_show_zoom_in").css('display','none');
    } else { 
      $("#full_screen_minus_magnifier_zoom").css('cursor','none')
      $("#offer_show_zoom_in").css('display','block'); 
    }
  });
}
  
// if(window.location.href.toString().split(window.location.host)[1] == "/offer/show/168/full-screen/?image-type=detail-1") {
//   $("#full_screen_hi_res_1,#full_screen_detail_2_3,#full_screen_documents_4").addClass('hidden')
// }

// if(window.location.href.toString().split(window.location.host)[1] == "/offer/show/168/full-screen/?image-type=detail-2") {
//   $("#full_screen_hi_res_1,#full_screen_detail_1_2,#full_screen_documents_4").addClass('hidden')
// }

// if(window.location.href.toString().split(window.location.host)[1] == "/offer/show/168/full-screen/?image-type=documents") {
//   $("#full_screen_hi_res_1,#full_screen_detail_1_2,#full_screen_detail_2_3").addClass('hidden')
// }
  
})
  
