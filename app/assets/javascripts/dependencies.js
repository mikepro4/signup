require.config({
    baseUrl : '/assets/javascripts/',
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery',
        underscore: '../../bower_components/underscore/underscore',
        text: '../../bower_components/requirejs-text/text',
        react: '../../bower_components/react/react-with-addons',
        'react-router': '../../bower_components/react-router/build/global/ReactRouter',
        jsx: '../../bower_components/jsx-requirejs-plugin/js/jsx',
        JSXTransformer: '../../bower_components/jsx-requirejs-plugin/js/JSXTransformer',
        flux: '../../bower_components/flux/dist/Flux',
        'es6-promise': '../../bower_components/es6-promise/promise',
        eventemitter: '../../bower_components/eventemitter2/lib/eventemitter2',
        classNames: '../../bower_components/classnames/index',
        analytics: '../../bower_components/analytics/analytics'
    },
    shim: {
        underscore : {
            exports: '_'
        },
        'react-router': {
            exports: 'ReactRouter',
            deps: ['react']
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