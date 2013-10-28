define([
  'view',
  'hbs!templates/hello-world/index'
], function(View, template) {
  return View.extend({
    name: 'hello-world/index',
    template: template
  });
});