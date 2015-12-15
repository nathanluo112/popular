$(document).ready(function(){

  $(function() {
    $("#swipe").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(this).text("You swiped " + direction );  
      }
    });
  });

});