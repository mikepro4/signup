define([

  'react', 'react-router', 'jquery',

  // icons
  'jsx!assets/javascripts/components/Icon',

], function (

  React, Router, $,

  Icon

) { 
  
  var AppFooter = React.createClass({

    mixins: [ Router.State ],

    render: function () {
      var footerClass = this.props.visible ? "application_footer" : "application_footer hidden"

      return (
        <footer className={footerClass}>
          
          <ul className="compstak_description">
            <li className="single_point">
              <i className="point_icon">
                <svg viewBox="0 0 40 40">
                <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M24.5,14.8
                  c-1-0.8-2.1-1.2-3.5-1.4v-1.1h-1.6v1.1c-2.3,0.2-3.9,1.5-3.9,3.5v0c0,2.1,1.3,3.1,4,3.8v3.6c-1.2-0.2-2.2-0.8-3.3-1.6L15,24.3
                  c1.2,1,2.8,1.6,4.4,1.8V28H21v-1.8c2.3-0.2,3.9-1.6,3.9-3.6v0c0-2-1.2-3.1-4-3.8v-3.5c0.9,0.2,1.7,0.6,2.5,1.2L24.5,14.8z
                   M17.7,16.7L17.7,16.7c0-0.8,0.6-1.4,1.8-1.5v3.2C18,18,17.7,17.5,17.7,16.7z M22.8,22.7L22.8,22.7c0,0.9-0.6,1.5-1.8,1.6V21
                  C22.4,21.4,22.8,21.9,22.8,22.7z"/>
                </svg>
              </i>
              <h2>100% Free</h2>
              <p>Free forever. We will never ask for your credit card.</p>
            </li>

            <li className="single_point">
              <i className="point_icon">
                <svg viewBox="0 0 40 40">
                <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M16.4,16.8
                  c0,2,1.7,3.7,3.7,3.7s3.7-1.7,3.7-3.7s-1.7-3.7-3.7-3.7S16.4,14.8,16.4,16.8z M27.1,27.1c-0.8-3.1-3.6-5.5-7-5.5s-6.2,2.3-7,5.5
                  H27.1z"/>
                </svg>
              </i>
              <h2>Anonymous</h2>
              <p>We will always hide and protect your identity</p>
            </li>

            <li className="single_point">
              <i className="point_icon">
                <svg viewBox="0 0 40 40">
                <path fill="#50B67F" d="M20.1,0c11.1,0,20.1,9,20.1,20.1s-9,20.1-20.1,20.1S0,31.2,0,20.1S9,0,20.1,0z M18.7,27.4h2.5l-0.5-6l5,3.5
                  l1.3-2.3l-5.6-2.5l5.6-2.6l-1.3-2.2l-5,3.5l0.5-6h-2.5l0.5,6l-5-3.5l-1.3,2.2l5.6,2.6l-5.6,2.5l1.3,2.3l5-3.5L18.7,27.4z"/>
                </svg>
              </i>
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
