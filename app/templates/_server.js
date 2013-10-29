var connect = require('connect');

var app = connect()
  .use(connect.logger())
  .use(connect.static('dist'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Connect server listenting on port " + port);
});