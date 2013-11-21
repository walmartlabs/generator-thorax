module.exports = function(grunt) {

  var hostname = grunt.config('settings.hostname');
  var port = grunt.config('settings.port');

  grunt.registerTask('open-browser', function (env) {
    var open = require('open');
    if (env === 'dev') { open('http://' + hostname + ':' + port + '/test/'); }
    if (env === 'dist') { open('http://' + hostname + ':' + port); }

  });
};