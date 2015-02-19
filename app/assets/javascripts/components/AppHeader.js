define([

  'react', 'react-router', 

  // icons
  'jsx!assets/javascripts/components/Icon',
  'jsx!assets/javascripts/components/Button',

], function (

  React, Router, Icon, Button

) { 
  
  var AppHeader = React.createClass({

    mixins: [ Router.State ],

    render: function () {
      var headerClassName = 'application_header mode-' + this.props.mode;

      return (
        <header className={headerClassName}>
          <aside className="cs_logo"><Icon type="cs_logo" /></aside>
          
          <Button 
            href="https://exchange.compstak.com/login"
            className="button button_white have_account_button"
            text="normal"
            target="_blank">
            Have an Account?
          </Button>
        </header>
      );
    }
  });

  return AppHeader;
});
