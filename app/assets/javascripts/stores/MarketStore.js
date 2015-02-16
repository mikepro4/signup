define([

  'underscore'

], function (

  _

) { 

  var Markets = [
    {"id":11,"areaLat":33.7563,"areaLon":-84.3765,"areaZoom":11,"displayName":"Atlanta","urlName":"atlanta","name":"Atlanta","publiclyAvailable":true},
    {"id":27,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Austin","urlName":"austin","name":"Austin","publiclyAvailable":false},
    {"id":23,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Baltimore","urlName":"baltimore","name":"Baltimore","publiclyAvailable":false},
    {"id":3,"areaLat":37.755,"areaLon":-122.239,"areaZoom":10,"displayName":"Bay Area","urlName":"bay-area","name":"Bay Area","publiclyAvailable":true},
    {"id":7,"areaLat":0,"areaLon":0,"areaZoom":0,"displayName":"Boston","name":"Boston","urlName":"boston","publiclyAvailable":false},
    {"id":34,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Brooklyn","urlName":"brooklyn","name":"Brooklyn","publiclyAvailable":false},
    {"id":25,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Charlotte","urlName":"charlotte","name":"Charlotte","publiclyAvailable":false},
    {"id":6,"areaLat":41.8312,"areaLon":-87.8158,"areaZoom":11,"displayName":"Chicago","urlName":"chicago","name":"Chicago","publiclyAvailable":true},
    {"id":10,"areaLat":32.7128,"areaLon":-97.0927,"areaZoom":10,"displayName":"Dallas - Fort Worth","urlName":"dallas-fort-worth","name":"Dallas - Fort Worth","publiclyAvailable":true},
    {"id":14,"areaLat":0,"areaLon":0,"areaZoom":0,"displayName":"Denver","urlName":"denver","name":"Denver","publiclyAvailable":false},
    {"id":36,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Fort Lauderdale","urlName":"fort-lauderdale","name":"Fort Lauderdale","publiclyAvailable":false},
    {"id":13,"areaLat":29.7561,"areaLon":-95.3646,"areaZoom":12,"displayName":"Houston","urlName":"houston","name":"Houston","publiclyAvailable":true},
    {"id":22,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Jacksonville","urlName":"jacksonville","name":"Jacksonville","publiclyAvailable":false},
    {"id":37,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Las Vegas","urlName":"las-vegas","name":"Las Vegas","publiclyAvailable":false},
    {"id":31,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"London","urlName":"london","name":"London","publiclyAvailable":false},
    {"id":4,"areaLat":33.8978,"areaLon":-118.257,"areaZoom":10,"displayName":"Los Angeles - Orange - Inland","urlName":"los-angeles","name":"Los Angeles","publiclyAvailable":true},
    {"id":1,"areaLat":40.7514,"areaLon":-73.9806,"areaZoom":12,"displayName":"New York City","name":"Manhattan","urlName":"new-york","publiclyAvailable":true},
    {"id":19,"areaLat":null,"areaLon":null,"areaZoom":null,"displayName":"Miami","name":"Miami","urlName":"miami","publiclyAvailable":false},
  ]

  var MarketStore = {

    init: function () {
      console.log('make a request to get all markets');
      // getJSON(API, function (err, res) {
      //   res.forEach(function (market) {
      //   });
      // });
    },

    getMarkets: function () {
      var array = [];

      _.each(Markets, function(item) { 
        array.push({
          "label": item.displayName, 
          "value" : item.urlName, 
          launched: item.publiclyAvailable 
        }); 
      });

      return array;
    },

    getMarket: function (market) {
      return _.findWhere(Markets, {urlName: market });
    }

  }

  function getJSON(url, cb) {
    var req = new XMLHttpRequest();
    req.onload = function () {
      if (req.status === 404) {
        cb(new Error('not found'));
      } else {
        cb(null, JSON.parse(req.response));
      }
    };
    req.open('GET', url);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send();
  }

  return MarketStore;
})
