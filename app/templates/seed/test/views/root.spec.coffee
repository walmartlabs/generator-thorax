define ['cs!views/root'], (RootView) ->
  describe "Views", ->
    describe "Root View", ->
      before ->
        @view = new RootView()
      after ->
        @view.remove();
      it "should render properly", ->
        expect(@view.render()).to.contain('data-layout-cid')