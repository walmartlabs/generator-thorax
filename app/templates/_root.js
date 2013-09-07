define([
  'layout-view',
  'hbs!templates/root'
], function(LayoutView, rootTemplate) {
  // This is the root view of your application which
  // will be initialized inside of init.js
  // To place a view on the root view call
  // <%= _.classify(name) %>.root.setView(view)
  return new LayoutView({
    name: 'root',
    template: rootTemplate
  });
});