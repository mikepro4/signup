define([

  // flux
  'dispatcher/AppDispatcher',
  'constants/AppConstants'

], function (

  AppDispatcher, Constants

) {

  var SignupActions = {

    loadMarkets: function() {
      AppDispatcher.handleViewAction({
        actionType: Constants.MARKETS_LOAD
      });
    },

    loadInvite: function(email, marketId) {
      AppDispatcher.handleViewAction({
        actionType: Constants.INVITE_LOAD,
        email: email,
        marketId: marketId
      });
    },

    updateInvite: function(invite) {
      AppDispatcher.handleViewAction({
        actionType: Constants.INVITE_UPDATE,
        invite: invite
      });
    }

  }

  return SignupActions;

})