define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var CreateAccountScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          CreateAccountScreen
        </div>
      )
      
    }
  });

  return CreateAccountScreen;

});
