var path = require('path');
var util = require('util');
var Base = require('./base');

var Generator = module.exports = function () {
  Base.apply(this, arguments);

  this.pkg     = JSON.parse(this.readFileAsString('package.json'));
  this.appName = this.pkg.appName;

  if (!this.appName) {
    throw new Error('An application name is required to generate templates.');
  }

  // TODO: refactor appName, name, _name, all used in this file

  this.env.options.coffee = this.options.coffee;
  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cli arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.name, '/js/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  var templateSource = '/templates/javascript';
  this.scriptSuffix = '.js';

  if (this.env.options.coffee) {
    templateSource = '/templates/coffeescript';
    this.scriptSuffix = '.coffee';
  }

  this.templateSource = path.join(__dirname, '..', templateSource);
};

util.inherits(Generator, Base);

Generator.prototype.askFor = Base.prototype._askFor;

Generator.prototype._renderTemplate = function (folder) {
  this.template(
    path.join(this.templateSource, '_' + this._.dasherize(this._name) + this.scriptSuffix),
    path.join(folder, this._.dasherize(this.name) + this.scriptSuffix)
  );
};
