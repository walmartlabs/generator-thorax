define [
  'cs!collection-view',
  'hbs!templates/<%= dasherizedName %>',
  'hbs!templates/<%= dasherizedName %>-item',
  'hbs!templates/<%= dasherizedName %>-empty'
], (CollectionView, template, itemTemplate, emptyTemplate) ->
  CollectionView.extend
    name: '<%= dasherizedName %>'
    template: template
    itemTemplate: itemTemplate
    emptyTemplate: emptyTemplate