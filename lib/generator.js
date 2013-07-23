var path = require('path');
var util = require('util');
var Base = require('./base');

var Generator = module.exports = function () {
  Base.apply(this, arguments);

  this.lumbar  = JSON.parse(this.readFileAsString('lumbar.json'));
  this.appName = this.lumbar && this.lumbar.application.name;
};

util.inherits(Generator, Base);

Generator.prototype.askFor = Base.prototype._askFor;

Generator.prototype._renderTemplate = function (folder) {
  this.template(
    path.join(__dirname, '..', 'templates', '_' + this._.dasherize(this._name) + '.js'),
    path.join(folder, this._.dasherize(this.name) + '.js')
  );
};
