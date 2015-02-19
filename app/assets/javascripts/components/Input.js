define([

  // libraries
  'react', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/InputError',

], function (

  // libraries
  React, _, $,

  // components
  InputError

) { 

  var textInput = React.createClass({

    getInitialState: function(){
      var valid = (this.props.isValid && this.props.isValid()) || true;

      return {
        valid: valid,
        empty: _.isEmpty(this.props.value),
        focus: false,
        value: null,
        errorVisible: false,
        errorMessage: this.props.emptyMessage
      };
    },

    handleChange: function(event){
      this.setState({
        value: event.target.value,
        empty: _.isEmpty(event.target.value)
      });

      if(this.props.validate) {
        this.validateInput(event.target.value);
      }

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

        // check if input is empty to set empty or error message
        if(!_.isEmpty(value)) {
          this.setState({
            valid:false,
            errorMessage: this.props.errorMessage
          });  
        } else {
          this.setState({
            valid:false,
            errorMessage: this.props.emptyMessage
          });  
        }
      }
    },

    componentWillReceiveProps: function (newProps) {      
      if(newProps.value) {
        if(!_.isUndefined(newProps.value) && newProps.value.length > 0) {
          if(this.props.validate) {
            this.validateInput(newProps.value);
          }
          this.setState({
            value: newProps.value,
            empty: _.isEmpty(newProps.value)
          })
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
        focus: true
      });
    },

    handleBlur: function () {
      this.setState({
        focus: false,
        errorVisible: !this.state.valid
      });
    },

    mouseEnterError: function () {
      this.setState({
        errorVisible: true
      });
    },
    
    render: function(){
      var validClass = this.state.valid ? 'input_valid' : 'input_error';
      var hasValueClass = this.state.empty ? 'input_empty' : 'input_hasValue';
      var focusClass = this.state.focus ? 'input_focused' : 'input_unfocused';
      var inputGroupClass = 'input_group ' + hasValueClass + ' ' + focusClass + ' ' + validClass;

      return(
        <div className={inputGroupClass}>

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

          <i className="input_error_icon" onMouseEnter={this.mouseEnterError}>
            <svg viewBox="0 0 20 20">
            <path d="M10,0.982c4.973,0,9.018,4.046,9.018,9.018S14.973,19.018,10,19.018S0.982,14.973,0.982,10
              S5.027,0.982,10,0.982 M10,0C4.477,0,0,4.477,0,10c0,5.523,4.477,10,10,10s10-4.477,10-10C20,4.477,15.523,0,10,0L10,0z M9,5.703
              V5.441h2.5v0.262l-0.66,5.779H9.66L9,5.703z M9.44,12.951h1.621v1.491H9.44V12.951z"/>
            </svg>
          </i>

          <i className="input_valid_icon">
            <svg viewBox="0 0 23 23">
            <path d="M11.5,23C5.2,23,0,17.8,0,11.5S5.2,0,11.5,0S23,5.2,23,11.5S17.8,23,11.5,23z M11.5,1C5.7,1,1,5.7,1,11.5S5.7,22,11.5,22
              S22,17.3,22,11.5S17.3,1,11.5,1z M10.4,15.2l6.7-7c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0L10,14.2L7,11
              c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7l3.4,3.5c0.1,0.1,0.2,0.1,0.3,0.1S10.3,15.3,10.4,15.2z"/>
            </svg>
          </i>

          <InputError 
            visible={this.state.errorVisible} 
            errorMessage={this.state.errorMessage} 
          />

        </div>
      );
    }
  });

  return textInput;
});
