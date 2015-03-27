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
        question: "Your years of experience in CRE?",
        answers: [
          {
            answer: "1 – 5"
          },
          {
            answer: "6 – 10"
          },
          {
            answer: "11 – 15"
          },
          {
            answer: "15+"
          }
        ]
      }
    },

    saveAndContinue: function(answer) {
      this.props.updatePioneerData({
        question1: answer
      })
      this.transitionTo('no_pioneer_question_2');
    },

    render: function() {
      var answers = this.state.answers.map(function(answer, i) {
        return (
          <AnswerItem
            key={i}
            answer={answer.answer}
            saveAndContinue={this.saveAndContinue} 
          />
        );
      }.bind(this));

      return (
        <div className="questions_screen question_1">
          <div className="questions_content">
            <aside className="question_counter">
              1 of 3
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
