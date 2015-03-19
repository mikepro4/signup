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

    getInitialState: function() {
      return {
        faqItemOpen: false
      }
    },

    toggle: function() {
      this.setState({
        faqItemOpen: !this.state.faqItemOpen
      })
    },

    linkify: function(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" video_preview.jpgtarget="_blank">$1</a>');

      return replacedText;
    },

    render: function() {
      var answerHtml = this.linkify(this.props.answer);
      return (
        <article className={classNames({
          'faq_item': true,
          'item_open': this.state.faqItemOpen
        })}>

          <hgroup>
            <i className="icon_toggle" onClick={this.toggle}><Icon type="plus"/></i>
            <h2 className="faq_title" onClick={this.toggle}>{this.props.question}</h2>
          </hgroup>

          <p className="faq_answer" dangerouslySetInnerHTML={{__html: answerHtml }} />

        </article>
      )
    }
  });

  return FaqItem;
});