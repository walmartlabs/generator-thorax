var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var ModelGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(ModelGenerator, Generator);

ModelGenerator.prototype._name  = 'model';
ModelGenerator.prototype.askFor = Generator.prototype.askFor;

ModelGenerator.prototype.createModel = function () {
  this._renderTemplate('js/models');
};
