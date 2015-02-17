define([

  'react', 'react-router', 'jquery', 'underscore',

  // stores
  'assets/javascripts/stores/MarketStore',

  // icons
  'jsx!assets/javascripts/components/Icon',

], function (

  React, Router, $, _,

  MarketStore,

  Icon

) { 
  
  var MarketInfo = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function(){
      return {
        visibility: false
      }
    },

    componentWillReceiveProps: function (newProps) {
      this.toggleFooter();
      this.getMarketDisplayName();
    },

    toggleFooter: function () {
      if(this.props.visibility) {
        return {display: 'inline-block'}
      } else {
        return {display: 'none'}
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
      return (
        <div className="signup_market_info"> 
          <h1 className="signup_main_title">{this.getMarketDisplayName()}</h1>
          <aside style={this.toggleFooter()}>
            Market Launching Soon
          </aside>
        </div>
      );
    }
  });

  return MarketInfo;
});