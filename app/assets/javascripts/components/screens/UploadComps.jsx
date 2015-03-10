define([

  // libraries
  'react', 'react-router', 'underscore',

  // stores
  'stores/MarketStore',

  // components
  'jsx!components/Icon'

], function (

  // libraries
  React, Router, _,

  // stores
  MarketStore,

  // components
  Icon

) {

  var Link = Router.Link;

  var UploadCompsScreen = React.createClass({

    mixins: [ Router.State, Router.Navigation ],

    render: function() {
      if(this.props.inviteValues) {
        var marketName = MarketStore.getMarketName(this.props.inviteValues.marketId);
      } else {
        var marketName = '';
      }

      return (
        <div className="upload_comps_splitter_screen">

          <div className="upload_comps_content">

            <h1>Upload comps before launch and gain exclusive <em>Pioneer</em> status.</h1>
            <aside className="pioneer_slots_label">2 {marketName} pioneer spots left</aside>

            <div className="upload_comps_options">

              <article className="upload_option no_option">
                <i className="error"> <Icon type="cross_error"/> </i>
                <hgroup className="option_description">
                  <h3>
                    No early access <br/>
                    No bonus comps <br/>
                    No gift card
                  </h3>
                </hgroup>
                <a className="button button_gray">
                  <span>I'M NO PIONEER</span>
                </a>
              </article>

              <article className="upload_option yes_option">
                <i className="tick"> <Icon type="success_tick"/> </i>
                <hgroup className="option_description">
                  <h3>
                    Get <em>2 for 1</em> COMPS <br/>
                    <em>$200</em> GIFT CARD
                  </h3>
                  <span className="comps_minimum">100 COMP MINIMUM</span>
                </hgroup>
                <a className="button button_green">
                  <span>BECOME A PIONEER</span>
                </a>
              </article>
              
            </div>

            <Link to="pioneer_video" query={{play: true}}>
              <a className="video_link">
                <figure className="video_preview">
                  <img src="https://i.vimeocdn.com/video/507670267.webp?mw=1920&mh=1080&q=70"/>
                  <i><Icon type="play_video"/></i>
                </figure>
                <span> Pioneer status and the rewards in 60 seconds...</span>
              </a>
            </Link>

          </div>
          
        </div>
      )
      
    }
  });

  return UploadCompsScreen;

});
