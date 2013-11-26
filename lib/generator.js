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

  // if --coffee or --js was not provided, auto detect based on current files
  if (typeof this.options.coffee === 'undefined') {
    if (this.expandFiles('js/**/*.coffee').length > 0) { // choose cs if any cs files exist in js/
      this.options.coffee = true;
    }
    if (this.options.js) {
      this.options.coffee = false;
    }
  }
  this.env.options.coffee = this.options.coffee;

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
