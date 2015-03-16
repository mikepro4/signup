define([
  // libraries
  'underscore', 'jquery',

  // flux 
  'dispatcher/AppDispatcher',
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
        Invite = data;
        InviteStore.emitChange();
      },
      error: function(xhr, status, err) {
        console.error("Invite didn't load");
      }
    });  
  }

  function updateInvite(value) {
    Invite = _.extend({}, Invite, value);
    InviteStore.emitChange();
  }

  function postUpdateInvite(){
    return $.ajax({
      url: '/api/invites/' + Invite.id,
      data: JSON.stringify(Invite),
      type: 'PUT',
      contentType: 'application/json',
      success: function(data) {
        Invite = data;
        InviteStore.emitChange();
      },
      error: function(xhr, status, err) {
        console.error("Invite didn't update");
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
      return postUpdateInvite();
    },

    loadInvite: function (email, marketId) {
      return loadInvite(email, marketId);
    },

    clearInvite: function() {
      Invite = {};
    }
  })

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action;
    
    switch(action.actionType){
      case Constants.INVITE_LOAD:
        loadInvite(action.email, action.marketId);
        break;

      case Constants.INVITE_UPDATE:
        updateInvite(action.invite);
        break;
    }

    return true;
  })
  
  return InviteStore;
})
