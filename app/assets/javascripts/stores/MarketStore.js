define([

  'underscore', 'jquery'

], function (

  _, $

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

      $.ajax({
        url: API,
        dataType: 'json',
        success: function(data) {
          _markets.push(data);
          this.notifyChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('Markets were not loaded');
        }.bind(this)
      });
    },

    getMarkets: function () {
      var array = [];
      _.each(_markets[0], function(item) { 
        array.push({
          'label': item.displayName, 
          'value': item.displayName, 
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
  
  return MarketStore;
})
