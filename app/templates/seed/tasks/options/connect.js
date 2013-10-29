var grunt = require('grunt');

module.exports = {
  development: {
    options: {
      hostname: grunt.config('settings.hostname'),
      base: grunt.config('paths.public'),
      port: grunt.config('settings.port'),
      middleware: function (connect, options) {
        return [
          require('connect-livereload')({port: grunt.config('settings.liveReloadPort')}),
          connect['static'](options.base),
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
  }
};