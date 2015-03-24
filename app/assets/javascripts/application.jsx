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
  'jsx!components/screens/PioneerComplete',
  'jsx!components/screens/PioneerCompleteUpload'

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
  PioneerComplete,
  PioneerCompleteUpload

) {

  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;
  var NotFoundRoute = Router.NotFoundRoute;
  var DefaultRoute = Router.DefaultRoute;

  var routes = (
    <Route name="app" handler={App} path="/" >

      // Main sign up routes
      <Route name="signup" path="/" handler={MainSignup} ignoreScrollBehavior="true" />
      <Route name="signup_market" path="/:market" handler={MainSignup} ignoreScrollBehavior="true" />
      <Route name="signup_email_market" path="/:email/:market" handler={MainSignup} ignoreScrollBehavior="true" />

      // Launched market – regular users
      <Route name="user_info" path="/active-market/info/" handler={UserInfo} />
      <Route name="user_reviewing_request" path="/active-market/reviewing-request/" handler={ReviewingRequest} />
      <Route name="user_create_account" path="/active-market/create-account/:token" handler={CreateAccount} />

      // Unlaunched market - before choice to become pioneer
      <Route name="video" path="/launching-market/video/" handler={Video} />
      <Route name="upload_comps" path="/launching-market/upload-comps/" handler={UploadComps} />

      // Unlaunched market - became pioneers
      <Route name="pioneer_info" path="/launching-market/pioneer/info/" handler={UserInfo} />
      <Route name="pioneer_complete_upload" path="/launching-market/pioneer/complete/" handler={PioneerCompleteUpload} />

      // Unlaunched market - did NOT become pioneers
      <Route name="no_pioneer_question_1" path="/launching-market/no-pioneer/question/1/" handler={Question1} />
      <Route name="no_pioneer_question_2" path="/launching-market/no-pioneer/question/2/" handler={Question2} />
      <Route name="no_pioneer_question_3" path="/launching-market/no-pioneer/question/3/" handler={Question3} />
      <Route name="no_pioneer_info" path="/launching-market/no-pioneer/info/" handler={UserInfo} />
      <Route name="no_pioneer_complete" path="/launching-market/no-pioneer/complete/" handler={PioneerComplete} /> 

      // No market
      <Route name="no_market_info" path="/no-market/info/" handler={UserInfo} />
      <Route name="no_market_complete" path="/no-market/complete/" handler={PioneerComplete} />

      <NotFoundRoute handler={MainSignup} />
      <DefaultRoute handler={MainSignup} />

    </Route>
  );

  function browserSupportsPushState() {
    return false; //(true && window.history && window.history.pushState);
  }

  if (browserSupportsPushState()) {
    Router.run(routes, Router.HistoryLocation, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  } else {
      if (window.location.pathname !== '/') {
          window.location.href = window.location.origin + '/#' + window.location.pathname;
      }
    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  }
});
