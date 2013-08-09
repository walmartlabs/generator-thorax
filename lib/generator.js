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
};

util.inherits(Generator, Base);

Generator.prototype.askFor = Base.prototype._askFor;

Generator.prototype._renderTemplate = function (folder) {
  this.template(
    path.join(__dirname, '..', 'templates', '_' + this._.dasherize(this._name) + '.js'),
    path.join(folder, this._.dasherize(this.name) + '.js')
  );
};
