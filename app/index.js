var fs   = require('fs');
var path = require('path');
var util = require('util');
var path = require('path');
var Base = require('../lib/base');

var ThoraxGenerator = module.exports = function (args, options, config) {
  Base.apply(this, arguments);

  this.prompts.push({
    type: 'confirm',
    name: 'newDirectory',
    message: 'Would you like to generate the app in a new directory?',
    default: true
  });

  this.prompts.push({
    type: 'list',
    name: 'styleProcessor',
    choices: ['none', 'less', 'sass', 'stylus'],
    message: 'Would you like to set up your project with a style preprocessor (choose "none" for plain css)',
    default: 'none'
  });

  this.prompts.push({
    type: 'confirm',
    name: 'includeBootstrap',
    message: 'Would you like to include Bootstrap?',
    default: true
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
  this.mkdir('public/js');
  this.mkdir('public/css');

  this.mkdir('css');
  this.copy('seed/css/base.css', 'css/base.css');

  this.mkdir('tasks');
  this.copy('seed/tasks/ensure-installed.js', 'tasks/ensure-installed.js');

  this.mkdir('js');
  this.mkdir('js/templates');
  this.mkdir('js/views');
  this.mkdir('js/models');
  this.mkdir('js/collections');

  this.copy('seed/js/views/root' + scriptExt, 'js/views/root' + scriptExt);
  this.copy('seed/js/templates/helpers.js', 'js/templates/helpers.js');
  this.copy('seed/js/views/view-helpers.js', 'js/views/view-helpers.js');
  this.copy('seed/js/templates/root.hbs', 'js/templates/root.hbs');
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
