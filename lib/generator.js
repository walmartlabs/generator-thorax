var path = require('path');
var util = require('util');
var Base = require('./named-argument');

var Generator = module.exports = function () {
  Base.apply(this, arguments);

  this.lumbar  = JSON.parse(this.readFileAsString('lumbar.json'));
  this.appName = this.lumbar && this.lumbar.application.name;
};

util.inherits(Generator, Base);

Generator.prototype.askFor = Base.prototype._askFor;

Generator.prototype._renderTemplate = function (name, folder) {
  this.template(
    path.join(__dirname, '..', 'templates', '_' + name + '.js'),
    path.join(folder, this._.slugify(this.name) + '.js')
  );
};
