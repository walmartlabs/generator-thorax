define [
  'view'
  'templates/hello-world/index'
], (View, template) ->
  View.extend
    name: 'hello-world/index'
    template: template