'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.files = function files() {
  this.appTemplate('view', 'views');
  // write out blank template
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');
};
