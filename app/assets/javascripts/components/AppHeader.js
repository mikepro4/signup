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

    getInitialState: function(){
      return {
        mode: 'dark'
      }
    },

    buildToggleClassName: function () {
      var headerClassName = 'application_header mode-' + this.state.mode;
      return headerClassName;
    },

    render: function () {

      return (
          <header className={this.buildToggleClassName()}>
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
