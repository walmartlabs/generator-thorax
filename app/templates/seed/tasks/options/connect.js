var grunt = require('grunt');

module.exports = {
  development: {
    options: {
      hostname: grunt.config('settings.hostname'),
      // base: grunt.config('paths.public'), // TODO: only need to serve public/ bower.., test/, not whole root
      port: grunt.config('settings.port'),
      middleware: function (connect, options) {
        return [
          require('connect-livereload')({port: grunt.config('settings.liveReloadPort')}),
          connect.static(options.base),
          connect.directory(options.base)
        ];
      }
    }
  },
  production:  {
    options: {
      hostname: grunt.config('settings.hostname'),
      base: grunt.config('paths.dist'),
      port: grunt.config('settings.port'),
      keepalive: true
    }
  },
  CIServer: {
    options: {
      base: '.',
      port: grunt.config('settings.mochaPhantomPort'),
    }
  }
};