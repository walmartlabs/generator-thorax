// TODO: see NOTE_ABOUT_COMMENTS.md

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

  grunt.loadNpmTasks('thorax-inspector'); // TODO: remove livereload issue
  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:development',
    'styles',
    'templates:public/js',
    'copy:requirejs',
    'requirejs:development',
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
