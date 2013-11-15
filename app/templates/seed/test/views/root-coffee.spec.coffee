define ['views/root'], (RootView) ->

  describe "App (with coffee)", ->

    describe "Model", ->

    describe "Collection", ->

    describe "Views", ->
      describe "Root View", ->
        before ->
          @view = new RootView()
        after ->
          @view.remove();
        it "should render properly", ->
          expect(@view.render()).to.contain('data-layout-cid')