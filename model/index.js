var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var ViewGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(ViewGenerator, Generator);

ViewGenerator.prototype.createView = function () {
  this.template(
    path.join(__dirname, '..', 'templates', '_model.js'),
    path.join('js/models', this._.slugify(this.name) + '.js')
  );
};
