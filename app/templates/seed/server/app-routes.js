/**
 * Use this file to mock out your production api server during development
 */


/**
 * Normally you'd want to store this data in a database, this is just an example
 */
 var todo1 = {
   "id": 1,
   "title": "Make a server in under 10 minutes",
   "completed": true
 };

 var todo2 = {
   "id": 2,
   "title": "Drink beer instead of typing more stuff",
   "completed": true
 };

var todos = [todo1, todo2];

module.exports = function (server) {
  server.namespace('/api', function () {

    server.get('/todos', function (req, res) {
      res.send(todos);
    });

    server.get('/todos/:id', function (req, res) {
      res.send(todos[req.params.id-1]);
    });

  });
};

/**
 * Make a proxy in 3 lines. Use this for any server you'd like to proxy. For more
 * information on configuring this proxy for 'realz' with things like oauth,
 * cookies and other 'real life' stuff, see https://github.com/mikeal/request
 *
 * A second option with a few more features is
 * https://github.com/nodejitsu/node-http-proxy
 */

// module.exports = {
//   server.all('/api/*', function (req, res) {
//     var target = 'http://some-endpoint.com';
//     req.pipe(request(target+req.url)).pipe(res);
//   });
// };

/**
 * Another example, using a mongodb database, modify for your own use
 */

// // install: npm install mongoose --save
// var mongoose = require('mongoose');

// //Connect to database
// mongoose.connect('mongodb://localhost/library_database');

// //Schemas
// var Book = new mongoose.Schema({
//   title: String,
//   author: String,
//   releaseDate: Date,
//   keywords: [ Keywords ]
// });
// var Keywords = new mongoose.Schema({
//   keyword: String
// });

// //Models
// var BookModel = mongoose.model( 'Book', Book );

// module.exports = function (server) {
//   server.namespace('/api', function () {

//     server.get('/books', function (req, res) {
//       return BookModel.find(function (err, books) {
//         if (err) return console.log(err)
//         setTimeout(function () { // fake long response time
//           return res.send(books)
//         }, 900);
//       })
//     })

//     server.get('/books/:id', function (req, res) {
//       return BookModel.findById(req.params.id, function (err, book) {
//         if (err) return console.log(err)
//         return res.send(book)
//       })
//     })

//     server.post('/books', function (req, res) {
//       var book = new BookModel({
//         title: req.body.title,
//         author: req.body.author,
//         releaseDate: req.body.releaseDate,
//         keywords: req.body.keywords
//       })
//       book.save(function (err) {
//         if (err) return console.log(err)
//         return console.log('created')
//       })
//       return res.send(book);
//     })

//     server.put('/books/:id', function (req, res) {
//       console.log('Updating book' + req.body.title)
//       return BookModel.findById(req.params.id, function (err, book) {
//         book.title = req.body.title;
//         book.author = req.body.author;
//         book.releaseDate = req.body.releaseDate;
//         book.keywords = req.body.keywords;

//         return book.save(function (err) {
//           if (err) console.log(err)
//           console.log('book updated')
//           return res.send(book)
//         })
//       })
//     })

//     server.delete('/books/:id', function (req, res) {
//       console.log('Deleting book with id: ', req.params.id)
//       return BookModel.findById(req.params.id, function (err, book) {
//         return book.remove(function (err) {
//           if (err) console.log(err)
//           console.log('Book removed')
//           return res.send('')
//         })
//       })
//     })

//   });
// };