var grunt = require('grunt');

module.exports = {
  scripts: [
    grunt.config('paths.output.js')
  ],
  styles: [
    grunt.config('paths.output.css')
  ],
  production: [
    grunt.config('paths.tmpDist'),
    grunt.config('paths.dist') + '/*',
    '!' + grunt.config('paths.dist') + '/index.html'
  ]
};