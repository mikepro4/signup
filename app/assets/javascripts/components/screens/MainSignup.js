define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'assets/javascripts/stores/MarketStore',

  // components
  'jsx!assets/javascripts/components/Input',
  'jsx!assets/javascripts/components/Select',
  'jsx!assets/javascripts/components/MarketInfo'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // compomnents
  Input, Select, MarketInfo

) { 

  var MainSignupScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
      return {
        email: this.getParams().email,
        market: this.getParams().market,
        buttonTitle: 'JOIN COMPSTAK',
        allMarkets: MarketStore.getMarkets(),
        launchingSoon: false
      }
    },

    componentWillMount: function () {
      MarketStore.init();
      this.selectMarketFromParams();
    },

    componentDidMount: function () {
      MarketStore.addChangeListener(this.updateMarkets);
    },

    componentWillUnmount: function () {
      MarketStore.removeChangeListener(this.updateMarkets);
    },

    updateMarkets: function () {
      this.setState({
        allMarkets: MarketStore.getMarkets()
      });
      this.selectMarketFromParams();
    }, 

    componentWillReceiveProps: function () {

      // update email from url if not undefined
      if(this.getParams().email) {
        this.setState({
          email: this.getParams().email
        })
      }
      
      this.selectMarketFromParams();
    },

    onSelect: function (selectedMarket) {
      this.transitionTo('/' + selectedMarket);
      this.toggleUI(selectedMarket);
    },

    selectMarketFromParams: function () {
      var matchedMarket = MarketStore.getMarket(this.getParams().market);
      this.setState({
        market: !_.isEmpty(matchedMarket) ? this.getParams().market : null
      })
      this.toggleUI(this.getParams().market);
    },

    toggleUI: function (value) {
      var marketLaunched = MarketStore.getMarketState(value);
      this.setState({
        launchingSoon: !marketLaunched,
        buttonTitle: marketLaunched ? 'JOIN COMPSTAK' : 'JOIN EARLY'
      });
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

    saveAndContinue: function(e) {
      e.preventDefault();
      var canProceed = !_.isEmpty(this.state.email) && this.validateEmail(this.state.email) && !_.isEmpty(this.state.market);

      if(canProceed) {
        var data = {
          email: this.state.email,
          market: this.state.market,
          userType: MarketStore.getMarketState(this.state.market) ? "user" : "pioneer"
        }

        this.props.saveValues(data)
        this.props.nextScreen()

      } else {
        this.refs.email.isValid();
        this.refs.market.isValid();
      }
    },

    render: function () {
      return (
        <div className="main_signup_screen">

          <div className="main_singup_form">
          
            <MarketInfo markets={this.state.AllMarkets} visibility={this.state.launchingSoon} market={this.state.market} />

            <p className="signup_description">Free platform for CRE brokers, appraisers and researchers.</p>
            <a className="signup_landlord_link" href="https://compstak.com">Are you a Landlord, Lendor or Investor?</a>

            <form onSubmit={this.saveAndContinue}>

              <Input 
                text="Email Address" 
                ref="email"
                type="text"
                defaultValue={this.state.email} 
                validate={this.validateEmail}
                value={this.state.email}
                onChange={this.handleEmailInput} 
                errorMessage="Email is invalid"
                emptyMessage="Email can't be empty"
                errorVisible={this.state.showEmailError}
              /> 

              <Select 
                ref="market"
                options={this.state.allMarkets} 
                value={this.state.market} 
                defaultValue={this.state.market} 
                onChange={this.onSelect} 
                searchable={this.props.searchable} 
                placeholder="Choose Your Market"
                placeholderTitle="Your Market"
                errorMessage="Market can't be empty"
                errorVisible={this.state.showMarketError}
              />

              <button 
                type="submit" 
                className="button button_wide signup_start">
                {this.state.buttonTitle}
              </button> 

            </form>

          </div>

        </div>
      );
    }
  });

  return MainSignupScreen;
  
});
