$(function() {
  if(location.pathname.substr(0,14) == "/user/settings") {
    $(document).on('click', "#update_user_settings", function() {
      var values = {}
      if($("#user_identity").prop(":checked")) {
        values["user_identity"] = true
      } else {
        values["user_identity"] = false
      }
      if($("#wishist_notification").is(":checked")) {
        values["wishist_notification"] = true
      } else {
        values["wishist_notification"] = false
      }
      if($("#user_seller_message_notification").is(":checked")) {
        values["user_seller_message_notification"] = true
      } else {
        values["user_seller_message_notification"] = false
      }
      if($("#user_buyer_message_notification").is(":checked")) {
        values["user_buyer_message_notification"] = true
      } else {
        values["user_buyer_message_notification"] = false
      }
      if($("#user_forum_notifications").is(":checked")) {
        values["user_forum_notifications"] = true
      } else {
        values["user_forum_notifications"] = false
      }
      if($("#user_offer_forum_discussion").is(":checked")) {
        values["user_offer_forum_discussion"] = true
      } else {
        values["user_offer_forum_discussion"] = false
      }
      values["user_notification_by"] = $("#user_notification_by").val()
      values["user_notification_email"] = $("#user_notification_email").val()
      $.ajax({
        url: '/user/update_settings',
        data: values,
        success: function(text) {
          if(text == "true") {
            alert("Settings Updated")
          }
        }
      })
    })

    $(document).on('click',"#user_end_subscription_cancel", function() {
      $("#cancel_subscription_container").hide()
    })

    $(document).on('click',"#user_end_subscription", function() {
      $("#cancel_subscription_container").show()
    })

    $(document).on('click', "#user_end_subscription_confirm", function() {
      $.ajax({
        url: '/user/cancel_subscription',
        success: function(data) {
          if(data == "true") {
            $("#cancel_subscription_container").hide()
            alert("Your subscription has been canceled")
          }
        }
      })

    })

  }
})