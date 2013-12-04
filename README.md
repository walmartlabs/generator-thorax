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

- Thorax, a framework for building better Backbone applications
- Handlebars, a framework that works out of the box with Thorax for writing dynamic JavaScript views in HTML, variables are inserted using the `{{ handlebars }}` syntax
- Grunt, a framework for declaratively defining CLI tasks, e.g., for running tests, compiling stylesheets, creating a production build of your app.
- Bower, a package manager for the browser making it easy to pull in 3rd party libraries
- Your choice of LESS/Stylus/SASS for more productive stylesheets
- Automated JavaScript testing stack:
  - Mocha w/ Chai - for BDD style tests
  - Karma, a framework for piping test results to the command line for a rapid testing feedback loop
  - Built in support for Travis CI
- Require JS, a framework for working with modules in the browser
  - `hbs!` Require JS plugin for 'just in time' compiling of Handlebars templates for rapid feedback during development. Templates will be pre-compiled when creating a production build via the r.js optimizer provided as a grunt task
  - `cs!` Require JS plugin for 'just in time' compiling of CoffeeScript files, allowing you to mix CoffeeScript and JavaScript files at will, enjoy rapid feedback during development, including fast tests. CoffeeScript will be pre-compiled to JavaScript when creating a production build via the r.js optimizer provided as a grunt task
- Yoeman Generators
  - generating a new application
  - generate a new router, view, model, collection or helper with an example test written in Mocha + Chai
- Live Reload, for automated browser reloading during development
- Built in deployment strategies for Heroku and Nodejitsu, for quick and efficient deployment of your app to the cloud.

## Directory Structure

- `bower_components` Installed third party libraries. Managed by [Bower](http://bower.io/), do not modify directly, instead use `bower install package-name --save`
- `css` Regardless of whether you are using a CSS superset (LESS / Stylus / SASS) or plain CSS, this is where your CSS should live. This will get copied or compiled to `public/css` when running `grunt`
- `js` Require JS baseUrl, files here are 'live' in development for easy debugging
    - `collections`
    - `models`
    - `routers`
    - `templates`
    - `views`
    - `collection-view.js`
    - `collection.js`
    - `layout-view.js`
    - `main.js` Require JS data-main entry point
    - `model.js`
    - `view.js`
- `node_modules`
- `public` The connect server will serve this directory at `/public`
  - `css` Generated or copied CSS from the `css` directory, do not modify.
  - `fonts` Any web fonts for your application, safe to modify.
  - `img` Any images, safe to modify
  - `index.html` Do not modify, instead, add paths/shims to `/main.js`
- `tasks` Put your custom grunt tasks in here
  - `options` Installed grunt options are looked up here, by file name
- `bower.json` Third party library management via [Bower](http://bower.io/)
- `Gruntfile.js` [Grunt](http://gruntjs.com/) build file. `grunt` will run the default task specified in this file.
- `package.json` Any `npm` dependencies needed to build / compile your application.
- `README.md` A copy of this very file!

## Grunt Tasks

Every generated application comes fully loaded with an amazing development and testing environment. Furthermore, when your ready to show the world what you've made, building a production version of your application and deploying it to the cloud is painless and even testable in multiple browsers.

### Development

**Run `grunt`**

The best way to get up and running in development is to run `grunt` from the command line. This will boot a connect server and open up a browser to `http://localhost:8000/test` where you'll see the mocha test runner. This is to encourage testing, although it's not required. 

To view your application, click on the link in the upper left hand corner that says [view my application in a new tab](http://localhost:8000/test), this will take you to `public/index.html`, the entry point for your app.

At this point you'll have two tabs open in your browser, both of them synced via livereload to your application. Changing any file within your application will reload both pages so your code and your browser are never out of sync.

### Testing

**Run `grunt autotest`**

The easiest way to run your tests is perhaps just to stick with the test runner page provided when running the default `grunt` task discussed above.

However, every application also comes with [karma](https://github.com/karma-runner/karma) setup to run your mocha tests inside your terminal window out of the box.

To try this out run `grunt autotest` from the command line. By default karma is setup to run tests in Chrome which is the most reliable and fastest way to gain rapid feedback from a real browser during development.

### Advanced Testing

**Run `grunt` in one window and `karma start` in a second**

Another option for running your tests is too skip grunt altogether and simply run `karma start` from your terminal window. This option will provide the fastest feedback loop during development and is recommended once your comfortable running your tests completely on the command line. 

You still may want to run `grunt` in a second terminal window to hook up livereload to your application when adjusting styles or manually clicking through your app, but running `karma start` will shave roughly a second off of each test run making for a very tight feedback loop.

#### Debugging Karma

To gain access to the console and debugging tools provided by Chrome, click on the `Debug` button at the top of the window booted by karma. Within here you'll have full access to your Thorax application, even though the page itself is white.

### Production

**Run `grunt production`**

When your ready to build concatenated and minified versions of your css and JavaScript source run `grunt production`. The output can be found in `dist/` and a browser window will be booted so you can play with the production version of your application before deployment.

#### Test Your Production Build in Multiple Browsers

**Run `grunt deploy`**

Before deploying your application run `grunt deploy` to run your tests against the built version of your application inside the following browsers:

- Chrome
- Firefox
- Safari
- PhantomJS

To test your application in IE you'll need a Windows box. Run `npm install karma-ie-launcher --save-dev` and add `IE` to the array of browsers within the deploy task inside `tasks/options/karma.js`. However, using [Sauce Labs](https://saucelabs.com/) in conjunction with the [Karma Sauce Launcher](https://github.com/karma-runner/karma-sauce-launcher) is the recommended and effective solution to this common problem.

#### Phantom JS with Karma or Mocha-PhantomJS

If you prefer to manually run your tests via the command line during development every generated app also provides to ways to accomplish this:

- `grunt test` will run your tests with Phantom JS via karma
- `grunt test-mocha-phantomjs` will run your tests with [Mocha PhantomJS](https://github.com/metaskills/mocha-phantomjs), which also outputs to your terminal but provides a nicer UI than Karma in a format that reads like documentation, similar to what you'll find in the browser window when running `grunt` or when running mocha tests in node js.

#### Continuous Integration with Travis CI

**Use github, flip on Travis CI switch**

If you host your application as a repo on github(public or private), you can optionally turn on Travis CI support. Every application is generated with a `.travis.yml` file, so once the switch has been turned on, it'll work out of the box.

## Deployment

Every generated application comes setup ready to deploy to either Heroku and/or nodejitsu.

**To deploy to heroku:**

1. Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed and you have logged into your account via `heroku login`.
2. Build your app: `grunt production`. This will output a minified version of your app to `dist/` which heroku will serve up.
3. Make sure you have committed your changes to git:
    - `git add .`
    - `git commit -m "commit message here"`
4. Run `heroku create` from the command line.
5. Run `git push heroku master`
6. Run `heroku open` to see your app live on the web!

Note: During deployment run `foreman start` to test your application. Open your browser to port `5000` to view your app.

**To deploy to nodejitsu:**

1. Install the tool: `npm install jitsu -g`
2. Create an account: `jitsu signup`
3. Login: `jitsu login`
4. Build your application: `grunt production`
5. Deploy: `jitsu deploy`

That's it. Your `package.json` file already has a `scripts` option named `start` that nodejitsu will use to boot the application.

### CoffeeScript Support

Out of the box all generators can optionally output CoffeeScript. 

When generating a new application, the generator will simply ask you if you want CoffeeScript or JavaScript and act accordingly by outputting the generated application with the files of the chosen format.

Running a sub generator, like `yo thorax:router`, will look for the presence of at least one `.coffee` file within `js/` and choose whether to output CoffeeScript or JavaScript accordingly. 

To force CoffeeScript output, append `--coffee` to any of the following commands.

To force JavaScript output, append `--js` to any of the following commands.

##### Requiring a CoffeeScript Module

Regardless of what a generator outputs, `.coffee` files are always supported out of the box. 

To require a CoffeeScript module instead of a JavaScript module simply prefix the module name with `cs!`. For example: (inside a JavaScript module or CoffeeScript module)

```js
  require(['cs!my-module'], function(myModule) { ... })
```

Prefixing a module name with `cs!` will compile the CoffeeScript file on the fly removing the need for pre-compilation during development.

When creating a production build with `grunt production` however, the r.js optimizer will pre-compile the CoffeeScript files to JavaScript before doing concatenation and minification.

### Handlebars Support

Similar to how CoffeeScript files are compiled on the fly using the `cs!` Require JS plugin, Handlebars files ending in `.hbs` also benefit from not having to run through a compile phase.

To require a handlebars template for use in a view, prefix the name of the module with `hbs!`. For example, inside a view or collection view:

```js
  require(['hbs!my-template'], function(template) { ... })
```

Handlebars files will be treated as JavaScript templates therefore leave off the trailing `.hbs` when requiring a template within a view or collection-view.

One current caveat with this approach is that the `template` option within a view or collection-view will always need to be manually set.

## Generators

### Application Generator:

Generate a new Thorax Application using the software stack mentioned above:

```sh
$ yo thorax app-name
```

### Sub Generators:

Use these within an existing Thorax application:

```sh
$ yo thorax:router name
$ yo thorax:view name
$ yo thorax:model name
$ yo thorax:collection name
$ yo thorax:collection-view name
```

The `name` argument may include a directory path, such as `todo-list/index`:

```sh
$ yo thorax:router todo-list
$ yo thorax:view todo-list/index
```

## From Zero to Todos

### Install the generator

```sh
$ npm install -g yo generator-thorax
```

### Generate your application

```sh
$ yo thorax todo-list
[?] Would you like to generate the app in a new directory? Yes
[?] Choose a css pre-processor: (Use arrow keys)
    ❯ Less with bootstrap (default choice) 
      Sass 
      Stylus 
      Plain CSS
[?] Would you like to use CoffeeScript? No
[?] Would you like to use Zepto in place of jQuery (Zepto is best for mobile apps)
[?] Would you like to setup your project with a sample application? (Use arrow keys)
      Hello World
      Todo List
    ❯ None
```

...and then `$ cd todo-list`. 

Note that had you chosen `Todo List` for the sample application above, you would have generated the completed version of the app we're about to build. You may want to do this when we're finished to check your work.

For more information on what is included in a blank generated application, e.g., when choosing `None`, see [what are all these files](#default-application).

### Sub Generators

##### Generate a View:

```sh
$ yo thorax:view todo-list/index
```

This generates two new files, a view and a matching template:

```sh
create js/views/todo-list/index.js
create js/templates/todo-list/index.hbs
```

`views/todo-list/index.js` should contain the following code:

```js
define([
 'view',
 'hbs!templates/todo-list/index' // IMPORTANT, prefix with hbs! when requiring a template
], function (View, template) {
 return View.extend({
   name: 'todo-list/index',
   template: template  // passed as `template` arg above, must be set
  });
});
```

Had we been using CoffeeScript in our application the output would instead look like:

```cs
define [
  'cs!view', # IMPORTANT, prefix with cs! when requiring a module written in CS
  'hbs!templates/todo-list/index'
], (View, template) ->
  View.extend
    name: 'todo-list/index'
    template: template
```

Those familiar with RequireJS will be thrilled to see the define() call above, and those who aren't should read the section about [require js](#requirejs) at the end of the README for short summary.

##### Generate a Router:

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
  'backbone'
  'views/root',
], function (Backbone, RootView) {
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
], function (Backbone, RootView, TodoListIndexView) {  //...but to make it available we're going to need to add it and pass it into our callback, here we've named it TodoListIndexView
  return Backbone.Router.extend({
    routes: {
      "": "index" //add an index route
    },
    index: function(){
      var view = new TodoListIndexView({})  //Hey! I'm a view getting instantiated! My template will be rendered
      RootView.getInstance().setView(view)  //Nuke whatever was in the {{layout-element}} element in root.hbs (and do memory management), replace it with the template rendered by the line above.
    }
  });
});
```

...and then give `templates/todo-list/index.handlebars` something to render:

```html
<p> Arrrr! I'm a pirate with a handlebar mustache. </p>
```

Finally, edit `js/main.js`. To the list of dependencies required by this module, add `'routers/todo-list'`. Add it before `'helpers'`. Also make sure to inject the dependency into the module as an argument to the factory function. Then instantiate the router inside the initialize function, before calling `next();`.

The final changes should look like:

```javascript
  require([
    'jquery',
    'backbone',
    'views/root',
    'routers/todo-list', // ADDED
    'helpers',
  ], function ($, Backbone, RootView, TodoListRouter) { // MODIFIED

    initialize(function(next) {
      new TodoListRouter(); // ADDED
      next();
    });

    ...snip...
```

##### Run `grunt` to build and view your application

Now that we have something on screen, let's get some data on the screen and finish the rest of our todo list.

##### Render a Collection

To implement a todo list, we need to create a collection and set it on the view. Unlike a `Backbone.View` instance, a `Thorax.View` instance does not have an `options` object. All properties passed to the constructor are set on the instance and also become available inside of the handlebars template. We'll now update `js/routers/todo-list.js`...

```js
define([
  'backbone',
  'collection',  // ADDED
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

To display the collection we will edit `templates/todo-list/index.hbs` and use the `collection` handlebars helper to loop through each model in the collection:

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

Since we want to be able to mark our todos as done and add new ones, we will add a checkbox to each item in the collection and a form to make new items at the bottom. Our `templates/todo-list/index.hbs` should now look like:

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

## Require JS

TODO

## Default Application

TODO: explain what the files and directories inside of /js when generating a default application are for

### `js/main.js`

This is the main entry point into your application. The following modules are required for this module to do it's job:

- `jquery` - used to run body of initialize function when document is 'ready'
- `backbone` - a shim for this is made in `/main.js` so it is in fact a module. Used to call `Backbone.history.start` inside the jQuery ready callback.
- `views/root` - the root view, we'll talk more about this below
- `helpers` - doesn't return anything used inside of `js/main.js` but it does 'resolve' the module contained within `js/helpers.js` thereby registering Handlebars helpers and Thorax View Helpers declared inside the factory function, making them globally available for use within any `.hbs` file within our app.

Given a solid understanding of modules and dependency injection, let's take a look at the logic contained within the `main` module:

```js
initialize(function(next) {
  // Load any data that your app requires to boot
  // and initialize all routers here, the callback
  // `next` is provided in case the operations
  // needed are aysynchronous
  console.log('second'); // ADDED
  next();
});

function initialize(complete) {
  $(function() {
    console.log('first'); // ADDED
    Backbone.history.start({
      pushState: false,
      root: '/',
      silent: true
    });

    // RootView may use link or url helpers which
    // depend on Backbone history being setup
    // so need to wait to loadUrl() (which will)
    // actually execute the route
    RootView.getInstance(document.body);

    complete(function() {
      console.log('third'); // ADDED
      Backbone.history.loadUrl();
    });
  });
}
```

Note we've added `console.log` statements to clarify the order of execution. Find them quickly by looking for `// ADDED` in the code above.

Once the page is ready, the function inside of `$()` is run. The order of execution thereafter follows the console.log statements, summarized as follows:

- First, Backbone.history.start is called. 
- Next, `RootView.getInstance(document.body)` is called. This actually calls a one off method defined within `RootView` view. `RootView` inherits from `LayoutView` which is a specialized subclass of a normal Thorax View that can be instantiated with or without a template. In this case a template is provided, which although informative in how to instantiate multiple 'root' level views, is nonetheless not required. Try playing around with the final todo list app built above by removing the this Root View and see what happens. 
- Finally, the initialize function is run and provided a `complete` callback function. 