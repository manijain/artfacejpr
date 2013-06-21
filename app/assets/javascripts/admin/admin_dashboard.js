if (location.pathname == "/admin/dashboard") {
    $('.pagination a').live('click',function () {       
    
    $.ajax({
      url: this.href,
      dataType: 'script',      
      beforeSend: function() {
        $(this).attr("data-remote", "true")
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
        }
    });
    return false;
    })  



    $(' .head3_admin #year_to_pop').live('change',function () {       
     
    $.ajax({
      url: this.href,
      dataType: 'script',
      data : { sorts: $('#year_to_pop').val(), 
               choice: 1
            },      
      beforeSend: function() {
        $("#ajax-loader-big_for_statsdash_data").show()
        $("#overlay_div_statsdash").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_statsdash_data").hide()
        $("#overlay_div_statsdash").hide()
        }
    });
    return false;
    }) 


    $('#myperpage').live('change',function () {       
     
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: { 
              per_page: $('#myperpage').val(),

              sort_by : $('#offer_sort').val()
            },      
      beforeSend: function() {
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        }
    });
    return false;
  });



   $('th #offer_sort').live('change',function () {       
     
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: { 
              per_page: $('#myperpage').val(),

              sort_by : $('#offer_sort').val()
            },      
      beforeSend: function() {
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        }
    });
    return false;
  });

    
 }   
  


if (location.pathname == "/admin/users") {
    $('.pagination a').live('click',function () {       
    
    $.ajax({
      url: this.href,
      dataType: 'script',  
      data: {
             per_page: $('#userperpage').val(),
              sort_by:  $('#usersort').val()
            },    
      beforeSend: function() {
        $(this).attr("data-remote", "true")
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        $(".pagination").children().each(function() {
          $(this).attr("data-remote",true)
        })
        }
    });
    return false;
    })  





    $('#userperpage').live('change',function () {       
     
    $.ajax({
      url: "/admin/users/search",
      dataType: 'script',
      data: { 
              per_page: $('#userperpage').val(),
              sort_by:  $('#usersort').val()
            },      
      beforeSend: function() {
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        }
    });
    return false;
  });



   $('th #usersort').live('change',function () {       
     
    $.ajax({
      url: "/admin/users/search",
      dataType: 'script',
      data: { 
              per_page: $('#userperpage').val(),
              sort_by:  $('#usersort').val()              
            },      
      beforeSend: function() {
        $("#ajax-loader-big_for_offers_data").show()
        $("#overlay_div_data").show()
        },
        async: false,
      success: function() {
        $("#ajax-loader-big_for_offers_data").hide()
        $("#overlay_div_data").hide()
        }
    });
    return false;
  });

    
 }   
  

  /*
:javascript
  $(function() {
  $('.pagination a').click(function() {
    $.ajax({
      url: this.href,
      dataType: 'script'
    });
    return false;
  });
  });

  $(function() {
  $('th #userperpage').change(function() {
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: { 
              per_page: $('#userperpage').val(),
              sort_by:  $('#usersort').val()
            }
    });
    return false;
  });
  });

  $(function() {
  $('th #usersort').change(function() {
    $.ajax({
      url: this.href,
      dataType: 'script',
      data: { 
              per_page: $('#userperpage').val(),
              sort_by:  $('#usersort').val()              
            }
    });
    return false;
  });
  });
*/
