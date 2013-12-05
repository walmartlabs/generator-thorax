define([
  'view',
  'hbs!templates/<%= dasherizedName %>'
], function (View, template) {
  return View.extend({
    name: '<%= dasherizedName %>',
    template: template
  });
});
