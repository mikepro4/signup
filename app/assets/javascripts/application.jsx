define([

  // libraries
  'react', 'react-router',

  // Main Screens
  'jsx!components/screens/App',
  'jsx!components/screens/MainSignup',

  // User Screens
  'jsx!components/screens/UserInfo',
  'jsx!components/screens/ReviewingRequest',
  'jsx!components/screens/CreateAccount',

  // Pioneer Screens
  'jsx!components/screens/Video',
  'jsx!components/screens/UploadComps',
  'jsx!components/screens/Question1',
  'jsx!components/screens/Question2',
  'jsx!components/screens/Question3',
  'jsx!components/screens/SignupThanks',
  'jsx!components/screens/SignupThanksUpload'

], function (

  // libraries
  React, Router,

  // Main Screens
  App, MainSignup,

  // User Screens
  UserInfo,
  ReviewingRequest,
  CreateAccount,

  // Pioneer Screens
  Video,
  UploadComps,
  Question1,
  Question2,
  Question3,
  SignupThanks,
  SignupThanksUpload

) {

  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;
  var NotFoundRoute = Router.NotFoundRoute;
  var DefaultRoute = Router.DefaultRoute;

  var routes = (
    <Route name="app" handler={App} path="/" >

      // Main sign up routes
      <Route name="signup" path="/" handler={MainSignup} />
      <Route name="signup_market" path="/:market" handler={MainSignup} />
      <Route name="signup_email_market" path="/:email/:market" handler={MainSignup} />

      // User routes
      <Route name="user_info" path="/user/info/" handler={UserInfo} />
      <Route name="user_reviewing_request" path="/user/reviewing_request/" handler={ReviewingRequest} />
      <Route name="user_create_account" path="/user/create_account/:token" handler={CreateAccount} />

      // Pioneer routes
      <Route name="pioneer_video" path="/pioneer/video/" handler={Video} />
      <Route name="pioneer_upload_comps" path="/pioneer/upload_comps/" handler={UploadComps} />
      <Route name="pioneer_question_1" path="/pioneer/question/1/" handler={Question1} />
      <Route name="pioneer_question_2" path="/pioneer/question/2/" handler={Question2} />
      <Route name="pioneer_question_3" path="/pioneer/question/3/" handler={Question3} a/>
      <Route name="pioneer_info" path="/pioneer/info/" handler={UserInfo} />
      <Route name="pioneer_thanks" path="/pioneer/thanks/" handler={SignupThanks} />
      <Route name="pioneer_thanks_upload" path="/pioneer/thanks_upload" handler={SignupThanksUpload} />

      <NotFoundRoute handler={MainSignup} />
      <DefaultRoute handler={MainSignup} />

    </Route>
  );

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
