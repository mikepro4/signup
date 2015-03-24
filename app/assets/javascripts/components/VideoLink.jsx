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
        <Link to="video" query={{play: true}}>
          <a className="video_link">
            <figure className="video_preview">
              <img src="/assets/images/video_preview.jpg"/>
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