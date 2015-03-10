define([

  // libraries
  'react', 'react-router', 'underscore',

  // components
  'jsx!components/AnswerItem'

], function (

  // libraries
  React, Router, _,

  // components
  AnswerItem

) {

  var Question1Screen = React.createClass({

    mixins: [ Router.State ],

    getInitialState: function () {
      return {
        question: "Your main source of lease comps?",
        answers: [
          {
            answer: "I rarely need lease comps"
          },
          {
            answer: "Ask my research team"
          },
          {
            answer: "Trade with colleagues"
          },
          {
            answer: "Outside services"
          }
        ]
      }
    },

    saveAndContinue: function (answer) {
      alert(answer)
    },

    render: function() {

      var answers = this.state.answers.map(function (answer) {
        return (
          <AnswerItem
            answer={answer.answer}
            saveAndContinue={this.saveAndContinue} 
          />
        );
      }.bind(this));

      return (
        <div className="questions_screen question_1">
          <div className="questions_content">
            <aside className="question_counter">
              2 of 3
            </aside>

            <h1 className="question">
              {this.state.question}
            </h1>

            <div className="answers">
              {answers}
            </div>
          </div>
        </div>
      )
      
    }

  });

  return Question1Screen;

});
