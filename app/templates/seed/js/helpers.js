define(['handlebars', 'thorax'], function (Handlebars) {

  /**
   * Register a normal handlebars helper
   *
   * Use in any .hbs file via: {{greeting}}
   *
   * View test/helpers/helpers.spec for testing best practices
   *
   */
  Handlebars.registerHelper('greeting', function () {
    return new Handlebars.SafeString('Hello World');
  });

  /**
   * Register a new block helper that will create and embed a HelperView
   * instance with its template set to the captured block.
   * A helper view is different than a child view. It's context will be that of
   * template in which it is placed.
   *
   * Example usage:
   *
   * In template file:
   *
   * {{#on "incremented"}}{{i}}{{/on}}
   * {{#button trigger="incremented"}}Add again{{/button}}
   *
   * In class of template:
   *
   * events: {
   *   incremented: function() {
   *     ++this.i;
   *   }
   * },
   * initialize: function() {
   *   this.i = 0;
   * }
   *
   * Checkout out test/helpers/view-helpers.spec an example with tests
   *
   */
  Handlebars.registerViewHelper('on', function (eventName, helperView) {
    helperView.parent.on(eventName, function() {
      helperView.render();
    });
  });
});