var grunt = require('grunt');

module.exports = {
  inspector: {
    editor: 'subl',
    background: true,
    paths: {
      views: grunt.config('paths.views'),
      models: grunt.config('paths.models'),
      collections: grunt.config('paths.collections'),
      templates: grunt.config('paths.templates')
    }
  }
};