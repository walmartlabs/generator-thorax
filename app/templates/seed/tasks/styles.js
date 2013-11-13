module.exports = function(grunt) {
  grunt.registerTask('styles', [
    'copy:styles'<% if (includeBootstrap && styleProcessor === 'none') { %>,
    'copy:bootstrap'<% } %><% if (styleProcessor !== 'none') { %>,
    '<%= styleProcessor %>'<% } %>
  ]);
};