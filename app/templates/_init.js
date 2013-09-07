define([
  'thorax',
  'views/root'
], function (Thorax, RootView) {
  var <%= _.classify(name) %> = window.<%= _.classify(name) %> = {};

  <%= _.classify(name) %>.root = new Thorax.LayoutView({
    name: 'root',
    template: template
  });
});
