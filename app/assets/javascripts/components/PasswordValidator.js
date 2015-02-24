define([

  // libraries
  'react', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/Icon'
  
], function (

  // libraries
  React, _, $,

  // components
  Icon

) { 

  var cx = React.addons.classSet;

  var PasswordValidator = React.createClass({

    getInitialState: function(){
      return {
        value: null,
        minCharacters: this.props.minCharacters,
        requireCapitals: this.props.requireCapitals,
        requireNumbers: this.props.requireNumbers,
        forbiddenWords: this.props.forbiddenWords,
        name: this.props.name
      };
    },

    countCapitals: function(value) {
      var str = value;
      return str.replace(/[^A-Z]/g, "").length;
    },

    countNumbers: function(value) {
      return myValue = /\d+/.exec(value)
    },

    checkWords: function(value) {
      return  _.some(this.state.forbiddenWords, function (word) {
        var matched = (word === value) ? true : "";
        return matched
      })
    },

    render: function(){ 
      var validatorClass = cx({
        'password_validator':   true,
        'visible':              this.props.visible,
        'invisible':            !this.props.visible
      });

      var forbiddenWords = this.state.forbiddenWords.map(function (word) {
        return (
          <span className="bad_word">
            "{word}"
          </span>
        )
      })

      var minChars = !_.isEmpty(this.props.value) ? this.props.value.length > parseInt(this.state.minCharacters): false;
      var capitalLetters = !_.isEmpty(this.props.value) ? this.countCapitals(this.props.value): false;
      var numbers = !_.isEmpty(this.props.value) ? this.countNumbers(this.props.value) > 0 : false;
      var words = !_.isEmpty(this.props.value) ? !this.checkWords(this.props.value) : false;

      var validatorTitle;
      if(minChars && capitalLetters && numbers && words) {
        validatorTitle = 
          <h4 className="validator_title valid">
            {this.props.name} IS OK
          </h4>
      } else {
        validatorTitle = 
          <h4 className="validator_title invalid">
            {this.props.name} RULES
          </h4>
      }

      return (
        <div className={validatorClass}>
          <div className="validator_container">

            {validatorTitle}

            <ul className="rules_list">
          
              <li className={cx({'valid': minChars})}> 
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span className="error_message">{this.state.minCharacters} characters minimum</span>
              </li>

              <li className={cx({'valid': capitalLetters})}> 
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span className="error_message">Contains at least {this.state.requireCapitals} capital letter</span>
              </li>

              <li className={cx({'valid': numbers})}> 
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span className="error_message">Contains at least {this.state.requireNumbers} number</span>
              </li>

              <li className={cx({'valid': words})}> 
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span className="error_message">Can't be {forbiddenWords}</span>
              </li>

            </ul>
          </div>
        </div>
      )
    }
  })

  return PasswordValidator;
})