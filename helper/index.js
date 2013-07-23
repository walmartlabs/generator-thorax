var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var HelperGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(HelperGenerator, Generator);

HelperGenerator.prototype._name  = 'helper';
HelperGenerator.prototype.askFor = Generator.prototype.askFor;

HelperGenerator.prototype.createHelper = function () {
  this._renderTemplate('js/helpers');
};
