// Create the Application object, Application.setView() will
// place a view inside the {{layout-element}} in
// templates/application.handlebars
var <%= _.classify(name) %> = window.<%= _.classify(name) %> = new Thorax.LayoutView({
  name: '<%= _.camelize(name) %>'
});

// Alias the special hashes for naming consistency
<%= _.classify(name) %>.templates = Thorax.templates;
<%= _.classify(name) %>.Views = Thorax.Views;
<%= _.classify(name) %>.Models = Thorax.Models;
<%= _.classify(name) %>.Collections = Thorax.Collections;

// Allows load:end and load:start events to propagate
// to the application object
Thorax.setRootObject(<%= _.classify(name) %>);

$(function() {
  // Application and other templates included by the base
  // Application may want to use the link and url helpers
  // which use hasPushstate, etc. so setup history, then
  // render, then dispatch
  Backbone.history.start({
    pushState: false,
    root: '/',
    silent: true
  });
  // TODO: can remove after this is fixed:
  // https://github.com/walmartlabs/lumbar/issues/84
  <%= _.classify(name) %>.template = Thorax.templates.application;
  <%= _.classify(name) %>.appendTo('body');
  Backbone.history.loadUrl();
});

// This configures our Application object with values
// from the lumbar config, then sets it as the exported
// value from the base module.
_.extend(<%= _.classify(name) %>, module.exports);
module.exports = <%= _.classify(name) %>;
