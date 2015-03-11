define([

  // libraries
  'react', 'react-router', 'underscore',

  // mixins,
  'jsx!mixins/InviteCheck',

  // components
  'jsx!components/Icon',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, _,

  // mixins
  InviteCheck,

  // components
  Icon

) {

  var ReviewingRequestScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    render: function() {
      return (
        <div className="reviewing_request_screen">

          <div className={classNames({
            'reviewing_request_content': true,
            'footer_visible': this.props.footerVisible
          })}>
            <i className="success_icon"> <Icon type="success_tick"/> </i>

            <h1>Reviewing Your Request</h1>
            <p>Thanks for joining CompStak. We are reviewing your request. We may contact you for additional information.</p>
            <span className="divider"></span>

            <div className="reviewing_footer">
              <div className="have_questions">Have Questions?</div>
              <a className="help_email" href="mailto:help@compStak.com" target="_blank">help@compstak.com</a>
              <div className="help_phone">1-646-926-6707</div>
            </div>
          </div>
        </div>
      ) 
    }
  });

  return ReviewingRequestScreen;

});
