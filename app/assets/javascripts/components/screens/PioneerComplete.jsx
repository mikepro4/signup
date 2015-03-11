define([

  // libraries
  'react', 'react-router', 'underscore',

  // mixins,
  'jsx!mixins/InviteCheck',

  // components
  'jsx!components/Icon',

  // utils
  'classNames'

], function (

  // libraries
  React, Router, _,

  // mixins
  InviteCheck,

  // components
  Icon

) {

  var PioneerComplete = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    componentDidMount: function() {
      this.props.syncData();
    },

    render: function() {
      return (
        <div className="pioneer_complete_screen">

          <div className={classNames({
            'pioneer_complete_content': true,
            'footer_visible': this.props.footerVisible
          })}>
            <i className="success_icon"> <Icon type="success_tick"/> </i>

            <h1>Thanks</h1>
            <p>We will contact you when your market is launched.</p>
            <span className="divider"></span>

            <div className="reviewing_footer">
              <div className="have_questions">Have Questions?</div>
              <a className="help_email" href="mailto:help@compStak.com" target="_blank">help@compstak.com</a>
              <div className="help_phone">1-646-926-6707</div>
            </div>
          </div>
        </div>
      ) 
    }
  });

  return PioneerComplete;

});
