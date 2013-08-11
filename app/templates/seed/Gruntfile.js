module.exports = function(grunt) {
  var port       = process.env.PORT || 8000;
  var publicDir  = './public';
  var modulesDir = publicDir + '/modules';
  var hostname   = 'localhost';
  var templates  = {};
  var modules    = [];

  // Register required tasks
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('thorax-inspector');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Set up the templates object for Handlebars
  grunt.file.glob.sync('templates/**/*.{handlebars,hbs}').forEach(function (file) {
    templates[modulesDir + '/' + file.replace(/\.(?:handlebars|hbs)$/, '.js')] = file;
  });

  modules.push({
    name: 'base',
    include: [
      '../../bower_components/curl/dist/curl/curl.js',
      'routes'
    ]
  });

  grunt.util._.each(grunt.file.readJSON('routes.json'), function (file) {
    modules.push({
      name:    file,
      exclude: ['base']
    });
  });

  grunt.initConfig({
    modulesDir: modulesDir,

    clean: {
      modules: [ '<%= modulesDir %>' ]
    },

    concat: {
      style: {
        files: {
          '<%= modulesDir %>/base.css': [
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
          base:     publicDir,
          port:     port
        }
      }
    },

    thorax: {
      inspector: {
        editor:     'subl',
        background: true,
        paths: {
          views:       './js/views',
          models:      './js/models',
          collections: './js/collections',
          templates:   './templates'
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          appDir:       'js/',
          baseUrl:      './',
          dir:          '<%= modulesDir %>',
          optimize:     'none',
          keepBuildDir: true,
          modules:      modules,
          paths: {
            'jquery':     '../bower_components/jquery/jquery',
            'underscore': '../bower_components/underscore/underscore',
            'handlebars': '../bower_components/handlebars/handlebars.runtime',
            'backbone':   '../bower_components/backbone/backbone',
            'thorax':     '../bower_components/thorax/thorax',
            'bootstrap':  '../bower_components/bootstrap/js/bootstrap'
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
          }
        }
      }
    },

    handlebars: {
      templates: {
        options: {
          namespace: false,
          amd:       true
        },
        files: templates
      }
    },

    'require-router': {
      routes: {
        routes: grunt.file.readJSON('routes.json'),
        output: '<%= modulesDir %>/routes.js'
      }
    },

    watch: {
      handlebars: {
        files: ['templates/**/*.hbs'],
        tasks: ['handlebars:templates']
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['requirejs:compile'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['stylesheets/**/*.css'],
        tasks: ['concat:style'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('open-browser', function () {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:modules',
    'concat:style',
    'handlebars:templates',
    'require-router:routes',
    'requirejs:compile',
    'thorax:inspector',
    'connect:server',
    'open-browser',
    'watch'
  ]);
};
