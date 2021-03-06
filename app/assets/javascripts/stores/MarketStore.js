define([
  // libraries
  'underscore', 'jquery',

  // flux
  'dispatcher/AppDispatcher',
  'constants/AppConstants',
  'eventemitter'

], function (

  // libraries
  _, $,

  // flux
  AppDispatcher, Constants, EventEmitter

) { 

  var API = '/api/markets/all';
  var CHANGE_EVENT = 'change';

  var Markets = [];

  function loadMarkets() {
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
  }

  function parseData(data) {
    Markets = [];
    _.each(data, function(market) { 
      Markets.push({
        'label': market.displayName, 
        'value': market.displayName, 
        'id': market.id,
        launched: market.publiclyAvailable
      }); 
    });

    Markets = _.sortBy(Markets, 'label');
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
      return market.id;
    },

    getMarketState: function (marketValue) {
      var currentMarket = this.getMarketByName(marketValue);
      return _.isEmpty(currentMarket) ? true : currentMarket.launched;
    },

    getMarketStateById: function (id) {
      var market = _.findWhere(Markets, {id: id});
      return _.isEmpty(market) ? true : market.launched;
    },

    getMarketName: function (id) {
      var market = _.findWhere(Markets, {id: id});
      return market.label;
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

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action;
    
    switch(action.actionType){
      case Constants.MARKETS_LOAD:
        loadMarkets()
        break;
    }

    return true;
  })
  
  return MarketStore;
})
