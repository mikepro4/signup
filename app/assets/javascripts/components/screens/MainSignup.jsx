define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'stores/MarketStore',

  // components
  'jsx!components/Input',
  'jsx!components/Select',
  'jsx!components/MarketInfo',

  // flux
  'actions/AppActions'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // compomnents
  Input, Select, MarketInfo,

  // flux
  Actions

) { 

  var cx = React.addons.classSet;

  var MainSignupScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
      return {
        email: this.getParams().email,
        market: this.getParams().market,
        marketId: null,
        buttonTitle: 'JOIN COMPSTAK',
        launchingSoon: false
      }
    },

    componentWillMount: function () {
      if(this.getParams().market) {
        this.toggleUI(this.getParams().market);
      }
    },

    componentWillReceiveProps: function (newProps) {
      // update email from url if not undefined
      if(this.getParams().email) {
        this.setState({
          email: this.getParams().email 
        });
      }
      
      this.selectMarketFromParams();
      this.toggleUI(this.getParams().market);
    },

    selectMarketFromParams: function () {
      var matchedMarket = MarketStore.getMarketByName(this.getParams().market);
      this.setState({
        market: !_.isEmpty(matchedMarket) ? this.getParams().market : null
      });
    },

    toggleUI: function (value) {
      var marketLaunched = MarketStore.getMarketState(value);
      this.setState({
        launchingSoon: !marketLaunched,
        buttonTitle: marketLaunched ? 'JOIN COMPSTAK' : 'JOIN EARLY'
      });
    },

    onSelect: function (selectedMarket) {
      this.transitionTo('/' + encodeURIComponent(selectedMarket));
      this.toggleUI(selectedMarket);
    },

    handleEmailInput: function(event){
      this.setState({
        email: event.target.value
      });

      // reset router params if manually typing email
      if(this.getParams().email) {
        this.replaceWith('/' +  this.state.market);
      }
    },

    validateEmail: function (event) {
      // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(event);
    },

    saveAndContinue: function(e) {
      e.preventDefault();
      var canProceed = !_.isEmpty(this.state.email) && this.validateEmail(this.state.email) && !_.isEmpty(this.state.market);

      if(canProceed) {
        // update invite data, wait for success and continue to next screen
        this.props.updateInvite({
          email: this.state.email.trim(),
          market: this.state.market.trim(),
          marketId: MarketStore.getMarketId(this.state.market)
        });
      } else {
        // trigger validation and show errors
        this.refs.email.isValid();
        this.refs.market.isValid();
      }
    },

    render: function () {
      return (
        <div className={cx({
          'main_signup_screen': true,
          'loading': this.props.loading
          })}>

          <div className="main_singup_form">

            <div className="throbber throbber_large"></div>

            <MarketInfo 
              markets={this.state.AllMarkets} 
              visibility={this.state.launchingSoon} 
              market={this.state.market} 
            />

            <p className="signup_description">Free platform for CRE brokers, appraisers and researchers.</p>

            <a className="signup_landlord_link" href="http://compstak.com/landing/pageSplitProNew" target="_blank">
              Are you a Landlord, Lendor or Investor?
            </a>

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
                options={this.props.allMarkets} 
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
                className="button button_wide">
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
