define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'assets/javascripts/stores/MarketStore',

  // components
  'jsx!assets/javascripts/components/Input',
  'jsx!assets/javascripts/components/Select',
  'jsx!assets/javascripts/components/AppFooter',
  'jsx!assets/javascripts/components/MarketInfo'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // compomnents
  Input, Select, AppFooter, MarketInfo

) { 

  var MainSignupScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation, React.addons.LinkedStateMixin ],

    getInitialState: function(){
      return _.extend(
        this.getInputParams(), 
        {
          buttonTitle: 'JOIN COMPSTAK',
          allMarkets: MarketStore.getMarkets(),
          footerVisibility: false,
          launchingSoon: false
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
      this.selectMarketFromParams();
    },

    componentDidMount: function () {
      MarketStore.addChangeListener(this.updateMarkets);

      this.setState({
        allMarkets: MarketStore.getMarkets()
      })
    },

    componentWillUnmount: function () {
      MarketStore.removeChangeListener(this.updateMarkets);
    },

    updateMarkets: function () {
      this.setState({
        allMarkets: MarketStore.getMarkets()
      });
      this.selectMarketFromParams();
      this.toggleUI(this.state.market);
    }, 

    componentWillReceiveProps: function (newProps, newState) {

      // update email from url if not undefined
      if(this.getParams().email) {
        this.setState({
          email: this.getParams().email
        })
      }
      
      this.selectMarketFromParams();
      this.toggleUI(this.getParams().market);
    },

    onSelect: function (selectedMarket) {
      this.transitionTo('/' + selectedMarket);
      this.toggleUI(selectedMarket);
    },

    selectMarketFromParams: function () {
      var matchedMarket = MarketStore.getMarket(this.getParams().market);

      // check if market from url params matched any of the markets
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
      var marketLaunched = this.getMarketState(value);

      if(marketLaunched) {
         var continueButtonTitle = 'JOIN COMPSTAK';
      } else {
         var continueButtonTitle = 'JOIN EARLY';
      }

      this.setState({
        buttonTitle: continueButtonTitle
      })
    },

    toggleUI: function (value) {
      this.setState({
        footerVisibility: this.getMarketState(value),
        launchingSoon: !this.getMarketState(value)
      });
      this.selectContinueButtonTitle(value);
    },

    getMarketState: function (marketValue) {
      var currentMarket = MarketStore.getMarket(marketValue);

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

    validateEmail: function (event) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(event);
    },

    saveAndContinue: function() {
      console.log("EMail: " + this.state.email);
      console.log("Password: " + this.state.market);
      alert(this.state.email + ' ' + this.state.market);
    },

    render: function () {
      var footerVisibilityClass = this.state.footerVisibility ? 'footer_visible' : 'footer_invisible';
      var minSignupClass = "main_signup_screen " + footerVisibilityClass;

      return (
        <div className={minSignupClass}>

          <div className="main_singup_form">
          
            <MarketInfo markets={this.state.AllMarkets} visibility={this.state.launchingSoon} market={this.state.market} />

            <p className="signup_description">Free platform for CRE brokers, appraisers and researchers.</p>
            <a className="signup_landlord_link" href="https://compstak.com">Are you a Landlord, Lendor or Investor?</a>

            <form>

              <Input 
                text="Email Address" 
                ref="email"
                defaultValue={this.state.email} 
                validate={this.validateEmail}
                value={this.state.email}
                onChange={this.handleEmailInput} 
              /> 

              <Select 
                options={this.state.allMarkets} 
                value={this.state.market} 
                defaultValue={this.state.market} 
                onChange={this.onSelect} 
                searchable={this.props.searchable} 
                placeholder="Choose Your Market"
              />

              <button type="button" className="button button_wide signup_start" onClick={this.saveAndContinue}>{this.state.buttonTitle}</button> 

            </form>

          </div>

          <AppFooter visibility={this.state.footerVisibility} />   
        </div>
      );
    }
  });

  return MainSignupScreen;
  
});