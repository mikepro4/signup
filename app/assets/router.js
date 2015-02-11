define([

  'backbone', 
  'react', 
  'jsx!views/test'

], function (

  Backbone, 
  React, 
  TestComponent

) {

  return Backbone.Router.extend({
    routes: {
      '*default': 'defaultAction'
    },
    
    defaultAction: function () {
      React.renderComponent(<TestComponent/>, document.body);
    }
  });
});