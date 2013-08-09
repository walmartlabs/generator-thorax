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

  routes[this._.slugify(this.name)] = 'routers/' + this._.dasherize(this.name);

  this.write('routes.json', JSON.stringify(routes, null, 2));
};
