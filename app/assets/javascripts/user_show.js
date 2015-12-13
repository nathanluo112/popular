
var app=angular.module("usershow", [])
app.controller('usercontroller', function($scope, $http) {
     $("#user_events").hide();
     // $("#user_remarks_made").hide();
     // $("#user_remarks_received").hide();
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



