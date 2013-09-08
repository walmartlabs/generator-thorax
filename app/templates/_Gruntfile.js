module.exports = function(grunt) {
  grunt.option('stack', true);

  var port = process.env.PORT || 8000,
      hostname = 'localhost',
      templates = {},
      paths = {
        'public': 'public',
        output: {
          js: 'public/js',
          css: 'public/css'
        },
        js: 'js',
        css: 'css',
        templates: 'js/templates',
        views: 'js/views',
        models: 'js/models',
        collections: 'js/collections'
      };

  // Register required tasks
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('thorax-inspector');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    paths: paths,
    clean: {
      output: [
        paths.output.js,
        paths.output.css
      ]
    },
    copy: {
      styles: {
        files: [
          {
            expand: true,
            cwd: paths.css,
            src: '*.css',
            dest: paths.output.css
          }
        ]
      }<% if (includeBootstrap) { %>,
      bootstrap: {
        files: [
          {
            expand: true,
            src: ['bower_components/bootstrap/css/bootstrap.css'],
            dest: 'public/css/bootstrap.css'
          },
          {
            expand: true,
            src: ['bower_components/bootstrap/fonts/*'],
            dest: 'public/fonts'
          }
        ]
      }<% } %>
    },
    connect: {
      server: {
        options: {
          hostname: hostname,
          base: paths.public,
          port: port
        }
      }
    },
    thorax: {
      inspector: {
        editor: 'subl',
        background: true,
        paths: {
          views: paths.views,
          models: paths.models,
          collections: paths.collections,
          templates: paths.templates
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: paths.js,
          baseUrl: './',
          dir: paths.output.js,
          optimize: 'none',
          keepBuildDir: true,
          modules: [
            {
              name: 'init',
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
          }
        }
      }
    },
    handlebars: {
      templates: {
        options: {
          namespace: false,
          amd: true
        }
      }
    },
    watch: {
      handlebars: {
        files: [paths.templates + '/**/*.hbs'],
        tasks: ['templates']
      },
      scripts: {
        files: [
          paths.js + '/**/*.js'
        ],
        tasks: ['scripts']
      },
      styles: {
        files: [paths.css + '/**/*'],
        tasks: ['copy:styles']
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

  grunt.registerTask('update-templates-list', function() {
    // Set up the templates object for Handlebars
    grunt.file.glob.sync(paths.templates + '/**/*.{handlebars,hbs}').forEach(function (file) {
      var target = paths.output.js + '/templates' + file.substr(paths.templates.length).replace(/\.(?:handlebars|hbs)$/, '.js');
      templates[target] = file;
    });
    grunt.config.set('handlebars.templates.files', templates);
  });

  grunt.registerTask('create-output-directories', function() {
    grunt.file.mkdir('public/js');
    grunt.file.mkdir('public/css');
  });

  grunt.registerTask('templates', [
    'update-templates-list',
    'handlebars:templates'
  ]);

  grunt.registerTask('styles', [
    'copy:styles'<% if (includeBootstrap) { %>,
    'copy:bootstrap'<% } %>
  ]);

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:output',
    'create-output-directories',
    'styles',
    'templates',
    'scripts',
    'thorax:inspector',
    'connect:server',
    'open-browser',
    'watch'
  ]);
};
