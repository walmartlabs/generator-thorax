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
        collections: 'js/collections',
        tests: 'spec'
      };

  // Register required tasks
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('thorax-inspector');
  require('matchdep').filterDev('grunt-*').forEach(function(task) {
    if (task !== 'grunt-cli') {
      grunt.loadNpmTasks(task);
    }
  });

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
      requirejs: {
        files: [
          {
            src: 'bower_components/requirejs/require.js',
            dest: 'public/js/require.js'
          }
        ]
      },
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
            src: ['bower_components/bootstrap/dist/js/bootstrap.js'],
            dest: 'public/js/bootstrap.js'
          },
          {
            src: ['bower_components/bootstrap/dist/css/bootstrap.css'],
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
      development: {
        options: {
          hostname: hostname,
          base: paths.public,
          port: port
        }
      },
      production:  {
        options: {
          hostname: hostname,
          base: paths.public,
          port: port,
          keepalive: true
        }
      },
      'test-server': {
        options: {
          hostname: hostname,
          base: paths.tests,
          port: 8981,
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
      development: getRequireJSOptions('development'),
      production: getRequireJSOptions('production')
    },
    handlebars: {
      templates: {
        options: {
          namespace: false,
          amd: true
        }
      }
    },<% if (includeCoffeeScript) { %>
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: paths.js,
        src: ['*.coffee'],
        dest: 'public/js/',
        ext: '.js'
      }
    },<% } %><% if (styleProcessor === 'sass') { %>
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: paths.css,
          src: ['*.scss'],
          dest: paths.output.css,
          ext: '.css'
        }]
      }
    },<% } else if (styleProcessor === 'less') { %>
    less: {
      development: {
        options: {},
        files: [{
          expand: true,
          cwd: paths.css,
          src: ['*.less'],
          dest: paths.output.css,
          ext: '.css'
        }]
      },
      production: {
        options: {},
        files: [{
          expand: true,
          cwd: paths.css,
          src: ['*.less'],
          dest: paths.output.css,
          ext: '.css'
        }]
      }
    },<% } else if (styleProcessor === 'stylus') { %>
    stylus: {
      compile: {
        files: [{
          expand: true,
          cwd: paths.css,
          src: ['*.styl'],
          dest: paths.output.css,
          ext: '.css'
        }]
      }
    },<% } %>
    // test runner
    mocha_phantomjs: {
      all: {
        options: {
          mocha: {
            ignoreLeaks: false
          },
          urls: ['http://' + hostname + ':8981/test.html']
        }
      }
    },
    watch: {
      handlebars: {
        files: [paths.templates + '/**/*.hbs'],
        tasks: ['templates']
      <% if (includeCoffeeScript) { %>},
      coffee: {
        files: paths.js + '/**/*.coffee',
        tasks: ["coffee"]
      <% } %>},
      scripts: {
        files: [
          paths.js + '/**/*.js'
        ],
        tasks: ['scripts:development']
      },
      tests: {
        files: [paths.test + '/**/*.js'],
        tasks: ['test']
      },
      styles: {
        files: [paths.css + '/**/*'],
        tasks: ['styles']
      }
    }
  });

  function getRequireJSOptions(env) {
    var options = {
      appDir: paths.js,
      baseUrl: './',
      dir: paths.output.js,
      modules: [
        {
          name: 'main'
        }
      ],
      paths: {
        <% if (!useZepto) { %>'jquery': '../bower_components/jquery/jquery',<% } %>
        <% if (useZepto) { %>'zepto': '../bower_components/zepto/zepto',<% } %>
        'underscore': '../bower_components/underscore/underscore',
        'handlebars': '../bower_components/handlebars/handlebars.runtime',
        'backbone': '../bower_components/backbone/backbone',
        'thorax': '../bower_components/thorax/thorax',
        'bootstrap': '../bower_components/bootstrap/js/bootstrap'
      }<% if (includeCoffeeScript) { %>,
      packages: [
        // include the requirejs coffeescript plugin and the coffeescript compiler
        {
          name: 'cs',
          location: '../../bower_components/require-cs',
          main: 'cs'
        },
        {
          name: 'coffee-script',
          location: '../../bower_components/require-cs',
          main: 'coffee-script'
        }
      ],
      //Stub out the cs module after a build since
      //it will not be needed.
      stubModules: ['cs']<% } %>,
      shim: {
        'handlebars': {
          exports: 'Handlebars'
        },
        'backbone': {
          exports: 'Backbone',
        <% if (!useZepto) { %>deps: ['jquery', 'underscore']<% } %>
        <% if (useZepto) { %>deps: ['zepto', 'underscore']<% } %>
        },
        'underscore': {
          exports: '_'
        },
        'thorax': {
          exports: 'Thorax',
          deps: ['handlebars', 'backbone']
        },
        'bootstrap': {
        <% if (!useZepto) { %>deps: ['jquery']<% } %>
        <% if (useZepto) { %>deps: ['zepto']<% } %>
        }
        <% if (useZepto) { %>
        ,
        'zepto': {
          exports: '$'
        }
        <% } %>
      }
    };
    if (env === 'production') {
      /*
      TODO
      options.keepBuildDir = true;
      options.optimize = 'uglify';
      */
    }
    if (env === 'development') {
      options.keepBuildDir = true;
      options.optimize = 'none';
    }
    return {
      options: options
    };
  }

  grunt.registerTask('open-browser', function () {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });

  grunt.registerTask('scripts:development', [
    'copy:requirejs',
    'requirejs:development'
  ]);

  grunt.registerTask('scripts:production', [
    'copy:requirejs',
    'requirejs:production'
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
    'copy:bootstrap'<% } %><% if (styleProcessor !== 'none') { %>,
    <%= styleProcessor %><% } %>
  ]);

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:output',
    'create-output-directories',
    'styles',
    'templates',
    'scripts:development',
    'thorax:inspector',
    'connect:development',
    'test',
    'open-browser',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean:output',
    'create-output-directories',
    'styles',
    'templates',
    'scripts:production',
    'open-browser',
    'connect:production'
  ]);

  grunt.registerTask('test', [
    'connect:test-server',
    'mocha_phantomjs'
  ]);
};
