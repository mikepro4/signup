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

  var API = '/api/users/createAccount';
  var CHANGE_EVENT = 'change';

  var Markets = [];

  function createAccount(accountObject) {
    return $.ajax({
      url: API,
      type: 'POST',
      data: JSON.stringify(accountObject),
      contentType: 'application/json',
      success: function(data) {
        AccountStore.emitChange();
      },
      error: function(xhr, status, err) {
        console.error('Markets were not loaded');
      }
    });
  }

  var AccountStore = _.extend({}, EventEmitter.prototype, {

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    createAccount: function (accountObject) {
      return createAccount(accountObject);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }

  });

  return AccountStore;
})
