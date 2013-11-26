describe "Creating a helper test", ->
  afterEach ->
    fixtures.cleanUp()
    fixtures.clearCache()

  it "it works with fixture support", ->
    Handlebars.registerHelper "get-excited", ->
      new Handlebars.SafeString("Wow, template fixtures")

    view = new Thorax.View(template: hbsFixture("get-excited.hbs"))
    view.render()
    expect(view.$("h1").text()).to.eq "Wow, template fixtures"