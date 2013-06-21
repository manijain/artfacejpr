$ ->
  temp = "/subscription/express_checkout" + "?" + window.location.href.split("?")[1]
  $("#paypal_checkout_button").attr "href", temp



#$(function(){
#	var temp = "http://artfacedev.herokuapp.com/subscription/express_checkout" + "?" + window.location.href.split('?')[1];
#	$("#paypal_checkout_button").attr("href",temp);
#});