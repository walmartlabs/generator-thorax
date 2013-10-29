var grunt = require('grunt');

module.exports = {
  glob_to_multiple: {
    expand: true,
    flatten: true,
    cwd: grunt.config('paths.js'),
    src: ['*.coffee'],
    dest: 'public/js/',
    ext: '.js'
  }
};