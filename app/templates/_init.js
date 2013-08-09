define(['thorax', 'templates/application'], function (Thorax, template) {
  // Create the Application object, Application.setView() will
  // place a view inside the {{layout-element}} in
  // templates/application.handlebars
  var <%= _.classify(name) %> = window.<%= _.classify(name) %> = new Thorax.LayoutView({
    name: '<%= _.camelize(name) %>',
    template: template
  });

  // Alias the special hashes for naming consistency
  <%= _.classify(name) %>.templates = Thorax.templates;
  <%= _.classify(name) %>.Views = Thorax.Views;
  <%= _.classify(name) %>.Models = Thorax.Models;
  <%= _.classify(name) %>.Collections = Thorax.Collections;

  // Allows load:end and load:start events to propagate
  // to the application object
  Thorax.setRootObject(<%= _.classify(name) %>);
});
