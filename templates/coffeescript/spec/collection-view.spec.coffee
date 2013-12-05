define ["cs!views/<%= dasherizedName %>"], (<%= classedName %>CollectionView) ->
  describe "<%= classedName %>CollectionView", ->
    it "exists", ->
      expect(<%= classedName %>CollectionView).to.be.ok