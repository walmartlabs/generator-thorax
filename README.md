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

Now create your app and cd into the directory:

    yo thorax app
    [?] Would you like to generate the app in a new directory? Yes
    [?] Would you like to include Bootstrap? Yes
    [?] Would you like to setup your project with a sample application? (Use arrow keys)
          Hello World 
          Todo List 
        ❯ None 

To generate the completed version of the todo app we're about to create, select `Todo List` in the options listed above. To get started, let's generate our first model:

    





### Setup

### Using Root View

The only view included by default is the `root` view, which is a [LayoutView](http://thoraxjs.org/api.html#thorax.layout-view) class that will attach itself to the body.

    require([
      'views/root'
    ], function(RootView) {
      RootView.getInstance().setView(myView);
    });

    

    define([
      'todo-list/index'
    ], function(Backbone, RootView, TodoListIndexView) {
      return Backbone.Router.extend({
        routes: {
          "": "index"
        },
        index: function() {
          var view = new 
        }
      });
    })

## Build Process

Development

Production

## Testing

## Proxying

## Deploying



************************************************************************************************
************************************************************************************************
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
Old content below ------Old content below ------Old content below ------Old content below ------
************************************************************************************************
************************************************************************************************



To generate your first view run:

    grunt generate:view:todos/index

In addition to modifying `lumbar.json` a number of files will be created:

- `js/views/todos/index.js`
- `templates/todos/index.handlebars`

It will also initialize a `todos` module since it doesn't exist yet. This will in turn create:

- `js/routers/todos.js`
- `stylesheets/todos.css`

Modules and lumbar.json
-----------------------
A Lumbar module is composed of routes (to be passed to `Backbone.Router`s), stylesheets and JavaScripts. When a route is visited the scripts and styles associated with the module will be loaded. After running the `generate:view` task your `lumbar.json` should look like this:

    {
      "mixins": [
        "node_modules/lumbar-loader",
        "node_modules/thorax",
        "config/base.json"
      ],
      "modules": {
        "todos": {
          "routes": {},
          "scripts": [
            "js/routers/todos.js",
            "js/views/todos/index.js"
          ],
          "styles": [
            "stylesheets/todos.css"
          ]
        }
      },
      "templates": {
        "js/init.js": [
          "templates/application.handlebars"
        ]
      }
    }

`mixins` loads up the base configurations for the project. To edit what libraries (jQuery / Bootstrap, etc) are included in the project open up `bower.json`. The `templates` hash defines what templates map to a given view. An entry only needs to be added if the name of a view doesn't match the name of a template. For instance, the generator created `js/views/todos/index.js` and `templates/todos/index.js`, but it doesn't need to be defined here as the names match.

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
The `Application` object contains a number of subclasses defined in the `js` folder:

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


