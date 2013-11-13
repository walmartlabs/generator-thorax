var grunt = require('grunt');

module.exports = {
  development: {
    options: {},
    files: [{
      expand: true,
      cwd: grunt.config('paths.css'),
      src: ['base.less'],
      dest: grunt.config('paths.output.css'),
      ext: '.css'
    }]
  }
};