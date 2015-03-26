define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!components/Icon',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, _, $,

  // components
  Icon

) {

  var Bumper = React.createClass({
    
    mixins: [ Router.State, Router.Navigation ],

    render: function() {
      return (
        <div className="ie_message">
          <div className="cs_logo"><Icon type="cs_logo"/></div>

          <h1>Sorry, your browser (IE8) doesn't support CompStak.</h1>
          <p>In order to provide the best experience, we're using the latest technology. <br/>
              Unfortunately, your browser doesn’t support some features of CompStak.</p>
          <p>We recommend using the latest versions of Google Chrome, Safari, Firefox or Internet Explorer 10+.</p>

          <img src="/assets/images/laptop_ipad.png"/>

          <h2><a href="https://www.google.com/chrome/browser/">Upgrade you browser</a> or contact us if you need help.</h2>
          <p className="contact_information"><span className="ie_phone">1-646-926-6707</span>
            <span className="ie_divider">|</span>
            <span className="ie_email"><a href="mailto:Help@CompStak.com">Help@CompStak.com</a></span>
          </p>
        </div>
      )
    }
  });

  return Bumper;

});
