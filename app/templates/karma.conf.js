// Karma configuration
// Generated on Thu Nov 07 2013 19:43:59 GMT-0800 (PST)

// TODO(karma-grunt): DRY me up, move this all to grunt? what do we lose? (performance?)
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '.',


    // frameworks to use
    frameworks: [
      'mocha',
      'requirejs'
    ],

    /**
     * The following matched files are served by karma at /base. (feel free
     * to verify that in your browser).
     *
     * Use included: false for all files but the initial require.js data-main
     * file which is test/main.karma.js when tests are run with karma.
     *
     * Included false prevents karma from loading the script
     * inline within its HTML runner page, preventing async loading issues,
     * delegating full control of proper module loading to require.js.
     *
     * See test/main.karma.js for more information
     */
    files: [
      {pattern: 'js/**/*.{js,coffee}', included: false},
      {pattern: 'js/templates/**/*.{hbs,handlebars}', included: false},
      {pattern: 'bower_components/**/*.js', included: false},
      {pattern: 'test/**/*.spec.{js,coffee}', included: false},
      {pattern: 'test/fixtures/**/*.{html,hbs,handlebars}', included: false},
      {pattern: 'test/main.js', included: false},
      {pattern: 'require-config.js', included: false},
      {pattern: 'test/test-setup-*.js', included: false},
      'test/main.karma.js'
    ],


    // list of files to exclude
    exclude: [
      '!js/templates/**/*.{hbs,handlebars}',
      // 'js/main.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: [
      'dots',
      'coverage'
      // enable growl support via: karma-growl-reporter --save-dev
      // and uncommenting the line below
      // 'growl'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'js/**/*.{js}': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
