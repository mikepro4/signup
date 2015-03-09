define([
  // libraries
  'react', 'react-router', 

  // components
  'jsx!components/Icon',
  'jsx!components/Button'

], function (

  // libraries
  React, Router, 

  // components
  Icon, Button

) { 

  var cx = React.addons.classSet;
  
  var AppHeader = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    handleLogoClick: function () {
      this.transitionTo('signup');
    },

    render: function () {
      return (
        <header className={cx({
          'application_header': true,
          'header_dark': this.props.headerDark,
          'header_white': !this.props.headerDark
          })}>

          <aside className="cs_logo" onClick={this.handleLogoClick}> 
            <Icon type="cs_logo" /> 
          </aside>

          <aside className="login_contacts">

            <ul>
              <li className={cx({
              'hidden': !this.props.contacts
              })}>
                <p className="contact_info">
                  Need help? – Call us at <a href="tel:1-646-926-6707">1-646-926-6707</a>
                </p>
              </li> 

              <li className={cx({
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
