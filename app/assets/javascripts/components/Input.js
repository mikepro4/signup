define([

  'react', 'underscore', 'jquery'

], function (

  React, _, $

) { 

  var textInput = React.createClass({

    getInitialState: function(){
      var valid = (this.props.isValid && this.props.isValid()) || true;

      return {
        valid: valid,
        value: null
      };
    },

    handleChange: function(event){
      this.setState({
        value: event.target.value
      });

      this.validateInput(event.target.value);
      this.props.onChange(event);
    },

    validateInput: function (value) {
      if(this.props.validate(value)){
         this.setState({valid:true});
      } else {
         this.setState({valid:false});
      }
    },

    componentWillUpdate: function(nextProps, nextState) {
      if (this.props.validate(nextState.value)) {
        console.log('cool')
      } else {
        console.log('not cool')
      }
    },

    componentWillReceiveProps: function (newProps) {
      if(!_.isUndefined(newProps.value) && newProps.value.length > 0) {
        this.validateInput(newProps.value);
        this.setState({
          value: newProps.value
        })
      }   
    },
    
    render: function(){
      var className = this.state.valid?'':'input-error';

      return(
        <div className="input_group">
          <label className={className}>
            <span className="label_text">{this.props.text}</span>

            <input 
              {...this.props}
              placeholder={this.props.placeholder} 
              className="input input_text" 
              type="text"
              onChange={this.handleChange} 
              defaultValue={this.props.defaultValue} 
              value={this.state.value} 
            />

          </label>
        </div>
      );
    }
  });

  return textInput;
});
