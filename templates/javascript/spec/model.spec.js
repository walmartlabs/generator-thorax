define(['models/<%= dasherizedName %>'], function (<%= classedName %>) {
  describe('<%= classedName %>', function () {
    it('exists', function () {
      expect(<%= classedName %>).to.be.ok;
    });
  });
});