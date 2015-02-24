define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var SignupThanksUpload = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          SignupThanksUpload
        </div>
      )
      
    }
  });

  return SignupThanksUpload;

});
