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
        mode: 'light'
      }
    },

    componentDidMount: function(){
    },

    componentWillUnmount: function(){
    },

    toggle: function () {
      this.setState({ mode: 'dark' });
    },

    buildToggleClassName: function () {
      var headerClassName = 'application_header mode-' + this.state.mode;
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