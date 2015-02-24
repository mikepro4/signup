require.config({
    paths: {
        'signup': 'assets/javascripts',
        'actions': 'assets/javascripts/actions',
        'components': 'assets/javascripts/components',
        'constants': 'assets/javascripts/constants',
        'dispatcher': 'assets/javascripts/dispatcher',
        'mixins': 'assets/javascripts/mixins',
        'stores': 'assets/javascripts/stores',

        'jquery': 'bower_components/jquery/dist/jquery',
        'underscore': 'bower_components/underscore/underscore',
        'text': 'bower_components/requirejs-text/text',

        // react
        'react': 'bower_components/react/react-with-addons',
        'react-router': 'bower_components/react-router/build/global/ReactRouter',
        'jsx': 'bower_components/jsx-requirejs-plugin/js/jsx',
        'JSXTransformer': 'bower_components/jsx-requirejs-plugin/js/JSXTransformer',
        'flux': 'bower_components/flux/dist/Flux',
        'es6-promise': 'bower_components/es6-promise-polyfill/promise',
        'eventemitter': 'bower_components/eventemitter2/lib/eventemitter2'
    },
    shim: {
        'underscore' : {
            exports: '_'
        }
    },
    jsx: {
        fileExtension: '.jsx',
        transformOptions: {
            harmony: true,
            stripTypes: true
        },
        usePragma: true
    },
    waitSeconds: 0
});