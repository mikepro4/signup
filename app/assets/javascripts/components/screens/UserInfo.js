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
        userType: this.props.signUpValues.userType,
        market: this.props.signUpValues.market,
        mainHeadline: 'Complete Registration',
        subHeadline: null,
        promoCodeOpen: false,
        continueButtonTitle: 'CONTINUE',
        firstName: this.props.signUpValues.firstName,
        lastName: this.props.signUpValues.lastName,
        companyName: this.props.signUpValues.companyName,
        promoCode: this.props.signUpValues.promoCode
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

    togglePromoCode: function () {
      this.setState({
        promoCodeOpen: true
      })
    },

    saveAndContinue: function(e) {
      e.preventDefault();
      var canProceed = !_.isEmpty(this.state.firstName) && !_.isEmpty(this.state.lastName) && !_.isEmpty(this.state.companyName);

      if(canProceed) {
        var data = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          companyName: this.state.companyName,
          promoCode: this.state.promoCode
        }

        this.props.saveValues(data)
        this.props.nextScreen()

      } else {
        this.refs.firstName.isValid();
        this.refs.lastName.isValid();
        this.refs.companyName.isValid();
      }
    },

    render: function() {
      var promoClass = this.state.promoCodeOpen ? 'promocode_container promo_visible' : 'promocode_container';

      return (
        <div className="user_info_screen">

          <div className="user_info_form">
            <h1>{this.state.mainHeadline}</h1>
            <p>{this.state.subHeadline}</p>

            <form onSubmit={this.saveAndContinue}>

              <Input 
                text="First Name" 
                ref="firstName"
                defaultValue={this.state.firstName} 
                validate={this.isEmpty}
                value={this.state.firstName}
                onChange={this.handleFirstNameInput} 
                emptyMessage="First name can't be empty"
              /> 

              <Input 
                text="Last Name" 
                ref="lastName"
                defaultValue={this.state.lastName} 
                validate={this.isEmpty}
                value={this.state.lastName}
                onChange={this.handleLastNameInput} 
                emptyMessage="Last name can't be empty"
              /> 

              <Input 
                text="Company Name" 
                ref="companyName"
                defaultValue={this.state.companyName} 
                validate={this.isEmpty}
                value={this.state.companyName}
                onChange={this.handleCompanyNameInput} 
                emptyMessage="Company name can't be empty"
              /> 

              <div className={promoClass}>
                <a className="promocode_show" onClick={this.togglePromoCode}>
                  Have promotional code?
                </a>
                <Input 
                  text="Promotional Code" 
                  ref="promoCode"
                  defaultValue={this.state.promoCode} 
                  value={this.state.promoCode}
                  onChange={this.handlePromoCodeInput} 
                /> 
              </div>

              <button 
                type="submit" 
                className="button button_wide">
                {this.state.continueButtonTitle}
              </button> 

            </form>
          </div>

        </div>
      )    
    }
  });

  return UserInfoScreen;

});
