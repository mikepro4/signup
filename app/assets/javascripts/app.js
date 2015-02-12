define([

    // libraries
    'backbone.marionette',
    // routers
    'jsx!assets/javascripts/routers/signup',
    // controllers
    'jsx!assets/javascripts/controllers/signup'

], function (

    // libraries
    Marionette,
    // routers
    SignupRouter,
    // controllers
    SignupController

) {
    'use strict';

    var SignupApp = new (Marionette.Application.extend({

        // check if browser supports HTML5 pushState
        browserSupportsPushState: function () {
            return (true && window.history && window.history.pushState);
        }

    }))();

    // before application initialization hook
    SignupApp.on('initialize:before', function (options) {
        window.app = SignupApp; // the only global variable set by the application (besides libraries)
    });

    SignupApp.addInitializer(function (options) {
        var controller = new SignupController();
        this.router = new SignupRouter({ controller: controller });
    });

    SignupApp.on('start', function (options) {
        Backbone.history.start({ pushState: true });
    });

    return SignupApp;

});
