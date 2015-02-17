define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var ReviewingRequestScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          ReviewingRequestScreen
        </div>
      )
      
    }
  });

  return ReviewingRequestScreen;

});
