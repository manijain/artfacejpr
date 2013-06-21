$(function() {

  if (location.pathname.substr(0,6) == "/forum") {
    $(".c_nav_link_bar a[href='/forum']").css("font-weight","bold")
  }

  if (location.pathname.substr(0,18) == "/dashboard/service") {
    $(".c_nav_link_bar a[href='/dashboard/service']").css("font-weight","bold")
  }

  if (location.pathname.substr(0,23) == "/dashboard/buy-art-area" || location.pathname.substr(0,15) == "/buy-art/search" || location.pathname.substr(0,20) == "/offer/your-wishlists" || location.pathname.substr(0,21) == "/offer/your-favourites") {
    $(".c_nav_link_bar a[href='/dashboard/buy-art-area']").css("font-weight","bold")
  }

})