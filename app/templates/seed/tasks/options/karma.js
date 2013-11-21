module.exports = {
  options: {
    configFile: 'karma.conf.js'
  },
  server: {
    background: true
  },
  ci: {
    singleRun: true,
    browsers: ['PhantomJS']
  },
  deploy: {
    singleRun: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari']
    // for IE on windows support checkout https://github.com/karma-runner/karma-ie-launcher
  }
};