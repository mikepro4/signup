define([

  // flux
  'jsx!assets/javascripts/dispatcher/dispatcher',
  'jsx!assets/javascripts/constants/AppConstants',

], function (

  AppDispatcher, Constants

) {

  var SignupActions = {

    loadMarkets: function() {
      AppDispatcher.dispatch({
        actionType: Constants.MARKETS_LOAD
      });
    },

    loadInvite: function(email, marketId) {
      AppDispatcher.dispatch({
        actionType: Constants.INVITE_LOAD,
        email: email,
        marketId: marketId
      });
    },

    updateInvite: function(invite) {
      AppDispatcher.dispatch({
        actionType: Constants.INVITE_UPDATE,
        invite: invite
      });
    }

  }

  return SignupActions;

})