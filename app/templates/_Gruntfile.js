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

  grunt.loadNpmTasks('thorax-inspector');
  grunt.loadTasks('tasks');

  grunt.registerTask('styles:development', [
    'clean:styles',
    'styles'
  ]);

  grunt.registerTask('build', [
    'ensure-installed',
    'jshint:all'
  ]);

  /**
   * livereload tests + app + jshint when saving a file
   */
  grunt.registerTask('default', [
    'build',
    'styles:development',
    'thorax:inspector',
    'connect:development',
    'watch'
  ]);

  /**
   * same as default `grunt` but also runs karma tests on file save
   *
   * a faster approach is to actually run the default task and in a seperate
   * terminal run `karma start` which will bypass grunt's slow file watching,
   * shaving off about a second on autoreload, however, you'll need to deal
   * with having to restart two different windows in the event of something
   * drastic.
   */
  grunt.registerTask('autotest', [
    'build',
    'styles:development',
    'thorax:inspector',
    'karma:server',
    'connect:development',
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
