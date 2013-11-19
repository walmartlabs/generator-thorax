var grunt = require('grunt');

module.exports = {
  styles: [
    grunt.config('paths.output.css')
  ],
  production: [
    grunt.config('paths.tmp'),
    grunt.config('paths.dist') + '/*',
    '!' + grunt.config('paths.dist') + '/index.html'
  ]
};