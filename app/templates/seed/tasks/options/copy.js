var grunt = require('grunt');

module.exports = {
  requirejs: {
    files: [
      {
        src: 'bower_components/requirejs/require.js',
        dest: grunt.config('paths.output.js') + '/require.js'
      }
    ]
  },
  tmpDist: { // copy files to tmpDist/ prior to creating a production build
    files: [
      { // copy js to tmpDist/ before compiling
        expand: true,
        cwd: grunt.config('paths.js'),
        src: ['**', '!templates/**'],
        dest: grunt.config('paths.tmpDist')
      },
      { // copy almond to tmpDist/ before compiling
        src: 'bower_components/almond/almond.js',
        dest: grunt.config('paths.tmpDist') + '/almond.js'
      }
    ]
  },
  styles: {
    files: [
      {
        expand: true,
        cwd: grunt.config('paths.css'),
        src: '*.css',
        dest: grunt.config('paths.output.css')
      }
    ]
  },
  bootstrap: {
    files: [
      {
        src: ['bower_components/bootstrap/dist/js/bootstrap.js'],
        dest: grunt.config('paths.output.js') + '/bootstrap.js'
      },
      {
        src: ['bower_components/bootstrap/dist/css/bootstrap.css'],
        dest: grunt.config('paths.output.css') + '/bootstrap.css'
      }
      // TODO: add font support for bootstrap.
      // - Reference fonts in public/index.html
      // - Copy fonts to dist/fonts during dist build
      // - Reference fonts in dist/index.html
      // {
      //   expand: true,
      //   src: ['bower_components/bootstrap/fonts/*'],
      //   dest: 'public/fonts'
      // }
    ]
  }
};