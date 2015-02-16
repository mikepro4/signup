require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'underscore': 'bower_components/underscore/underscore',
        'text': 'bower_components/requirejs-text/text',

        // react
        'react': 'bower_components/react/react-with-addons',
        'react-router': 'bower_components/react-router/dist/react-router',
        'jsx': 'bower_components/jsx-requirejs-plugin/js/jsx',
        'JSXTransformer': 'bower_components/jsx-requirejs-plugin/js/JSXTransformer',

        // animations
        'velocity': '../../bower_components/velocity/velocity',
        'velocity.ui': '../../bower_components/velocity/velocity/ui'
    },
    shim: {
        'underscore' : {
            exports: '_'
        },

        'velocity': {
            deps : ['velocity', 'velocityui'],
            exports: 'Velocity'
        }
    },
    jsx: {
        transformOptions: {
            harmony: true,
            stripTypes: true
        },
        usePragma: true
    },
    waitSeconds: 0
});