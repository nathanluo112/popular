$(document).ready(function(){
  $(".remark_buttons").on("click", "a", function(event){
    event.preventDefault();
    
    $.ajax({
      method: "get",
      url:    $(event.target).attr("action"),
      data:   {
        remark_direction: $(event.target).data().direction
      }
    }).done(function(response){ 
    debugger 
      $(event.target).parent().hide();
      $(".remark_form").css("visibility", "visible");
    }).fail(function(error){
      console.log("You've already voted.");
    });
  });
});