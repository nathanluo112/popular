app.factory('placeService', ['$http', '$q', function($http, $q){
	var places = [];
	function hosted(place, existingEvents){
    for (var i = 0; i < existingEvents.length; i++){
      if (place.name.toLowerCase() == existingEvents[i].venue_name.toLowerCase()){
        return true;
      }
    }
    return false;
  }

	return {
		getPlaces: function(){
			return places;
		},
		
		nearbySearch: function(map, existingEvents){
			var deferred = $q.defer();
			var places = [];

			var searchRequest = {
	      bounds: map.getBounds(),
	      types: ['bar','night_club','stadium', 'museum']
    	};

			service = new google.maps.places.PlacesService(map);

			service.nearbySearch(searchRequest, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						if (!hosted(results[i], existingEvents)){
							places.push(results[i]);
						}
					}
				}
				deferred.resolve(places);
			});

			return deferred.promise;
		}
	}
}])