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

  var App = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function(){
      return {

        // sync to Compstak
        email: null,
        market: null,
        firstName: null,
        lastName: null,
        companyName: null,

        // sync to localStorage
        watchedVideo: false,
        uploadComps: false,
        question1: null,
        question2: null,
        question3: null,

        // UI states
        userType: 'user',
        footerVisible: true,
        headerMode: 'light'
      }
    },

    handleChange: function () {
    },

    nextScreen: function () {
      console.log('next screen')
    },

    render: function () {
        
      return (
         <div className="application_wrapper">

            <AppHeader mode={this.state.headerMode} />

            <section className="application_content">
              <RouteHandler 
                {...this.props} 

                nextScreen={this.nextScreen()}
              />

              <AppFooter visible={this.state.footerVisible} />   

            </section>

        </div>
      );
    }
  });

  return App;
})