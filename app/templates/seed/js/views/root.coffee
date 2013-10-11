define [
  'layout-view',
  'templates/root'
], (LayoutView, rootTemplate) ->
  class RootView extends LayoutView
    name: 'root'
    template: rootTemplate

  instance = null
  RootView.getInstance = (target) ->
    unless instance
      instance = new RootView
      instance.appendTo target || document.body
    instance

  RootView