app.controller("listController", ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.SEARCH_MODE = 1;
  $scope.CREATE_MODE = 0;
  $scope.HOUSE_MODE = 2;
  $scope.events = [];
  $scope.currentLocationMarker;
  $scope.focusEvent;
  $scope.focusMarker;
  $scope.mode = $scope.SEARCH_MODE;
  $scope.places = [];
  $scope.showFocus = false;


  // searchBox = new google.maps.places.SearchBox(angular.element("#search-box"));
  new Promise(function(resolve, reject){
    $('.flower-loader').fadeIn("slow");
    window.navigator.geolocation.getCurrentPosition(function(args){
      coords = {
        lat: args['coords']['latitude'],
        lng: args['coords']['longitude']
      };
      resolve(coords);
    });

  }).then(function(coords){
      initMap(coords);
      getVotedEvents();
      getUserInfo();
      $('.white-blank-page').toggle();
  }).then(function(){
    $scope.bounds = map.getBounds();
    document.getElementsByClassName("fi-home")[0].addEventListener("click", function(event){
      if ($window.location.pathname == "/events"){
        event.preventDefault();
        map.panTo($scope.currentLocationMarker.position);
        map.setZoom(12);
      }
    });

    var timeoutId;
    map.addListener("bounds_changed", function(){
      if ($scope.mode == $scope.SEARCH_MODE){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function(){
          newBoundQuery();
        }, 200);
      }
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
    $('.flower-loader').delay(1000).fadeOut("slow");
  });

  $scope.eventItem = function(){

    $scope.focusEvent = findEventById(parseInt(event.currentTarget.dataset.id))
    marker = findMarkerByEvent($scope.focusEvent);
    google.maps.event.trigger(marker, 'click');

  }

  $scope.focusEventItem = function(){
    marker = findMarkerByEvent($scope.focusEvent);
    google.maps.event.trigger(marker, 'click');
  }

  $scope.joinEvent = function(){
    removeAllMarkers();
    $scope.places = [];
    $scope.mode = $scope.SEARCH_MODE;
    map.panTo($scope.currentLocationMarker.position)
    map.setZoom(17);
    newBoundQuery();
  }

  $scope.listPlaces = function(){
    map.setCenter($scope.currentLocationMarker.position);
    map.setZoom(17);
    removeAllMarkers();
    $scope.mode = $scope.CREATE_MODE;
    $scope.bounds = map.getBounds();
    nearBy();
  }

  $scope.createEvent = function(place){
    var event = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      venue_name: place.name,
      address: place.vicinity,
      place_id: place.place_id,
    };

    if (place.photos) event.url = place.photos[0].getUrl({maxWidth: 400, maxHeight: 400})

    $http({
      method: 'post',
      url: '/events',
      data: {
        event: event,
        current_location: {
          lat: $scope.currentLocationMarker.position.lat(),
          lng: $scope.currentLocationMarker.position.lng()
        }
    }}).then(function(data){
      $scope.redirectTo(data.data.id);
    }, function(error){
      console.log(error);
    });
  }

  $scope.houseEventForm = function(){
    $scope.places = [];
    removeAllMarkers();
    map.setCenter($scope.currentLocationMarker.position);
    map.setZoom(18);
    $scope.mode = $scope.HOUSE_MODE;
  }

  $scope.ableToCreate = function(){
    // return Date.now() - Date.parse($scope.user.last_voted) > 14400000;
    return true;
  }

  $scope.timeToWait = function(){
    return ((14400000 - (Date.now() - Date.parse($scope.user.last_voted)))/3600000).toFixed(1);
  }

  $scope.createHouseEvent = function(party){
    var event = {
      lat: $scope.currentLocationMarker.position.lat(),
      lng: $scope.currentLocationMarker.position.lng(),
      venue_name: party.eventName || ($scope.user.first_name+ "'s Party"),
      address: party.eventAddress,
      description: party.eventDesc,
      house_party: true,
      threshold: 0
    };

    if (party.eventThreshold) {
      event.threshold = Math.min(party.eventThreshold, $scope.user.popularity);
    }

    $http({
      method: 'post',
      url: '/events',
      data: {
        event: event,
        current_location: {
          lat: $scope.currentLocationMarker.position.lat(),
          lng: $scope.currentLocationMarker.position.lng()
        }
    }}).then(function(data){
      $scope.redirectTo(data.data.id);
    }, function(error){
      console.log(error);
    });
  }

  $scope.redirectTo = function(id) {
    $window.location.href = '/events/' + id + "?current_location[lat]=" + $scope.currentLocationMarker.position.lat() + "&current_location[lng]=" + $scope.currentLocationMarker.position.lng();
  }

  $scope.closeFocus = function(){
    $scope.showFocus = false;
  }

  function rad(x) {
    return x * Math.PI / 180;
  }

  function distance(p1, p2) {
    var R = 6378137;
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  function getVotedEvents(){
    $http({
      method: 'get',
      url: '/events/voted'
    }).then(function(data){
      $scope.votedEvents = data.data
    }, function(error){
      console.log(error);
    });
  }

  function getUserInfo(){
    $http({
      method: 'get',
      url: '/users/current-user-info'
    }).then(function(data){
      $scope.user = data.data.user;
      $scope.user.last_voted = data.data.last_voted;
    }, function(error){
      console.log(error);
    });
  }

  function findMarkerByEvent(event){
    for (var i = 0; i < markers.length; i ++) {
      if (markers[i].position.lat().toFixed(13) == event.lat.toFixed(13) && markers[i].position.lng().toFixed(13) == event.lng.toFixed(13) && markers[i].title == event.venue_name){
        return markers[i];
      }
    }
  }

  function findEventById(id){
    for (var i = 0; i < $scope.events.length; i++) {
      if ($scope.events[i].id == id){
        return $scope.events[i];
      }
    }
  }
  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 12,
      mapTypeControl: false,
      rotateControl: false,
      streetView: null
    });

    $scope.currentLocationMarker = new GeolocationMarker(map);
    $scope.currentLocationMarker.setCircleOptions({visible: false})
    var input = document.createElement("input");
    input.setAttribute("ng-model", "searchItem");
    input.setAttribute("placeholder", "Search");
    input.setAttribute("id", "search-box");
    // var input = document.getElementById('search-box');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    searchBox.addListener('places_changed', function(){
      searchBox.setBounds($scope.bounds);
      var places = searchBox.getPlaces();
      if (places.length == 0){
        return;
      }
      map.panTo(places[0].geometry.location);
      map.setZoom(13);
    })
  };

    // colors
  var rq = "F7CAC9";
  var rq2 = "DE8A89";
  var rq3 = "C55452";
  var rq4 = "AC6B6A";
  var rq5 = "933F3D";
  var s = "92A8D1";
  var s2 = "5C7CB8";
  var s3 = "2F569F";
  var s4 = "425A86";
  var s5 = "4c576d";


  var vPopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq,
    null,
    null,
    null,
    new google.maps.Size(24, 40));

  var popular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq2,
    null,
    null,
    null,
    new google.maps.Size(21, 35));

  var average = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq3,
    null,
    null,
    null,
    new google.maps.Size(18, 30));

  var unpopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq4,
    null,
    null,
    null,
    new google.maps.Size(15, 25));

  var vUnpopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq5,
    null,
    null,
    null,
    new google.maps.Size(12, 20));

    var greatHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s,
    null,
    null,
    null,
    new google.maps.Size(24, 40));

  var goodHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s2,
    null,
    null,
    null,
    new google.maps.Size(21, 35));

  var averageHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s3,
    null,
    null,
    null,
    new google.maps.Size(18, 30));

  var badHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s4,
    null,
    null,
    null,
    new google.maps.Size(15, 25));

  var vBadHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s5,
    null,
    null,
    null,
    new google.maps.Size(12, 20));

  function calcPopForPin(event) {
    if (event.house_party == false) {
      if (event.score > 1000) {return vPopular}
      else if (event.score > 499) {return popular}
      else if (event.score > 99) {return average}
      else if (event.score > 9) {return unpopular}
      else {return vUnpopular}
    }
    else {
      if (event.score > 750) {return greatHouse}
      else if (event.score > 350) {return goodHouse}
      else if (event.score > 80) {return averageHouse}
      else if (event.score > 9) {return badHouse}
      else {return vBadHouse}
    }
  };

  function addMarkerForEvent(event){
    if (!eventMarkerExists(event)) {
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(event.lat), lng: parseFloat(event.lng)},
        map: map,
        icon: calcPopForPin(event),
        title: event.venue_name
      });

      var contentString = "<div><h5>" + event.venue_name + "</h5></div>";
      if (event.address)  contentString += "<div>" + event.address + "</div>";
      if (event.description) contentString += "<div><p>"+ event.description + "</p></div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
      });

      markers.push(marker);
      console.log("added a marker")
      google.maps.event.addListener(marker, 'click', function(){
        $scope.focusEvent = event;
        $scope.focusMarker = marker;
        $scope.showFocus = true;
        infowindow.open(map, marker);
        map.panTo(this.position);
        if (map.getZoom() < 15){
          map.setZoom(15);
        }
      })
    }
  }

  function eventMarkerExists(event){
    if (markers.length > 0 ){
      for (var i = 0; i < markers.length; i++){
        if (markers[i].position.lat().toFixed(13) == parseFloat(event.lat).toFixed(13) && markers[i].position.lng().toFixed(13) == parseFloat(event.lng).toFixed(13)){
          return true;
        }
      }
    } else {
      return false;
    }
  }

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

  function removeAllMarkers(){
    for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function newBoundQuery(){
    removeMarkers();
    $scope.bounds = map.getBounds();
    var temp = $scope.bounds.toJSON();
    var maxlat = Math.max(temp.south, temp.north);
    var minlat = Math.min(temp.south, temp.north);
    var maxlng = Math.max(temp.east, temp.west);
    var minlng = Math.min(temp.east, temp.west);
    var url = "/events/near?"+ "bound[maxlat]=" + maxlat +"&bound[minlat]=" + minlat +"&bound[maxlng]=" + maxlng + "&bound[minlng]=" + minlng;

    $http({method: "get", url: url}).then(function(data){
      var events = data.data;
      for (var i = 0; i < events.length; i++){
        addMarkerForEvent(events[i]);
      }
      addVotedFieldToEvents(events);
      $scope.events = events;
    }, function(error){
      console.log(error);
    }).then(function(){
      setJoinableEvents();
    })
  }

  function addVotedFieldToEvents(events){
    for(var i = 0; i < events.length; i++) {
      for(var j = 0; j < $scope.votedEvents.length; j ++) {
        if (events[i].id == $scope.votedEvents[j].id){
          events[i].voted = $scope.votedEvents[j].vote_direction
        }
      }
    }
    return events;
  }


  function setJoinableEvents() {
    for(var i = 0; i < $scope.events.length; i++) {
      var eventPoint = {lat: $scope.events[i].lat, lng: $scope.events[i].lng}
      var currentPoint = {
        lat: $scope.currentLocationMarker.position.lat(),
        lng: $scope.currentLocationMarker.position.lng()
      }

      if (distance(eventPoint, currentPoint) < 100 && !$scope.events[i].voted){
        $scope.events[i].joinable = true;
      } else {
        $scope.events[i].joinable = false;
      }
    }
  }

  function nearBy(){
    $scope.places = [];
    var searchRequest = {
      bounds: $scope.bounds,
      types: ['bar','night_club','stadium', 'museum']
    };
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(searchRequest, function(results, status) {

      $scope.$apply(function(){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++){
            if (!containsEvent(results[i])){
              $scope.places.push(results[i]);
              addMarkerForPlace(results[i]);
            }
          }
        }
      });

    });
  }

  function addMarkerForPlace(place){
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
    });
    var contentString = "<div><h5>" + place.name + "</h5></div>"
                      + "<div>" + place.vicinity + "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });

    markers.push(marker);
    console.log("added a marker")
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map, marker);
      map.panTo(this.position);
      if (map.getZoom() < 16){
        map.setZoom(16);
      }
    })
  }

  function containsEvent(place){
    for (var i = 0; i < $scope.events.length; i++){
      if (place.name.toLowerCase() == $scope.events[i].venue_name.toLowerCase()){
        return true;
      }
    }
    return false;
  }


}]);


