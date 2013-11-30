define [
  'cs!view',
  'hbs!templates/<%= _.dasherize(name) %>'
], (View, template) ->
  View.extend
    name: '<%= name %>'
    template: template


