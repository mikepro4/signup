define([

  'react', 'react-router', 

  // icons
  'jsx!assets/javascripts/components/Icon',

], function (

  React, Router, Icon

) { 
  
  var AppHeader = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function(){
      return {
        mode: 'dark'
      }
    },

    buildToggleClassName: function () {
      var headerClassName = 'application_header mode-' + this.state.dark;
      return headerClassName;
    },

    render: function () {

      return (
          <header className={this.buildToggleClassName()}>
              <Icon type="cs_logo"/>
          </header>
      );
    }
  });

  return AppHeader;
});
