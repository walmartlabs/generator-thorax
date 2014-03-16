/**
 *
 * Configuration options are loaded from files in tasks/options
 *
 * Normally inside this file you'd see:
 *
 * clean: {
 *   development: ['file-to-clean']
 * }
 *
 * Instead the file at tasks/options/clean.js contains:
 *
 * module.exports = {
 *   development: ['file-to-clean']
 * }
 *
 * Sharing Configuration Options:
 *
 * Configuration options used across multiple modules are set in the following
 * manner:
 *
 * `grunt.config('settings', settings);`
 * `grunt.config('paths', settings.paths);`
 *
 *
 * Furthermore, getting those options occurs in a similar fashion:
 *
 * `grunt.config('paths.output.js');` //=> public/js
 *
 * Using the conventional <%%= paths.output.js %> will NOT work
 *
 */

module.exports = function(grunt) {

  var settings = {
    liveReloadPort: process.env.LRPORT || 35729,
    port: process.env.PORT || 8000,
    mochaPhantomPort: process.env.MOCHA_PHANTOM_PORT || 8001,
    hostname: 'localhost',
    templates: {},
    paths: {
      'public': 'public',
      server: 'server',
      dist: 'dist',
      tmp: 'tmp',
      distOutput: {
        js: 'dist/main.js',
      },
      output: {
        js: 'public/js',
        css: 'public/css'
      },
      js: 'js',
      css: 'css',
      templates: 'js/templates',
      views: 'js/views',
      models: 'js/models',
      collections: 'js/collections'
    }
  };

  grunt.config('settings', settings);
  grunt.config('paths', settings.paths);

  grunt.loadTasks('tasks');

  grunt.registerTask('styles:development', [
    'clean:styles',
    'styles'
  ]);

  grunt.registerTask('build', [
    'ensure-installed',
    'jshint'
  ]);

  /**
   * livereload tests + app + jshint when saving a file
   */
  grunt.registerTask('default', [
    'build',
    'styles:development',
    'connect:development',
    'watch'
  ]);

  /**
   * same as 'default' tasks but does not start a connect server. Use
   * this option when you'd like to start the server using nodemon via
   * `nodemon server/server.js`
   */
  grunt.registerTask('noserver', [
    'build',
    'styles:development',
    'watch'
  ]);

  /**
   * same as default `grunt` but also runs karma tests on file save
   */
  grunt.registerTask('autotest', [
    'build',
    'styles:development',
    'karma:server',
    'connect:development',
    'addKarmaToWatchTask',
    'watch'
  ]);

  /**
   * same as `grunt autotest` but does not start a connect server. Use
   * this option when you'd like to start the server manually using nodemon via
   * `nodemon server/server.js`
   */
  grunt.registerTask('autotest:noserver', [
    'build',
    'styles:development',
    'karma:server',
    'addKarmaToWatchTask',
    'watch'
  ]);

  // compile production ready assets to dist/
  grunt.registerTask('production', [
    'clean:production',
    'build',
    'styles:development',
    'cssmin',
    'copy:prepareBuild',
    'requirejs:production',
    'connect:production'
  ]);

  // aliased as npm test, and therefore used by travis ci
  grunt.registerTask('test', [
    'build',
    'karma:ci'
  ]);

  // run tests one time in chrome, firefox, safari
  grunt.registerTask('test-deploy', [
    'build',
    'karma:deploy'
  ]);

  // manually run grunt within a terminal window, provides nicer UI output
  // than karma
  grunt.registerTask('test-mocha-phantomjs', [
    'build',
    'connect:CIServer',
    'mocha_phantomjs'
  ]);

  require('load-grunt-config')(grunt, {
    configPath: __dirname + '/tasks/options'
  });

};
