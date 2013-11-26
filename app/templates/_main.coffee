require [<% if (useZepto) { %>
  'zepto',<% } else { %>
  'jquery',<% } %>
  "backbone",
  "cs!views/root",<% if (starterApp === 'Hello World') { %>
  'routers/hello-world',<% } else if (starterApp === 'Todo List') { %>
  'routers/todo-list',<% } %>
  'cs!helpers'
], ($, Backbone, RootView<% if (starterApp === 'Hello World') { %>, HelloWorldRouter<% } else if (starterApp === 'Todo List') { %>, TodoListRouter <% } %>) ->

  # Load any data that your app requires to boot
  # and initialize all routers here, the callback
  # `next` is provided in case the operations
  # needed are aysynchronous
  initialize (next) ->
    <% if (starterApp === 'Hello World') { %>new HelloWorldRouter()<% } else if (starterApp === 'Todo List') { %>new TodoListRouter()<% } %>
    next()

  initialize = (complete) ->
    $ ->
      Backbone.history.start
        pushState: false
        root: "/"
        silent: true

      # RootView may use link or url helpers which
      # depend on Backbone history being setup
      # so need to wait to loadUrl() (which will)
      # actually execute the route
      RootView.getInstance document.body
      complete ->
        Backbone.history.loadUrl()