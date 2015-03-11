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

  var Link = Router.Link;

  var Video = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    render: function() {

      return (
        <Link to="pioneer_video" query={{play: true}}>
          <a className="video_link">
            <figure className="video_preview">
              <img src="https://i.vimeocdn.com/video/507670267.webp?mw=1920&mh=1080&q=70"/>
              <i><Icon type="play_video"/></i>
            </figure>
            <span> Pioneer status and the rewards in 60 seconds...</span>
          </a>
        </Link>
      )
    }
  });

  return Video;
});