require(['init', 'collection', 'model', 'view'], function () {
  $(function () {
    // Application and other templates included by the base
    // Application may want to use the link and url helpers
    // which use hasPushstate, etc. so setup history, then
    // render, then dispatch
    Backbone.history.start({
      pushState: false,
      root: '/',
      silent: true
    });

    <%= _.classify(name) %>.appendTo(document.body);
    Backbone.history.loadUrl();
  });
});
