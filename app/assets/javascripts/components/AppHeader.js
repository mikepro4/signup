define([

  'react', 'react-router', 

  // components
  'jsx!assets/javascripts/components/Icon',
  'jsx!assets/javascripts/components/Button',

], function (

  React, Router, Icon, Button

) { 
  
  var AppHeader = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    handleLogoClick: function () {
      this.transitionTo('/');
    },

    render: function () {
      var headerClassName = 'application_header mode-' + this.props.mode;

      return (
        <header className={headerClassName}>

          <aside className="cs_logo" onClick={this.handleLogoClick}><Icon type="cs_logo" /></aside>
          
          <Button 
            href="https://exchange.compstak.com/login"
            className="button button_white have_account_button"
            text="normal"
            target="_blank">
            Have an account?
          </Button>

        </header>
      );
    }
  });

  return AppHeader;
});
