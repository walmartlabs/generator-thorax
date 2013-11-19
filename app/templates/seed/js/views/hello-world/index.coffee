define [
  'cs!view'
  'hbs!templates/hello-world/index'
], (View, template) ->
  View.extend
    name: 'hello-world/index'
    template: template