var app = angular.module("user-show", []);

app.controller('user-controller', function ($scope, $http) {
  $http.get('phones');
  $scope.user = s;





});
