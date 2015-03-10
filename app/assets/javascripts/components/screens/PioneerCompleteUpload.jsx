define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'stores/MarketStore',

  // mixins,
  'jsx!mixins/InviteCheck',

  //components
  'jsx!components/Icon',
  'jsx!components/VideoLink',
  'jsx!components/FaqItem'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // mixins
  InviteCheck,

  // components
  Icon, VideoLink, FaqItem

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

    getInitialState: function () {
      return {
        faqData: [
          {
            "question": "Q1",
            "answer": "A1"
          },
          {
            "question": "Q2",
            "answer": "A2"
          },
          {
            "question": "Q3",
            "answer": "A3"
          },
          {
            "question": "Q4",
            "answer": "A4"
          }
        ]
      }
    },

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

      var faqNodes = this.state.faqData.map(function (faqItem) {
        return (
          <FaqItem
            question={faqItem.question} 
            answer={faqItem.answer}>
          </FaqItem>
        );
      });

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
              <h5>We hold Pioneer slots for 48 hours. </h5>
              <p>If we have not recieved comps from you, you may loose your Pioneer status. </p>
              <p>Have Questions? Check out our FAQs Below</p>
            </div>
            
            <VideoLink />

            <aside className="terms_of_use_note">
              By sending us comps you agree to the <a href="" target="_blank">terms of use</a>.
            </aside>
          </div>

          <div className="faq_section_container">

            <h1 className="faq_title">Frequently Asked Questions</h1>

            <div className="faq_content">
              {faqNodes}
            </div>

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
