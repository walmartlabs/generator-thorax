var util   = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function (args) {
  yeoman.generators.Base.apply(this, arguments);

  this.prompts = [];
  this.name    = args[0];
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype._name = 'template';

Generator.prototype._askFor = function () {
  var cb = this.async();

  this._askForName(function () {
    // We have a name, we can now proceed with the other prompts
    this.prompts.length && this.prompt(this.prompts, function (props) {
      this._.extend(this, props);
      cb();
    }.bind(this));
  }.bind(this));
};

Generator.prototype._askForName = function (cb) {
  if (this.name) { return cb(); }

  var prompts = [{
    type: 'input',
    name: 'name',
    message: 'Enter a name for the ' + this._name + ':'
  }];

  // If we have asked before, make the message sound a little more agressive
  if (this._askedForName) {
    prompts[0].message = 'The name of the ' + this._name + ' is required:';
  }

  this.prompt(prompts, function (props) {
    this.name          = props.name;
    this._askedForName = true;

    this._askForName(cb);
  }.bind(this));
};
