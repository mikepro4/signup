define([

  'underscore'

], function (

  _

) { 

  var API = '/markets.json';

  var _markets = [];
  var _changeListeners = [];
  var _initCalled = false;

  var MarketStore = {

    init: function () {
      if (_initCalled)
        return;

      _initCalled = true;

      getJSON(API, function (err, res) {
        _markets.push(res);
        this.notifyChange();
      }.bind(this));
    },

    getMarkets: function () {
      var array = [];
      _.each(_markets[0], function(item) { 
        array.push({
          "label": item.displayName, 
          "value": item.displayName, 
          launched: item.publiclyAvailable
        }); 
      });
      return array;
    },

    getMarket: function (market) {
      return _.findWhere(this.getMarkets(), {value: market });
    },

    getMarketState: function (marketValue) {
      var currentMarket = this.getMarket(marketValue);

      if(_.isEmpty(currentMarket)) {
        return true;
      } else {
        return currentMarket.launched
      }
    },

    notifyChange: function () {
      _changeListeners.forEach(function (listener) {
        listener();
      });
    },

    addChangeListener: function (listener) {
      _changeListeners.push(listener);
    },

    removeChangeListener: function (listener) {
      _changeListeners = _changeListeners.filter(function (l) {
        return listener !== l;
      });
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
