var grunt = require('grunt');

/**
 * Appends 'karma:server:run' to the scripts configuration
 * object of the watch task.
 */
grunt.registerTask('addKarmaToWatchTask', function() {
  grunt.util._.forIn(grunt.config('watch'), function(config, key) {
    if (key === 'scripts') {
      config.tasks.push('karma:server:run');
      grunt.config('watch.' + key, config);
    }
  });
});