define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'assets/javascripts/stores/MarketStore',

  // components
  'jsx!assets/javascripts/components/Input',
  'jsx!assets/javascripts/components/Dropdown',
  'jsx!assets/javascripts/components/Select',
  'jsx!assets/javascripts/components/AppFooter'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // compomnents
  Input, Dropdown, Select, AppFooter

) { 

  var MainSignupScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
      return _.extend(
        this.getInputParams(), 
        {
          buttonTitle: 'JOIN COMPSTAK',
          allMarkets: MarketStore.getMarkets(),
          marketLaunched: false,
          marketName: null,
          footerVisibility: false
        }
      )
    },

    getInputParams: function () {
      return {
        email: this.getParams().email,
        market: this.getParams().market,
      }
    },

    componentWillMount: function () {
      MarketStore.init();
      this.selectContinueButtonTitle(this.state.market);
      this.toggleFooter(this.state.market)
      this.selectMarketFromParams();
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({
        email: this.getParams().email
      })
      this.selectMarketFromParams();
      this.selectContinueButtonTitle(this.getParams().market);
      this.toggleFooter(this.getParams().market);
    },

    onSelect: function (selectedMarket) {
      this.transitionTo('/signup/' + selectedMarket);
      this.selectContinueButtonTitle(selectedMarket);
      this.toggleFooter(selectedMarket)
    },

    selectMarketFromParams: function () {
      var matchedMarket = MarketStore.getMarket(this.getParams().market);

      if(!_.isEmpty(matchedMarket)){
        var marketValue = this.getParams().market
      } else {
        var marketValue = null
      }

      this.setState({
        market: marketValue
      })

    },

    selectContinueButtonTitle: function (value) {
      var continueButtonTitle;

      if(this.getMarketState(value)) {
        continueButtonTitle = 'JOIN COMPSTAK';
      } else {
        continueButtonTitle = 'JOIN EARLY';
      }

      this.setState({
        buttonTitle: continueButtonTitle
      })

    },

    validateEmail: function (event) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(event);
    },

    getMarketState: function (marketValue) {
      var currentMarket = _.findWhere(this.state.allMarkets, {value: marketValue});

      if(_.isEmpty(currentMarket)) {
        return true;
      } else {
        return currentMarket.launched
      }
    },

    handleEmailInput: function(event){
      this.setState({
        email: event.target.value
      });
    },

    getMarketDisplayName: function () {
      var matchedMarked = MarketStore.getMarket(this.getParams().market);
      if(!_.isUndefined(matchedMarked)){
        return matchedMarked.displayName;
      } else {
        return 'Join CompStak';
      }
    },

    toggleFooter: function (value) {
      this.setState({
        footerVisibility: this.getMarketState(value)
      });
    },

    render: function () {
      return (
        <div className="main_signup">
          <h1 className="signup_main_title">{this.getMarketDisplayName()}</h1>
          <p className="signup_description">Free platform for CRE brokers, appraisers and researchers.</p>
          <a className="signup_landlord_link" href="https://compstak.com">Are you a Landlord, Lendor or Investor?</a>

          <Input 
            text="Email Address" 
            defaultValue={this.state.email} 
            validate={this.validateEmail}
            value={this.state.email}
          /> 

          <Select 
            options={this.state.allMarkets} 
            value={this.state.market} 
            defaultValue={this.state.market} 
            onChange={this.onSelect} 
            searchable={this.props.searchable} 
          />

          <button onClick={this.saveAndContinue}>{this.state.buttonTitle}</button> 

          <AppFooter visibility={this.state.footerVisibility} />   
        </div>
      );
    }
  });

  return MainSignupScreen;
  
});
