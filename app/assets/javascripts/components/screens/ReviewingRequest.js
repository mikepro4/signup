define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!assets/javascripts/components/Icon'


], function (

  // libraries
  React, Router, _,

  // components
  Icon

) {

  var ReviewingRequestScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div className="reviewing_request_screen">

          <div className="reviewing_request_content">
            <i className="success_icon"> <Icon type="success_tick"/> </i>

            <h1>Reviewing Your Request</h1>
            <p>Thanks for joining CompStak. We are reviewing your request. We may contact you for additional information.</p>
            <span className="divider"></span>

            <div className="reviewing_footer">
              <div className="have_questions">Have Questions?</div>
              <a className="help_email">help@compstak.com</a>
              <div className="help_phone">1-646-926-6707</div>
            </div>
          </div>
        </div>
      )
      
    }
  });

  return ReviewingRequestScreen;

});
