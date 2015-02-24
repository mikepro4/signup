define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var UploadCompsScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          UploadCompsScreen
        </div>
      )
      
    }
  });

  return UploadCompsScreen;

});
