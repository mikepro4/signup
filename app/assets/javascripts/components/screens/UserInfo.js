define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var UserInfoScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          UserInfoScreen
        </div>
      )
      
    }
  });

  return UserInfoScreen;

});
