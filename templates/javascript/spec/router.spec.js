define(['routers/<%= dasherizedName %>'], function (<%= classedName %>Router) {
  describe('<%= classedName %>Router', function () {
    it('exists', function () {
      expect(<%= classedName %>Router).to.be.ok;
    });
  });
});