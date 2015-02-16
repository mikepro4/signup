define([

  // libraries
  'react', 'react-router',

  // components
  'jsx!assets/javascripts/components/AppHeader',

  // Screens
  'jsx!assets/javascripts/components/screens/MainSignup',

], function (

  // libraries
  React, Router,

  // components
  AppHeader,

  // Screens
  MainSignup

) {

  var TransitionGroup = React.addons.CSSTransitionGroup;
  var Route = Router.Route;
  var Redirect = Router.Redirect;
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;

  var App = React.createClass({
    mixins: [ Router.State ],

    render: function () {
        
      return (
         <div className="application_wrapper">
            <AppHeader/>

            <section className="application_content">
              <RouteHandler {...this.props}/>
            </section>

        </div>
      );
    }
  });

  var routes = (
    <Route name="app" handler={App} path="/" >

      <Route name="signup" path="/signup/" handler={MainSignup} />
      <Route name="signup_market" path="/signup/:market" handler={MainSignup} />
      <Route name="signup_email_market" path="/signup/:email/:market" handler={MainSignup} />
      <Redirect from="/" to="signup"/>
      <Redirect from="/:market" to="signup_market"/>
      <Redirect from="/signup/:email/:market" to="signup_email_market"/>

    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
