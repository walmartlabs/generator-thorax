define [
  'collection-view',
  'hbs!templates/<%= _.dasherize(name) %>',
  'hbs!templates/<%= _.dasherize(name) %>-item',
  'hbs!templates/<%= _.dasherize(name) %>-empty'
], (CollectionView, template, itemTemplate, emptyTemplate) ->
  CollectionView.extend
    name: '<%= name %>'
    template: template
    itemTemplate: itemTemplate
    emptyTemplate: emptyTemplate