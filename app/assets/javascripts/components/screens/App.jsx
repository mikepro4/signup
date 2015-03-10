define([

  // libraries
  'react', 'react-router', 'underscore', 'jquery',

  // components
  'jsx!components/AppHeader',
  'jsx!components/AppFooter',
  './Stats',

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
        footerVisible: false,
        headerDark: true,
        loginButton: true,
        contacts: false,
        allMarkets: null,
        invite: null,
        loading: true
      }
    },

    componentWillMount: function () {
      Actions.loadMarkets();

      if(this.isActive("pioneer_video")) {
        this.setState({
          headerDark: false,
          footerVisible: false,
          loginButton: false,
          contacts: true
        });
      }
    },

    componentDidMount: function () {
      MarketStore.addChangeListener(this.updateMarkets);
      InviteStore.addChangeListener(this.updateInviteValues);    
    },

    componentWillUnmount: function () {
      MarketStore.removeChangeListener(this.updateMarkets);
      InviteStore.removeChangeListener(this.updateInviteValues);
    },

    componentWillReceiveProps: function () {
      if(this.isActive("signup") || this.isActive("signup_market") || this.isActive("signup_email_market")) {
        this.clearInvite();
        this.setState({
          footerVisible: true,
          headerDark: true,
          loginButton: true,
          contacts: false
        });
      } else if(this.isActive("pioneer_video")) {
        this.setState({
          headerDark: false,
          footerVisible: false,
          loginButton: false,
          contacts: true
        });
      } else {
        if(this.state.invite) {
          var marketLaunched = MarketStore.getMarketStateById(this.state.invite.marketId);
        } else {
          var marketLaunched = false;
        }
        this.setState({
          headerDark: true,
          footerVisible: marketLaunched ? true : false,
          loginButton: false,
          contacts: true
        });
      }
    },

    updateInviteValues: function(cb) {
      this.setState({
        invite: InviteStore.getInvite()
      }, function () {
        if(cb) cb()
      }.bind(this));
    },

    updateMarkets: function () {
      this.setState({
        allMarkets: MarketStore.getMarkets(),
        loading: false
      });
    }, 

    updateInvite: function(value) {
      this.setState({ loading: true });
      Actions.updateInvite(value);
      this.updateInviteValues(this.nextScreen);
    },

    clearInvite: function() {
      this.setState({ invite: null });
      InviteStore.clearInvite();
    },

    nextScreen: function () {
      var userType = MarketStore.getMarketStateById(this.state.invite.marketId) ? 'user' : 'pioneer';

      switch(userType) {
        case 'user': 
          this.routeRegularUser();
          break
        case 'pioneer':
          this.routePioneerUser();
          break
      }
    },

    routeRegularUser: function () {
      this.setState({
        footerVisible: true,
        loginButton: false,
        contacts: true
      });

      if(_.isEmpty(this.state.invite.email) || _.isEmpty(this.state.invite.firstName) || _.isEmpty(this.state.invite.lastName)) {

        InviteStore.loadInvite(this.state.invite.email, this.state.invite.marketId)
          .done(function () {
            this.transitionTo('user_info');
            this.setState({ loading: false });
          }.bind(this))
          .error(function (xhr) {
            this.errorHandler();
          }.bind(this));

      } else {

        InviteStore.postInvite()
          .done(function() {
            this.transitionTo('user_reviewing_request');
            this.setState({ loading: false });
          }.bind(this)).error(function (xhr) {
            this.errorHandler();
          }.bind(this));
      }
    },

    routePioneerUser: function () {
      this.setState({
        footerVisible: false,
        loginButton: false,
        contacts: true
      });

      InviteStore.loadInvite(this.state.invite.email, this.state.invite.marketId)
        .done(function () {
          this.transitionTo('pioneer_video');
          this.setState({ loading: false });
        }.bind(this))
        .error(function (xhr) {
          this.errorHandler();
        }.bind(this));
    },

    errorHandler: function () {
      alert('Sorry there was an error');
      this.transitionTo('signup');
      this.clearInvite();
      this.setState({ loading: false });
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

            <AppHeader 
              headerDark={this.state.headerDark} 
              loginButton={this.state.loginButton}
              contacts={this.state.contacts}
            />

            <div className="application_routeHandler">
              <RouteHandler 
                {...this.props} 
                loading={this.state.loading}
                allMarkets={this.state.allMarkets}
                inviteValues={this.state.invite}
                nextScreen={this.nextScreen}
                getInvite={this.getInvite}
                updateInvite={this.updateInvite}
                clearInvite={this.clearInvite}
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