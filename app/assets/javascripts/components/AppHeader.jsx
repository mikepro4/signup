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
  
  var AppHeader = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    render: function () {
      var headerClassName = 'application_header mode-' + this.props.mode;

      return (
        <header className={headerClassName}>

          <aside className="cs_logo"> 
            <Icon type="cs_logo" /> 
          </aside>
          
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
