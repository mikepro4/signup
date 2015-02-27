define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!components/Input',

  // stores
  'stores/AccountStore',

], function (

  // libraries
  React, Router, _,

  // components
  Input,

  // stores
  AccountStore

) {

  var CreateAccountScreen = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function () {
      return {
        forbiddenWords: ["password", "user", "username"],
        password: null,
        confirmPassword: null,
        termsOfUse: null
      }
    },

    handlePasswordInput: function (event) {
      if(!_.isEmpty(this.state.confirmPassword)){
        this.refs.passwordConfirm.isValid();
      }
      this.refs.passwordConfirm.hideError();
      this.setState({
        password: event.target.value
      });
    },

    handleConfirmPasswordInput: function (event) {
      this.setState({
        confirmPassword: event.target.value
      });
    },

    handleTermsCheckbox: function (event) {
      this.setState({
        termsOfUse: this.refs.termsOfUse.getDOMNode().checked
      })
    },

    saveAndContinue: function (e) {
      e.preventDefault();

      if(this.refs.password.getValidStatus() 
          && this.refs.password.getValidStatus()
          && this.state.termsOfUse) {

        var data = {
          registrationToken: this.getParams().token,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          termsOfUse: this.state.termsOfUse,
          madeNoMarket: false
        }

        AccountStore.createAccount(data)
          .done(function (data) {
            console.log('good')
          })
          .error(function (data) {
            console.log('bad')
          })
      }
    },

    isConfirmedPassword: function (event) {
      return (event == this.state.password)
    },

    render: function() {
      return (
        <div className="create_account_screen">

          <div className="create_account_form">
            <h1>Create Account</h1>
            <p>Good news! You’ve been approved. Please create your account.</p>
            <form onSubmit={this.saveAndContinue}>
              <Input 
                text="Password" 
                type="password"
                ref="password"
                validator="true"
                minCharacters="8"
                requireCapitals="1"
                requireNumbers="1"
                forbiddenWords={this.state.forbiddenWords}
                value={this.state.passsword}
                emptyMessage="Password is invalid"
                onChange={this.handlePasswordInput} 
              /> 

              <Input 
                text="Confirm password" 
                ref="passwordConfirm"
                type="password"
                validate={this.isConfirmedPassword}
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPasswordInput} 
                emptyMessage="Please confirm your password"
                errorMessage="Passwords don't match"
              /> 

              <div className="checkbox_group">
                <input 
                  type="checkbox" 
                  ref="termsOfUse" 
                  name="terms_of_use" 
                  id="terms_of_use" 
                  onChange={this.handleTermsCheckbox} 
                  className="checkbox checkbox_minimal"
                />
                <label htmlFor="terms_of_use"/>
                <span>I agree to the <a href="#">terms of use</a></span>
              </div>

              <button 
                type="submit" 
                className="button button_wide"
                onClick={this.saveAndContinue}>
                CREATE ACCOUNT
              </button>

            </form>
          </div>

        </div>
      )
      
    }
  });

  return CreateAccountScreen;

});
