var grunt = require('grunt');

module.exports = {
  production: {
    options: {
      baseUrl: 'tmp',
      // mainConfigFile: 'tmp/main.build.js', // wont work :/ see TODO: remove build duplication
      name: '../bower_components/almond/almond',
      include: ['main'],
      exclude: ['coffee-script'],
      stubModules: ['cs'],
      out: 'dist/main.js',
      removeCombined: true,
      findNestedDependencies: true,
      optimize: 'uglify2',
      paths: {<% if (!useZepto) { %>
        'jquery': '../bower_components/jquery/jquery',<% } %><% if (useZepto) { %>
        'zepto': '../bower_components/zepto/zepto',<% } %>
        'underscore': '../bower_components/underscore/underscore',
        'handlebars': '../bower_components/handlebars/handlebars',
        'backbone': '../bower_components/backbone/backbone',
        'handlebones': '../bower_components/handlebones/handlebones',
        'coffee-script': '../bower_components/coffee-script/index',
        'cs': '../bower_components/require-cs/cs',
        'text': '../bower_components/text/text',
        'hbs': '../bower_components/requirejs-hbs/hbs',
        'localstorage': '../bower_components/backbone.localStorage/backbone.localstorage'
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
    }
  }
};
