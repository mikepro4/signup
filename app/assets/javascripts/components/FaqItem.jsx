define([

  // libraries
  'react',

  // components
  'jsx!components/Icon'

], function (

  // libraries
  React,

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
          'item_open': this.state.faqItemOpen
        })}>

          <i className="icon_toggle"><Icon type="plus"/></i>
          <h2 className="faq_title">{this.props.question}</h2>
          <p className="faq_answer">{this.props.answer}</p>

        </article>
      )
    }
  });

  return FaqItem;
});