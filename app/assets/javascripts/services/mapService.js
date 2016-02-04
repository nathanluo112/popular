app.factory('mapService', ['$http', '$q', function($http, $q){

  function removeMarkers(){
    var tmp = [];
    for(var i = 0; i < markers.length; i++) {
      if ((markers[i].position.lat() != map.center.lat() || markers[i].position.lng() != map.center.lng()) && (markers[i] != $scope.focusMarker)) {

        markers[i].setMap(null);

      } else {
        tmp.push(markers[i]);
      }
    }
    markers = tmp;
  }

  function constructString(event) {
  	var contentString = "<div><h5>" + event.venue_name + "</h5></div>";
  	if (event.address) contentString +="<div>" + event.address + "</div>";
  	if (event.description) contentString += "<div><p>" + event.description + "</p></div>";

  	var infoWindow = new google.maps.Infowindow({
			content: ccontentString,
			maxWidth: 200
		});
		return infoWindow;
  }



	return {
		markers: [],
		addEventMarker: function(map, event){
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(event.lat), lng: parseFloat(event.lng)},
				map: map,
				icon: calcPopForPin(event),
				title: event.venue_name
			})

			var infoWindow = addInfoWindow(event);
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open(map, marker);
				map.panTo(this.position);
				if (map.getZoom() < 15) {
					map.setZoom(15);
				}
			})
			return marker;

		},

		initMap: function(coord){
			var map = new google.maps.Map(document.createElement('div'), {
				center: coord,
				scrollwheel: false,
				zoom: 12,
				mapTypeControl: false,
				rotateControl: false,
				streetView: null
			});
			var timeoutId;
			map.addEventListener("bounds_changed", function(){
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function(){
					boundChangeQuery();
				}, 200);
			})
			return map;
		},

		searchBoxInit: function(map){
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
	}
}]);