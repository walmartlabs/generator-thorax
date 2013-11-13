var grunt = require('grunt');

module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: grunt.config('paths.css'),
      src: ['base.{sass,scss}'],
      dest: grunt.config('paths.output.css'),
      ext: '.css'
    }]
  }
};