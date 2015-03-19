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
  'actions/AppActions',

  // utils
  'classNames'

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

  var App = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function() {
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

    componentWillMount: function() {
      Actions.loadMarkets();
      this.toggleUiElements();
    },

    componentDidMount: function() {
      MarketStore.addChangeListener(this.updateMarkets);
      InviteStore.addChangeListener(this.updateInviteValues);    
    },

    componentWillUnmount: function() {
      MarketStore.removeChangeListener(this.updateMarkets);
      InviteStore.removeChangeListener(this.updateInviteValues);
    },

    componentWillReceiveProps: function() {
      this.toggleUiElements();
    },

    toggleUiElements: function () {
       if(this.state.invite) {
        var marketLaunched = MarketStore.getMarketStateById(this.state.invite.marketId);
      } else {
        var marketLaunched = false;
      }

      // alter header and footer for different screens
      if(this.isActive("signup") || this.isActive("signup_market") || this.isActive("signup_email_market")) {
        // clear all data when open the main signup screens
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
      } else if(this.isActive("pioneer_complete_upload")) {
        this.setState({
          headerDark: true,
          footerVisible: false,
          loginButton: false,
          contacts: true
        });
      } else { 
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

    updateMarkets: function() {
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

    updatePioneerData: function(data) {
      var pioneerData = this.state.pioneerData;
      this.setState({ 
        pioneerData: _.extend({}, pioneerData, data) 
      }, function () {
        this.syncData();
      }.bind(this));
    },

    syncData: function() {
      if(this.state.invite) {
        var knownMarket = !this.state.invite.madeNoMarket;
        var segmentIoData = _.extend({}, 
        {
          email: this.state.invite.email,
          market: knownMarket ? MarketStore.getMarketName(this.state.invite.marketId) : this.state.invite.customMarket,
          firstName: this.state.invite.firstName,
          lastName: this.state.invite.lastName,
          companyName: this.state.invite.userInfo
        }, 
          this.state.pioneerData
        );

        analytics.identify(this.state.invite.id, segmentIoData, { 'Salesforce': true });
      }    
    },

    nextScreen: function() {
      var user = MarketStore.getMarketStateById(this.state.invite.marketId) ? true : false;

      if(_.isEmpty(this.state.invite.firstName)) {

        InviteStore.loadInvite()
          .done(function () {
            this.routeUserOnInviteLoad(user);
            this.setState({ loading: false });
          }.bind(this))
          .error(function (xhr) {
            this.errorHandler();
          }.bind(this));

      } else {

        InviteStore.postInvite()
          .done(function() {
            this.routeUserOnInviteUpdate(user);
            this.setState({ loading: false });
          }.bind(this))
          .error(function (xhr) {
            this.errorHandler();
          }.bind(this));
      }
    },

    routeUserOnInviteLoad: function(user) {
      var knownMarket = !this.state.invite.madeNoMarket;

      if(knownMarket) {
        if(user) {
          this.transitionTo('user_info');
        } else {
          this.transitionTo('pioneer_video');
        }
      } else {
        this.transitionTo('pioneer_complete');
      }
    },

    routeUserOnInviteUpdate: function(user) {
      if(user) {
        this.transitionTo('user_reviewing_request');
      } else {
        if(this.state.pioneerData.agreedToUpload) {
          this.transitionTo('pioneer_complete_upload');
        } else {
          this.transitionTo('pioneer_complete');
        }
      }
    },

    errorHandler: function() {
      alert("Sorry there was an error. You'll have to start over.");
      this.transitionTo('signup');
      this.clearData();
      this.setState({ loading: false });
    },

    render: function() {
      return (
         <div className="application_wrapper">

          <Stats isActive={false} />

          <section className={classNames({
            'application_content': true,
            'footer_visible': this.state.footerVisible,
            'footer_invisible': !this.state.footerVisible
          })}>

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
                syncData={this.syncData}
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