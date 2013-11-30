describe('A simple adding machine', function () {
  it('should add 1 to the sum every time the button is clicked', function () {
    Handlebars.registerViewHelper('on', function (eventName, helperView) {
      helperView.parent.on(eventName, function() {
        helperView.render();
      });
    });

    var view = new Thorax.View({
      template: hbsFixture("adding-machine.hbs"),
      events: {
        incremented: function() {
          ++this.i;
        }
      },
      initialize: function() {
        this.i = 0;
      }
    });

    view.render();
    expect(view.$('[data-view-helper="on"]').text()).to.eq('0');
    view.$('button [data-trigger-event="incremented"]').trigger('click', function() {
      expect(view.$('[data-view-helper]').text()).to.eq('1');
    });
  });
});