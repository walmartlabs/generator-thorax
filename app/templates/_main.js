require([<% if (useZepto) { %>
  'zepto',<% } else { %>
  'jquery',<% } %>
  'backbone',
  'views/root',<% if (starterApp === 'Hello World') { %>
  'routers/hello-world',<% } else if (starterApp === 'Todo List') { %>
  'routers/todo-list',<% } %>
  'helpers'
], function ($, Backbone, RootView<% if (starterApp === 'Hello World') { %>, HelloWorldRouter<% } else if (starterApp === 'Todo List') { %>, TodoListRouter <% } %>) {

  initialize(function(next) {
    // Load any data that your app requires to boot
    // and initialize all routers here, the callback
    // `next` is provided in case the operations
    // needed are aysynchronous
    <% if (starterApp === 'Hello World') { %>new HelloWorldRouter();<% } else if (starterApp === 'Todo List') { %>new TodoListRouter();<% } %>

    next();
  });

  function initialize(complete) {
    $(function() {
      Backbone.history.start({
        pushState: false,
        root: '/',
        silent: true
      });

      // RootView may use link or url helpers which
      // depend on Backbone history being setup
      // so need to wait to loadUrl() (which will)
      // actually execute the route
      RootView.getInstance(document.body);

      complete(function() {
        Backbone.history.loadUrl();
      });
    });
  }

});
