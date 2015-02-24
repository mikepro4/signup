define([

  'react', 'react-router', 'jquery',

  // components
  'jsx!components/Icon',

], function (

  React, Router, $,

  Icon

) { 

  var cx = React.addons.classSet;
  
  var AppFooter = React.createClass({

    mixins: [ Router.State ],

    render: function () {
      var footerClass = cx({
        'application_footer':   true,
        'hidden':               !this.props.visible
      });

      return (
        <footer className={footerClass}>
          
          <ul className="compstak_description">
            <li className="single_point">
              <i className="point_icon"> <Icon type="circle_dollar"/> </i>
              <h2>100% Free</h2>
              <p>Free forever. We will never ask for your credit card.</p>
            </li>

            <li className="single_point">
              <i className="point_icon"> <Icon type="circle_user"/>  </i>
              <h2>Anonymous</h2>
              <p>We will always hide and protect your identity</p>
            </li>

            <li className="single_point">
              <i className="point_icon"> <Icon type="circle_asterisk"/> </i>
              <h2>Accurate</h2>
              <p>Data is verified by a market dedicated analyst. </p>
            </li>
          </ul>

        </footer>
      );
    }
  });

  return AppFooter;
});
