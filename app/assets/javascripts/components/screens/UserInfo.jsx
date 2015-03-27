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
  InviteCheck, MobileCheck,

  // components
  Input, AppFooter

) {

  var UserInfoScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck, MobileCheck ],

    componentWillMount: function() {
      this.delayedCallback = _.debounce(function (event) {
         this.checkPromoCode(event)
      }.bind(this), 300);
    },

    getInitialState: function() {
      return {
        mainHeadline: null,
        subHeadline: null,
        promoCodeOpen: false,
        promoCodeAvailable: this.isActive("user_info") ? true : false,
        continueButtonTitle: 'COMPLETE',
        firstName: this.props.inviteValues ? this.props.inviteValues.firstName : null,
        lastName: this.props.inviteValues ? this.props.inviteValues.lastName : null,
        companyName: this.props.inviteValues ? this.props.inviteValues.userInfo : null,
        promoCodeId: null
      }
    },

    isNotEmpty: function(value) {
      if(typeof value === 'string') value = value.trim();
      return value
    },

    isPromoCode: function(value) {
      return this.checkPromoCode();
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
      event.persist();
      this.delayedCallback(event);
    },

    checkPromoCode: function (event) {
      $.ajax({
        url: '/api/promoCodes?name=' + event.target.value,
        type: 'GET',
        success: function(data) {
          this.setState({
            promoCodeId: data.id
          }, function() {
            this.refs.promoCode.isValid();
          }.bind(this))
        }.bind(this),
        error: function (err) {
          this.setState({
            promoCodeId: null
          }, function() {
            this.refs.promoCode.isValid();
          }.bind(this))
        }.bind(this)
      });
    },

    isValidCode: function(value) {
      return this.state.promoCodeId
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

        if(this.isActive("pioneer_info")) {
          this.setState({
            mainHeadline: 'Complete Pioneer Registration',
            subHeadline: 'Congratulations ' + MarketStore.getMarketName(this.props.inviteValues.marketId) + ' Pioneer!'
          });
        } else if(this.isActive("no_pioneer_info")) {
          this.setState({
            mainHeadline: 'Complete Registration',
            subHeadline: 'We will let you know when your market launches.'
          });
        } else {
          this.setState({
            mainHeadline: 'Complete Registration',
            subHeadline: null
          });
        }
      }
    },

    saveAndContinue: function(e) {
      e.preventDefault();
      var canProceed = this.isNotEmpty(this.state.firstName) && this.isNotEmpty(this.state.lastName) && this.isNotEmpty(this.state.companyName);
      
      if(canProceed) {
        // update invite data, wait for success and continue to next screen
        this.props.updateInvite({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userInfo: this.state.companyName,
          promoCodeId: this.state.promoCodeId
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
                validate={this.isNotEmpty}
                value={this.state.firstName}
                onChange={this.handleFirstNameInput} 
                emptyMessage="First name can't be empty"
              /> 

              <Input 
                text="Last Name" 
                ref="lastName"
                defaultValue={this.state.lastName} 
                validate={this.isNotEmpty}
                value={this.state.lastName}
                onChange={this.handleLastNameInput} 
                emptyMessage="Last name can't be empty"
              /> 

              <Input 
                text="Company Name" 
                ref="companyName"
                defaultValue={this.state.companyName} 
                validate={this.isNotEmpty}
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
                  defaultValue={this.state.promoCodeId}
                  validate={this.isValidCode}
                  value={this.state.promoCodeId}
                  onChange={this.handlePromoCodeInput}
                  errorMessage="Promotional code invalid"
                  emptyMessage="Please provide valid promotional code"
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
