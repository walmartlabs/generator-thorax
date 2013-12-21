var grunt = require('grunt');

module.exports = {
  options: {
    force: true
  },
  app: {
    src: [
      grunt.config('paths.js') + '/js/**/*.js',
      'test/**/*.js',
      '!tmp*/**/*'
    ],
    options: { jshintrc: '.jshintrc' }
  },
  server: {
    src: [
      grunt.config('paths.server') + '/**/*.js'
    ],
    options: { jshintrc: grunt.config('paths.server') + '/.jshintrc' }
  }
};