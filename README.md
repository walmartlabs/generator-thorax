# Thorax Generator

Generate a new [Thorax](http://thoraxjs.org/) application. Includes some configurable options and some opinions.

```sh
$ npm install -g yo generator-thorax
$ yo thorax desired-application
$ cd desired-application
$ grunt
```

For a snazzier development environment, it's recommended that you install the [Thorax Inspector Chrome Extension](https://chrome.google.com/webstore/detail/thorax-inspector/poioalbefcopgeaeaadelomciijaondk?hl=en-US) before getting started.

## Stack

TODO

## Directory Structure

- `bower_components` Installed third party libraries. Managed by [Bower](http://bower.io/), do not modify directly.
- `css` Regardless of whether you are using a CSS superset (LESS / Stylus / SASS) or plain CSS, this is where your CSS should live. This will get copied or compiled to `public/css` when running `grunt build`
- `js`
  - `collections`
  - `models`
  - `routers`
  - `templates`
  - `views`
  - `collection-view.js`
  - `collection.js`
  - `layout-view.js`
  - `require-config.js`
  - `model.js`
  - `view.js`
- `node_modules`
- `public` The connect server will serve this directory at `/public`
  - `css` Generated or copied CSS from the `css` directory, do not modify.
  - `fonts` Any web fonts for your application, safe to modify.
  - `img` Any images, safe to modify
  - `index.html` Do not modify, add scripts to `/require-config.js`
- `tasks` Put your custom grunt tasks in here
  - `options` Installed grunt options are looked up here, by file name
- `bower.json` Third party library management via [Bower](http://bower.io/)
- `Gruntfile.js` [Grunt](http://gruntjs.com/) build file. `grunt` will run the default task specified in this file.
- `package.json` Any `npm` dependencies needed to build / compile your application.
- `README.md` A copy of this very file!

## Grunt Tasks

Every generated application comes fully loaded with an amazing development and testing environment. Furthermore, when your ready to show the world what you've made, building a production version of your application and deploying it to the cloud is painless and even testable in multiple browsers.

### Development

##### tl;dr - Run `grunt` from the command line

The best way to get up and running in development is to run `grunt` from the command line. This will boot a connect server and open up a browser to `http://localhost:8000/test` where you'll see the mocha test runner. This is to encourage testing, although it's not required. 

To view your application, click on the link in the upper left hand corner that says [view my application in a new tab](http://localhost:8000/test), this will take you to `public/index.html`, the entry point for your app.

At this point you'll have two tabs open in your browser, both of them synced via livereload to your application. Changing any file within your application will reload both pages so your code and your browser are never out of sync.

### Testing

##### tl;dr - Run `grunt autotest`

The easiest way to run your tests is perhaps just to stick with the test runner page provided when running the default `grunt` task discussed above.

However, every application also comes with [karma](https://github.com/karma-runner/karma) setup to your mocha tests inside your terminal window out of the box.

To try this out run `grunt autotest` from the command line. By default karma is setup to run tests in Chrome which is the most reliable and fast way to gain rapid feedback from a real browser during development.

##### Advanced Testing

Another option for running your tests is too skip grunt altogether and simply run `karma start` from your terminal window. This option will provide the fastest feedback loop during development and is recommended once your comfortable running your tests completely on the command line. 

You still may want to run `grunt` in a second terminal window to hook up livereload to your application when adjusting styles or manually clicking through your app, but running `karma start` will shave roughly a second off of each test run making for a very tight feedback loop.

##### Debugging Karma

To gain access to the console and debugging tools provided by Chrome, click on the `Debug` button at the top of the window booted by karma. Within here you'll have full access to your Thorax application, even though the page itself is white.

### Production

##### tl;dr - Run `grunt production`

When your ready to build concatenated and minified versions of your css and JavaScript source run `grunt production`. The output can be found in `dist/` and a browser window will be booted so you can play with the production version of your application before deployment.

##### Test Your Production Build in Multiple Browsers

##### tl;dr - Run `grunt deploy`

Before deploying your application run `grunt deploy` to run your tests against the built version of your application inside the following browsers:

- Chrome
- Firefox
- Safari
- PhantomJS

To test your application in IE you'll need a Windows box. Run `npm install karma-ie-launcher --save-dev` and add `IE` to the array of browsers within the deploy task inside `tasks/options/karma.js`. However, using [Sauce Labs](https://saucelabs.com/) in conjunction with the [Karma Sauce Launcher](https://github.com/karma-runner/karma-sauce-launcher) is the recommended and effective solution to this common problem.

### Phantom JS with Karma or Mocha-PhantomJS

If you prefer to manually run your tests via the command line during development every generated app also provides to ways to accomplish this:

- `grunt test` will run your tests with Phantom JS via karma
- `grunt test-mocha-phantomjs` will run your tests with [Mocha PhantomJS](https://github.com/metaskills/mocha-phantomjs), which also outputs to your terminal but provides a nicer UI than Karma in a format that reads like documentation, similar to what you'll find in the browser window when running `grunt` or when running mocha tests in node js.

### Continuous Integration with Travis CI

##### tl;dr - Use github, flip Travis CI switch

If you host your application as a repo on github(public or private), you can optionally turn on Travis CI support. Every application is generated with a `.travis.yml` file, so once the switch has been turned on, it'll work out of the box.

## Deployment

Every generated application comes setup ready to deploy to either Heroku and/or nodejitsu.

##### To deploy to heroku:

1. Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed and you have logged into your account via `heroku login`.
2. Build your app: `grunt production`. This will output a minified version of your app to `dist/` which heroku will serve up.
3. Make sure you have committed your changes to git:
    - `git add .`
    - `git commit -m "commit message here"`
4. Run `heroku create` from the command line.
5. Run `git push heroku master`
6. Run `heroku open` to see your app live on the web!

Note: During deployment run `foreman start` to test your application. Open your browser to port `5000` to view your app.

##### To deploy to nodejitsu:

1. Install the tool: `npm install jitsu -g`
2. Create an account: `jitsu signup`
3. Login: `jitsu login`
4. Build your application: `grunt production`
5. Deploy: `jitsu deploy`

That's it. Your `package.json` file already has a `scripts` option named `start` that nodejitsu will use to boot the application.

## Require JS

WIP TODO

## Generators

Available generators:

```sh
$ yo thorax name
$ yo thorax:router name
$ yo thorax:view name
$ yo thorax:model name
$ yo thorax:collection name
$ yo thorax:collection-view name
$ yo thorax:helper name
$ yo thorax:view-helper name
```

The `name` argument may include a directory path, such as `todo-list/index`:

```sh
$ yo thorax:router todo-list
$ yo thorax:view todo-list/index
```

## From Zero to Todos

If you haven't yet already, make sure the generator is installed:

```sh
$ npm install -g yo generator-thorax
```

 Now create your app, (later you'll replace 'todo-list' with your own project name)...

```sh
$ yo thorax todo-list
[?] Would you like to generate the app in a new directory? Yes
[?] Choose a css pre-processor, less with bootstrap is the default
[?] Would you like to setup your project with a sample application? (Use arrow keys)
      Hello World
      Todo List
    ❯ None
```

...and then `$ cd todo-list`. Notice that both [npm](http://npmjs.org) and [bower](http://bower.io/) pulled down their dependencies during the creation of the application. To generate the completed version of the todo app we're about to create, select `Todo List` in the options listed above. We'll generate the needed files first, then start editing them. To get started, let's generate our first view:

```sh
$ yo thorax:view todo-list/index
```

This generated two new files, a view and a matching template...

```sh
create js/views/todo-list/index.js
create js/templates/todo-list/index.handlebars
```

...and inserted the following code into `views/todo-list/index.js`:

```js
define([  //dependencies array
 'view',
 'hbs!templates/todo-list/index'
], function (View, template) {  //callback
 return View.extend({
   name: 'todo-list/index',
   template: template  //templates/todo-list/index.js is passed in as the arg 'template' above, then assigned as a property of the view
  });
});
```

Those familiar with RequireJS will be thrilled to see that define() call, and those who aren't should read the [API](http://requirejs.org/docs/api.html). In short, RequireJS is going to make the code found in the files `view` and `templates/todos/index` available inside of the callback as `View` and `template`, respectively. We'll come back to these. You can leave the `.js` off when adding dependencies to a module in RequireJS; it's expecting a script. All file paths are relative to the directory set by the `baseUrl` which is `/js`.

Next, we'll create our first router:

```sh
$ yo thorax:router todo-list
```

This will generate one new file...

```sh
create js/routers/todo-list.js
```

...into which the following code will be inserted:

```js
define([
  'views/root',
  'backbone'
], function (RootView, Backbone) {
  return Backbone.Router.extend({  //plain Backbone. Thorax doesn't touch the router.
    routes: {
    }
  });
});
```

Now that we have our files, we can start editing them. Let's first get something up on the screen. We'll add our index route to `js/routers/todo-list.js`, and an `index` function Backbone will fire for us when that route is hit. Inside of that function we'll create an instance of our view, which we'll be able to access because we've passed it into scope by way of the dependencies array...

```js
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
```

...and then give `templates/todo-list/index.handlebars` something to render:

```html
<p> Arrrr! I'm a pirate with a handlebar mustache. </p>
```

At this point, we'll run the command `$ npm start` to build the project. You might try having two windows - your terminal and your text editor - open at the same time when you do this. In your text editor, make sure the contents of the `public` folder are visible (should be empty). When you run the command, your files will be copied into the `public` folder, which is what goes over the wire. It will also open up your browser to the project. During build, Require is going to make sure your scripts are loaded correctly - because so long as they've been written as a module (as above) they are aware of their dependencies. Unfortunately, many third-party libraries such as JQuery are not written as Require modules, must have their dependencies explicitely defined in `grunfile.js` in the `shim` section of the require configuration and manually declare the dependencies of those libraries, following the example of those already there.

What about RootView? (FILL IN). Now that we have something on screen, let's get some data on the screen and finish the rest of our todo list.

Rendering a Collection
----------------------
To implement a todo list, we need to create a collection and set it on the view. Unlike a `Backbone.View` instance, a `Thorax.View` instance does not have an `options` object. All properties passed to the constructor are set on the instance and also become available inside of the handlebars template. We'll now update `js/routers/todo-list.js`...

```js
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
```

To display the collection we will edit `templates/todo-list/index.handlebars` and use the `collection` handlebars helper, which functions as a `forEach` and will

```html
{{#collection}}
    render the code between the opening and
    closing collection tags for each model
    in the collection
{{/collection}}
```

Beautifully, all of the properties of the associated model are available in the helpers (see `{{title}}` below).  A `tag` option may be specified to define what type of HTML tag will be used when creating the collection element:

```html
{{#collection tag="ul"}}
  <li>{{title}}</li>
{{/collection}}
```

Since we want to be able to mark our todos as done and add new ones, we will add a checkbox to each item in the collection and a form to make new items at the bottom. Our `templates/todo-list/index.handlebars` should now look like:

```html
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
```

We'll also create a style sheet called `stylesheets/todo-list.css`, which will be automatically applied ONLY to the view with the same filename. Populate it with the following code:

```css
.done {
  text-decoration: line-through;
}
```

View Behaviors
--------------
In order to add new items to the list we should listen to the `submit` event on `form` elements in our view. We can use the events hash in `js/views/todo-list/index.js`:

```js
events{
    "submit form": function(event) {
      event.preventDefault();
      var attrs = this.serialize();
      this.collection.add(attrs);
      this.$('input[name="title"]').val('');
    }
}
```

The `serialize` method will return key value pairs of all attributes in form elements on the page. Since we had an input with a name of `title` attrs will be set to: `{title: "your todo"}`. When using the `collection` helper or a `CollectionView`, Thorax adds, removes and updates views in the collection as appropriate. When we `add` a new model to the collection the view will automatically update.

```js
'change input[type="checkbox"]': function(event) {
  var model = $(event.target).model();
  model.set({done: event.target.checked});
}
```

We also need to listen for a change in a checkbox so we can mark a model as done. Thorax extends the jQuery or Zepto `$` object with three methods: `$.view`, `$.model` and `$.collection`. They will retrieve closest bound object to an element. In this case, a model was automatically bound to the `li` tag passed into the `collection` helper in the template. Now that we have a reference to the `model` we can update it and the view will automatically update.

Our finished `js/views/todo-list/index.js` file should look like:

```js
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
```

And that's a finished non-persistent todo list application! For more complex examples and tutorials using the thorax framework, see the [tutorials on the Thorax homepage](http://thoraxjs.org)


