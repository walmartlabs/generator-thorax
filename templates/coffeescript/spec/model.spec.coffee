require ["cs!models/<%= dasherizedName %>"], (<%= classedName %>) ->
  describe "<%= classedName %>", ->
    it "exists", ->
      expect(<%= classedName %>).to.be.ok