define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!assets/javascripts/components/Input',
  'jsx!assets/javascripts/components/AppFooter'

], function (

  // libraries
  React, Router, _,

  // components
  Input, AppFooter

) {

  var UserInfoScreen = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function () {
      return {
        userType: 'user',
        market: null,
        mainHeadline: 'COMPLETE REGISTRATION',
        subHeadline: null,
        footerVisible: false,
        promoCodeOpen: false,
        continueButtonTitle: 'CONTINUE',
        firstName: null,
        lastName: null,
        companyName: null,
        promoCode: null
      }
    },

    isEmpty: function (value) {
      return !_.isEmpty(value);
    },

    handleFirstNameInput: function (event) {
      this.setState({
        firstName: event.target.value
      });
    },

    handleLastNameInput: function (event) {
      this.setState({
        lastName: event.target.value
      });
    },

    handleCompanyNameInput: function (event) {
      this.setState({
        companyName: event.target.value
      });
    },

    handlePromoCodeInput: function (event) {
      this.setState({
        promoCode: event.target.value
      });
    },

    saveAndContinue: function() {
      console.log("First Name: " + this.state.firstName);
      console.log("Last Name: " + this.state.lastName);
      console.log("Company Name: " + this.state.companyName);
      console.log("Promo Code: " + this.state.promoCode);
    },

    render: function() {
      var footerVisibilityClass = this.state.footerVisible ? 'footer_visible' : 'footer_invisible';
      var userInfoClass = "user_info_screen " + footerVisibilityClass;

      return (
        <div className={userInfoClass}>
          <h1>{this.state.mainHeadline}</h1>
          <p>{this.state.subHeadline}</p>

          <form>

            <Input 
              text="First Name" 
              ref="firstName"
              defaultValue={this.state.firstName} 
              validate={this.isEmpty}
              value={this.state.firstName}
              onChange={this.handleFirstNameInput} 
            /> 

            <Input 
              text="Last Name" 
              ref="lastName"
              defaultValue={this.state.lastName} 
              validate={this.isEmpty}
              value={this.state.lastName}
              onChange={this.handleLastNameInput} 
            /> 

            <Input 
              text="Company Name" 
              ref="companyName"
              defaultValue={this.state.companyName} 
              validate={this.isEmpty}
              value={this.state.companyName}
              onChange={this.handleCompanyNameInput} 
            /> 

            <div className="promocode_container">
              <a className="promocode_show">Have promotional code?</a>
              <Input 
                text="Promotional Code" 
                ref="promoCode"
                defaultValue={this.state.promoCode} 
                validate={this.isEmpty}
                value={this.state.promoCode}
                onChange={this.handlePromoCodeInput} 
              /> 
            </div>

            <button type="button" className="button button_wide user_info_continue" onClick={this.saveAndContinue}>
             {this.state.continueButtonTitle}
            </button> 

          </form>

          <AppFooter visibility={this.state.footerVisible} /> 
        </div>
      )    
    }
  });

  return UserInfoScreen;

});
