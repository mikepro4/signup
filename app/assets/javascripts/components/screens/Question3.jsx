define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var Question3Screen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          Question3Screen
        </div>
      )
      
    }
  });

  return Question3Screen;

});
