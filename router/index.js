var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var RouterGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(RouterGenerator, Generator);

RouterGenerator.prototype.createView = function () {
  this.template(
    path.join(__dirname, '..', 'templates', '_router.js'),
    path.join('js/routers', this._.slugify(this.name) + '.js')
  );
};
