define([

  'react', 'underscore', 'jquery'

], function (

  React, _, $

) { 
  var Button = React.createClass({
    
    render: function (classes) {

      var Component = this.props.componentClass || 'a';
      var href = this.props.href || '#';

      return (
        <Component
          {...this.props}
          href={href}
          className={this.props.className}
          role="button">
          {this.props.children}
        </Component>
      );
    }
  });

  return Button;
});
