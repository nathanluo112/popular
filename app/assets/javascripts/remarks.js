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
    // debugger  
      $(event.target).parent().hide();
      $(event.target).parent().next().css("visibility", "visible");
    }).fail(function(error){
      console.log("You've already called a form to remark.");
    });
  });

  $(".remark_form").on("submit", "form", function(event){
    event.preventDefault();
    debugger
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){ 
    debugger 
      $(event.target).parent().hide();
      $(event.target).parent().next().css("visibility", "visible");
    }).fail(function(error){
      console.log("You've already made a remark.");
    });
  });


});

