define [
  'cs!view',
  'hbs!templates/<%= dasherizedName %>'
], (View, template) ->
  View.extend
    name: '<%= dasherizedName %>'
    template: template


