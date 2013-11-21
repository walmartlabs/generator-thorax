var fs   = require('fs');
var path = require('path');
var util = require('util');
var path = require('path');
var Base = require('../lib/base');

var ThoraxGenerator = module.exports = function (args, options, config) {
  Base.apply(this, arguments);

  this.on('end', function () {
    this._sanitizeBowerJSON();
    this._sanitizePackageJSON();

    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });
};

util.inherits(ThoraxGenerator, Base);

ThoraxGenerator.prototype._name  = 'application';
ThoraxGenerator.prototype.askFor = Base.prototype._askFor;

ThoraxGenerator.prototype.directory = function () {
  if (!this.newDirectory) { return; }

  this._checkAndCreateDirectory(this._.dasherize(this.name), this.async());
};

ThoraxGenerator.prototype.askForModuleLoader = function () {
  var cb = this.async();

  var prompts = [{
    type: 'list',
    name: 'moduleLoaderChoice',
    message: "Which module loader would you like to use?",
    choices: [{
      name: "Lumbar",
      value: 'lumbar'
    }, {
      name: 'Require JS',
      value: 'rjs'
    }],
    default: 'rjs'
  }];

  this.prompt(prompts, function (props) {

    var choices = props.moduleLoaderChoice;

    if (choices.indexOf('lumbar') !== -1) {
      this.isLumbar = true;
    } else {
      this.isRJS = true;
    }

    cb();
  }.bind(this));
};

ThoraxGenerator.prototype.isRJSFeatures = function () {
  this.prompts.push({
    type: 'confirm',
    name: 'newDirectory',
    message: 'Would you like to generate the app in a new directory?',
    default: true
  });

  this.prompts.push({
    type: 'list',
    name: 'styleProcessor',
    choices: ['less', 'sass', 'stylus', 'none'],
    message: "Choose a css pre-processor\n" +
              "Notes:\n" +
                "* 'less' will include bootstrap by default\n" +
                "* 'none' means plain css",
    default: 'less'
  });

  this.prompts.push({
    type: 'confirm',
    name: 'includeCoffeeScript',
    message: 'Would you like to use CoffeeScript?',
    default: false
  });

  this.prompts.push({
    type: 'confirm',
    name: 'useZepto',
    message: 'Would you like to use Zepto in place of jQuery (Zepto is best for mobile apps)',
    default: false
  });

  this.prompts.push({
    type: 'list',
    name: 'starterApp',
    choices: ["Hello World", "Todo List", "None"],
    message: 'Would you like to setup your project with a sample application?',
    default: "Hello World"
  });

};

ThoraxGenerator.prototype._checkAndCreateDirectory = function (directory, cb) {
  var prompts = [{
    type: 'input',
    name: 'directoryName',
    message: 'Directory already exists, enter a new name:'
  }];

  if (!directory) {
    prompts[0].message = 'A directory name is required';

    return this.prompt(prompts, function (props) {
      this._checkAndCreateDirectory(props.directoryName, cb);
    }.bind(this));
  }

  fs.exists(path.join(this.destinationRoot(), directory), function (exists) {
    // If the directory doesn't already exist, create a new directory and set
    // the base destination path here
    if (!exists) {
      this.mkdir(directory);
      this.destinationRoot(directory);
      this.newDirectory = false;
      return cb();
    }

    return this.prompt(prompts, function (props) {
      this._checkAndCreateDirectory(props.directoryName, cb);
    }.bind(this));
  }.bind(this));
};

ThoraxGenerator.prototype.app = function () {
  var scriptExt = this.includeCoffeeScript ? '.coffee' : '.js';

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');

  this.mkdir('public');
  this.mkdir('public/img');
  this.mkdir('public/fonts');

  this.mkdir('css');
  if (this.styleProcessor === 'none') {
    this.copy('seed/css/base.css', 'css/base.css');
  }

  if (this.styleProcessor === 'less') {
    this.copy('seed/tasks/options/less.js', 'tasks/options/less.js');
    this.copy('seed/css/base.css', 'css/base.less');
  }
  if (this.styleProcessor === 'sass') {
    this.copy('seed/tasks/options/sass.js', 'tasks/options/sass.js');
    this.copy('seed/css/base.css', 'css/base.scss');
  }
  if (this.styleProcessor === 'stylus') {
    this.copy('seed/tasks/options/stylus.js', 'tasks/options/stylus.js');
    this.copy('seed/css/base.css', 'css/base.styl');
  }

  this.mkdir('dist');
  this.copy('seed/dist/index.html', 'dist/index.html');

  this.mkdir('tasks');
  this.copy('seed/tasks/ensure-installed.js', 'tasks/ensure-installed.js');
  this.copy('seed/tasks/open-browser.js', 'tasks/open-browser.js');
  this.copy('seed/tasks/styles.js', 'tasks/styles.js');

  this.mkdir('tasks/options');
  this.copy('seed/tasks/options/clean.js', 'tasks/options/clean.js');
  this.copy('seed/tasks/options/connect.js', 'tasks/options/connect.js');
  this.copy('seed/tasks/options/copy.js', 'tasks/options/copy.js');
  this.copy('seed/tasks/options/cssmin.js', 'tasks/options/cssmin.js');
  this.copy('seed/tasks/options/requirejs.js', 'tasks/options/requirejs.js');
  this.copy('seed/tasks/options/thorax.js', 'tasks/options/thorax.js');
  this.copy('seed/tasks/options/watch.js', 'tasks/options/watch.js');

  this.mkdir('js');
  this.mkdir('js/templates');
  this.mkdir('js/views');
  this.mkdir('js/models');
  this.mkdir('js/collections');

  this.copy('seed/js/views/root' + scriptExt, 'js/views/root' + scriptExt);
  this.copy('seed/js/helpers.js', 'js/helpers.js');
  this.copy('seed/js/templates/root.hbs', 'js/templates/root.hbs');

  this.copy('_server.js', 'server.js');
  this.copy('_Procfile', 'Procfile');

  this.copy('karma.conf.js');
  this.copy('seed/tasks/options/karma.js', 'tasks/options/karma.js');
  this.copy('seed/tasks/options/mocha_phantomjs.js', 'tasks/options/mocha_phantomjs.js');

  this.copy('seed/tasks/options/jshint.js', 'tasks/options/jshint.js');

  this.copy('seed/test/index.html', 'test/index.html');
  this.copy('seed/test/app.spec.js', 'test/app.spec.js');
  this.copy('seed/test/main.js', 'test/main.js');
  this.copy('seed/test/main.karma.js', 'test/main.karma.js');
  this.copy('seed/test/test-setup-all.js', 'test/test-setup-all.js');
  this.copy('seed/test/test-setup-browser.js', 'test/test-setup-browser.js');
  this.copy('seed/test/collections/.gitkeep', 'test/collections/.gitkeep');
  this.copy('seed/test/fixtures/.gitkeep', 'test/fixtures/.gitkeep');
  this.copy('seed/test/helpers/.gitkeep', 'test/helpers/.gitkeep');
  this.copy('seed/test/models/.gitkeep', 'test/models/.gitkeep');
  this.copy('seed/test/routers/.gitkeep', 'test/routers/.gitkeep');
  this.copy('seed/test/utils/.gitkeep', 'test/utils/.gitkeep');
  this.copy('seed/test/views/.gitkeep', 'test/views/.gitkeep');

  this.copy('seed/test/views/root.spec.js', 'test/views/root.spec.js');

  // TODO: cs support provided by default
  this.copy('seed/test/views/root-coffee.spec.coffee', 'test/views/root-coffee.spec.coffee');

  this.copy('seed/test/fixtures/adding-machine.hbs', 'test/fixtures/adding-machine.hbs');
  this.copy('seed/test/fixtures/example.hbs', 'test/fixtures/example.hbs');
  this.copy('seed/test/fixtures/example2.html', 'test/fixtures/example2.html');
  this.copy('seed/test/fixtures/example3.handlebars', 'test/fixtures/example3.handlebars');
  this.copy('seed/test/fixtures/get-excited.hbs', 'test/fixtures/get-excited.hbs');
  this.copy('seed/test/helpers/helpers.spec.js', 'test/helpers/helpers.spec.js');
  this.copy('seed/test/helpers/view-helpers.spec.js', 'test/helpers/view-helpers.spec.js');

  this.copy('main.js');
  this.copy('_travis.yml', '.travis.yml');
};

ThoraxGenerator.prototype.scripts = function () {
  var scriptExt = this.includeCoffeeScript ? '.coffee' : '.js';
  var scripts = ['view', 'collection-view', 'layout-view', 'model', 'collection'];
  scripts.forEach(function(script) {
    var name = script + scriptExt;
    this.template('_' + name, 'js/' + name);
  }, this);
  this.template('_main.js', 'js/main.js');
  this.template('_index.html', 'public/index.html');
};

ThoraxGenerator.prototype.projectFiles = function () {
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};

ThoraxGenerator.prototype.helloWorld = function() {
  var scriptExt = this.includeCoffeeScript ? '.coffee' : '.js';

  if (this.starterApp === 'Hello World') {
    this.mkdir('js/views/hello-world');
    this.mkdir('js/templates/hello-world');
    this.copy('seed/js/views/hello-world/index' + scriptExt, 'js/views/hello-world/index' + scriptExt);
    this.copy('seed/js/templates/hello-world/index.hbs', 'js/templates/hello-world/index.hbs');
    this.copy('seed/js/routers/hello-world' + scriptExt, 'js/routers/hello-world' + scriptExt);
    this.copy('seed/css/hello-world.css', 'css/hello-world.css');
  }
};

ThoraxGenerator.prototype.todoList = function() {
  var scriptExt = this.includeCoffeeScript ? '.coffee' : '.js';

  if (this.starterApp === 'Todo List') {
    this.mkdir('js/views/todo-list');
    this.mkdir('js/templates/todo-list');
    this.copy('seed/js/views/todo-list/index' + scriptExt, 'js/views/todo-list/index' + scriptExt);
    this.copy('seed/js/templates/todo-list/index.hbs', 'js/templates/todo-list/index.hbs');
    this.copy('seed/js/routers/todo-list' + scriptExt, 'js/routers/todo-list' + scriptExt);
    this.copy('seed/css/todo-list.css', 'css/todo-list.css');
  }
};

// We rendered the JSON files with a template, parse and stringify
// for ideal spacing
ThoraxGenerator.prototype._sanitizeBowerJSON = function() {
  var bowerJSONPath = path.join(this.destinationRoot(), 'bower.json');
  fs.writeFileSync(bowerJSONPath, JSON.stringify(JSON.parse(fs.readFileSync(bowerJSONPath)), null, 2));
};

ThoraxGenerator.prototype._sanitizePackageJSON = function() {
  var packageJSONPath = path.join(this.destinationRoot(), 'package.json');
  fs.writeFileSync(packageJSONPath, JSON.stringify(JSON.parse(fs.readFileSync(packageJSONPath)), null, 2));
};
