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
    liveReloadPort: process.env.LRPort || 35729,
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

  grunt.registerTask('default', [
    'build',
    'styles:development',
    'thorax:inspector',
    'karma:server',
    'connect:development',
    'open-browser:dev',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean:production',
    'build',
    'styles:development',
    'cssmin',
    'copy:baseUrl',
    'requirejs:production',
    'open-browser:dist',
    'connect:production'
  ]);

  grunt.registerTask('test', [
    'build',
    'karma:ci'
  ]);

  grunt.registerTask('testDeploy', [
    'build',
    'karma:deploy'
  ]);

  grunt.registerTask('phtest', [
    'build',
    'connect:CIServer',
    'mocha_phantomjs'
  ]);

  require('load-grunt-config')(grunt, {
    configPath: __dirname + '/tasks/options'
  });

};
