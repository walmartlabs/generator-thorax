require('express-namespace') // must come before express()

var path = require('path')
  , express = require('express')
  , server = express()
  , port = process.env.PORT || 8000

module.exports = server;

var serverBase = path.resolve(__dirname, '../');
server.set('serverBase', serverBase);

// very loud! To enable: ENABLE_LOGGING=true grunt
if (process.env.ENABLE_LOGGING) server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
require('./static-routes')(server); // Must be required before all other routes
require('./app-routes')(server);

/**
 * While developing your server, a convenient way to prevent having to restart
 * the server is to use nodemon, `npm install nodemon -g`. The following line
 * allows this file to act as a standalone server for such purposes, while also
 * acting as middleware for the grunt-connect task
 */
if (!module.parent) {
  server.listen(port, function () {
    console.log("Express server listening on port " + port);
  });
}

/**
 * Express Server / Middleware Stack
 *
 * Build a dev server w/ routes using express(expressjs.com)
 *
 * Require each route below. When you run `grunt`(or a related development
 * grunt task) connect will boot a server at localhost:8000 and
 * the routes will be avialable for use in your app
 *
 * If a required module needs to use the `server` object instantiated
 * in this file, make sure to pass `server` as an argument to the requried
 * module, and make sure the module exports a function(that takes one arg)
 *
 * @see  api/app-routes for an example
 *
 * To prevent namespace collisions use the namespace module (installed by default)
 * to namespace portions of your api, thereby preventing collisions(and odd behavior)
 *
 * Do not create a namespace named public, test, bower_components or js as those
 * are already used by your app(to serve the directories it uses)
 *
 * Example:
 *
 *   // api/some-api-namespace.js
 *   module.exports = function(server) {
 *     server.namespace('/some-api-namespace', function() {
 *       server.get('/some-route', function(req, res) {
 *         // do stuff
 *         req.send(res);
 *       })
 *     })
 *   }
 *
 *   // api/server.js (this file)
 *   require('./some-api-namespace')(server);
 *
 *   // In your app you can now visit
 *   // localhost:8000/some-api-namespace/some-route
 *
 */
