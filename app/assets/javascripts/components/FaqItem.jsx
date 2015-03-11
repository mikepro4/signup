define([

  // libraries
  'react',

  // components
  'jsx!components/Icon',

  // utils
  'classNames'

], function (

  // libraries
  React,

  // components
  Icon

) {

  var FaqItem = React.createClass({

    getInitialState: function () {
      return {
        faqItemOpen: false
      }
    },

    toggle: function () {
      this.setState({
        faqItemOpen: !this.state.faqItemOpen
      })
    },

    render: function () {
      return (
        <article onClick={this.toggle} className={classNames({
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