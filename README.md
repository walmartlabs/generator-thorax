# Thorax Yeoman Generator

Base all of the work off the latest version of this:

https://github.com/walmartlabs/thorax-seed

Structure the generator code much like the phoenix generator code. Each command should have a folder with `index.js` and `templates` if needed. Here are the commands:

## yo thorax $appName

Creates a new thorax app. Should generate all of the directories in the thorax seed + all of the files you presently see in the repo (everything in root + files in js).

Some of the files can just be copied, but anything that says "Application" will become a template string like `<%= _.slugify(name) %>`. Check out mweb/templates/_package.json for an example.

After the app is initially created read in the generated `lumbar.json` and grab the app name and make it available to the generator templates.

Note that although to actually get the app to work we would need to modify `lumbar.json` and add some entries, we don't want to do that right now as we are moving to AMD and this will likely change in the near future. Version one is a proof of concept and I'll modify it to work with AMD.

## yo thorax:router $routerName

Generate a new router in `js/routers/$routerName.js`. The file should look something like:

    new (Backbone.Router.extend({
      routes: {}
    }));

## yo thorax:view $viewName

Generate a new `View` class in `js/views/$viewName.js`. The file should look something like:

    <%= appName %>.View.extend({
      name: '<%= viewName %>'
    });

## yo thorax:model $modelName

Generate a new `Model` class in `js/models/$modelName.js`. The file should look something like:

    <%= appName %>.Model.extend({
      name: '<%= modelName %>'
    });

## yo thorax:collection $collectionName

Generate a new `Collection` class in `js/collection/$collectionName.js`. The file should look something like:

    <%= appName %>.Model.extend({
      name: '<%= collectionName %>'
    });

## yo thorax:collection-view $collectionViewName

Generate a new `CollectionView` class in `js/views/$collectionViewName.js`. The file should look something like:

    <%= appName %>.CollectionView.extend({
      name: '<%= collectionViewName %>'
    });

## yo thorax:helper $helperName

(also create a new `helpers` folder in the initial project generator which is not reflected in the current thorax-seed)

Generate a new Handlebars helper in `js/helpers/$helperName.js`. The file should look something like:

    Handlebars.registerHelper('<%= helperName %>', function() {

    });

## yo thorax:view-helper $viewHelperName

Generate a new Handlebars helper in `js/helpers/$viewHelperName.js`. The file should look something like:

    Handlebars.registerViewHelper('<%= viewHelperName %>', function() {

    });
