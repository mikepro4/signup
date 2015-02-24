define([

  // libraries
  'react', 'underscore', 'jquery'
  
], function (

  // libraries
  React, _, $

) { 

  var cx = React.addons.classSet;

  var InputError = React.createClass({

    getInitialState: function(){
      return {
        message: 'Input is invalid'
      };
    },

    render: function(){ 
      var errorClass = cx({
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