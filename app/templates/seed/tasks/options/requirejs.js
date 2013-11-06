// This file builds main.js
//
// In development:
//   - main.js is located in public/ and all .js files are copied
//   over verbatum from app/js to public/js.
//   - templates are preprocessed and provided as .js files at public/templates/*.js.
//   - requirejs is used to resolve modules from files on page load for an easier
//     debugging experience.
//
// In production:
//   - the process is similar but outputs to tmpDist before running the r.js
//     optimizer
//   - The final ouput is wrapped in almond.js and concatenated + minified to
//     dist/main.js.


var grunt = require('grunt');

module.exports = {
  development: getRequireJSOptions('development'),
  production: getRequireJSOptions('production')
};

function merge(original, updates) {
  for (var prop in updates) {
    original[prop] = updates[prop];
  }
}

function getRequireJSOptions(env) {
  var options = {
    paths: {<% if (!useZepto) { %>
      'jquery': '../bower_components/jquery/jquery',<% } %><% if (useZepto) { %>
      'zepto': '../bower_components/zepto/zepto',<% } %>
      'underscore': '../bower_components/underscore/underscore',
      'handlebars': '../bower_components/handlebars/handlebars.runtime',
      'backbone': '../bower_components/backbone/backbone',
      'thorax': '../bower_components/thorax/thorax',
      'bootstrap': '../bower_components/bootstrap/js/bootstrap'
    }<% if (includeCoffeeScript) { %>,
    packages: [
      // include the requirejs coffeescript plugin and the coffeescript compiler
      {
        name: 'cs',
        location: '../../bower_components/require-cs',
        main: 'cs'
      },
      {
        name: 'coffee-script',
        location: '../../bower_components/require-cs',
        main: 'coffee-script'
      }
    ],
    //Stub out the cs module after a build since
    //it will not be needed.
    stubModules: ['cs']<% } %>,
    shim: {
      'handlebars': {
        exports: 'Handlebars'
      },
      'backbone': {
        exports: 'Backbone',<% if (!useZepto) { %>
        deps: ['jquery', 'underscore']<% } %><% if (useZepto) { %>
        deps: ['zepto', 'underscore']<% } %>
      },
      'underscore': {
        exports: '_'
      },
      'thorax': {
        exports: 'Thorax',
        deps: ['handlebars', 'backbone']
      },
      'bootstrap': {<% if (!useZepto) { %>
        deps: ['jquery']<% } %><% if (useZepto) { %>
        deps: ['zepto']<% } %>
      }<% if (useZepto) { %>,
      'zepto': {
        exports: '$'
      }<% } %>
    }
  };

  var devOptions = {
    appDir: grunt.config('paths.js'),
    baseUrl: './',
    dir: grunt.config('paths.output.js'),
    keepBuildDir: true,
    optimize: 'none',
    modules: [{name: 'main'}]
  };

  var prodOptions = {
    almond: true,
    name: 'requireLib',
    include: ['main'],
    baseUrl: grunt.config('paths.tmpDist'),
    out: grunt.config('paths.distOutput.js'),
    removeCombined: true,
    findNestedDependencies: true,
    optimize: 'uglify2'
  };

  if (env === 'development') merge(options, devOptions);
  if (env === 'production') {
    merge(options, prodOptions);
    options.paths.requireLib = 'almond';
  }

  return {
    options: options
  };
}

