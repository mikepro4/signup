define([

  // libraries
  'react', 'underscore', 'jquery',

  // components
  'jsx!assets/javascripts/components/InputError'

], function (

  // libraries
  React, _, $,

  // components
  InputError

) { 

  var InputError = React.createClass({

    getInitialState: function(){
      return {
        message: 'Input is invalid'
      };
    },

    componentDidUpdate: function (newProps) {
      this.toggleClassName()
    },

    toggleClassName: function () {
      if(this.props.visible) {
        return "error_container visible"
      } else {
         return "error_container invisible"
      }
    },

    render: function(){ 
      return (
        <div className={this.toggleClassName()}>
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }

  })

  return InputError
})