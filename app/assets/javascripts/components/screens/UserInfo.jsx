define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'stores/MarketStore',

  // mixins,
  'jsx!mixins/InviteCheck',
  'jsx!mixins/MobileCheck',

  // components
  'jsx!components/Input',
  'jsx!components/AppFooter',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // mixins
  MobileCheck, InviteCheck,

  // components
  Input, AppFooter

) {

  var UserInfoScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck, MobileCheck ],

    getInitialState: function() {
      return {
        mainHeadline: null,
        subHeadline: null,
        promoCodeOpen: false,
        promoCodeAvailable: false,
        continueButtonTitle: 'COMPLETE',
        firstName: this.props.inviteValues ? this.props.inviteValues.firstName : null,
        lastName: this.props.inviteValues ? this.props.inviteValues.lastName : null,
        companyName: this.props.inviteValues ? this.props.inviteValues.userInfo : null,
        promotionalCode: this.props.inviteValues ? this.props.inviteValues.promotionalCode : null
      }
    },

    isEmpty: function(value) {
      return !_.isEmpty(value.trim());
    },

    handleFirstNameInput: function(event) {
      this.setState({
        firstName: event.target.value
      });
    },

    handleLastNameInput: function(event) {
      this.setState({
        lastName: event.target.value
      });
    },

    handleCompanyNameInput: function(event) {
      this.setState({
        companyName: event.target.value
      });
    },

    handlePromoCodeInput: function(event) {
      this.setState({
        promotionalCode: event.target.value
      });
    },

    togglePromoCode: function() {
      this.setState({
        promoCodeOpen: true
      })
    },

    componentDidMount: function() {
      if(this.isMounted()) {

        if(!this.checkMobile()) {
          this.refs.firstName.focus();
        }

        if(this.props.inviteValues) {
          var marketName = MarketStore.getMarketName(this.props.inviteValues.marketId);
        }

        if(this.getQuery().pioneer) {
          if(this.getQuery().upload) {
            this.setState({
              mainHeadline: 'Complete Pioneer Registration',
              subHeadline: 'Congratulations ' + marketName + ' Pioneer!',
              promoCodeAvailable: false
            })
          } else {
            this.setState({
              mainHeadline: 'Complete Registration',
              subHeadline: 'We will let you know when your market launches.',
              promoCodeAvailable: false
            })
          }
        } else {
          this.setState({
            mainHeadline: 'Complete Registration',
            subHeadline: null,
            promoCodeAvailable: true
          })
        }
      }
    },

    saveAndContinue: function(e) {
      e.preventDefault();
      var canProceed = !_.isEmpty(this.state.firstName) && !_.isEmpty(this.state.lastName) && !_.isEmpty(this.state.companyName);
      
      if(canProceed) {
        // update invite data, wait for success and continue to next screen
        this.props.updateInvite({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userInfo: this.state.companyName
        });
      } else {
        // trigger validation and show errors
        this.refs.firstName.isValid();
        this.refs.lastName.isValid();
        this.refs.companyName.isValid();
      }
    },

    render: function() {
      return (
        <div className={classNames({
          'user_info_screen': true,
          'loading': this.props.loading
        })}>

          <div className={classNames({
            'user_info_form': true,
            'footer_visible': this.props.footerVisible
          })}>

            <div className="throbber throbber_large"></div>
            <h1>{this.state.mainHeadline}</h1>
            <p className={classNames({
              'hidden': !this.state.subHeadline
            })}>
              {this.state.subHeadline}
            </p>

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

              <div className={classNames({
                'promocode_container': true,
                'promo_visible': this.state.promoCodeOpen,
                'hidden': !this.state.promoCodeAvailable
              })}>
                <a className="promocode_show" onClick={this.togglePromoCode}>
                  Have promotional code?
                </a>
                <Input 
                  text="Promotional Code" 
                  ref="promoCode"
                  defaultValue={this.state.promotionalCode} 
                  value={this.state.promotionalCode}
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
