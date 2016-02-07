app.factory("eventService", ["$http", "$q", function($http, $q) {
	var events = [];
  var votedEvents = [];
	function newBoundQuery(bounds){
		var deferred = $q.defer();
    var temp = bounds.toJSON();
    var maxlat = Math.max(temp.south, temp.north);
    var minlat = Math.min(temp.south, temp.north);
    var maxlng = Math.max(temp.east, temp.west);
    var minlng = Math.min(temp.east, temp.west);
    var url = "/events/near?"+ "bound[maxlat]=" + maxlat +"&bound[minlat]=" + minlat +"&bound[maxlng]=" + maxlng + "&bound[minlng]=" + minlng;

    $http({method: "get", url: url}).then(function(data){
      events = data.data;
      addVotedFieldToEvents(events, votedEvents);
      console.log(events);
      deferred.resolve(events);
    }, function(error){
      console.log(error);
    });
    return deferred.promise;
  }

  function getEvents(){
    return events;
  }

  function getVotedEvents(){
    $http({
      method: 'get',
      url: '/events/voted'
    }).then(function(data){
      votedEvents = data.data
    }, function(error){
      console.log(error);
    });
  }

  function addVotedFieldToEvents(events, votedEvents){
    for(var i = 0; i < events.length; i++) {
      for(var j = 0; j < votedEvents.length; j ++) {
        if (events[i].id == votedEvents[j].id){
          events[i].voted = votedEvents[j].vote_direction
        }
      }
    }
  }

	return {
		boundChangeQuery: newBoundQuery,
    getEvents: getEvents
	}
}]);