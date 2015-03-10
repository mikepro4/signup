define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'stores/MarketStore',

  // mixins,
  'jsx!mixins/InviteCheck',

  //components
  'jsx!components/Icon',
  'jsx!components/VideoLink'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // mixins
  InviteCheck,

  // components
  Icon, VideoLink

) {

  var count = 172800; // 48 hrs
  var callsPerSecond = 1;
  var delay = 1000;

  function offsetLoop(i, counter, idsRemaining) {

    while (idsRemaining >= 0) {
      var secondsRemaining = (idsRemaining * delay) / 1000;
      var hour = parseInt(secondsRemaining / 3600);
      secondsRemaining -= hour * 3600;

      var minute = parseInt(secondsRemaining / 60);
      secondsRemaining -= minute * 60;
      secondsRemaining = parseInt(secondsRemaining % 60, 10);

      var formattedTime = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (secondsRemaining  < 10 ? "0" + secondsRemaining : secondsRemaining);
      
      log(formattedTime);
      i++;
      idsRemaining--;
      if (idsRemaining >= 0) {
          setTimeout(function () {
              offsetLoop(i, counter, idsRemaining);
          }, delay);
         break;
      }
    }
    if (idsRemaining < 0 ) {
      log("Time's up...");
    }
  };

  function log(text) {
      $('#countdown').html(text);
  }

  var PioneerCompleteUpload = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    componentDidMount: function () {
      this.props.clearData();
      offsetLoop(0, count, count);
    },

    render: function() {

      if(this.props.inviteValues) {
        var marketName = MarketStore.getMarketName(this.props.inviteValues.marketId);
      } else {
        var marketName = 'PHOENIX';
      }

      return (
        <div className="pioneer_complete_upload_screen">

          <div className="pioneer_complete_top_sections">
            <h4 className="complete_title">CONGRATS {marketName} PIONEER!</h4>
            <h1 className="upload_email">
              Please email your comps: <a className="help_email" href="mailto:membership@compstak.com" target="_blank">
                membership@compstak.com
              </a>
            </h1>
            <div className="countdown" id="countdown"></div>

            <div className="pioneer_description">
              <h5>We hold Pioneer slots for 24 hours. </h5>
              <p>If we have not recieved comps from you, you may loose your Pioneer status. </p>
              <p>Have Questions? Check out our FAQs Below</p>
            </div>
            
            <VideoLink />

            <aside className="terms_of_use_note">
              By sending us comps you agree to the <a href="" target="_blank">terms of use</a>
            </aside>
          </div>

          <div className="faq_section_container">

            <h1 className="faq_title">Frequently Asked Questions</h1>

            <ul className="faq_content">
              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">I need more time. I’m not organized.</div>
                <div className="faq_answer">text...</div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">I’m not allowed to upload lease comps. </div>
                <div className="faq_answer">text...</div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">What lease comp details are needed? </div>
                <div className="faq_answer">
                  We want this to be easy. 
                  No templates. No requirements. 
                  We will accept any format you’re already using. 
                  Most likely, your comps already have all the information we need, and if they don’t, our research team will email you.
                </div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">How will you use my comp data?</div>
                <div className="faq_answer">text...</div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">What are the risks?</div>
                <div className="faq_answer">text...</div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">Is my identity protected?</div>
                <div className="faq_answer">text...</div>
              </li>

              <li>
                <div className="icon_toggle">+</div>
                <div className="faq_title">What if I change my mind?</div>
                <div className="faq_answer">text...</div>
              </li>
            </ul>

          </div>

          <div className="faq_footer">
            <h3>Still Have Questions</h3>
            <p>
              Contact us at 1-646-926-6707 or <a className="help_email" href="mailto:help@compstak.com" target="_blank">
                help@compstak.com
              </a> 
            </p>
          </div>

        </div>
      )
    }
  });

  return PioneerCompleteUpload;

});
