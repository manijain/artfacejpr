$ ->
  $(".home_privacy_statement, .home_disclaimer").hide()
  #$("#show_privacy_statement, #show_disclaimer").click ->
  #  $(".home_privacy_statement, .home_disclaimer").show()
  #  $(".home_layout").hide()

  $("#show_disclaimer").click ->
    $(".home_privacy_statement, .home_disclaimer").show()
    $(".home_layout").hide()
    $("#show_disclaimer").css({'font-weight': 'bold'})
    $("#show_privacy_statement").css({'font-weight': 'normal'})

  $("#show_privacy_statement").click ->
    $(".home_privacy_statement, .home_disclaimer").show()
    $(".home_layout").hide()
    $("#show_disclaimer").css({'font-weight': 'normal'})
    $("#show_privacy_statement").css({'font-weight': 'bold'})



  if window.location.href.split("#")[1] is "disclaimer" or window.location.href.split("#")[1] is "privacy_statement"
    $(".home_disclaimer, .home_privacy_statement").show()
    $(".home_layout").hide()

  $("#home_slider").rhinoslider
    showTime: 5000
    effect: "fade"
    effectTime: 1000
    autoPlay: true
    showControls: "never"
    pauseOnHover: false
    showBullets: "never"

  $("#home_step_five_movie").on "hidden", ->
    document.getElementById("home_step_five_movie_player").pause()