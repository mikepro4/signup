define([

  // libraries
  'react', 'underscore',

  // components
  'jsx!components/Icon'

], function (

  // libraries
  React, _,

  // components
  Icon

) {

  var cx = React.addons.classSet;

  var FaqItem = React.createClass({

    getInitialState: function () {
      return {
        faqItemOpen: false
      }
    },

    toggle: function () {
      var itemState = this.state.faqItemOpen;
      this.setState({
        faqItemOpen: !itemState
      })
    },

    render: function () {
      return (
        <article onClick={this.toggle} className={cx({
          'faq_item': true,
          'item_open': this.state.faqItemOpen,
          'iten_closed': !this.state.faqItemOpen
        })}>

          <i className="icon_toggle">+</i>
          <h2 className="faq_title">{this.props.question}</h2>
          <p className="faq_answer">{this.props.answer}</p>

        </article>
      )
    }
  });

  return FaqItem;
});