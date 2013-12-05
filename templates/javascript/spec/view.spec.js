define(['views/<%= dasherizedName %>'], function (<%= classedName %>View) {
  describe('<%= classedName %>View', function () {
    it('exists', function () {
      expect(<%= classedName %>View).to.be.ok;
    });
  });
});