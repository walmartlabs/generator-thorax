define(['handlebars'], function (Handlebars) {
  function <%= _.camelize(name) %>() {
    
  }
  Handlebars.registerHelper('<%= _.dasherize(name) %>', <%= _.camelize(name) %>);
  return <%= _.camelize(name) %>;
});