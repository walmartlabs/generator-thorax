var grunt = require('grunt');

module.exports = {
  development: [
    grunt.config('paths.output.js'),
    grunt.config('paths.output.css')
  ],
  production: [
    grunt.config('paths.tmpDist'),
    grunt.config('paths.dist') + '/*',
    '!' + grunt.config('paths.dist') + '/index.html'
  ]
};