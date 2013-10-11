fs    = require 'fs'
path  = require 'path'
bower = require 'bower'

module.exports = (grunt) ->
  grunt.registerTask 'ensure-installed', ->
    complete = this.async()
    if not fs.existsSync path.join __dirname, '..', 'bower_components'
      bower.commands.install().on 'data', (data) ->
        process.stdout.write(data);
      .on 'error', (data) ->
        process.stderr.write(data)
      .on 'end', (data) ->
        process.stdout.write(data) if data
        complete()
    else
      complete()
