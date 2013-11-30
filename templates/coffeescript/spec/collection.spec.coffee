require ["collections/<%= dasherizedName %>"], (<%= classedName %>) ->
  describe "<%= classedName %>", ->
    it "exists", ->
      expect(<%= classedName %>).to.be.ok