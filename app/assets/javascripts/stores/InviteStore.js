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

  var API = '/api/invites';
  var CHANGE_EVENT = 'change';

  var Invite = {};

  function loadInvite(email, marketId) {
    inviteObj = {
      "email": email,
      "marketId": marketId,
      "madeNoMarket": false
    }

    return $.ajax({
      url: API,
      data: JSON.stringify(inviteObj),
      type: 'POST',
      contentType: 'application/json',
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
      'id': data.id,
      'firstName': data.firstName, 
      'lastName': data.lastName, 
      'userInfo': data.userInfo,
      'email': data.email,
      'marketId': data.marketId,
      'userType': 'user',
      'promotionalCode': data.promotionalCode,
      'market': data.market,
      'madeNoMarket': false
    };
    localStorage.setItem('inviteObject', JSON.stringify(Invite));
  }

  function updateInvite(value) {
    Invite = _.extend({}, Invite, value);
    localStorage.setItem('inviteObject', JSON.stringify(Invite));  
    InviteStore.emitChange();
  }

  function postUpdateInvite(){
    return $.ajax({
      url: '/api/invites/' + Invite.id,
      data: JSON.stringify(Invite),
      type: 'PUT',
      contentType: 'application/json',
      success: function(data) {
        parseData(data);
        InviteStore.emitChange();
      },
      error: function(xhr, status, err) {
        console.error("Invite didn't invite");
      }
    })
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
    },

    postInvite: function () {
      return postUpdateInvite()
    },

    loadInvite: function (email, marketId) {
      return loadInvite(email, marketId)
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
