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

  // utils
  'classNames'

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

    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function() {
      return {
        time: null,
        videoPlaying: false,
        faqData: [
          {
            "question": "I need more time. I’m not organized.",
            "answer": "Don’t stress. CompStak will accept your lease comps in any file format (Excel, PDF, Word, etc.). You don’t need to clean them up. Just email your files to membership@compstak.com."
          },
          {
            "question": "I’m not allowed to upload lease comps.",
            "answer": "We will accept any lease comps for any deal. If you can’t share your own deals, feel free to share the deals that you’ve heard about from other brokers."
          },
          {
            "question": "What lease comp details are needed?",
            "answer": "We want this to be easy. No templates. No requirements. We will accept any format you’re already using. Most likely, your comps already have all the information we need, and if they don’t, our research team will email you."
          },
          {
            "question": "How will you use my comp data?",
            "answer": "Your comps will be stored in our database. They will not be made public, and they will always be available to you for free. However, if another user uploads a comp and earns credits, that user may unlock a comp that you have shared."
          },
          {
            "question": "Is my identity protected?",
            "answer": "Yes. CompStak is completely annoymous."
          },
          {
            "question": "What if I change my mind? ",
            "answer": "No problem. Just ask and we’ll send your comps back (and remove your versions from the database)."
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

    toggleVideo: function() {
      this.setState({
        videoPlaying: true
      })
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
            
            <a onClick={this.toggleVideo} className={classNames({
              'video_link': true,
              'hidden': this.state.videoPlaying
            })}>
              <figure className="video_preview">
                <img src="/assets/images/video_preview.jpg"/>
                <i><Icon type="play_video"/></i>
              </figure>
              <span> Pioneer status and the rewards in 60 seconds...</span>
            </a>

            <div className={classNames({
              'video_container': true,
              'hidden': !this.state.videoPlaying
            })}>

              <iframe 
                src="http://player.vimeo.com/video/120016796?api=1" 
                className="vimeo_video"
                frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen>
              </iframe>

            </div>

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
