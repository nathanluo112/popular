// $(document).ready(function(){
//   $(".vote").on("submit", "form", function(event){
//     event.preventDefault();
    
//     $.ajax({
//       method: "post",
//       url:    $(event.target).attr("action"),
//       data:   $(event.target).serialize() 
//     }).done(function(response){  
//       $(".vote").remove();
//       $(".voted").css("visibility", "visible");
//       $(".voted").html("<p> You just voted you sexy fool. </p>");
//     }).fail(function(error){
//       console.log("You've already voted.");
//     });
//   });
// });