var express = require('express')
  , path = require('path')
  , port = process.env.PORT || 3000
  , app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/api', require('./routes/api')) // Our todo API
app.use('/', require('./routes/pages')) // Example files

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

app.listen(port, function() {
  console.log("Now listening on "+port) 
})

