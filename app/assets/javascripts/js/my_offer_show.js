$(function() {
  if (location.pathname.substr(0,13) == "/myoffer/show") {
    $(document).on('click', 'i.icon-arrow-down', function() {
      if($(this).attr('id').substr(0,5) == "offer_") {
        temp_id = $(this).attr('id')
        $('#'+$(this).attr('id')+"_message").slideDown('fast', function() {
          temp_id.addClass('icon-arrow-up')
        })
      }
    })
  }
})