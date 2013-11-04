var grunt = require('grunt');

module.exports = {
  // TODO: use dynamic path lookup, eg, paths.distOutput.css for key
  combine: {files: {'dist/screen.css': [grunt.config('paths.css') + '/**/*.css']}}
};
