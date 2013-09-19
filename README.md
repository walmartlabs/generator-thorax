# Thorax Generator

Generate a new [Thorax](http://thoraxjs.org/) application with. Includes some configurable options and some opinions.

    npm install -g yo generator-thorax
    yo thorax desired-application
    cd desired-application
    npm start

For a snazzier development environment it's recommended that you install the [Thorax Inspector Chrome Extension](https://chrome.google.com/webstore/detail/thorax-inspector/poioalbefcopgeaeaadelomciijaondk?hl=en-US) before getting started.

## Stack

TODO

## Directory Structure

- `bower_components` Installed third party libraries. Managed by [Bower](http://bower.io/), do not modify directly.
- `css` Regardless of wether you are using a CSS superset (LESS / Stylus / SASS) or plain CSS, this is where your CSS should live. This will get copied or compiled to `public/css`
- `js`
  - `collections`
  - `models`
  - `routers`
  - `templates`
  - `views`
  - `collection-view.js`
  - `collection.js`
  - `layout-view.js`
  - `main.js`
  - `model.js`
  - `view.js`
- `node_modules`
- `public` The connect server will serve this directory.
  - `css` Generated or copied CSS from the `css` directory, do not modify.
  - `fonts` Any web fonts for your application, safe to modify.
  - `img` Any web 
  - `js` Generated or copied JavaScript from the `js` directory, do not modify.
  - `index.html`
- `tasks` Put any extra grunt tasks here.
- `bower.json` Third party library management via [Bower](http://bower.io/)
- `Gruntfile.js` [Grunt](http://gruntjs.com/) build file. `npm start` will run the default task specified in this file.
- `package.json` Any `npm` dependencies needed to build / compile your application.
- `README.md` A copy of this very file!

## Generators

Available generators:

    yo thorax name
    yo thorax:router name
    yo thorax:view name
    yo thorax:model name
    yo thorax:collection name
    yo thorax:collection-view name
    yo thorax:helper name
    yo thorax:view-helper name

The `name` argument may include a directory path, such as `todo-list/index`:

    yo thorax:router todo-list
    yo thorax:view todo-list/index

## From Zero to Todos

If you haven't yet already make sure the generator is installed.

    npm install -g yo generator-thorax

Notice that both [npm](http://npmjs.org) and [bower](http://bower.io/) pulled down their dependencies. Now create your app, (later you'll replace 'todo-list' with your own project name)...

    yo thorax todo-list
    [?] Would you like to generate the app in a new directory? Yes
    [?] Would you like to include Bootstrap? Yes
    [?] Would you like to setup your project with a sample application? (Use arrow keys)
          Hello World 
          Todo List 
        ❯ None 

...and then `cd todo-list`. To generate the completed version of the todo app we're about to create, select `Todo List` in the options listed above. We'll generate the needed files first, then start editing them. To get started, let's generate our first view:

    yo thorax:view todo-list/index

This will generate two new files, a view and a matching template...

    create js/views/todo-list/index.js
    create js/templates/todo-list/index.handlebars

...and inserted the following code into index.js:

    define([  //dependencies array
     'view',
     'templates/todo-list/index'
    ], function (View, template) {  //callback
     return View.extend({
       name: 'todo-list/index',
       template: template  //templates/todo-list/index.js is passed in as the arg 'template' above, then assigned as a property of the view 
      });
    });
    
Those familiar with RequireJS will be thrilled to see that define() call, and those who aren't should read the [API](http://requirejs.org/docs/api.html). In short, RequireJS is going to make the code found in the files `view` and `templates/todos/index` available inside of the callback as `View` and `template`, respectively. We'll come back to these. You can leave the `.js` off when adding dependencies to a module in RequireJS, it's expecting a script. All file paths are relative to the directory set in the `baseUrl` property of the options object in the function that configures RequireJS `getRequireJSOptions` found in Gruntfile.js, or `./` by default. 

Next, we'll create our first router:

    yo thorax:router todo-list
    
This will generate one new file...

    create js/routers/todo-list.js

...into which the following code will be inserted:

    define([
      'views/root',  
      'backbone'
    ], function (RootView, Backbone) {
      return Backbone.Router.extend({  //plain Backbone. Thorax doesn't touch the router.
        routes: {
        }
      });
    });

Now that we have our files, we can start editing them. Let's first get something up on the screen. We'll add our index route to `js/routers/todo-list.js`, and an `index` function Backbone will fire for us when that route is hit. Inside of that function we'll create an instance of our view, which we'll be able to access because we've passed it into scope by way of the dependencies array...

    define([
      'backbone',  //included because we're calling the Backbone object below. While Backbone depends on Underscore, we wouldn't pass that in unless we were going to use "_" inside of our callback.
      'views/root',  //this is what's going to get attached to the DOM. More on that soon.
      'views/todo-list/index'  //this is the view class we're going to instantiate below...
    ], function (RootView, Backbone, TodoListIndexView) {  //...but to make it available we're going to need to add it and pass it into our callback, here we've named it TodoListIndexView
      return Backbone.Router.extend({
        routes: {
          "": "index" //add an index route hereabouts.
        },
        index: function(){
          var view = new TodoListIndexView({})  //Hey! I'm a view getting instantiated! My template will be rendered. Purr.
          RootView.getInstance().setView(view)  //Nuke whatever was in the {{layout-element}} element in root.hbs (and do memory management), replace it with the template rendered by the line above.  
        }
      });
    });

...and then give `templates/todo-list/index.handlebars` something to render:

    <p> Arrrr! I'm a pirate with a handlebar mustache. </p>
    








BUILD
those dependencies which require will load which have been written as require modules (ie., define([] callback) will know their dependencies because they are defined explicitely. Those modules, such as vendor libraries like jquery and backbone, which have NOT been written as require modules, must have their dependencies explicitely defined in the gruntfile. THIS MEANS that if you add a vendor library… you need to go into the shim to make that shit work. 




************************************************************************************************
************************************************************************************************
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
************************************************************************************************
************************************************************************************************









Since all routes are specified in `lumbar.json`, to create our first route it needs to be added there so we will create an empty (root) route pointing at an `index` method:

    "modules": {
      "todos": {
        "routes": {
          "": "index"
        },
        ...

In `js/routers/todos.js` we will then implement the method:

    new (Backbone.Router.extend({
      routes: module.routes,
      index: function() {

      }
    }));

Note that `module.routes` is automatically made available and will contain the hash of routes specified in `lumbar.json` for the todos module.

Application and Views
---------------------
The `Application` object contains a number of subclasses defined in the `js` folder: [stub model view and collection for you to fill in - shorter name, when you need a view class pull that in]

- `js/view.js` contains `Application.View` descends from `Thorax.View`
- `js/collection.js` contains `Application.Collection` descends from `Thorax.Collection`
- `js/model.js` contains `Application.Model` descends from `Thorax.Model`

Any application specific methods can be defined in those files.

To place the first view on your page take a look at `js/views/todos/index.js`:

    Application.View.extend({
      name: "todos/index"
    });

When a view class is created with `extend` that has `name` property it will automatically be available on the `Application.Views` hash:

    Application.Views["todos/index"]

Any template with the same name will also automatically be set as the `template` property, in this case `templates/todos/index.handlebars` will be automatically set as the `template` property.

The `Application` object also serves as our root view and it's `el` is already attached to the page. It is an instance of `Thorax.LayoutView` which is meant to display a single view at a time and has a `setView` method. In `js/routers/todos.js` we can call:

    index: function() {
      var view = new Application.Views["todos/index"]({});
      Application.setView(view);
    }

Update `templates/todos/index.handlebars` with some content to see that it's displaying properly.

Rendering a Collection
----------------------
To implement a todos list we need to create a collection and set it on the view. Unlike a `Backbone.View` instance a `Throax.View` (and therefore `Application.View`) instance does not have an `options` object. All properties passed to the constructor are set on the instance and also become available inside of the handlebars template.

Our `index` method in `js/routers/todos.js` should look like:

    index: function() {
      var collection = new Application.Collection([{
        title: 'First Todo',
        done: true
      }]);
      var view = new Application.Views["todos/index"]({
        collection: collection
      });
      Application.setView(view);
    }

To display the collection we will edit `templates/todos/index.handlebars` and use the `collection` helper which will render the block for each model in the collection setting `model.attributes`  as the context inside the block. A `tag` option may be specified to define what type of HTML tag will be used when creating the collection element:

    {{#collection tag="ul"}}
      <li>{{title}}</li>
    {{/collection}}

Since we want to be able to mark our todos as done and add new ones, we will add a checkbox to each item in the collection and a form to make new items at the bottom. Our `templates/todos/index.handlebars` should now look like:

    {{#collection tag="ul"}}
      <li {{#done}}class="done"{{/done}}>
        <input type="checkbox" {{#done}}checked{{/done}}>
        {{title}}
      </li>
    {{/collection}}
    <form>
      <input name="title">
      <input type="submit" value="Add">
    </form>

Lastly add an associated style in `stylesheets/todos.css`:

    .done {
      text-decoration: line-through;
    }

View Behaviors
--------------
In order to add new items to the list we should listen to the `submit` event on `form` elements in our view. We can use the events hash in `js/views/todos/index.js`:

    "submit form": function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      this.collection.add(attrs);
      this.$('input[name="title"]').val('');
    }

The `serialize` method will return a hash of all attributes in form elements on the page. Since we had an input with a name of `title` attrs will be set to: `{title: "your todo"}`. When using the `collection` helper or a `CollectionView` Thorax adds, removes and updates views in the collection as appropriate, so once we `add` a new model to the collection the view will automatically update.

    'change input[type="checkbox"]': function(event) {
      var model = $(event.target).model();
      model.set({done: event.target.checked});
    }

We also need to listen for a change in a checkbox so we can mark a model as done. Thorax extends the jQuery or Zepto `$` object with three methods: `$.view`, `$.model` and `$.collection`. They will retrieve closest bound object to an element. In this case a model was automatically bound to the `li` tag passed into the `collection` helper in the template. Now that we have a reference to the `model` we can update it and the view will automatically update.

Our finished `js/views/todos.js` file should look like:

    Application.View.extend({
      name: "todos/index",
      events: {
        "submit form": function(event) {
          event.preventDefault();
          var attrs = this.serialize();
          this.collection.add(attrs);
          this.$('input[name="title"]').val('');
        },
        'change input[type="checkbox"]': function(event) {
          var model = $(event.target).model();
          model.set({done: event.target.checked});
        }
      }
    });

And that's a finished non persistent todo list application! For a more complex todos example see the [Thorax + Lumbar TodoMVC example](https://github.com/addyosmani/todomvc/tree/gh-pages/labs/dependency-examples/thorax_lumbar)




