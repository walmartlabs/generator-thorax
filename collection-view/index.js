'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.files = function files() {
  this.generateSourceAndTest('collection-view', 'spec/collection-view.spec', 'views');
  // write out blank templates
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-item.hbs', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-empty.hbs', '');
};
