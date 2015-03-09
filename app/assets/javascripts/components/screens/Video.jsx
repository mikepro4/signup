define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!components/Icon'

], function (

  // libraries
  React, Router, _, $,

  // components
  Icon

) {

  var Video = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    componentDidMount: function () {
      if(!this.props.inviteValues) {
        // this.transitionTo('signup');
      }

      if (window.addEventListener){
        window.addEventListener('message', this.onMessageReceived, false);
      } else {
        window.attachEvent('onmessage', this.onMessageReceived, false);
      }
    },

    onMessageReceived: function (e) {
      var data = JSON.parse(e.data);
      
      switch (data.event) {
        case 'ready':
          this.onVideoReady();
          break;
           
        case 'playProgress':
          this.onPlayProgress(data.data);
          break;
            
        case 'pause':
          this.onPause();
          break;
           
        case 'finish':
          this.onFinish();
          break;
      }
    },

    post: function (action, value) {
      var f = $('iframe');
      var url = f.attr('src').split('?')[0];
      var data = { method: action };
      
      if (value) {
        data.value = value;
      }
      
      f[0].contentWindow.postMessage(JSON.stringify(data), url);
    },

    onVideoReady: function () {
      this.post('addEventListener', 'pause');
      this.post('addEventListener', 'finish');
      this.post('addEventListener', 'playProgress');
    },

    onPause: function () {
      console.log('pause');
    },

    onFinish: function () {
      console.log('finish');
      this.transitionTo('pioneer_upload_comps');
    },

    onPlayProgress: function (data) {
      // console.log(data)
    },

    handleClick: function () {
      this.post('play');
    },

    skipVideo: function () {
      this.transitionTo('pioneer_upload_comps');
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
              <a href="#" className="button button_green button_large" onClick={this.handleClick}>
                <span>JOIN EARLY</span>
              </a>
            </div>

            <div className="video_container">
              <iframe 
                src="http://player.vimeo.com/video/22645550?api=1" 
                width="800" height="450" 
                className="vimeo_video"
                frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
              </iframe>
              <div className="skip_video" onClick={this.skipVideo}>I can’t watch video now</div>
            </div>
       
          </div>

        </div>
      )
    }
  });

  return Video;

});
