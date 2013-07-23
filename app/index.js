var util = require('util');
var path = require('path');
var Base = require('../lib/base');

var ThoraxGenerator = module.exports = function (args, options, config) {
  Base.apply(this, arguments);

  this.prompts.push({
    type: 'confirm',
    name: 'newDirectory',
    message: 'Would you like to generate the app in a new directory?',
    default: false
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(ThoraxGenerator, Base);

ThoraxGenerator.prototype._name  = 'application';
ThoraxGenerator.prototype.askFor = Base.prototype._askFor;

ThoraxGenerator.prototype.directory = function () {
  if (!this.newDirectory) { return; }

  var cb = this.async();

  var prompts = [{
    type: 'input',
    name: 'directoryName',
    message: 'Enter a name for the new directory:'
  }];

  this.prompt(prompts, function (props) {
    if (!props.directoryName) { return cb(); }

    // Creates a new directory and set the base path to here
    this.mkdir(props.directoryName);
    this.destinationRoot(props.directoryName);
    this.newDirectory = false;

    cb();
  }.bind(this));
};

ThoraxGenerator.prototype.app = function () {
  this.template('_bower.json', 'bower.json');
  this.template('_lumbar.json', 'lumbar.json');
  this.template('_package.json', 'package.json');

  // Using directory helper in turn with the new directory prompt breaks copying
  // files across. Should investigate in Yeoman later in case, but for now we
  // can work around the issue by manually copying everything
  // this.directory('seed', '.', true);

  this.copy('seed/README.md', 'README.md');
  this.copy('seed/Gruntfile.js', 'Gruntfile.js');

  this.mkdir('public');
  this.mkdir('public/img');
  this.copy('seed/public/img/glyphicons-halflings.png', 'public/img/glyphicons-halflings.png');
  this.copy('seed/public/img/glyphicons-halflings-white.png', 'public/img/glyphicons-halflings-white.png');

  this.mkdir('stylesheets');
  this.copy('seed/stylesheets/base.css', 'stylesheets/base.css');

  this.mkdir('tasks');
  this.copy('seed/tasks/ensure-installed.js', 'tasks/ensure-installed.js');

  this.mkdir('templates');
  this.copy('seed/templates/application.handlebars', 'templates/application.handlebars');

  this.mkdir('js');
  this.mkdir('js/views');
  this.mkdir('js/models');
  this.mkdir('js/routers');
  this.mkdir('js/collections');
};

ThoraxGenerator.prototype.scripts = function () {
  this.template('_view.js', 'js/view.js');
  this.template('_init.js', 'js/init.js');
  this.template('_model.js', 'js/model.js');
  this.template('_collection.js', 'js/collection.js');

  this.template('_index.html', 'public/index.html');
};

ThoraxGenerator.prototype.projectFiles = function () {
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('bowerrc', '.bowerrc');
};
