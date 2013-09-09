var fs        = require('fs');
var util      = require('util');
var path      = require('path');
var Generator = require('../lib/generator');

var RouterGenerator = module.exports = function () {
  Generator.apply(this, arguments);
};

util.inherits(RouterGenerator, Generator);

RouterGenerator.prototype._name  = 'router';
RouterGenerator.prototype.askFor = Generator.prototype.askFor;

RouterGenerator.prototype.createRouter = function () {
  this._renderTemplate('js/routers');
};

