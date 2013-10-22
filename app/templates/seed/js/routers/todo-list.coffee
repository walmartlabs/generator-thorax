define [
  'backbone'
  'cs!collection'
  'cs!views/root'
  'cs!views/todo-list/index'
], (Backbone, Collection, RootView, TodoListIndexView) ->
  return Backbone.Router.extend
    routes:
      "": "index"

    index: ->
      collection = new Collection
        title: 'First Todo'
        done: true

      view = new TodoListIndexView {collection}
      RootView.getInstance().setView view