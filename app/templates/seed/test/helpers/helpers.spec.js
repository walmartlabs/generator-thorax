describe('Creating a helper test', function () {
  afterEach(function() {
    fixtures.cleanUp();
    fixtures.clearCache();
  });
  it('it works with fixture support', function () {
    Handlebars.registerHelper('get-excited', function() {
      return new Handlebars.SafeString('Wow, template fixtures');
    });

    var view = new Thorax.View({
      template: hbsFixture('get-excited.hbs')
    });
    view.render();
    expect(view.$('h1').text()).to.eq('Wow, template fixtures');
  });
});