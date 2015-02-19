define([

  // libraries
  'react', 'react-router',

  // components
  'jsx!assets/javascripts/components/screens/App',

  // Main Screen
  'jsx!assets/javascripts/components/screens/MainSignup',

  // User Screens
  'jsx!assets/javascripts/components/screens/UserInfo',
  'jsx!assets/javascripts/components/screens/ReviewingRequest',
  'jsx!assets/javascripts/components/screens/CreateAccount',

  // Invite Screen
  'jsx!assets/javascripts/components/screens/Video',
  'jsx!assets/javascripts/components/screens/UploadComps',
  'jsx!assets/javascripts/components/screens/Question1',
  'jsx!assets/javascripts/components/screens/Question2',
  'jsx!assets/javascripts/components/screens/Question3',
  'jsx!assets/javascripts/components/screens/SignupThanks',
  'jsx!assets/javascripts/components/screens/SignupThanksUpload'


], function (

  // libraries
  React, Router,

  // components
  App,

  // Main Screen
  MainSignup,

  // User Screens
  UserInfo,
  ReviewingRequest,
  CreateAccount,

  // Invite Screens
  Video,
  UploadComps,
  Question1,
  Question2,
  Question3,
  SignupThanks,
  SignupThanksUpload

) {

  var TransitionGroup = React.addons.CSSTransitionGroup;
  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;


  var routes = (
    <Route name="app" handler={App} path="/" >

      // Main sign up routes and redirect
      <Route path="/" handler={MainSignup} addHandlerKey={true}/>
      <Route path="/:market" handler={MainSignup} addHandlerKey={true}/>
      <Route path="/:email/:market" handler={MainSignup} addHandlerKey={true}/>

      // User routes
      <Route name="user_info" path="/user/info/" handler={UserInfo} addHandlerKey={true}/>
      <Route name="user_reviewing_request" path="/user/reviewing_request/" handler={ReviewingRequest} addHandlerKey={true}/>
      <Route name="user_create_account" path="/user/create_account/" handler={CreateAccount} addHandlerKey={true}/>

      // Invite routes
      <Route name="invite_video" path="/invite/video/" handler={Video} addHandlerKey={true}/>
      <Route name="invite_upload_comps" path="/invite/upload_comps/" handler={UploadComps} addHandlerKey={true}/>
      <Route name="invite_question_1" path="/invite/question/1/" handler={Question1} addHandlerKey={true}/>
      <Route name="invite_question_2" path="/invite/question/2/" handler={Question2} addHandlerKey={true}/>
      <Route name="invite_question_3" path="/invite/question/3/" handler={Question3} addHandlerKey={true}/>
      <Route name="invite_info" path="/invite/info/" handler={UserInfo} addHandlerKey={true}/>
      <Route name="invite_thanks" path="/invite/thanks/" handler={SignupThanks} addHandlerKey={true}/>
      <Route name="invite_thanks_upload" path="/invite/thanks_upload" handler={SignupThanksUpload} addHandlerKey={true}/>

    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
