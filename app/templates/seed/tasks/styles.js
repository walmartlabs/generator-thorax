module.exports = function(grunt) {
  grunt.registerTask('styles', [
    'copy:styles'<% if (styleProcessor !== 'none') { %>,
    '<%= styleProcessor %>'<% } %>
  ]);
};