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

RouterGenerator.prototype.appendRoute = function () {
  var routes = JSON.parse(this.readFileAsString('routes.json'));
  var router = (routes[this._.dasherize(this.name)] = {});

  router[this._.slugify(this.name)] = 'index';

  fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2));
};
