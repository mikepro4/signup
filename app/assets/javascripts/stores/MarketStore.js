define([
  // libraries
  'underscore', 'jquery',

  // flux
  'dispatcher/dispatcher',
  'constants/AppConstants',
  'eventemitter'


], function (

  // libraries
  _, $,

  // flux
  AppDispatcher, Constants, EventEmitter

) { 

  var API = '/markets.json';
  var CHANGE_EVENT = 'change';

  var Markets = [];

  function loadMarkets() {
    _.delay(function () {
      $.ajax({
        url: API,
        dataType: 'json',
        success: function(data) {
          parseData(data);
          MarketStore.emitChange();
        },
        error: function(xhr, status, err) {
          console.error('Markets were not loaded');
        }
      });
    }, 500)
  }

  function parseData(data) {
    _.each(data, function(market) { 
      Markets.push({
        'label': market.displayName, 
        'value': market.displayName, 
        'id': market.id,
        launched: market.publiclyAvailable
      }); 
    });
  }

  var MarketStore = _.extend({}, EventEmitter.prototype, {

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

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }

  });

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case Constants.MARKETS_LOAD:
        loadMarkets()
        break;
    }
  });
  
  return MarketStore;
})
