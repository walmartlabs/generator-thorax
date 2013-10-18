// Partial config file
require.config({
    // Base URL relative to the test runner
    // Paths are relative to this
    baseUrl: '../../js/',
    paths: {
        // Testing libs
        'chai'          : '../test/libs/chai',
        'sinon-chai'    : '../test/libs/sinon-chai',
        'chai-jquery'   : '../test/libs/chai-jquery',
        'common'        : '../test/libs/common',
        'fixtures'      : '../test/admin/fixtures/fixtures',
        'jquery'        : 'libs/jquery/jquery.min',
        'underscore'    : 'libs/underscore/underscore',
        'backbone'      : 'vendor/backbone',
        'visualsearch'  : 'libs/backbone/visualsearch',
        'highcharts'    : 'libs/highcharts/highcharts',
        'charts'        : 'vendor/highcharts',
        'templates'     : 'templates/templates'
    },
    shim: {
        backbone: {
            deps: ['use!underscore', 'jquery'],
            exports: 'Backbone'
        },
        'libs/backbone/backbone': {
            deps: ['use!underscore', 'jquery'],
            exports: 'Backbone'
        },
        'libs/leaflet/leaflet-src': {
            exports: 'L'
        },
        underscore: {
            exports: '_'
        },
        mocha: {
            exports: 'mocha'
        }
    }
});

// You can do this in the grunt config for each mocha task, see the `options` config
mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true
});

// Protect from barfs
console = window.console || function() {};

// Don't track
window.notrack = true;
