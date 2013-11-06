var grunt = require('grunt');

module.exports = {
  combine: {files: {'dist/screen.css': [grunt.config('paths.output.css') + '/**/*.css']}}
};
