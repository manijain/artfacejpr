

if(location.pathname.substr(0,13) == "/admin/users/"){

$(document).on('click',"#user_end_subscription_cancel_admin", function() {
      $("#cancel_subscription_container_admin").hide()
    })

    $(document).on('click',"#admin_cancel_user_subscription", function() {
      $("#cancel_subscription_container_admin").show()
    })

    $(document).on('click', "#user_end_subscription_confirm_admin", function() {
      $.ajax({
        url: '/admin/users/cancel_subscription',
        data: { user_id: $('#user_id').val() },
        success: function(data) {
          if(data == "true") {
            $("#cancel_subscription_container_admin").hide()
            $("#admin_cancel_user_subscription").hide()
            alert("Your subscription has been canceled")
          }
        }
      })

    })

  }