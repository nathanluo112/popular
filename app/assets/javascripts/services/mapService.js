app.factory('mapService', ['$http', '$q', 'markerService', 'eventService', function($http, $q, markerService, eventService){
	var map;
	var markers = [];
	var focusMarker;

	function getMap(){
		return map;
	}

  function removeMarkers(){
    var tmp = [];
    for(var i = 0; i < markers.length; i++) {
      if ((markers[i].position.lat() != map.center.lat() || markers[i].position.lng() != map.center.lng()) && (markers[i] != focusMarker)) {

        markers[i].setMap(null);

      } else {
        tmp.push(markers[i]);
      }
    }
    markers = tmp;
  }

  function addInfoWindow(event) {
  	var contentString = "<div><h5>" + event.venue_name + "</h5></div>";
  	if (event.address) contentString +="<div>" + event.address + "</div>";
  	if (event.description) contentString += "<div><p>" + event.description + "</p></div>";

  	var infoWindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200
		});
		return infoWindow;
  }

  function initMap(div){
		var deferred = $q.defer();
		if (map) {
			deferred.resolve(map)
		} else {
			navigator.geolocation.getCurrentPosition(function(args){
	      coords = {
	        lat: args['coords']['latitude'],
	        lng: args['coords']['longitude']
	      };
   			map = new google.maps.Map(div, {
					center: coords,
					scrollwheel: false,
					zoom: 12,
					mapTypeControl: false,
					rotateControl: false,
					streetView: null
				});
				var timeoutId;
				map.addListener("bounds_changed", function(){
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function(){
						removeMarkers();
						eventService.boundChangeQuery(map.getBounds()).then(function(events){
							addMarkers(map, events);
						})
					}, 200);
				})
				deferred.resolve(map);
    	});
		}
		return deferred.promise;
  }

  function initSearchBox(){
		var input = document.createElement('input');
		input.setAttribute("ng-modl", "searchItem");
		input.setAttribute("placeholder", "Search");
		input.setAttribute("id", "search-box");
		var searchBox = new google.maps.places.SearchBox(input);

		searchBox.addListener('places_changed', function(){
			searchBox.setBounds(map.getBounds());
			var places = searchBox.getPlaces();
			if (places.length == 0) {
				return ;
			}
			map.panTo(places[0].geometry.location);
			map.setZoom(13);
		})
	}

	function addEventMarker(map, event){
		var marker = new google.maps.Marker({
			position: {lat: parseFloat(event.lat), lng: parseFloat(event.lng)},
			map: map,
			icon: markerService.calcPopForPin(event),
			title: event.venue_name
		})

		var infoWindow = addInfoWindow(event);
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
			focusMarker = marker;
			map.panTo(this.position);
			if (map.getZoom() < 15) {
				map.setZoom(15);
			}
		})
		markers.push(marker);
	}

	function addMarkers(map, events){
		for (var i = 0; i < events.length; i++){
			addEventMarker(map, events[i]);
		}
	}
	

	return {
		initMap: initMap,
		getMap: getMap,
		removeMarkers: removeMarkers,
		addMarkers: addMarkers,
		initSearchBox: initSearchBox
	}

}]);