
var app=angular.module("usershow", [])
app.controller('usercontroller', function($scope, $http) {
     $(".switch").click(function(e){
        for (var x=0; x < 3; x++) {
          $($(".accordian")[x]).slideUp();
        }
       $(this).next().slideDown(); 
     });

     for (var x=1; x < 3; x++) {
          $($(".accordian")[x]).slideUp();
        }


     $http.get("/current_user_data").then(function(res){
      console.log(res.data);
      $scope.user = res.data;
    });

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



