var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var ViewHelperGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(ViewHelperGenerator, Generator);

ViewHelperGenerator.prototype._name  = 'view helper';
ViewHelperGenerator.prototype.askFor = Generator.prototype.askFor;

ViewHelperGenerator.prototype.createViewHelper = function () {
  this._renderTemplate('js/helpers');
};
