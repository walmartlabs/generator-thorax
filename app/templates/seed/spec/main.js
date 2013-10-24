// Partial config file
require.config({
    // Base URL relative to the test runner
    // Paths are relative to this
    baseUrl: '../../js/',
    paths: {
        // Testing libs
        'chai'          : '../test/libs/chai',
        'sinon-chai'    : '../test/libs/sinon-chai',
        'common'        : '../test/libs/common',
        'fixtures'      : '../test/admin/fixtures/fixtures',
        'jquery'        : 'libs/jquery/jquery.min',
        'underscore'    : 'libs/underscore/underscore',
        'backbone'      : 'vendor/backbone'
        'templates'     : 'templates/templates'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
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
