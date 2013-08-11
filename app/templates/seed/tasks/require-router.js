/*
 * grunt-require-routes
 * https://github.com/blakeembrey/grunt-require-routes
 *
 * Copyright (c) 2013 Blake Embrey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('require-router', function () {
    var output = this.data.output,
        routes = this.data.routes,
        options;

    if (typeof routes !== 'object') {
      throw new Error('A route object is required.');
    }

    // Merge task-specific and/or target-specific options with these defaults.
    options = this.options({});

    var snippet = grunt.util._.template(
      grunt.file.read(__dirname + '/tools/_require-router.js'),
      { routes: JSON.stringify(routes) }
    );

    grunt.file.write(output, snippet);
  });
};
