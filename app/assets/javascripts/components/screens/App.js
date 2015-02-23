define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/AppHeader',
  'jsx!assets/javascripts/components/AppFooter',

  // stores
  'jsx!assets/javascripts/stores/InviteStore',

], function (

  // libraries
  React, Router, _, $,

  // components
  AppHeader, AppFooter,

  // stores
  InviteStore

) { 

  var TransitionGroup = React.addons.CSSTransitionGroup;
  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;

  var cx = React.addons.classSet;

  var App = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
      return {
        footerVisible: true,
        headerMode: 'light',
        invite: InviteStore.getInvite()
      }
    },

    componentWillMount: function () {
      InviteStore.init();
    },

    componentDidMount: function () {
      InviteStore.addChangeListener(this.updateInviteValues);
    },

    componentWillUnmount: function () {
      InviteStore.removeChangeListener(this.updateInviteValues);
    },

    updateInviteValues: function() {
      this.setState({
        invite: InviteStore.getInvite()
      })
    },

    updateInvite: function(value) {
      InviteStore.updateInvite(value, this.nextScreen);
    },

    nextScreen: function () {
      this.updateInviteValues();
      InviteStore.postInvite();
      var Invite = InviteStore.getInvite();

      console.log(Invite);

      if(Invite.userType === 'user') {
        if(_.isEmpty(Invite.email) || _.isEmpty(Invite.firstName) || _.isEmpty(Invite.lastName)) {
          this.transitionTo('/user/info/');
        } else {
          var inviteObject = localStorage.getItem('inviteObject')
          delete localStorage.inviteObject;
          this.transitionTo('/user/reviewing_request/');
        }
      } else if (Invite.userType === 'pioneer') {
        alert('Pioneer!')
      } else {
        alert('You need to fill in email and market')
        this.transitionTo('/');
      }
    },

    render: function () {
      var name = this.getRoutes().reverse()[0].name;

      var appContentClasses = cx({
        'application_content':   true,
        'footer_visible':        this.state.footerVisible,
        'footer_invisible':      !this.state.footerVisible
      });
        
      return (
         <div className="application_wrapper">

          <section className={appContentClasses}>

           <AppHeader mode={this.state.headerMode} />

            <div className="application_routeHandler">
              <TransitionGroup component="div" transitionName="scale">
                <RouteHandler 
                  {...this.props} 
                  nextScreen={this.nextScreen}
                  getInvite={this.getInvite}
                  updateInvite={this.updateInvite}
                  signUpValues={this.state.invite}
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