var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var CollectionViewGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(CollectionViewGenerator, Generator);

CollectionViewGenerator.prototype.askFor = Generator.prototype.askFor;

CollectionViewGenerator.prototype.createCollectionView = function () {
  this._renderTemplate('collection-view', 'js/views');
};
