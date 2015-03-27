define([

  // libraries
  'react', 'underscore', 'jquery',

  // utils
  'classNames'
  
], function (

  // libraries
  React, _, $

) { 

  var InputError = React.createClass({

    getInitialState: function() {
      return {
        message: 'Input is invalid'
      };
    },

    render: function() { 
      var errorClass = classNames({
        'error_container':   true,
        'visible':           this.props.visible,
        'invisible':         !this.props.visible
      });

      return (
        <div className={errorClass}>
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }

  })

  return InputError;
})