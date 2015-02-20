define([

  // libraries
  'react', 'underscore', 'jquery'
  
], function (

  // libraries
  React, _, $

) { 

  var InputError = React.createClass({

    getInitialState: function(){
      return {
        message: 'Input is invalid'
      };
    },

    render: function(){ 
      var errorClass = this.props.visible ? 'error_container visible' : 'error_container invisible'

      return (
        <div className={errorClass}>
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }

  })

  return InputError;
})