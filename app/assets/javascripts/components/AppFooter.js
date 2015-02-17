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
        visibility: false
      }
    },

    componentWillReceiveProps: function (newProps) {
      this.toggle();
    },

    componentDidUpdate: function () {
      this.toggle();
    },

    toggle: function () {
      if(this.props.visibility) {
        return {display: 'block'}
      } else {
        return {display: 'none'}
      }
    },

    render: function () {
      return (
        <footer className="application_footer" style={this.toggle()}>
          footer text
        </footer>
      );
    }
  });

  return AppFooter;
});
