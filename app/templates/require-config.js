/**
 * This is the main entry point for requirejs in this application. This file is
 * used as the second stop in the require.config chain by the following
 * initial require.config calls:
 *
 * - tasks/requirejs.js, used by grunt-contrib-requirejs for production builds
 * - test/index.html used by mocha in the browser and mocha_phantomjs
 * - test/main.karma.js used by the karma test runner
 * - public/index.html used by you while you develop your app
 *
 * In all cases, this file is the __second__ link of the requirejs configuration
 * chain, which is why it does not have a `baseUrl`. The job of this file
 * is to set up paths shared by all consumers of requirejs in this app.
 *
 * When running tests, test/main.js is the next stop, where more paths are
 * defined that are test specific
 *
 */

/**
 * If using karma, change the base path to /base/ which is where karma's built
 * in server serves files from. The file must be included in the files karma
 * is being told to serve in order for requirejs to pick it up. To include
 * and additional file add the file or glob a directory where the file exists
 * in the karma configuration files array. Make sure include is set to false.
 * We don't want to include the file on the page b/c requirejs will take of that
 * and ensure async happens correctly.
 */

var pathPrefix;
if (window.__karma__) {
  pathPrefix = '/base/';
} else {
  pathPrefix = '../';
}

require.config({
  deps: ['main'],
  paths: {<% if (useZepto) { %>
    'zepto': pathPrefix + 'bower_components/zepto/zepto',<% } else { %>
    'jquery': pathPrefix + 'bower_components/jquery/jquery',<% } %>
    'underscore': pathPrefix + 'bower_components/underscore/underscore',
    'handlebars': pathPrefix + 'bower_components/handlebars/handlebars',
    'backbone': pathPrefix + 'bower_components/backbone/backbone',
    'handlebones': pathPrefix + 'bower_components/handlebones/handlebones',
    'coffee-script': pathPrefix + 'bower_components/coffee-script/index',
    'cs': pathPrefix + 'bower_components/require-cs/cs',
    'text': pathPrefix + 'bower_components/text/text',
    'hbs': pathPrefix + 'bower_components/requirejs-hbs/hbs',
    'localstorage': pathPrefix + 'bower_components/backbone.localStorage/backbone.localStorage'
  },
  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
    'backbone': {
      exports: 'Backbone',<% if (useZepto) { %>
      deps: ['zepto', 'underscore']<% } else { %>
      deps: ['jquery', 'underscore']<% } %>
    },
    'underscore': {
      exports: '_'
    },
    'handlebones': {
      exports: 'Handlebones',
      deps: ['handlebars', 'backbone']
    }<% if (useZepto) { %>,
    'zepto': {
      exports: '$'
    }<% } %>,
    'localstorage': {
      deps: ['backbone']
    }
  }
});
