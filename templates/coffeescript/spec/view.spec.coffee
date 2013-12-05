define ["cs!views/<%= dasherizedName %>"], (<%= classedName %>View) ->
  describe "<%= classedName %>View", ->
    it "exists", ->
      expect(<%= classedName %>View).to.be.ok