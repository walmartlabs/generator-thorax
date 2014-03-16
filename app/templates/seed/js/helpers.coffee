define ["handlebars"], (Handlebars) ->

  ###
  Register a normal handlebars helper

  Use in any .hbs file via: {{greeting}}

  View test/helpers/helpers.spec for testing best practices
  ###
  Handlebars.registerHelper "greeting", ->
    new Handlebars.SafeString("Hello World")