require([<% if (useZepto) { %>
  'zepto',<% } else { %>
  'jquery',<% } %>
  'backbone',
  '<% if (includeCoffeeScript) { %>cs!<% } %>views/root',<% if (starterApp === 'Hello World') { %>
  '<% if (includeCoffeeScript) { %>cs!<% } %>routers/hello-world',<% } else if (starterApp === 'Todo List') { %>
  '<% if (includeCoffeeScript) { %>cs!<% } %>routers/todo-list',<% } %>
  '<% if (includeCoffeeScript) { %>cs!<% } %>helpers'
], function ($, Backbone, RootView<% if (starterApp === 'Hello World') { %>, HelloWorldRouter<% } else if (starterApp === 'Todo List') { %>, TodoListRouter <% } %>) {
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

    // Initialize your routers here
    <% if (starterApp === 'Hello World') { %>new HelloWorldRouter();<% } else if (starterApp === 'Todo List') { %>new TodoListRouter();<% } %>

    // This will trigger your routers to start
    Backbone.history.loadUrl();
  });
});