app.controller("eventsController", ["$scope", "$http", "$window", "mapService", function($scope, $http, $window, mapService){
	const SEARCH_MODE = 1;
	const CREATE_MODE = 0;
	const HOUSE_MODE = 2;
	
	mapService.initMap(document.getElementById('map')).then(function(map){
		// $scope.map = map;
		mapService.initSearchBox();
		$('#map').replaceWith(mapService.getMap().getDiv());
    $('.white-blank-page').toggle();
	});

	$scope.debugger = function(){
		debugger;
	}
}]);