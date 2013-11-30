describe "tests work", ->
  it "should do something", ->
    expect(true).to.be.true


describe "Global variable we want in our tests", ->
  it "should declare global libraries", ->
    expect(Handlebars, "Handlebars is global").to.be.ok
    expect(Handlebars.compile, "Handlebars.compile is global").to.be.ok
    expect(Backbone, "Backbone is global").to.be.ok
    expect(Thorax, "Thorax is global").to.be.ok
    expect(fixtures, "fixtures is global").to.be.ok
    expect(sinon, "sinon is global").to.be.ok
    expect(sinon.stub, "sinon.stub is global").to.be.ok