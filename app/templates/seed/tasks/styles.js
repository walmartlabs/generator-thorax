module.exports = function(grunt) {
  grunt.registerTask('styles', [
    'copy:styles'<% if (includeBootstrap && styleProcessor !== 'less') { %>,
    'copy:bootstrap'<% } %><% if (styleProcessor !== 'none') { %>,
    '<%= styleProcessor %>'<% } %>
  ]);
};