
$(document).ready(function(){
  $("#vote").on("click", "form", function(event){
    event.preventDefault();

    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){
      console.log("You voted.")
    }).fail(function(error){
      console.log("You didn't vote.");
    });
  });
});
