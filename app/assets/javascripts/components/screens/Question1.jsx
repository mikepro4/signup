define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var Question1Screen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          Question1
        </div>
      )
      
    }

  });

  return Question1Screen;

});
