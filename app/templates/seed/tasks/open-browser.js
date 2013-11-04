module.exports = function(grunt) {

  var hostname = grunt.config('settings.hostname');
  var port = grunt.config('settings.port');

  grunt.registerTask('open-browser', function () {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });
};