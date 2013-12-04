var fs   = require('fs');
var path = require('path');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var marked = require('marked');
var chalk = require('chalk');

var ThoraxGenerator = module.exports = function (args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.on('end', function () {
    this._sanitizeBowerJSON();
    this._sanitizePackageJSON();

    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });
};

util.inherits(ThoraxGenerator, yeoman.generators.NamedBase);

/**
 * This prompt runs first. If chosen, it will bypass the remaining prompts
 * unless the directory being generated already exists, in which case
 * fixDirectoryNameCollision will directly afterward
 */
ThoraxGenerator.prototype.askForChefsChoice = function () {
  var cb = this.async();

  // welcome message
  if (!this.options['skip-welcome-message']) {
    var thoraxWelcome = chalk.yellow.bold("Welcome to Thorax!\n\n");
    console.log(thoraxWelcome);
  }

  var prompts = [
    {
      type: 'confirm',
      name: 'chefsChoice',
      message: "If this is your first time with Thorax, we've put together the\n" +
               "Chef's Choice. Would you like to try it?",
      default: true
    }
  ];

  this.prompt(prompts, function (answers) {
    var features = answers.features;
    this.chefsChoice = answers.chefsChoice;

    if (this.chefsChoice) {
      // chefs choice means we choose these without asking
      this.newDirectory = true;
      this.includeCoffeeScript = false;
      this.useZepto = false;
      this.starterApp = "Hello World";
      this.styleProcessor = "less";
    }

    cb();
  }.bind(this));

};

/**
 * Runs after chefs choice, which chooses to make a new directory for
 * your app by default
 *
 * Runs before other generators, and specifically before fixDirectoryNameCollision
 * so directoryNameCollision can run before askForExtendedPrompt allowing user
 * to bail before choosing a custom setup
 *
 * Note that all proto methods without an underscore are run in order by yoeman
 * therefore the order these prototype methods are arranged have a ryhme/reason
 */
ThoraxGenerator.prototype.askForDirectory = function() {
  if (typeof this.newDirectory !== 'undefined') { return; }

  this._askForDirectory(this.async());
};

ThoraxGenerator.prototype._askForDirectory = function(cb) {
  var prompts = [
    {
      type: 'confirm',
      name: 'newDirectory',
      message: 'Would you like to generate the app in a new directory?',
      default: true
    }
  ];

  this.prompt(prompts, function (answers) {
    var features = answers.features;
    this.newDirectory = answers.newDirectory;

    cb();
  }.bind(this));
};

/**
 * Runs after the choice to create a new directory has been made, but before
 * extended prompts
 *
 * Prevents a new app being generated into a previously existing directory by
 * asking for a new name
 */
ThoraxGenerator.prototype.fixDirectoryNameCollision = function () {
  if (!this.newDirectory) { return; }

  this._fixDirectoryNameCollision(this._.dasherize(this.name), this.async());
};

ThoraxGenerator.prototype._fixDirectoryNameCollision = function (directory, cb) {
  var prompts = [{
    type: 'input',
    name: 'directoryName',
    message: 'Directory already exists, enter a new name:'
  }];

  if (!directory) {
    prompts[0].message = 'A directory name is required';

    return this.prompt(prompts, function (props) {
      this._fixDirectoryNameCollision(props.directoryName, cb);
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
      this._fixDirectoryNameCollision(props.directoryName, cb);
    }.bind(this));
  }.bind(this));
};

ThoraxGenerator.prototype.askForExtendedPrompt = function() {
  // checking for pre-defined prompt option and then calling a private
  // method fixes async issues. Perhaps there is a better way, but
  // until then that's why this convention is used
  if (this.chefsChoice) { return; }
  this._askForExtendedPrompt(this.async());
};

ThoraxGenerator.prototype._askForExtendedPrompt = function (cb) {
  var prompts = [
    {
      type: 'list',
      name: 'styleProcessor',
      message: "Choose a css pre-processor",
      default: 'less',
      choices: [{
        name: 'Less with bootstrap (default choice)',
        value: 'less'
      }, {
        name: 'Sass',
        value: 'sass'
      }, {
        name: 'Stylus',
        value: 'stylus'
      }, {
        name: 'Plain CSS',
        value: 'none'
      }]
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Which extra features would you like?',
      choices: [{
        name: "CoffeeScript",
        value: "includeCoffeeScript",
        checked: false
      }, {
        name: "Zepto in place of jQuery (for mobile apps)",
        value: "useZepto",
        checked: false
      }]
    },
    {
      type: 'list',
      name: 'starterApp',
      choices: ["Hello World", "Todo List", "None"],
      message: 'Would you like to setup your project with a sample application?',
      default: "Hello World"
    }
  ];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    this.includeCoffeeScript = hasFeature('includeCoffeeScript');
    this.useZepto = hasFeature('useZepto');
    this.starterApp = answers.starterApp;
    this.styleProcessor = answers.styleProcessor;
    this.newDirectory = answers.newDirectory;

    cb();
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


  this.copy('seed/js/templates/root.hbs', 'js/templates/root.hbs');

  this.copy('_server.js', 'server.js');
  this.copy('_Procfile', 'Procfile');

  this.copy('karma.conf.js');
  this.copy('seed/tasks/options/karma.js', 'tasks/options/karma.js');
  this.copy('seed/tasks/options/mocha_phantomjs.js', 'tasks/options/mocha_phantomjs.js');

  this.copy('seed/tasks/options/jshint.js', 'tasks/options/jshint.js');

  this.copy('seed/test/index.html', 'test/index.html');

  // these don't work well as cs files
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

  this.copy('seed/test/fixtures/adding-machine.hbs', 'test/fixtures/adding-machine.hbs');
  this.copy('seed/test/fixtures/hello-world.hbs', 'test/fixtures/hello-world.hbs');

  this.copy('require-config.js');
  this.copy('_travis.yml', '.travis.yml');
  this.copy(path.join(__dirname, '../README.md'), 'README.md');


  // js + cs versions of these files
  this.copy('seed/js/views/root' + scriptExt, 'js/views/root' + scriptExt);
  this.copy('seed/js/helpers' + scriptExt, 'js/helpers' + scriptExt);

  this.copy('seed/test/views/root.spec' + scriptExt, 'test/views/root.spec' + scriptExt);
  this.copy('seed/test/app.spec' + scriptExt, 'test/app.spec' + scriptExt);
  this.copy('seed/test/helpers/helpers.spec' + scriptExt, 'test/helpers/helpers.spec' + scriptExt);
  this.copy('seed/test/helpers/view-helpers.spec' + scriptExt, 'test/helpers/view-helpers.spec' + scriptExt);

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

ThoraxGenerator.prototype._processReadme = function () {
  var markedFile = fs.readFileSync(path.join(__dirname, '../README.md')).toString();
  var processedMarkedFile = marked(markedFile);
  return processedMarkedFile.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
};

ThoraxGenerator.prototype.helloWorld = function() {
  var scriptExt = this.includeCoffeeScript ? '.coffee' : '.js';

  if (this.starterApp === 'Hello World') {
    this.readmeContent = this._processReadme();
    this.mkdir('js/views/hello-world');
    this.mkdir('js/templates/hello-world');
    this.copy('seed/js/views/hello-world/index' + scriptExt, 'js/views/hello-world/index' + scriptExt);
    this.template('seed/js/templates/hello-world/index.hbs', 'js/templates/hello-world/index.hbs');
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
