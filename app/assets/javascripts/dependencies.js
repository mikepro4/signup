require.config({
    baseUrl : '/bower_components/',
    paths: {
        signup: '../assets/javascripts',
        actions: '../assets/javascripts/actions',
        components: '../assets/javascripts/components',
        constants: '../assets/javascripts/constants',
        dispatcher: '../assets/javascripts/dispatcher',
        stores: '../assets/javascripts/stores',

        jquery: 'jquery/dist/jquery',
        underscore: 'underscore/underscore',
        text: 'requirejs-text/text',

        // react
        react: 'react/react-with-addons',
        'react-router': 'react-router/build/global/ReactRouter',
        jsx: 'jsx-requirejs-plugin/js/jsx',
        JSXTransformer: 'jsx-requirejs-plugin/js/JSXTransformer',
        flux: 'flux/dist/Flux',
        'es6-promise': 'es6-promise-polyfill/promise',
        eventemitter: 'eventemitter2/lib/eventemitter2'
    },
    shim: {
        underscore : {
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