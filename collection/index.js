var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var CollectionGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(CollectionGenerator, Generator);

CollectionGenerator.prototype._name  = 'collection';
CollectionGenerator.prototype.askFor = Generator.prototype.askFor;

CollectionGenerator.prototype.createCollection = function () {
  this._renderTemplate('js/collections');
};
