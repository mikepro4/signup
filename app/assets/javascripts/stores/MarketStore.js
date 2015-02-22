define([

  'underscore', 'jquery'

], function (

  _, $

) { 

  var API = '/markets.json';

  var Markets = [];
  var _changeListeners = [];
  var _initCalled = false;

  var MarketStore = {

    init: function () {
      if (_initCalled)
        return;

      _initCalled = true;

      $.ajax({
        url: API,
        dataType: 'json',
        success: function(data) {
          _.each(data, function(market) { 
            Markets.push({
              'label': market.displayName, 
              'value': market.displayName, 
              'id': market.id,
              launched: market.publiclyAvailable
            }); 
          });
          this.notifyChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('Markets were not loaded');
        }.bind(this)
      });
    },

    getMarkets: function () {
      return Markets;
    },

    getMarketByName: function (market) {
      return _.findWhere(Markets, {value: market });
    },

    getMarketId: function (market) {
      var market = this.getMarketByName(market);
      return market.id
    },

    getMarketState: function (marketValue) {
      var currentMarket = this.getMarketByName(marketValue);

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
  
  return MarketStore;
})
