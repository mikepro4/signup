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
        footerVisible: true,
        headerDark: true,
        loginButton: true,
        contacts: false,
        allMarkets: null,
        invite: null,
        pioneerData: null,
        loading: true
      }
    },

    componentWillMount: function () {
      Actions.loadMarkets();
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
      // alter header and footer for different screens
      if(this.isActive("signup") || this.isActive("signup_market") || this.isActive("signup_email_market")) {
        this.clearData();
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

    clearData: function() {
      this.setState({ 
        invite: null, 
        pioneerData: null  
      });
      InviteStore.clearInvite();
    },

    updatePioneerData: function (data) {
      var pioneerData = this.state.pioneerData
      this.setState({ pioneerData: _.extend({}, pioneerData, data) });
    },

    nextScreen: function () {
      var user = MarketStore.getMarketStateById(this.state.invite.marketId) ? true : false;

      if(_.isEmpty(this.state.invite.firstName)) {

        InviteStore.loadInvite(this.state.invite.email, this.state.invite.marketId)
          .done(function () {
            if(user) {
              this.transitionTo('user_info');
            } else {
              this.transitionTo('pioneer_video');
            }
            this.setState({ loading: false });
          }.bind(this))
          .error(function (xhr) {
            this.errorHandler();
          }.bind(this));

      } else {

        InviteStore.postInvite()
          .done(function() {
            if(user) {
              this.transitionTo('user_reviewing_request');
            } else {
              if(this.state.pioneerData.agreedToUpload) {
                this.transitionTo('pioneer_complete_upload');
              } else {
                this.transitionTo('pioneer_complete');
              }
            }
            this.setState({ loading: false });
          }.bind(this)).error(function (xhr) {
            this.errorHandler();
          }.bind(this));
      }
    },

    errorHandler: function () {
      alert('Sorry there was an error');
      this.transitionTo('signup');
      this.clearData();
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
                footerVisible={this.state.footerVisible}
                loading={this.state.loading}
                allMarkets={this.state.allMarkets}
                inviteValues={this.state.invite}
                nextScreen={this.nextScreen}
                updateInvite={this.updateInvite}
                updatePioneerData={this.updatePioneerData}
                clearData={this.clearData}
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