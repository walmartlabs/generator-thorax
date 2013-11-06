var grunt = require('grunt');

module.exports = {
  options: {
    livereload: grunt.config('settings.liveReloadPort'),
    files: ['public/**/*']
  },
  handlebars: {
    files: [grunt.config('paths.templates') + '/**/*.{hbs,handlebars}'],
    tasks: ['scripts:development']
  },
  scripts: {
    files: [
      grunt.config('paths.js') + '/**/*.{js,coffee}'
    ],
    tasks: ['scripts:development']
  },
  styles: {
    files: [grunt.config('paths.css') + '/**/*.{css,sass,scss,less,styl}'],
    tasks: ['styles:development']
  }
};