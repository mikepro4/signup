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
        question: "How do you manage your comp data?",
        answers: [
          {
            answer: "Internal company database"
          },
          {
            answer: "Excel spreadsheet"
          },
          {
            answer: "PDF files"
          },
          {
            answer: "Offline / paper"
          }
        ]
      }
    },

    saveAndContinue: function(answer) {
      this.props.updatePioneerData({
        question3: answer
      })
      this.transitionTo('no_pioneer_info');
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
        <div className="questions_screen question_3">
          <div className="questions_content">
            <aside className="question_counter">
              3 of 3
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
