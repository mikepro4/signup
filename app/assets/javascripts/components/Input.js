define([

  // libraries
  'react', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/InputError',
  'jsx!assets/javascripts/components/Icon',
  'jsx!assets/javascripts/components/PasswordValidator'

], function (

  // libraries
  React, _, $,

  // components
  InputError, Icon, PasswordValidator

) { 

  var cx = React.addons.classSet;

  var Input = React.createClass({

    getInitialState: function(){
      var valid = (this.props.isValid && this.props.isValid()) || true;

      return {
        valid: valid,
        empty: _.isEmpty(this.props.value),
        focus: false,
        value: null,
        errorVisible: false,
        errorMessage: this.props.emptyMessage,
        validator: this.props.validator,
        validatorVisible: false,
        type: this.props.type,
        minCharacters: this.props.minCharacters,
        requireCapitals: this.props.requireCapitals,
        requireNumbers: this.props.requireNumbers,
        forbiddenWords: this.props.forbiddenWords
      };
    },

    handleChange: function(event){
      this.setState({
        value: event.target.value,
        empty: _.isEmpty(event.target.value)
      });

      // call input's validation method
      if(this.props.validate) {
        this.validateInput(event.target.value);
      }

      // call onChange method on the parent component for updating it's state
      if(this.props.onChange) {
        this.props.onChange(event);
      }
    },

    validateInput: function (value) {
      // trigger custom validation method in the parent component
      if(this.props.validate && this.props.validate(value)){
        this.setState({
          valid: true,
          errorVisible: false
        });
      } else {
        this.setState({
          valid: false,
          errorMessage: !_.isEmpty(value) ? this.props.errorMessage : this.props.emptyMessage
        });  
      }
    },

    componentWillReceiveProps: function (newProps) {    
      // perform update only when new value exists and not empty  
      if(newProps.value) {
        if(!_.isUndefined(newProps.value) && newProps.value.length > 0) {
          if(this.props.validate) {
            this.validateInput(newProps.value);
          }
          this.setState({
            value: newProps.value,
            empty: _.isEmpty(newProps.value)
          });
        }   
      }
    },

    isValid: function () {
      if(_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true
        });
      }
    },

    handleFocus: function () {
      this.setState({
        focus: true,
        validatorVisible: true
      });
    },

    handleBlur: function () {
      this.setState({
        focus: false,
        errorVisible: !this.state.valid,
        validatorVisible: false
      });
    },

    mouseEnterError: function () {
      this.setState({
        errorVisible: true
      });
    },

    hideError: function () {
      this.setState({
        errorVisible: false,
        alidatorVisible: false
      });
    },
    
    render: function(){

      var inputGroupClasses = cx({
        'input_group':     true,
        'input_valid':     this.state.valid,
        'input_error':     !this.state.valid,
        'input_empty':     this.state.empty,
        'input_hasValue':  !this.state.empty,
        'input_focused':   this.state.focus,
        'input_unfocused': !this.state.focus
      });

      var validation

      if(this.state.validator) {
        validation = 
          <PasswordValidator
            visible={this.state.validatorVisible}
            name={this.props.text}
            value={this.state.value}
            minCharacters={this.props.minCharacters}
            requireCapitals={this.props.requireCapitals}
            requireNumbers={this.props.requireNumbers}
            forbiddenWords={this.props.forbiddenWords}
          />
      } else {
        validation = 
          <div className="validationIcons">
            <i className="input_error_icon" onMouseEnter={this.mouseEnterError}> <Icon type="circle_error"/> </i>
            <i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
          </div>
      }

      return (
        <div className={inputGroupClasses}>

          <label className="input_label" htmlFor={this.props.text}>
            <span className="label_text">{this.props.text}</span>
          </label>

          <input 
            {...this.props}
            placeholder={this.props.placeholder} 
            className="input" 
            id={this.props.text}
            defaultValue={this.props.defaultValue} 
            value={this.state.value} 
            onChange={this.handleChange} 
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoComplete="off"
          />

          <InputError 
            visible={this.state.errorVisible} 
            errorMessage={this.state.errorMessage} 
          />

          {validation}

        </div>
      );
    }
  });

  return Input;
});
