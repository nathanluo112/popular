$(document).ready(function(){

  $(function() {
    $("#event_show").swipe( {
      
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("you swiped" + direction);
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      }
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log("you swiped" + direction);
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      }

    });
  });

});