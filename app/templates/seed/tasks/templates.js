module.exports = function(grunt) {

  grunt.registerTask('templates', function(outputDir) {
    templatesList(outputDir);
    grunt.task.run('clean:templates');
    grunt.task.run('handlebars:templates');
  });

  var paths = {templates: grunt.config('paths.templates')};
  var templates = grunt.config('settings.templates');

  function templatesList(outputDir) {
    if (arguments.length === 0) { throw new Error('update-templates-list must be provided the output directory as a colong seperated object(defined on paths ideally)'); }
    // Set up the templates object for Handlebars
    grunt.file.glob.sync(paths.templates + '/**/*.{handlebars,hbs}').forEach(function (file) {
      var target = outputDir + '/templates' + file.substr(paths.templates.length).replace(/\.(?:handlebars|hbs)$/, '.js');
      templates[target] = file;
    });
    grunt.config.set('handlebars.templates.files', templates);
  }
};