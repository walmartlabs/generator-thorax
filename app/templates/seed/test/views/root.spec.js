define(['views/root'], function(RootView) {
  describe('App', function() {

    describe('Model', function() {

    });

    describe('Collection', function() {

    });

    describe('Views', function() {
      describe('Root View', function() {
        before(function() {
          this.view = new RootView();
        });

        after(function() {
          this.view.remove();
        });

        it('Should render properly', function() {
          expect(this.view.render()).to.contain('data-layout-cid');
        });
      });
    });

  });

});

