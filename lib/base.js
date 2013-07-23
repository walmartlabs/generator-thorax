var util   = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function (args) {
  yeoman.generators.Base.apply(this, arguments);

  this.prompts = [];

  if (!args[0]) {
    return this.prompts.push({
      type: 'input',
      name: 'name',
      message: 'Enter a name for the ' + this._name + ':'
    });
  }

  this.name = args[0];
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype._name = 'template';

Generator.prototype._askFor = function () {
  var cb = this.async();

  this.prompt(this.prompts, function (props) {
    this._.extend(this, props);

    if(!this.name) {
      return cb(new Error('The template requires a name to function properly.'));
    }

    cb();
  }.bind(this));
};

Generator.prototype._renderTemplate = function (name, folder) {
  this.template(
    path.join(__dirname, '..', 'templates', '_' + name + '.js'),
    path.join(folder, this._.slugify(this.name) + '.js')
  );
};
