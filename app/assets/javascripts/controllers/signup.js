define([

    // libraries
    'jquery', 'backbone.marionette', 'react',

    // components
    'jsx!assets/javascripts/components/test'

], function (

    // libraries
    $, Marionette, React,

    // components
    TestComponent

) {

    'use strict';

    return Marionette.Controller.extend({

        index: function () {
            React.renderComponent(<TestComponent/>, document.body);
        },

        test: function () {
            alert('test')
        }
    });

});
