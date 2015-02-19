define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/AppHeader',
  'jsx!assets/javascripts/components/AppFooter'

], function (

  // libraries
  React, Router, _, $,

  // components
  AppHeader, AppFooter

) { 

  var TransitionGroup = React.addons.CSSTransitionGroup;
  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;

  var signUpValues = {
    email: null,
    market: null,
    firstName: null,
    lastName: null,
    companyName: null,
    watchedVideo: false,
    uploadComps: false,
    question1: null,
    question2: null,
    question3: null,
    userType: null
  }

  var App = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
      return {
        footerVisible: true,
        headerMode: 'light'
      }
    },

    saveValues: function(field_value) {
      return function() {
        signUpValues = _.extend({}, signUpValues, field_value)
      }.bind(this)();
    },

    nextScreen: function () {
      console.log(signUpValues)
    },

    render: function () {
        
      return (
         <div className="application_wrapper">

            <AppHeader mode={this.state.headerMode} />

            <section className="application_content">
              <RouteHandler 
                {...this.props} 
                nextScreen={this.nextScreen}
                saveValues={this.saveValues}
                signUpValues={signUpValues}
              />

              <AppFooter visible={this.state.footerVisible} />   

            </section>

        </div>
      );
    }
  });

  return App;
})