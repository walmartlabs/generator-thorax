var util          = require('util');
var path          = require('path');
var ViewGenerator = require('../view');

var CollectionViewGenerator = module.exports = function () {
  ViewGenerator.apply(this, arguments);

  this.prompts.push({
    type: 'confirm',
    name: 'useStubMethods',
    message: 'Would you like to include commonly stubbed methods (i.e. initialize, parse, etc.)?',
    default: true
  });
};

util.inherits(CollectionViewGenerator, ViewGenerator);

CollectionViewGenerator.prototype._name  = 'collection view';
CollectionViewGenerator.prototype.askFor = ViewGenerator.prototype.askFor;

CollectionViewGenerator.prototype.createCollectionView = function () {
  this.createView();
  this.write('js/templates/' + this._.dasherize(this.name) + '-item.handlebars', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-empty.handlebars', '');
};
