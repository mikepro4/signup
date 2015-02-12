require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'underscore': 'bower_components/underscore/underscore',
        'handlebars': 'bower_components/handlebars/handlebars',
        'simplestorage': 'bower_components/simpleStorage/simpleStorage',
        'text': 'bower_components/requirejs-text/text',
        'domready': 'bower_components/domready/ready',

        // react
        'react': 'bower_components/react/react-with-addons',
        'formsy-react': 'bower_components/formsy-react/release/formsy-react',
        'jsx': 'bower_components/jsx-requirejs-plugin/js/jsx',
        'JSXTransformer': 'bower_components/jsx-requirejs-plugin/js/JSXTransformer',

        // backbone
        'backbone': 'bower_components/backbone/backbone',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.marionette': 'bower_components/marionette/lib/backbone.marionette',
        'backbone.routefilter': 'bower_components/routefilter/dist/backbone.routefilter',

        // animations
        'velocity': '../../bower_components/velocity/velocity',
        'velocity.ui': '../../bower_components/velocity/velocity/ui'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.marionette' : {
            deps : ['backbone', 'backbone.babysitter', 'backbone.wreqr'],
            exports : 'Marionette'
        },
        'backbone.routefilter' : {
            deps : ['backbone']
        },
        'underscore' : {
            exports: '_'
        },
        'hbs' : {
            deps : ['underscore', 'handlebars']
        },
        'velocity': {
            deps : ['velocity', 'velocityui'],
            exports: 'Velocity'
        }
    },
    hbs: {
        helperDirectory: 'ui/helpers/'
    },
    waitSeconds: 0
});