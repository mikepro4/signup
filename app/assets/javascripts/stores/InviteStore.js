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
        success: function(data) {
          this.parseData(data);
          this.notifyChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("Invite didn't load");
        }.bind(this)
      });    
    },

    parseData: function (data) {
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
    },

    getInvite: function () {
      return Invite;
    },

    updateInvite: function (value, cb) {
      Invite = _.extend({}, Invite, value);
      localStorage.setItem('inviteObject', JSON.stringify(Invite));
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
    },

    postInvite: function () {
      $.ajax({
        url: API,
        type: 'PUT',
        data: JSON.stringify(Invite),
        dataType: 'json',
        success: function(data) {
          this.parseData(data);
          this.notifyChange();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("Invite didn't update");
        }.bind(this)
      });  
    }
  }
  
  return InviteStore;
})
