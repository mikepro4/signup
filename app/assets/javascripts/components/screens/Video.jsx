define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var Video = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    componentDidMount: function () {
      if(!this.props.inviteValues) {
        this.transitionTo('signup');
      }
    },

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
