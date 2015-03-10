define([

  // libraries
  'react', 'react-router', 'underscore'

], function (

  // libraries
  React, Router, _

) {

  var PioneerComplete = React.createClass({

    mixins: [ Router.State ],

    componentDidMount: function () {
      this.props.clearData();
    },

    render: function() {
      return (
        <div>
          PioneerComplete
        </div>
      )
      
    }
  });

  return PioneerComplete;

});
