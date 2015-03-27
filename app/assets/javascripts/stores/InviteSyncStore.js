define([
  // libraries
  'underscore', 'jquery',

  // flux
  'eventemitter'

], function (

  // libraries
  _, $,

  // flux
  EventEmitter

) { 

  var API = '/api/invites/pioneers';
  var CHANGE_EVENT = 'change';

  function syncInvite(inviteObject) {
    return $.ajax({
      url: API,
      type: 'PUT',
      data: JSON.stringify(inviteObject),
      contentType: 'application/json',
      success: function(data) {
        InviteSyncStore.emitChange();
      }
    });
  }

  var InviteSyncStore = _.extend({}, EventEmitter.prototype, {

    syncInvite: function (inviteObject) {
      return syncInvite(inviteObject);
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

  return InviteSyncStore;
})
