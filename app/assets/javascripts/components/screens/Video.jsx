define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!components/Icon'

], function (

  // libraries
  React, Router, _,

  // components
  Icon

) {

  var Video = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    componentDidMount: function () {
      if(!this.props.inviteValues) {
        // this.transitionTo('signup');
      }
    },

    render: function() {
      return (
        <div className="video_screen">
          <video preload="auto" autoPlay loop muted className="pioneer_video">
            <source src="https://s3.amazonaws.com/www-assets.invisionapp.com/Homepage/enterprise-loop.mp4" type="video/mp4" />
          </video>
          <div className="video_cover"></div>

          <div className="video_content_container">

            <div className="video_content">
              <i className="play_video">
                <Icon type="play_video" />
              </i>

              <h4><span>PIONEER STATUS & THE REWARDS IN 60 SECONDS...</span></h4>
              <h1>Join early to get exclusive <br/> access and rewards.</h1>
              <a href="#" className="button button_green button_large">
                <span>JOIN EARLY</span>
              </a>
            </div>
            
          </div>

        </div>
      )
      
    }
  });

  return Video;

});
