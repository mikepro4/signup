define([

  // libraries
  'react', 'backbone.marionette', 'backbone.routefilter',

], function (

  // libraries
  React, Marionette, Routefilter

) {

    return Marionette.AppRouter.extend({

        initialize: function (options) {
            // make sure every anchor element in the DOM that has a pushstate class annotation has a
            // click event bound to it that forwards its 'href' attribute value to the application router
            $(document).on('click', 'a.js-pushstate[href^="/"]', function (event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    event.preventDefault();
                    var url = $(event.currentTarget).attr('href').replace(/^\//, '');
                    var shouldTrigger = (event.currentTarget.getAttribute('data-trigger') !== 'false');
                    window.app.router.navigate(url, { trigger: shouldTrigger });
                }
            });
            return Marionette.AppRouter.prototype.initialize.call(this, options);
        },

        appRoutes: {
            '': 'index',
            'test': 'test'
        }
    });
});