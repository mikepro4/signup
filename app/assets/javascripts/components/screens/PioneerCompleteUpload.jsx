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
  'jsx!components/FaqItem',

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

  var count = 172799; // 47:59:59 hrs
  var callsPerSecond = 1;
  var delay = 1000;

  var PioneerCompleteUpload = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    getInitialState: function() {
      return {
        time: null,
        faqData: [
          {
            "question": "I need more time. I’m not organized.",
            "answer": "Don’t stress about it. We want this to be fast and easy. We don’t care what comps or what format you send. Please don’t spend any time worrying about this. Just grab a bunch of excel files, or do a simple export from your database. We’ll deal with all the other details."
          },
          {
            "question": "I’m not allowed to upload lease comps.",
            "answer": "We understand. You should upload lease comps that other brokers, appraisers or researchers have shared with you. Remember, you can send any comp, any format. "
          },
          {
            "question": "What lease comp details are needed?",
            "answer": "We want this to be easy. No templates. No requirements. We will accept any format you’re already using. Most likely, your comps already have all the information we need, and if they don’t, our research team will email you."
          },
          {
            "question": "How will you use my comp data?",
            "answer": "Your comps will be stored in our database. They will always be available to you for free. Your comps are not public. They will only be available to other brokers, appraisers and researchers, who have themselves uploaded comps to CompStak – and specifically traded their data for yours."
          },
          {
            "question": "What are the risks? ",
            "answer": "None really. Every part of our platform is designed help you. We have members in every major brokerage and appraisal firm in the USA. If any problems arise from you uploading comps, we’re your allies, not your enimies. We’ll do whatever it take to help or fix the issue."
          },
          {
            "question": "Is my identity protected?",
            "answer": "Yes. CompStak is completely annoymous."
          },
          {
            "question": "What if I change my mind? ",
            "answer": "No problem. Just ask and we’ll send your comps back and not load them. Keep in mind, another CompStak member may upload the same comps. "
          }
        ]
      }
    },

    componentDidMount: function() {
      if(this.isMounted()) {
        this.countdown(0, count, count);
        this.props.syncData();
      }
    },

    countdown: function(i, counter, idsRemaining) {
      while (idsRemaining >= 0) {
        var secondsRemaining = (idsRemaining * delay) / 1000;
        var hour = parseInt(secondsRemaining / 3600);
        secondsRemaining -= hour * 3600;

        var minute = parseInt(secondsRemaining / 60);
        secondsRemaining -= minute * 60;
        secondsRemaining = parseInt(secondsRemaining % 60, 10);

        var formattedTime = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (secondsRemaining  < 10 ? "0" + secondsRemaining : secondsRemaining);
        
        this.setState({
          time: formattedTime
        });

        i++;
        idsRemaining--;
        if (idsRemaining >= 0) {
          setTimeout(function () {
              this.countdown(i, counter, idsRemaining);
          }.bind(this), delay);
          break;
        }
      }
      if (idsRemaining < 0 ) {
        this.setState({
          time: "Time's up..."
        });
      }
    },

    render: function() {
      if(this.props.inviteValues) {
        var marketName = MarketStore.getMarketName(this.props.inviteValues.marketId);
      }

      var faqNodes = this.state.faqData.map(function(faqItem, i) {
        return (
          <FaqItem
            key={i}
            question={faqItem.question} 
            answer={faqItem.answer}
          />
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
            <div className="countdown">{this.state.time}</div>

            <div className="pioneer_description">
              <h5>We hold Pioneer slots for 48 hours. </h5>
              <p>If we have not recieved comps from you, you may loose your Pioneer status. </p>
              <p>Have Questions? Check out our FAQs Below</p>
            </div>
            
            <VideoLink />

            <aside className="terms_of_use_note">
              By sending us comps you agree to the <a href="http://compstak.com/gateway/legal#terms-of-use" target="_blank">terms of use</a>.
            </aside>
          </div>

          <div className="faq_section_container">

            <h1 className="faq_title">Frequently Asked Questions</h1>

            <div className="faq_content">
              {faqNodes}
            </div>

          </div>

          <div className="faq_footer">
            <h3>Still Have Questions?</h3>
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
