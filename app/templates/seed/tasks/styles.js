module.exports = function(grunt) {
  grunt.registerTask('styles', [
    'copy:styles'<% if (includeBootstrap) { %>,
    'copy:bootstrap'<% } %><% if (styleProcessor !== 'none') { %>,
    '<%= styleProcessor %>'<% } %>
  ]);
};