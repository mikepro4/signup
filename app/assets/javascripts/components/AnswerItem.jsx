define([

  // libraries
  'react'

], function (

  // libraries
  React

) {

  var AnswerItem = React.createClass({

    saveAndContinue: function() {
      this.props.saveAndContinue(this.props.answer);
    },
 
    render: function() {
      return (
        <article onClick={this.saveAndContinue} className="answer_item">
          <a className="button button_white answer">
            <span>{this.props.answer}</span>
          </a>
        </article>
      )
    }
  });

  return AnswerItem;
});