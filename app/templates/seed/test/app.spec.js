// Sanity check
describe('tests work', function () {
  it('should do something', function () {
    expect(true).to.be.true;
  });
});

describe('Global variable we want in our tests', function () {
  it('should declare global libraries', function () {
    assert.ok(Handlebars, "Handlebars is global");
    assert.ok(Handlebars.compile, "Handlebars.compile is global");
    assert.ok(Backbone, "Backbone is global");
    assert.ok(Thorax, "Thorax is global");
    assert.ok(fixtures, "fixtures is global");
    assert.ok(sinon, "sinon is global");
    // TODO: throws error, 1/20 times
    // assert.ok(sinon.stub, "sinon.stub is global");
  });
});