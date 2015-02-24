define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var SignupThanks = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          SignupThanks
        </div>
      )
      
    }
  });

  return SignupThanks;

});
