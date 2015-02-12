define([
    // application
    'assets/javascripts/app', 

    // libraries
    'domready'

    // 'jsx!router'

], function(

    // application
    Application, 

    // libraries
    domReady

) {

    domReady(function () {

        // initialize the application
        Application.start({
            root : window.location.pathname,
            path_root : '/'
        });

    });
    
});