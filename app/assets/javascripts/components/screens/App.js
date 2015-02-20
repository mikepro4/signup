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
    userType: null,
    promoCode: null
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
      if(signUpValues.userType === 'user') {
        if(_.isEmpty(signUpValues.email) || _.isEmpty(signUpValues.firstName) || _.isEmpty(signUpValues.lastName)) {
          this.transitionTo('/user/info/');
        } else {
          this.transitionTo('/user/reviewing_request/');
        }
      } else if (signUpValues.userType === 'pioneer') {
        alert('Pioneer!')
      } else {
        alert('You need to fill in email and market')
        this.transitionTo('/');
      }
    },

    render: function () {
      var name = this.getRoutes().reverse()[0].name;
      var contentClass = this.state.footerVisible ? 'application_content footer_visible' : 'application_content footer_invisible';
        
      return (
         <div className="application_wrapper">

          <section className={contentClass}>

           <AppHeader mode={this.state.headerMode} />

            <div className="application_routeHandler">
              <TransitionGroup component="div" transitionName="scale">
                <RouteHandler 
                  {...this.props} 
                  nextScreen={this.nextScreen}
                  saveValues={this.saveValues}
                  signUpValues={signUpValues}
                  key={name}
                />
              </TransitionGroup>
            </div>
            
            <AppFooter visible={this.state.footerVisible} />   

          </section>

        </div>
      );
    }
  });

  return App;
})