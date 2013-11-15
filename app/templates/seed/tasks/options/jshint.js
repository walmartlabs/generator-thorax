module.exports = {
  all: {
    src: [
      'js/**/*.js',
      'test/**/*.js',
      '!tmp*/**/*',
      'Gruntfile.js',
      'tasks/**/*.js'
    ],
    options: { jshintrc: '.jshintrc' }
  },
  options: {
    force: true
  }
};