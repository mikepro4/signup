define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // mixins,
  'jsx!mixins/InviteCheck',
  'jsx!mixins/MobileCheck',

  // components
  'jsx!components/Icon',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, _, $,

  // mixins
  MobileCheck, InviteCheck,

  // components
  Icon

) {

  var Video = React.createClass({
    
    mixins: [ Router.State, Router.Navigation, InviteCheck, MobileCheck ],

    getInitialState: function () {
      return {
        videoPlaying: this.getQuery().play ? true : false,
        mobile: this.checkMobile()
      }
    },

    componentDidMount: function() {
      if(this.isMounted()) {
        if(this.getQuery().play) {
          _.delay(function () {
            if(this.isMounted()) { 
              this.vimeoPost('play');
            }
          }.bind(this), 1000)
        }

        this.props.updatePioneerData({
          visitedVideoScreen: true
        })

        if (window.addEventListener){
          window.addEventListener('message', this.onMessageReceived, false);
        } else {
          window.attachEvent('onmessage', this.onMessageReceived, false);
        }
      }
    },

    onMessageReceived: function(e) {
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

    vimeoPost: function(action, value) {
      var f = $('iframe');
      var url = f.attr('src').split('?')[0];
      var data = { method: action };
      
      if (value) {
        data.value = value;
      }
      
      f[0].contentWindow.postMessage(JSON.stringify(data), url);
    },

    onVideoReady: function() {
      this.vimeoPost('addEventListener', 'pause');
      this.vimeoPost('addEventListener', 'finish');
      this.vimeoPost('addEventListener', 'playProgress');
    },

    onPause: function() {
      console.log('pause');
    },

    onFinish: function() {
      this.props.updatePioneerData({
        watchedVideo: true
      })
      this.transitionTo('upload_comps');
    },

    onPlayProgress: function (data) {
      // console.log(data)
    },

    watchVideo: function () {
      this.replaceWith('video', {}, {play: true});
      this.setState({ videoPlaying: true });
      this.vimeoPost('play');
    },

    skipVideo: function () {
      this.props.updatePioneerData({
        skippedVideo: true
      });
      this.transitionTo('upload_comps');
    },

    render: function() {
      if(!this.state.videoPlaying && !this.state.mobile) {
        var backgroundVideo =
            <div>
              <video preload="auto" autoPlay loop muted className="pioneer_video">
                <source src="https://s3.amazonaws.com/compstak/static/signup/michael_video.mp4" type="video/mp4" />
              </video> 
              <div className="video_cover"></div>    
            </div>
      }

      return (
        <div className="video_screen">

          <div className="video_page_background"> 
            {backgroundVideo}
          </div>   

          <div className="video_content_container">

            <div className={classNames({
              'video_content': true,
              'video_playing': this.state.videoPlaying
            })}>

              <i className="play_video" onClick={this.watchVideo}>
                <Icon type="play_video" />
              </i>

              <h4><span>LEARN MORE IN 60 SECONDS…</span></h4>
              <h1>Join early to get exclusive <br/> access and rewards.</h1>
              <a className="button button_green button_large" onClick={this.watchVideo}>
                <span>JOIN EARLY</span>
              </a>

            </div>

            <div className={classNames({
              'video_container': true,
              'video_playing': this.state.videoPlaying
            })}>

              <iframe 
                src="http://player.vimeo.com/video/120016796?api=1" 
                className="vimeo_video"
                frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
              </iframe>

              <div className="skip_video" onClick={this.skipVideo}>
                <span>I can’t watch video now</span>
                <i><Icon type="arrow_right_rounded"/></i>
              </div>

            </div>
       
          </div>

        </div>
      )
    }
  });

  return Video;

});
