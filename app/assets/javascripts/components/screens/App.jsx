define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!components/AppHeader',
  'jsx!components/AppFooter',

  // stores
  'stores/InviteStore',

  // flux
  'actions/AppActions'

], function (

  // libraries
  React, Router, _, $,

  // components
  AppHeader, AppFooter,

  // stores
  InviteStore,

  // flux
  Actions

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
        invite: null
      }
    },

    componentWillMount: function () {
    },

    componentDidMount: function () {
      InviteStore.addChangeListener(this.updateInviteValues);
    },

    componentWillUnmount: function () {
      InviteStore.removeChangeListener(this.updateInviteValues);
    },

    updateInviteValues: function(cb) {
      this.setState({
        invite: InviteStore.getInvite()
      }, function () {
        if(cb) cb()
      }.bind(this));
    },

    updateInvite: function(value) {
      Actions.updateInvite(value);
      this.updateInviteValues(this.nextScreen);
    },

    nextScreen: function () {
      var Invite = this.state.invite;
      console.log(Invite);
      
      if(Invite.userType === 'user') {
        if(_.isEmpty(Invite.email) || _.isEmpty(Invite.firstName) || _.isEmpty(Invite.lastName)) {
          InviteStore.loadInvite(Invite.email, Invite.marketId).done(function () {
            this.transitionTo('/user/info/');
          }.bind(this)).error(function (xhr) {
            var res = xhr.responseJSON;
            if(res.id) {
              this.transitionTo('/user/info/');
            }
          }.bind(this));
          
        } else {
          var inviteObject = localStorage.getItem('inviteObject')
          InviteStore.postInvite().done(function() {
            delete localStorage.inviteObject;
            this.transitionTo('/user/reviewing_request/');
          }.bind(this)).error(function (xhr) {
            var res = xhr.responseJSON;
            if(res.id) {
              this.transitionTo('/user/info/');
            }
          }.bind(this));
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