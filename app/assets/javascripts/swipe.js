$(document).ready(function(){

  $(function() {
    $("#event_show").swipe( {
      
      swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      }
      swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      }

    });
  });

});