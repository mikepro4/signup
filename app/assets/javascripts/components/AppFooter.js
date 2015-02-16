define([

  'react', 'react-router', 'jquery',

  // icons
  'jsx!assets/javascripts/components/Icon',

], function (

  React, Router, $,

  Icon

) { 
  
  var AppFooter = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function(){
      return {
        visibility: true
      }
    },

    componentWillReceiveProps: function (newProps) {
      this.toggleFooter();
    },

    componentDidUpdate: function () {
      this.toggleFooter();
    },

    toggleFooter: function () {
      if(this.props.visibility) {
        return {display: 'block'}
      } else {
        return {display: 'none'}
      }
    },

    render: function () {

      return (
          <footer className="application_footer" style={this.toggleFooter()}>
            footer text
          </footer>
      );
    }
  });

  return AppFooter;
});