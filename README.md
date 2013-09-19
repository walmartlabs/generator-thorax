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

    $ yo thorax name
    $ yo thorax:router name
    $ yo thorax:view name
    $ yo thorax:model name
    $ yo thorax:collection name
    $ yo thorax:collection-view name
    $ yo thorax:helper name
    $ yo thorax:view-helper name

The `name` argument may include a directory path, such as `todo-list/index`:

    $ yo thorax:router todo-list
    $ yo thorax:view todo-list/index

## From Zero to Todos

If you haven't yet already, make sure the generator is installed:

    $ npm install -g yo generator-thorax

 Now create your app, (later you'll replace 'todo-list' with your own project name)...

    $ yo thorax todo-list
    [?] Would you like to generate the app in a new directory? Yes
    [?] Would you like to include Bootstrap? Yes
    [?] Would you like to setup your project with a sample application? (Use arrow keys)
          Hello World 
          Todo List 
        ❯ None 

...and then `$ cd todo-list`. Notice that both [npm](http://npmjs.org) and [bower](http://bower.io/) pulled down their dependencies during the creation of the application. To generate the completed version of the todo app we're about to create, select `Todo List` in the options listed above. We'll generate the needed files first, then start editing them. To get started, let's generate our first view:

    $ yo thorax:view todo-list/index

This generated two new files, a view and a matching template...

    create js/views/todo-list/index.js
    create js/templates/todo-list/index.handlebars

...and inserted the following code into `views/todo-list/index.js`:

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

    $ yo thorax:router todo-list
    
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
    
At this point, we'll run the command `$ npm start` to build the project. You might try having two windows - your terminal and your text editor - open at the same time when you do this. In your text editor, make sure the contents of the `public` folder are visible (should be empty). When you run the command, your files will be copied into the `public` folder, which is what goes over the wire. It will also open up your browser to the project. During build, Require is going to make sure your scripts are loaded correctly - because so long as they've been written as a module (as above) they are aware of their dependencies. Unfortunately, many third-party libraries such as JQuery are not written as Require modules, must have their dependencies explicitely defined in `grunfile.js` in the `shim` section of the require configuration and manually declare the dependencies of those libraries, following the example of those already there.   

What about RootView? (FILL IN). Now that we have something on screen, let's get some data on the screen and finish the rest of our todo list.

Rendering a Collection
----------------------
To implement a todo list, we need to create a collection and set it on the view. Unlike a `Backbone.View` instance, a `Thorax.View` instance does not have an `options` object. All properties passed to the constructor are set on the instance and also become available inside of the handlebars template. We'll now update `js/routers/todo-list.js`...

    define([
      'backbone',
      'collection',  //we add the 'collection' module here in the dependencies array
      'views/root',
      'views/todo-list/index'
    ], function(Backbone, Collection, RootView, TodoListIndexView) {  //and also add the 'Collection' arg here
      return Backbone.Router.extend({
        routes: {
          "": "index"
        },
        index: function() {
          var collection = new Collection([{  //here we instantiate the collection and populate it with a single model with two properties, 'title' and 'done'
            title: 'First Todo',
            done: true
          }]);
          var view = new TodoListIndexView({
            collection: collection  //here we set the 'collection' property of our view to the collection we just instantiated
          });
          RootView.getInstance().setView(view);
        }
      });
    }); 

To display the collection we will edit `templates/todo-list/index.handlebars` and use the `collection` handlebars helper, which functions as a `forEach` and will `{{#collection}} render the code between the opening and closing collection tags for each model in the collection {{/collection}}`. Beautifully, all of the properties of the associated model are available in the helpers (see `{{title}}` below).  A `tag` option may be specified to define what type of HTML tag will be used when creating the collection element:

    {{#collection tag="ul"}}
      <li>{{title}}</li>
    {{/collection}}

Since we want to be able to mark our todos as done and add new ones, we will add a checkbox to each item in the collection and a form to make new items at the bottom. Our `templates/todo-list/index.handlebars` should now look like:

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

We'll also create a style sheet called `stylesheets/todo-list.css`, which will be automatically applied ONLY to the view with the same filename. Populate it with the following code:

    .done {
      text-decoration: line-through;
    }

View Behaviors
--------------
In order to add new items to the list we should listen to the `submit` event on `form` elements in our view. We can use the events hash in `js/views/todo-list/index.js`:

    events{
        "submit form": function(event) {
          event.preventDefault();
          var attrs = this.serialize();
          this.collection.add(attrs);
          this.$('input[name="title"]').val('');
        }
    }

The `serialize` method will return key value pairs of all attributes in form elements on the page. Since we had an input with a name of `title` attrs will be set to: `{title: "your todo"}`. When using the `collection` helper or a `CollectionView`, Thorax adds, removes and updates views in the collection as appropriate. When we `add` a new model to the collection the view will automatically update.

    'change input[type="checkbox"]': function(event) {
      var model = $(event.target).model();
      model.set({done: event.target.checked});
    }

We also need to listen for a change in a checkbox so we can mark a model as done. Thorax extends the jQuery or Zepto `$` object with three methods: `$.view`, `$.model` and `$.collection`. They will retrieve closest bound object to an element. In this case, a model was automatically bound to the `li` tag passed into the `collection` helper in the template. Now that we have a reference to the `model` we can update it and the view will automatically update.

Our finished `js/views/todo-list/index.js` file should look like:

    define([
      'view',
      'templates/todo-list/index'
    ], function(View, template) {
      return View.extend({
        name: "todo-list/index",
        template: template,
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
    });

And that's a finished non-persistent todo list application! For more complex examples and tutorials using the thorax framework, see the [tutorials on the Thorax homepage](http://thoraxjs.org)

