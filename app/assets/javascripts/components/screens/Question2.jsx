define([

  // libraries
  'react', 'react-router', 'underscore',

  // mixins,
  'jsx!mixins/InviteCheck',

  // components
  'jsx!components/AnswerItem'

], function (

  // libraries
  React, Router, _,

  // mixins
  InviteCheck,

  // components
  AnswerItem

) {

  var Question1Screen = React.createClass({

    mixins: [ Router.State, Router.Navigation, InviteCheck ],

    getInitialState: function() {
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

    saveAndContinue: function(answer) {
      this.props.updatePioneerData({
        question2: answer
      })
      this.transitionTo('no_pioneer_question_3');
    },

    render: function() {

      var answers = this.state.answers.map(function (answer, i) {
        return (
          <AnswerItem
            key={i}
            answer={answer.answer}
            saveAndContinue={this.saveAndContinue} 
          />
        );
      }.bind(this));

      return (
        <div className="questions_screen question_2">
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
