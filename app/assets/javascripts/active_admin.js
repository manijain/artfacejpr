//= require active_admin/base

$(function() {
  $("#header_artwork_artwork_id").live('change', function() {
    url = "/admin/header_artworks/" + $("#header_artwork_artwork_id").val().split('.')[0] + "/artwork_image/"
    $.get(
      url,      
        function(data) {
          temp = "https://artfacedev-pro.s3.amazonaws.com/public/images/uploaded/artwork/smalls/artwork_thumbnails/" + $("#header_artwork_artwork_id").val().split('.')[0] + '/' + data
          img = '<img src="'  + temp +  '">'
          $("#admin_header_artwork_image_div").html(img);
        }
    );
  })
})