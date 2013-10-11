define [
  'backbone'
  'views/root'
  'views/hello-world/index'
], (Backbone, RootView, IndexView) ->
  return Backbone.Router.extend
    routes:
      "": "index"

    index: ->
      view = new IndexView
      RootView.getInstance().setView view
