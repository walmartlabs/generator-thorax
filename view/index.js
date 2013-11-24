var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var ViewGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(ViewGenerator, Generator);

ViewGenerator.prototype._name  = 'view';
ViewGenerator.prototype.askFor = Generator.prototype.askFor;

ViewGenerator.prototype.createView = function () {
  this._renderTemplate('js/views');
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');
};
