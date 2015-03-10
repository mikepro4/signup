define([

  // libraries
  'react', 'react-router', 'underscore',

  // mixins,
  'jsx!mixins/InviteCheck',

  //components
  'jsx!components/Icon',
  'jsx!components/VideoLink'

], function (

  // libraries
  React, Router, _,

  // mixins
  InviteCheck,

  // components
  Icon, VideoLink

) {

  var PioneerCompleteUpload = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    componentDidMount: function () {
      this.props.clearData();
    },

    render: function() {
      return (
        <div>
          <VideoLink />
        </div>
      )
      
    }
  });

  return PioneerCompleteUpload;

});
