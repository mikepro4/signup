define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var Video = React.createClass({
    mixins: [ Router.State ],

    render: function() {
      return (
        <div>
          Video
        </div>
      )
      
    }
  });

  return Video;

});
