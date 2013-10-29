module.exports = function(grunt) {
  grunt.option('stack', true);

  var port = process.env.PORT || 8000,
      liveReloadPort = 35729,
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
  require('matchdep').filterDev('grunt-*').forEach(function(task) {
    if (task !== 'grunt-cli') {
      grunt.loadNpmTasks(task);
    }
  });

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    paths: paths,
    clean: {
      development: [paths.output.js, paths.output.css],
      production: ['tmpjs', 'dist/*', '!dist/index.html']
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
      tmpjs: {
        files: [
          {expand: true, cwd: 'js/', src: ['**', '!templates/**'], dest: 'tmpjs'},
          {src: 'bower_components/almond/almond.js', dest: 'tmpjs/almond.js'}
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
    cssmin: {
      combine: {files: {'dist/styles.css': ['css/**/*.css']}}
    },
    connect: {
      development: {
        options: {
          hostname: hostname,
          base: paths.public,
          port: port,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({port: liveReloadPort}),
              connect['static'](options.base),
              connect.directory(options.base)
            ];
          }
        }
      },
      production:  {
        options: {
          hostname: hostname,
          base: 'dist',
          port: port,
          keepalive: true
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
    <% if (includeCoffeeScript) { %>},
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: paths.js,
        src: ['*.coffee'],
        dest: 'public/js/',
        ext: '.js'
      }<% } %>
    },<% if (styleProcessor === 'sass') { %>
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
    },<% } %><% if (styleProcessor === 'less') { %>
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
    },<% } %><% if (styleProcessor === 'stylus') { %>
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
    watch: {
      options: {
        livereload: liveReloadPort,
        files: ['public/**/*']
      },
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
      styles: {
        files: [paths.css + '/**/*'],
        tasks: ['styles']
      }
    }
  });

  grunt.registerTask('open-browser', function () {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });

  grunt.registerTask('templates', function(outputDir) {
    templatesList(outputDir);
    grunt.task.run('handlebars:templates');
  });

  grunt.registerTask('styles', [
    'copy:styles'<% if (includeBootstrap) { %>,
    'copy:bootstrap'<% } %><% if (styleProcessor !== 'none') { %>,
    <%= styleProcessor %><% } %>
  ]);

  grunt.registerTask('default', [
    'ensure-installed',
    'clean:development',
    'styles',
    'templates:public/js',
    'copy:requirejs',
    'requirejs:development',
    // 'thorax:inspector', // shared port 35729 w/ livereload
    'connect:development',
    'open-browser',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean:production',
    'cssmin',
    'templates:tmpjs',
    'copy:tmpjs',
    'requirejs:production',
    'open-browser',
    'connect:production'
  ]);

  //helper functions

  function templatesList(outputDir) {
    if (arguments.length === 0) throw new Error('update-templates-list must be provided the output directory as a colong seperated object(defined on paths ideally)');
    // Set up the templates object for Handlebars
    grunt.file.glob.sync(paths.templates + '/**/*.{handlebars,hbs}').forEach(function (file) {
      var target = outputDir + '/templates' + file.substr(paths.templates.length).replace(/\.(?:handlebars|hbs)$/, '.js');
      templates[target] = file;
    });
    grunt.config.set('handlebars.templates.files', templates);
  }

  function getRequireJSOptions(env) {
    var options = {
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

    var devOptions = {
      appDir: paths.js,
      baseUrl: './',
      dir: paths.output.js,
      keepBuildDir: true,
      optimize: 'none',
      modules: [{name: 'main'}]
    };

    var prodOptions = {
      almond: true,
      name: 'requireLib',
      include: ['main'],
      baseUrl: 'tmpjs',
      out: 'dist/main.js',
      removeCombined: true,
      findNestedDependencies: true,
      optimize: 'uglify2'
    };

    if (env === 'development') merge(options, devOptions);
    if (env === 'production') {
      merge(options, prodOptions);
      options.paths.requireLib = 'almond';
    }

    return {
      options: options
    };
  }

  function merge(original, updates) {
    for (var prop in updates) {
      if (!updates.hasOwnProperty(prop)) { continue; }
      original[prop] = updates[prop];
    }
  }

};
