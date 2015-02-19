define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var ReviewingRequestScreen = React.createClass({

    mixins: [ Router.State ],

    render: function() {
      return (
        <div className="reviewing_request_screen">

          <div className="reviewing_request_content">
            <i className="success_icon">
              <svg viewBox="0 0 57 57">
                <path fill="#4FB37F" d="M56.8,28.4c0,15.7-12.7,28.4-28.4,28.4S0,44.1,0,28.4S12.7,0,28.4,0S56.8,12.7,56.8,28.4z M25.9,38.3
                  c0.3,0,0.7-0.1,0.8-0.3l14.9-15.6c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.1-0.4-1.6,0L25.9,35.7l-6.7-6.6c-0.4-0.4-1.1-0.4-1.6,0
                  c-0.4,0.4-0.4,1.1,0,1.6l7.5,7.4C25.4,38.2,25.6,38.3,25.9,38.3C26,38.3,26,38.3,25.9,38.3z"/>
              </svg>
            </i>

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
