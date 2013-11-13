// js version of https://relishapp.com/rspec/rspec-core/v/3-0/docs/example-groups/shared-examples

sharedExamples = {};

module.exports = {
  create: function(methodName, methodBody) {
    sharedExamples[methodName] = methodBody;
  },
  invoke: function(methodName) {
    sharedExamples[methodName]();
  }
};