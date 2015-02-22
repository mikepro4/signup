define([

  'underscore', 'jquery'

], function (

  _, $

) { 

  var API = '/invite.json';

  var Invite = {};
  var _changeListeners = [];
  var _initCalled = false;

  var InviteStore = {

    init: function () {
      if (_initCalled)
        return;

      _initCalled = true;

      $.ajax({
        url: API,
        dataType: 'json',
        success: function(Invite) {
          Invite = {
            'firstName': Invite.firstName, 
            'lastName': Invite.lastName, 
            'companyName': Invite.companyName,
            'email': Invite.email,
            'marketId': Invite.marketId,
            'userType': Invite.userType,
            'promoCode': Invite.promoCodeId,
            'market': Invite.market
          };
          this.notifyChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("Invite didn't load");
        }.bind(this)
      });    
    },

    getInvite: function () {
      return Invite;
    },

    updateInvite: function (value, cb) {
      Invite = _.extend({}, Invite, value);
      this.notifyChange();
      cb();
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
  
  return InviteStore;
})
