/**
 * This class is inherited by all sub-generators.
 *
 * Inspired by similar file of the same name found in generator-angular
 *
 */

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  /**
   * Shortcuts for use in templates(or other generator js files):
   * Examples:
   *   <%= classedName %>
   *   <%= dasherizedName %>
   */
  this.classedName = this._.classify(this._.dasherize(this.name));
  this.dasherizedName = this._.dasherize(this.name);

  /**
   * Tell a sub generator to output js or .coffee files based on whether
   * any .coffee files already exist
   *
   * Override the auto detection via --js or --coffee
   */
  if (typeof this.options.coffee === 'undefined') {
    if (this.expandFiles('js/**/*.coffee').length > 0) { // choose cs if any cs files exist in js/
      this.options.coffee = true;
    }
    if (this.options.js) {
      this.options.coffee = false;
    }
  }
  this.env.options.coffee = this.options.coffee;

  /**
   * set path where templates will be looked for when using this.template,
   * this.copy or this.read
   */
  var sourceRoot = '/templates/javascript';
  var scriptSuffix = '.js';
  if (this.env.options.coffee) {
   sourceRoot = '/templates/coffeescript';
   scriptSuffix = '.coffee';
  }
  this.scriptSuffix = scriptSuffix;
  this.sourceRoot(path.join(__dirname, sourceRoot));

  /**
   * Set the appPath and testPath for all sub generators.
   *
   * appPath: where generated app files will be output to
   * testPath: where generated test files will be output to
   *
   * TODO: ensure user is in root of their app, error otherwise, match cwd to appName in package.json
   */
  this.env.options.appPath = path.join(process.cwd(), 'js');
  this.env.options.testPath = path.join(process.cwd(), 'test');
};

util.inherits(Generator, yeoman.generators.NamedBase);

/**
 * Similar to built in `this.template('src', 'dest'), but accounts for
 * cs/js extensions and pre-sets the template directory to /templates/{extension-type}
 *
 * Example: `this.appTemplate('router', 'routers');` just like calling -> this.template('templates/javascript/router.js', 'js/routers/your-router.js')
 */
Generator.prototype.appTemplate = function (src, dest) {
  // calculate the destination file, without extension
  // ex: if dest is 'collections' and this.name is 'myTodos' -> collections/my-todos
  var abstractDest = path.join(dest, this.dasherizedName);

  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.appPath, abstractDest) + this.scriptSuffix
    // -> 'js/collections/my-todos.{js,coffee}'
  ]);
};

Generator.prototype.testTemplate = function (src, dest) {
  var abstractDest = path.join(dest, this.dasherizedName) + '.spec';
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.testPath, abstractDest) + this.scriptSuffix
    // -> 'test/collections/my-todos.{js,coffee}'
  ]);

  /**
   * console.log a message to the user to add the generated test file to
   * test/test-setup-browser until #66 lands
   */
  // when module is coffeescript, require module using cs!./test-module-name
  var csBang;
  if (this.scriptSuffix == '.coffee') { csBang = 'cs!' } else { csBang = '' }
  var copyPastable = csBang + './' + abstractDest;

  var testModuleMsg = '\n\n' +
                      chalk.yellow.bold("For browser testing, add the following line:") +
                      '\n\n' +
                      chalk.red.bold("'" + copyPastable + "',") +
                      '\n\n' +
                      chalk.yellow.bold("to test/test-setup-browser.js") +
                      '\n\n';

  console.log(testModuleMsg);
};

/**
 * Shortcut for calling:
 *   this.appTemplate('collection', 'collections')
 *   this.testTemplate('spec/collection.spec', 'collections')
 *
 * Usage: this.generateSourceAndTest('collection', 'spec/collection.spec', 'collections');
 */
Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory) {
  this.appTemplate(appTemplate, targetDirectory);
  this.testTemplate(testTemplate, targetDirectory);
};
