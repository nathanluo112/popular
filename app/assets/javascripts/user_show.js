var app = angular.module("user-show", []);

app.controller('user-controller', function ($scope, $http) {
  $http.get(<%= user_path %>).then();
  $scope.user = s;






});
