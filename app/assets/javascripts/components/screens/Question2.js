define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var Question2Screen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          Question2Screen
        </div>
      )
      
    }
    
  });

  return Question2Screen;

});
