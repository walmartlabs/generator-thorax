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
    liveReloadPort: 35729 || process.env.LRPort,
    port: process.env.PORT || 8000,
    hostname: 'localhost',
    templates: {},
    paths: {
      'public': 'public',
      dist: 'dist',
      tmpDist: 'tmpDist',
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

  grunt.registerTask('scripts:development', [
    'clean:scripts',
    'copy:requirejs',
    'templates:public/js',
    'requirejs:development'
  ]);

  grunt.registerTask('styles:development', [
    'clean:styles',
    'styles'
  ]);

  grunt.registerTask('default', [
    'ensure-installed',
    'scripts:development',
    'styles:development',
    'thorax:inspector',
    'connect:development',
    'open-browser',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean:production',
    'styles',
    'cssmin',
    'templates:tmpDist',
    'copy:tmpDist',
    'requirejs:production',
    'open-browser',
    'connect:production'
  ]);

  require('load-grunt-config')(grunt, {
    configPath: __dirname + '/tasks/options'
  });

};
