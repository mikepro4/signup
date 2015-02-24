define([
  // libraries
  'underscore', 'jquery',

  // flux 
  'dispatcher/dispatcher',
  'constants/AppConstants',
  'eventemitter'

], function (
  //libraries
  _, $,

  // flux
  AppDispatcher, Constants, EventEmitter

) { 

  var API = '/invite.json';
  var CHANGE_EVENT = 'change';

  var Invite = {};

  function loadInvite(email, marketId) {
    console.log(email + ' ' + marketId)
    $.ajax({
      url: API,
      dataType: 'json',
      success: function(data) {
        parseData(data);
        InviteStore.emitChange();
      },
      error: function(xhr, status, err) {
        console.error("Invite didn't load");
      }
    });  
  }

  function parseData(data) {
    Invite = {
      'firstName': data.firstName, 
      'lastName': data.lastName, 
      'companyName': data.companyName,
      'email': data.email,
      'marketId': data.marketId,
      'userType': data.userType,
      'promoCode': data.promoCodeId,
      'market': data.market
    };
    localStorage.setItem('inviteObject', JSON.stringify(Invite));
  }

  function updateInvite(value) {
    Invite = _.extend({}, Invite, value);
    localStorage.setItem('inviteObject', JSON.stringify(Invite));
    InviteStore.emitChange();
  }

  var InviteStore = _.extend({}, EventEmitter.prototype, {

    getInvite: function () {
      return Invite;
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
  })

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case Constants.INVITE_LOAD:
        loadInvite(action.email, action.marketId);
        break;
      case Constants.INVITE_UPDATE:
        updateInvite(action.invite);
        break;

      default:
    }
  });
  
  return InviteStore;
})
