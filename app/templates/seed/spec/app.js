define(function(require) {
    var UploadApp   = require('view/apps/uploadAppDialog'),
        modalShared = require('../shared/modal.js');

    describe('App', function() {
        describe('Model', function() {

        });

        describe('Collection', function() {

        });

        describe('Views', function() {
            describe('Upload App', function() {
                before(function() {
                    this.view = new UploadApp();
                    // This disables the animation, which breaks during the test.
                    // Most likely because it requires CSS
                    this.view.$el.removeClass('fade');
                });

                after(function() {
                    this.view.close({ remove: true });
                    this.view = undefined;
                });

                modalShared();
            });

        });
    });
});