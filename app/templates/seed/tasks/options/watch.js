var grunt = require('grunt');

module.exports = {
  options: { // livereload will run after all watch tasks finish
    livereload: grunt.config('settings.liveReloadPort'),
    debounceDelay: 0,
    interval: 20
  },
  styles: { // watch all styles and rebuild when change
    files: [grunt.config('paths.css') + '/**/*.{css,sass,scss,less,styl}'],
    tasks: ['styles:development']
  },
  scripts: { // any js/cs files change? lint + run karma
    files: [
      grunt.config('paths.js') + '/**/*.{js,coffee}',
      grunt.config('paths.templates') + '/**/*.{hbs,handlebars}',
      'test/**/*',
      'require-config.js'
    ],
    tasks: ['jshint:all', 'karma:server:run']
  },
  other: { // images, fonts change? livereload browser
    files: [
      'public/**/*'
    ]
  }
};