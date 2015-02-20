define([
  // libraries
  'react', 'react-router', 'jquery', 'underscore',

  // stores
  'assets/javascripts/stores/MarketStore',

  // components
  'jsx!assets/javascripts/components/Icon',

], function (

  // libraries
  React, Router, $, _,

  // stores
  MarketStore,

  // components
  Icon

) { 

  var cx = React.addons.classSet;
  
  var MarketInfo = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function(){
      return {
        visibility: false
      }
    },

    getMarketDisplayName: function () {
      var matchedMarked = MarketStore.getMarket(this.props.market);

      if(!_.isUndefined(matchedMarked)){
        return matchedMarked.value;
      } else {
        return 'Join CompStak';
      }
    },

    render: function () {
      var labelClass = cx({
        'launching_soon_label':  true,
        'hidden':                !this.props.visibility
      });

      return (
        <div className="signup_market_info"> 
          <h1 className="signup_main_title">{this.getMarketDisplayName()}</h1>
          <aside className={labelClass}> Market Launching Soon </aside>
        </div>
      );
    }
  });

  return MarketInfo;
});