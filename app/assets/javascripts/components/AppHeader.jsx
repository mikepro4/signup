define([
  // libraries
  'react', 'react-router', 

  // components
  'jsx!components/Icon',
  'jsx!components/Button',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, 

  // components
  Icon, Button

) { 

  var AppHeader = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    render: function() {
      return (
        <header className={classNames({
          'application_header': true,
          'header_dark': this.props.headerDark,
          'header_white': !this.props.headerDark
        })}>

          <a href="http://compstak.com/" target="_blank" className="cs_logo" 
            title="CompStak – Free lease comp exchange for CRE brokers, appraisers and researchers"> 
            <Icon type="cs_logo" /> 
          </a>

          <aside className="login_contacts">

            <ul>
              <li className={classNames({
                'hidden': !this.props.contacts
              })}>
                <p className="contact_info">
                  Need help? <span className="info_divider"></span> Call us at <a href="tel:1-646-926-6707">1-646-926-6707</a>
                </p>
              </li> 

              <li className={classNames({
                'hidden': !this.props.loginButton
              })}>
                <Button 
                  href="https://exchange.compstak.com/login"
                  className="button button_white have_account_button"
                  text="normal"
                  target="_blank">
                  Have an account?
                </Button>
              </li>
            </ul>

          </aside>
        </header>
      );
    }
  });

  return AppHeader;
});
