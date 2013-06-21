$ -> 
  if location.pathname.substr(0,11) is "/offer/show"
    $(document).on "click", "#contact_owner", ->
      $("#contact_owner_container").slideToggle()

    $(document).on "click", "#report_abuse", ->
      $("#report_abuse_container").slideToggle()
    
    $(document).on "click", "#cancel_contact_owner", ->
      $("#contact_owner_container form")[0].reset()
      $("#contact_owner_container").hide()

    $(document).on "click", "#cancel_report_abuse", ->
      $("#report_abuse_container form")[0].reset()
      $("#report_abuse_container").hide()

    $(document).on "keyup", "#message_message_text", ->
      $("#contact_owner_word_count").html $("#message_message_text").val().length + "/1000"
    
    $(document).on "keyup", "#message_admin_message_text", ->
      $("#report_abuse_word_count").html $("#message_admin_message_text").val().length + "/1000"


