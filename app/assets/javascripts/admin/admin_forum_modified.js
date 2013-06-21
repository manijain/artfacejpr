
if (location.pathname.match('/admin/users/.+/forum_list')) {
  //var declaration
  var forum_option_array = new Array(); 
  var forum_theValue, forum_current_value, forum_status, forum_search_advanced_id;
  var forum_option_array_total = [1,2,3,4,5,6,7]

  //function declarations
  function toggle_search() {
    $("#forum_advanced_search, #forum_basic_search").toggle()
  }

}


  if (location.pathname.match('/admin/users/.+/forum_list')) {
    //make pagination links ajaxified
    $(".pagination a").each(function() {
      $(this).attr("data-remote","true")
    })


    //forum search basic submit
    $(document).on("click", "#forum_basic_search input[type=submit]", function() {
      $("#forum_basic_search #forum_message_sort_by").val($(".nav-sort #sort_by").val())
      $("#forum_basic_search #forum_message_per_page").val($(".nav-sort #per_page").val())
    })

    //forum search advanced submit
    $(document).on("click", "#forum_advanced_search input[type=submit]", function() {
      $("#forum_advanced_search #forum_message_sort_by").val($(".nav-sort #sort_by").val())
      $("#forum_advanced_search #forum_message_per_page").val($(".nav-sort #per_page").val())
      //$('img[id^=error_text_input]').hide()
    })

    //validation on submit
    $(document).on('click', '#forum_advanced_search input[type=submit]', function(){
      for(var i = forum_option_array.length-1; i>=0; i--){
        switch(forum_option_array[i]){
          case 1:
            if($('#text_input_concern').val() == ""){
              alert('Please enter the concern')
              $('#error_text_input_concern').css('display', 'inline')
              $('#error_text_input_concern').attr('data-original-title', 'Please enter concern')
              $('#error_text_input_concern').tooltip()
              return false
            }
            else if(!$('#text_input_concern').val().match( /^[A-Za-z .0-9 ?!-]+$/ )) {
              $('#error_text_input_concern').css('display', 'inline')
              $('#error_text_input_concern').attr('data-original-title', 'Allowed characters: A-Z .0-9')
              $('#error_text_input_concern').tooltip()
              return false;
            }
            break;
          case 2:
            if($('#text_input_date_of_post').val() == ""){
              alert('Please enter date of post')
              $('#error_text_input_date_of_post').css('dispaly', 'inline')
              $('#error_text_input_date_of_post').attr('data-original-title', 'Please choose date from Datepicker')
              $('#error_text_input_date_of_post').tooltip()
              return false;
            }
            break;
          case 3:
            if($('#text_input_offer_id').val() == ""){
              alert('Please enter offer ID')
              $('#error_text_input_offer_id').css('display', 'inline')
              $('#error_text_input_offer_id').attr('data-original-title', 'Please enter offer ID')
              $('#error_text_input_offer_id').tooltip()
              return false
            }
            else if(!$('#text_input_offer_id').val().match( /^[.0-9]+$/ )){
              $('#error_text_input_offer_id').css('display', 'inline')
              $('#error_text_input_offer_id').attr('data-original-title', 'Allowed only numbers')
              $('#error_text_input_offer_id').tooltip()
            }
            break;
          case 4:
            if($('#text_input_artist').val() == ""){
              alert('Please enter Artist name')
              $('#error_text_input_artist').css('display', 'inline')
              $('#error_text_input_artist').attr('data-original-title', 'Please enter artist name')
              $('#error_text_input_artist').tooltip()
              return false
            }
            else if(!$('#text_input_artist').val().match( /^[A-Za-z .0-9]+$/ )){
              $('#error_text_input_artist').css('display', 'inline')
              $('#error_text_input_artist').attr('data-original-title', 'Allowed characters: A-Z .0-9')
              $('#error_text_input_artist').tooltip()
              return false
            }
            break;
          case 5:
            if($('#text_input_title').val() == ""){
              alert('Please enter Title')
              $('#error_text_input_title').css('display', 'inline')
              $('#error_text_input_title').attr('data-original-title', 'Please enter Title')
              $('#error_text_input_title').tooltip()
              return false
            }
            else if(!$('#text_input_title').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
              $('#error_text_input_title').css('display', 'inline')
              $('#error_text_input_title').attr('data-original-title', 'Allowed characters: A-Z .0-9 ?!-')
              $('#error_text_input_title').tooltip()
              return false
            }
            break;
          case 6:
            if($('#text_input_description').val() == ""){
              alert('Please enter description')
              $('#error_text_input_description').css('display', 'inline')
              $('#error_text_input_description').attr('data-original-title', 'Please enter description')
              $('#error_text_input_description').tooltip()
              return false
            }
            else if(!$('#text_input_description').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
              $('#error_text_input_description').css('display', 'inline')
              $('#error_text_input_description').attr('data-original-title', 'Allowed characters: A-Z .0-9 ?!-')
              $('#error_text_input_description').tooltip()
              return false
            }
            break;
          case 7:
            if($('#text_input_author').val() == ""){
              alert('Please enter Author name')
              $('#error_text_input_author').css('display', 'inline')
              $('#error_text_input_author').attr('data-original-title', 'Please enter Author name')
              $('#error_text_input_author').tooltip()
              return false
            }
            else if(!$('#text_input_author').val().match( /^[A-Za-z .0-9]+$/ )){
              $('#error_text_input_author').css('display', 'inline')
              $('#error_text_input_author').attr('data-original-title', 'Allowed characters: A-Z .0-9')
              $('#error_text_input_author').tooltip()
            }
            break;
        }
      }
    })

    //var declaration

    forum_filter_single_string = $("ul.search_filters").html()   // for appending extra fields in the search filters 

    current_id = 1
    //keeping count of the number of filters added in the search filter

    //page ready calls

    //basic to advanced search
    $(document).off('click', "img.search_toggle");
    $(document).on('click', "img.search_toggle", function() {
      toggle_search();
      
      //choose first element in advanced search
      if (kill_white_space($("ul.search_filters li span#span_1").html()) == "") {
        $("ul.search_filters li select#advanced_select_1").children().first().next().attr("selected","true").change()
        $("input#text_input_concern").val($("form#forum_basic_search input#forum_message_search_string").val())
      }
    })

    //remove fields and return to basic search if only one field is present.
    $(document).off('click', "img.remove_search_field");
    $(document).on('click', "img.remove_search_field", function() {
      if ($("ul.search_filters").children().length == 1) {
        toggle_search();
      } else {
        //remove the current field from the search filters
        var remove_value_id = $(this).parent().children().first().attr('id')
        
        forum_option_array = $.grep(forum_option_array, function(value) {
          return value != $("#" + remove_value_id + " option:selected").index()
        })
        
        $(this).parent().remove()
      }
    })


    //add fields clicking on the plus button in advanced search
    $(document).off('click', "img.add_search_field");
    $(document).on('click',"img.add_search_field", function() {
      if(forum_option_array.length == 7) {
        alert("All filters added")
        return
      }
      $("ul.search_filters").append(forum_filter_single_string);
      $("ul.search_filters").children().last().each(function() {
        
        current_id = current_id + 1
        $(this).children().first().attr("id","advanced_select_" + current_id)
        $(this).children().first().next().attr("id","span_" + current_id)
      })
      select_new_field = _.first(_.difference(forum_option_array_total,forum_option_array))
      $("#advanced_select_" + current_id).children().eq(select_new_field).attr("selected","true").change()
      for (var i = 1; i <= forum_option_array.length; i++) {
        $("select#advanced_select_" + i).children().each(function() {
          if (_.contains(forum_option_array, $(this).index())) {
            $(this).css("display","none")
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block")
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
    })


    //set current value of select field

   /* $(document).on('click', "select[id^=advanced_select_]" ,function() {
      forum_theValue = $(this).attr('value');
    })*/
   $("ul.search_filters select[id^=advanced_select_]").live('click', function() {
      forum_theValue = $(this).attr('value');
    })
   

}


    //run onchange function to append the html into the corresponding span
    
  if(location.pathname.match('/admin/users/.+/forum_list')) {
    $(document).off('change', "li.filter_li select[id^=advanced_select_]");
    $(document).on('change', "li.filter_li select[id^=advanced_select_]", function() {
      //alert("hello")
      var currently_clicked = $("#" + $(this).attr('id') + " option:selected").index()
      forum_current_value         = $("#" + $(this).attr('id') + " option:selected").index() 
      forum_search_advanced_id    = $(this).attr('id')
      
      if (($.inArray(forum_current_value, forum_option_array)!=-1) && forum_option_array.length>0){  
        forum_status=false;
        
        check_option($("#"+$(this).attr('id') + " option:selected").val())
        alert("Filter Already added")
        return
      }

      forum_option_array = new Array()
      forum_status = true
      
      $("select[id^=advanced_select_]").each(function(){  
        if ($("#"+$(this).attr('id') + " option:selected").index()!=0){
          push_data = $("#"+$(this).attr('id') + " option:selected").index()
          forum_option_array.push(push_data);
          
        }
      })
      function_text = $("#" + $(this).attr('id') + " option:selected").attr("data-function")
      a = "#span_" + $(this).attr('id').split('_').pop()
      
      temp = new Function(function_text)
      temp();
      for (var i = 1; i <= current_id; i++) {
        $("select#advanced_select_" + i).children().each(function() {
          if (_.contains(forum_option_array,$(this).index())) {
            $(this).css("display","none");
            $(this).attr("disabled", "disabled")
            $(this).css("visibility", "hidden")
          } else {
            $(this).css("display","block");
            $(this).removeAttr("disabled")
            $(this).css("visibility", "visible")
          }
        })
      }
     
      /*switch($("ul.search_filters select[id^="+ $(this).attr('id') + "] option:selected").index()){
        case 0:
          console.log('case 0')
        break;
        case 1:
          console.log('case 1')
         // forum_add_validation_to_concern()
        break;
        case 2:
          forum_add_validation_to_date_of_post()
        break;
        case 3:
          forum_add_validation_to_offer_id()
        break;
        case 4:
          forum_add_validation_to_artist_name()
        break;
        case 5:
          forum_add_validation_to_title()
        break;
        case 6:
          forum_add_validation_to_description()
        break;
        case 7:
          forum_add_validation_to_author()
        break;
      }*/
    })
  
  }



  


  $(function() {
    $(document).on("click", "#forum_data ul li a:eq(0)", function(){
      //alert("hello")
      
      var user_id = $("#user_id").val();
      if(window.sessionStorage)
          sessionStorage.setItem('user_id',user_id)
      //console.log(user_id)
    })
  })

  $(function() {
    if (location.pathname.substr(0,13) == "/admin/forums") {
      //current_user_id = sessionStorage.getItem('user_id')
      //$('#user_id').val(current_user_id)
      $(document).on("click", ".add_reply", function(){
        $.ajax({
          url: "/admin/forums/new_reply",
          data: {
            forum_message_id : $("#parent_message_id").val()
          },
          success: function(data){
            temp = new Function(data.responseText)
          }
        })
      })
      var reply_count = 0;
      $(document).on("click", "#reply_individual", function(){
        reply_count = reply_count + 1;
        element = $(this)
        if (reply_count == 1){
          $.ajax({
            url: "/admin/forums/new_reply_child",
            data: {
              forum_message_id : element.attr('forum_message_id')
            },
            success: function(data){
              temp = new Function(data.responseText)
            }
          })
        }
      })
      var edit_count = 0
      $(document).on("click", "#edit_individual", function(){
        element = $(this)
        edit_count = edit_count + 1;
        if (edit_count == 1){
          $.ajax({
            url: "/admin/forums/edit_reply",
            data: {
              forum_message_id : element.attr('forum_message_id')
            },
            success: function(data){
              temp = Function(data.responseText)
            }
          })
        }
      })
      $(document).on("click", "#remove_individual", function(){
        var element = $(this).attr('forum_message_id'),
        $this = $(this);
        if(confirm("Do you really want to delete the message?")){
          $.ajax({
            url: "/admin/forums/remove_message",
            data: {
              forum_message_id: element
            },
            success: function(){
              alert('message deleted ');
              //$this.parent("li[id^=\'forum_message_\']").append("This post has been deleted by the forum admin.")
              $this.parent("li").append("This post has been deleted by the forum admin.")
              $this.parent("li").find("p.pull-left").hide()
            }
          })
        }
      })
      
      $(document).on("mouseover", "ul.unstyled li[id^=\'forum_message_\']",function(){
        if($(this).find('p.pull-left').text() != 'This post has been deleted by the forum admin.'){      
          $(this).find('#reply_individual').css('display', 'block')
          $(this).find('#edit_individual').css('display', 'block')
          $(this).find('#remove_individual').css('display', 'block')
        }
      })
      $(document).on("mouseout", "ul.unstyled li[id^=\'forum_message_\']", function(){
        $(this).find('#reply_individual').css('display', 'none')
        $(this).find('#edit_individual').css('display', 'none')
        $(this).find('#remove_individual').css('display', 'none')
      })
    }
  })

//var forum_option_array = new Array(); 

/*if (location.pathname.match('/admin/users/.+/forum_list')) {
  var key_pressed;
  $(window).keydown(function(e){
    key_pressed = e.keyCode;
  })
  //add_validation_to_artist_name
  function forum_add_validation_to_artist_name() {
    var text_input_artist_validation = new LiveValidation("text_input_artist", {
      onValid: function()  {
        if(!$("#text_input_artist").val().match( /^[A-Za-z .0-9]+$/)) {
          $("#error_text_input_artist").css("display","inline")
          $("#error_text_input_artist").attr("data-original-title","Only characters are allowed")
          $('#error_text_input_artist').tooltip()
          valid_text_input_artist = false
        }
        else {
          $('#error_text_input_artist').hide()
          valid_text_input_artist = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_artist").val().length == 0) { 
          $('#error_text_input_artist').hide()
        } 
        else {
          $("#error_text_input_artist").css("display","inline")
          $("#error_text_input_artist").attr("data-original-title","Please enter the artist name.")
          $("#error_text_input_artist").tooltip()
          valid_text_input_artist = false
        }
      }
    });
    text_input_artist_validation.add(Validate.Presence);
  }

  //add_validation_to_concern
  /*function forum_add_validation_to_concern() {
    console.log('function');
    var forum_text_input_concern_validation = new LiveValidation("text_input_concern", {
      onValid: function() {
        console.log('valid')
        if(!$("#text_input_concern").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
          $("#error_text_input_concern").css("display","inline")
          $("#error_text_input_concern").attr("data-original-title","Special characters not allowed")
          $('#error_text_input_concern').tooltip()
          valid_text_input_concern = false
        }
        else {
          $('#error_text_input_concern').hide()
          valid_text_input_concern = true
        }
      },
      onInvalid: function(){
        console.log('invalid')
        if (key_pressed == 9 && $("#text_input_concern").val().length == 0) { 
          $('#error_text_input_concern').hide()
        } 
        else {
          $("#error_text_input_concern").css("display","inline")
          $("#error_text_input_concern").attr("data-original-title","Please enter concern.")
          $("#error_text_input_concern").tooltip()
          valid_text_input_concern = false
        }
      }
    });
    forum_text_input_concern_validation.add(Validate.Presence);
  }*/
  
  

  //add_validation_to_date_of_post
  /*function forum_add_validation_to_date_of_post() {  
    $("#date_input_date_of_post").on('keyup',function() {
      $(this).val('')
      $("#error_text_input_date_of_post").css("display","inline")
      $("#error_text_input_date_of_post").attr("data-original-title","Please select the date from datepicker")
      $('#error_text_input_date_of_post').tooltip()
    })
  }

  //add_validation_to_offer_id
  function forum_add_validation_to_offer_id() {
    var text_input_offer_id_validation = new LiveValidation("text_input_offer_id", {
      onValid: function()  {
        if(!$("#text_input_offer_id").val().match( /^[.0-9]+$/)) {
          $("#error_text_input_offer_id").css("display","inline")
          $("#error_text_input_offer_id").attr("data-original-title","Only numbers are allowed")
          $('#error_text_input_offer_id').tooltip()
          valid_text_input_offer_id = false
        }
        else {
          $('#error_text_input_offer_id').hide()
          valid_text_input_offer_id = true
        }
      },
      onInvalid: function(){
        if (key_pressed == 9 && $("#text_input_offer_id").val().length == 0) { 
          $('#error_text_input_offer_id').hide()
        } 
        else {
          $("#error_text_input_offer_id").css("display","inline")
          $("#error_text_input_offer_id").attr("data-original-title","Please enter the depth.")
          $("#error_text_input_offer_id").tooltip()
          valid_text_input_offer_id = false
        }
      }
    });
    text_input_offer_id_validation.add(Validate.Presence);
  }

  //add_validation_to_title
  function forum_add_validation_to_title(){
    var text_input_title_validation = new LiveValidation("text_input_title", {
      onValid: function(){
        if(!$("#text_input_title").val().match(/^[A-Za-z .0-9 ?!-]+$/)){
          $('#error_text_input_title').css('display', 'inline')
          $('#error_text_input_title').attr('data-original-title', 'Special characters not allowed')
          $('#error_text_input_title').tooltip()
          valid_text_input_title = false
        }
        else{
          $('#error_text_input_title').hide()
          valid_text_input_title = true
        }
      },
      onInvalid: function(){
        if(key_pressed == 9 && $('#text_input_title').val().length == 0){
          $('#error_text_input_title').hide()
        }
        else{
          $('#error_text_input_title').css('display', 'inline')
          $('#error_text_input_title').attr('data-original-title', 'Please enter the title')
          $('#error_text_input_title').tooltip()
          valid_text_input_title = false
        }
      }
    });
    text_input_title_validation.add(Validate.Presence);
  }

  //add_validation_to_description
  function forum_add_validation_to_description(){
    var text_input_description_validation = new LiveValidation("text_input_description", {
      onValid: function(){
        if(!$('#text_input_description').val().match(/^[A-Za-z ,.0-9 ?!-]+$/)){
          $('#error_text_input_description').css('display', 'inline')
          $('#error_text_input_description').attr('data-original-title', 'Special characters not allowed')
          $('#error_text_input_description').tooltip()
          valid_text_input_description = true
        }
        else{
          $('#error_text_input_description').hide()
          valid_text_input_description = false
        }
      },
      onInvalid: function(){
        if(key_pressed == 9 && $('#text_input_description').val().length == 0){
          $('#error_text_input_description').hide()
          valid_text_input_description = false
        }
        else{
          $('#error_text_input_description').css('display', 'inline')
          $('#error_text_input_description').attr('data-original-title', 'Please enter the description')
          $('#error_text_input_description').tooltip()
          valid_text_input_description = true
        }
      }
    });
    text_input_description_validation.add(Validate.Presence);
  }

  //add_validation_to_author
  function forum_add_validation_to_author(){
    var text_input_author_validation = new LiveValidation("text_input_author",{
      onValid: function(){
        if(!$('#text_input_author').val().match(/^[A-Za-z .0-9 ?!-]+$/)){
          $('#error_text_input_author').css('dispaly', 'inline')
          $('#error_text_input_author').attr('data-original-title', 'Special characters not allowed')
          $('#error_text_input_author').tooltip()
          valid_text_input_author = true
        }
        else{
          $('#error_text_input_author').hide()
          valid_text_input_author = false
        }
      },
      onInvalid: function(){
        if(key_pressed == 9 && $('#text_input_author').val().length == 0){
          $('#error_text_input_author').hide()
          valid_text_input_author = false
        }
        else{
          $('#error_text_input_author').css('display', 'inline')
          $('#error_text_input_author').attr('data-original-title', 'Please enter the author name')
          $('#error_text_input_author').tooltip()
          valid_text_input_author = true
        }
      }
    });
    text_input_author_validation.add(Validate.Presence);
  }
}*/


$(document).ready(function(){
  $("#text_input_concern").live('keyup',function() {
    var isTrue = false;
    //console.log($("#text_input_concern").val());
    if ($("#text_input_concern").val().length == 0) {
      //$("#error_text_input_concern").attr("data-original-title","")
      $("#error_text_input_concern").css("display","inline")
      $("#error_text_input_concern").attr("data-original-title","Please enter concern.")
      $("#error_text_input_concern").tooltip()
      return false;
    } 
    else {
      $('#error_text_input_concern').hide()
    }     
    if(!$("#text_input_concern").val().match( /^[A-Za-z .0-9 ?!-]+$/)) {
      
      //$("#error_text_input_concern").attr("data-original-title","")
      $("#error_text_input_concern").css("display","inline")
      $("#error_text_input_concern").attr("data-original-title","Special characters not allowed")
      $('#error_text_input_concern').tooltip()
      return false;
    } 
    else {
      $('#error_text_input_concern').hide()
    }       
  }); 

  $('#date_input_date_of_post').live('keyup', function() {
    $('#error_text_input_date_of_post').css('display', 'inline')
    $('#error_text_input_date_of_post').attr('data-original-title', 'Please choose date from the Datepicker')
    $('#error_text_input_date_of_post').tooltip()
  });

  $('#text_input_offer_id').live('keyup', function() {
    var isTrue = false
    if($('#text_input_offer_id').val().length == 0){
      $('#error_text_input_offer_id').css('display', 'inline')
      $('#error_text_input_offer_id').attr('data-original-title', 'Please enter offer ID')
      $('#error_text_input_offer_id').tooltip()
      return false
    }
    else{
      $('#error_text_input_offer_id').hide()
    }
    if(!$('#text_input_offer_id').val().match( /^[.0-9]+$/ )) {
      $('#error_text_input_offer_id').css('display', 'inline')
      $('#error_text_input_offer_id').attr('data-original-title', 'Only numbers are allowed')
      $('#error_text_input_offer_id').tooltip()
      return false
    }
    else{
      $('#error_text_input_offer_id').hide()
    }
  });

  $('#text_input_artist').live('keyup', function() {
    var isTrue = false
    if($('#text_input_artist').val().length == 0) {
      $('#error_text_input_artist').css('display', 'inline')
      $('#error_text_input_artist').attr('data-original-title', 'Please enter artist name')
      $('#error_text_input_artist').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist').hide()
    }
    if(!$('#text_input_artist').val().match( /^[A-Za-z .0-9 ?!-]+$/ )) {
      $('#error_text_input_artist').css('dispaly', 'inline')
      $('#error_text_input_artist').attr('data-original-title', 'Special characters not allowed')
      $('#error_text_input_artist').tooltip()
      return false
    }
    else{
      $('#error_text_input_artist').hide()
    }
  });

  $('#text_input_title').live('keyup', function() {
    var isTrue = false
    if($('#text_input_title').val().length == 0) {
      $('#error_text_input_title').css('display', 'inline')
      $('#error_text_input_title').attr('data-original-title', 'Please enter title')
      $('#error_text_input_title').tooltip()
      return false
    }
    else{
      $('#error_text_input_title').hide()
    }
    if(!$('#text_input_title').val().match( /^[A-Za-z .0-9 ?!-]+$/ )) {
      $('#error_text_input_title').css('display', 'inline')
      $('#error_text_input_title').attr('data-original-title', 'Special characters not allowed')
      $('#error_text_input_title').tooltip()
      return false
    }
    else{
      $('#error_text_input_title').hide()
    }
  });

  $('text_input_description').live('keyup', function() {
    var isTrue = false
    if($('#text_input_description').val().length == 0){
      $('#error_text_input_description').css('display', 'inline')
      $('#error_text_input_description').attr('data-original-title', 'Please enter description')
      $('#error_text_input_description').tooltip()
      return false
    }
    else{
      $('#error_text_input_description').hide()
    }
    if(!$('#text_input_description').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
      $('#error_text_input_description').css('display', 'inline')
      $('#error_text_input_description').attr('data-original-title', 'Special characters are not allowed')
      $('#error_text_input_description').tooltip()
      return false
    }
    else{
      $('#error_text_input_description').hide()
    }
  });

  $('#text_input_author').live('keyup', function(){
    var isTrue = false
    if($('#text_input_author').val().length == 0){
      $('#error_text_input_author').css('display', 'inline')
      $('#error_text_input_author').attr('data-original-title', 'Please enter author name')
      $('#error_text_input_author').tooltip()
      return false
    }
    else{
      $('#error_text_input_author').hide()
    }
    if(!$('#error_text_input_author').val().match( /^[A-Za-z .0-9 ?!-]+$/ )){
      $('#error_text_input_author').css('display', 'inline')
      $('#error_text_input_author').attr('data-original-title', 'Special characters not allowed')
      $('#error_text_input_author').tooltip()
      return false
    }
    else{
      $('#error_text_input_author').hide()
    }
  })

});