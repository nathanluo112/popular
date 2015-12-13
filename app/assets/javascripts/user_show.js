var app=angular.module("usershow", [])
app.controller('usercontroller', function($scope, $http) {

    $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-events-top").slideDown();

    $(".user-nav-bar a").click(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      var nav = e.target.innerHTML;
      if (nav == "Events") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-events-top").slideDown();
      }
      else if (nav == "Shade/Love Given") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-made-top").slideDown();
      }
      else if (nav == "Shade/Love Received") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-received-top").slideDown();
      }


    });

     // $(".switch").click(function(e){
     //    for (var x=0; x < 3; x++) {
     //      $($(".accordian")[x]).slideUp();
     //    }
     //   $(this).next().slideDown();
     // });

     // for (var x=1; x < 3; x++) {
     //      $($(".accordian")[x]).slideUp();
     //    }

     // /current_user_data
     $http.get("/current_user_data/"+window.location.pathname.split("/").pop()).then(function(res){
      console.log(res.data);
      $scope.user = res.data;
    });

     $("#user-search-bar").keyup(function(){
      name=this.value;
      $.get("/user_search", {name: name}).done(function(res){
        console.log(res);
        $scope.search_results=res;
      });

     }); //$("#search-bar").keyup(function(




}); // app.controller('usercontroller', fun

app.directive("onEventsFinish", function() {
return function($scope) {
if ($scope.$last) {
  $("#user_events").slideDown("slow");
} }

});

angular.element(document).ready(function(){
  angular.bootstrap(document,["usershow"]);
  });



