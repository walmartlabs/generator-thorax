var path   = require('path');
var util   = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function () {
  yeoman.generators.NamedBase.apply(this, arguments);

  // this.pkg    = JSON.parse(this.readFileAsString('package.json'));
  this.lumbar = JSON.parse(this.readFileAsString('lumbar.json'));

  this.appName = this.lumbar && this.lumbar.application.name;
};

util.inherits(Generator, yeoman.generators.NamedBase);
