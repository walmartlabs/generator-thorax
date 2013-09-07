module.exports = function(grunt) {
  var port = process.env.PORT || 8000;
  var publicDir = './public';
  var outputDir = publicDir + '/output';
  var hostname = 'localhost';
  var templates = {};
  var modules = [];

  // Register required tasks
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('thorax-inspector');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    modulesDir: outputDir,
    clean: {
      modules: [ '<%= outputDir %>' ]
    },
    concat: {
      style: {
        files: {
          '<%= outputDir %>/base.css': [
            'bower_components/bootstrap/css/bootstrap.css',
            'stylesheets/base.css'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: hostname,
          base: publicDir,
          port: port
        }
      }
    },
    thorax: {
      inspector: {
        editor: 'subl',
        background: true,
        paths: {
          views: './js/views',
          models: './js/models',
          collections: './js/collections',
          templates: './js/templates'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'js/',
          baseUrl: './',
          dir: '<%= outputDir %>',
          optimize: 'none',
          keepBuildDir: true,
          modules: [
            {
              name: 'base',
              include: [
                'init'
              ]
            }
          ],
          paths: {
            'jquery': '../bower_components/jquery/jquery',
            'underscore': '../bower_components/underscore/underscore',
            'handlebars': '../bower_components/handlebars/handlebars.runtime',
            'backbone': '../bower_components/backbone/backbone',
            'thorax': '../bower_components/thorax/thorax',
            'bootstrap': '../bower_components/bootstrap/js/bootstrap'
          },
          shim: {
            'handlebars': {
              exports: 'Handlebars'
            },
            'backbone': {
              exports: 'Backbone',
              deps: ['jquery', 'underscore']
            },
            'underscore': {
              exports: '_'
            },
            'thorax': {
              exports: 'Thorax',
              deps: ['handlebars', 'backbone']
            },
            'bootstrap': {
              deps: ['jquery']
            }
          },
          hbs: {
            disableI18n: true,
            disableHelpers: true,
            compileOptions: {
              data: true
            }
          }
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'js/**/*.js',
          'js/templates/**/*.hbs'
        ],
        tasks: ['scripts']
      },
      styles: {
        files: ['stylesheets/**/*.css'],
        tasks: ['concat:style']
      }
    }
  });

  grunt.registerTask('open-browser', function () {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });

  grunt.registerTask('scripts', [
    'requirejs:compile'
  ]);

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:modules',
    'concat:style',
    'scripts',
    'thorax:inspector',
    'connect:server',
    'open-browser',
    'watch'
  ]);
};
