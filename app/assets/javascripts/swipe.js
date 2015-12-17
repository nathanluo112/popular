$(document).ready(function(){

  $(function() {
    $("#event_show").swipe({
      
      swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      },
      
      swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".name").toggle();
        $(".address").toggle();
        $(".description").toggle();
      },

      swipeDown:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".refresh").slideDown('fast').delay("2000");
        location.reload();
      }

    });

    $(".reveal-modal").swipe({
      swipeDown:function(event, direction, distance, duration, fingerCount, fingerData) {
        $(".reveal-modal").fadeOut().foundation('reveal', 'close');
      }

    });

    $(".attendees").swipe({
      swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
      $(".attendees").toggle();
      $(".most_popular").toggle();
      console.log("you swipes right");
      }
    });

    $(".most_popular").swipe({
      swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
      $(".most_popular").toggle();
      $(".attendees").toggle();
      console.log("you swipes right");
      }
    });

  });

});