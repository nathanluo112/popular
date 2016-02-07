app.controller("eventsController", ["$scope", "$http", "$window", "mapService", "eventService", "placeService", function($scope, $http, $window, mapService, eventService, placeService){
	$scope.SEARCH_MODE = 1;
	$scope.CREATE_MODE = 0;
	$scope.HOUSE_MODE = 2;

	mapService.initMap(document.getElementById('map')).then(function(map){

		$scope.mode = $scope.SEARCH_MODE;
		$scope.currentLocationMarker = new GeolocationMarker(map);
		$scope.currentLocationMarker.setCircleOptions({visible: false});
		mapService.attachBoundChangeQuery();
		mapService.initSearchBox();

		$('#map').replaceWith(mapService.getMap().getDiv());
    $('.white-blank-page').toggle();
	});

	$scope.joinEvent = function(){
		mapService.removeMarkers();
		mapService.clearListenerCallbacks();
		mapService.attachBoundChangeQuery();
		$scope.mode = $scope.SEARCH_MODE;
		mapService.getMap().panTo($scope.currentLocationMarker.position);
		mapService.getMap().setZoom(17);
	}

	$scope.listPlaces = function(){
		mapService.removeMarkers();
		$scope.mode = $scope.CREATE_MODE;
		mapService.clearListenerCallbacks();
		mapService.getMap().panTo($scope.currentLocationMarker.position);
		mapService.getMap().setZoom(17);
		mapService.listPlaces();
	}

	$scope.debugger = function(){
		debugger;
	}
}]);