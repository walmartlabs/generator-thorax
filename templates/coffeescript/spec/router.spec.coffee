define ["cs!routers/<%= dasherizedName %>"], (<%= classedName %>Router) ->
  describe "<%= classedName %>Router", ->
    it "exists", ->
      expect(<%= classedName %>Router).to.be.ok