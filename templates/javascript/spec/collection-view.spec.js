define(['views/<%= dasherizedName %>'], function (<%= classedName %>CollectionView) {
  describe('<%= classedName %>CollectionView', function () {
    it('exists', function () {
      expect(<%= classedName %>CollectionView).to.be.ok;
    });
  });
});