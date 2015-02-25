define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!components/Input'

], function (

  // libraries
  React, Router, _,

  // components
  Input

) {

  var CreateAccountScreen = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function () {
      return {
        forbiddenWords: ["password", "user", "username"],
        passsword: null,
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

    saveAndContinue: function (e) {
      e.preventDefault();
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
                  value={this.state.termsOfUse} 
                  className="checkbox checkbox_minimal"
                />
                <label htmlFor="terms_of_use"/>
                <span>I agree to the <a href="#">terms of use</a></span>
              </div>

              <button 
                type="submit" 
                className="button button_wide">
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
