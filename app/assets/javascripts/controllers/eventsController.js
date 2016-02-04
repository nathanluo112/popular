app.controller("eventsController", ["$scope", "$http", "$window", "mapService", function($scope, $http, $window, mapService){
	$scope.map = mapService.initMap();
	
}]);