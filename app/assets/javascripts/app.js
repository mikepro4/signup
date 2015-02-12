define([

    // libraries
    'react', 'react-router',

    // components
    'jsx!assets/javascripts/components/page1',
    'jsx!assets/javascripts/components/page2',

], function (

    // libraries
    React, Router,

    // components
    Page1, Page2

) {

    var TransitionGroup = React.addons.CSSTransitionGroup;
    var Route = Router.Route;
    var RouteHandler = Router.RouteHandler;
    var Link = Router.Link;

    var App = React.createClass({
        mixins: [ Router.State ],

        render: function () {
            var name = this.getRoutes().reverse()[0].name;

            return (
              <div>
                <ul>
                    <li><Link to="page1">Page 1</Link></li>
                    <li><Link to="page2">Page 2</Link></li>
                </ul>
                <TransitionGroup component="div" transitionName="example">
                    <RouteHandler key={name}/>
                </TransitionGroup>
              </div>
            );
        }
    });

    var routes = (
        <Route handler={App}>
            <Route name="page1" handler={Page1} addHandlerKey={true} />
            <Route name="page2" handler={Page2} addHandlerKey={true} />
        </Route>
    );

    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.body);
    });
});
