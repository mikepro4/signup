define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!components/AppHeader',
  'jsx!components/AppFooter',
  'jsx!./Stats',

  // stores
  'stores/InviteStore',
  'stores/MarketStore',

  // flux
  'actions/AppActions'

], function (

  // libraries
  React, Router, _, $,

  // components
  AppHeader, AppFooter, Stats,

  // stores
  InviteStore, MarketStore,

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

    componentDidMount: function () {
      this.clearInvite()
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

    clearInvite: function() {
      this.setState({ invite: null })
      InviteStore.clearInvite();
    },

    nextScreen: function () {
      var Invite = this.state.invite;
      
      if(_.isEmpty(Invite.email) || _.isEmpty(Invite.firstName) || _.isEmpty(Invite.lastName)) {

        InviteStore.loadInvite(Invite.email, Invite.marketId)
          .done(function () {
            this.transitionTo('/user/info/');
          }.bind(this))
          .error(function (xhr) {
            alert('Sorry there was an error');
            this.transitionTo('/');
          }.bind(this));
        
      } else {
        var inviteObject = localStorage.getItem('inviteObject')

        InviteStore.postInvite()
          .done(function() {
            delete localStorage.inviteObject;
            this.transitionTo('/user/reviewing_request/');
          }.bind(this)).error(function (xhr) {
             alert('Sorry there was an error');
             this.transitionTo('/');
          }.bind(this));

      } 
    },

    render: function () {
      var appContentClasses = cx({
        'application_content':   true,
        'footer_visible':        this.state.footerVisible,
        'footer_invisible':      !this.state.footerVisible
      });
        
      return (
         <div className="application_wrapper">

          <Stats isActive={true} />

          <section className={appContentClasses}>

           <AppHeader mode={this.state.headerMode} />

            <div className="application_routeHandler">
              <RouteHandler 
                {...this.props} 
                nextScreen={this.nextScreen}
                getInvite={this.getInvite}
                updateInvite={this.updateInvite}
                clearInvite={this.clearInvite}
                signUpValues={this.state.invite}
              />
            </div>
            
            <AppFooter visible={this.state.footerVisible} />   

          </section>

        </div>
      );
    }
  });

  return App;
})