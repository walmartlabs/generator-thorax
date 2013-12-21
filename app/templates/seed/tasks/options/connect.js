var grunt = require('grunt'),
    path = require('path'),
    openUrl = 'http://' + grunt.config('settings.hostname') +
              ':' + grunt.config('settings.port');

module.exports = {
  development: {
    options: {
      hostname: grunt.config('settings.hostname'),
      port: grunt.config('settings.port'),
      middleware: devMiddlewares,
      open: openUrl
    }
  },
  production:  {
    options: {
      hostname: grunt.config('settings.hostname'),
      base: grunt.config('paths.dist'),
      port: grunt.config('settings.port'),
      keepalive: true,
      open: openUrl
    }
  },
  CIServer: {
    options: {
      base: '.',
      port: grunt.config('settings.mochaPhantomPort'),
    }
  }
};

/**
 * Express middleware to inject into dev connect server
 *
 * @see api/app.js for more information on customizing it
 */
var serverPath = path.join(path.resolve(__dirname, '../..'), 'server/server'),
    server = require(serverPath);

function devMiddlewares(connect, options) {
  return [
    require('connect-livereload')({port: grunt.config('settings.liveReloadPort')}),
    connect().use(server)
  ];
}