define([

  'underscore', './dispatcher'

], function (

  _, Dispatcher

) {

  var AppDispatcher = _.extend({}, Dispatcher.prototype, {
    handleViewAction: function(action){
      this.dispatch({
        source: 'VIEW_ACTION',
        action: action
      })
    }
  })

  return AppDispatcher;

})