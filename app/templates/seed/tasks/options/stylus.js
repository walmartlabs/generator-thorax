var grunt = require('grunt');

module.exports = {
  compile: {
    files: [{
      expand: true,
      cwd: grunt.config('paths.css'),
      src: ['*.styl'],
      dest: grunt.config('paths.output.css'),
      ext: '.css'
    }]
  }
};