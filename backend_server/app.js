var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var newindexRouter = require('./routes/newindex');
var appRouter = require('./routes/appointments');
var favRouter = require('./routes/favourites'); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/', appRouter);
app.use('/favourites', favRouter);
app.use('/new',newindexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');
var collection = db.get('videos');

app.locals.mm= "mm";

app.locals.getAvailableAppointments = function(value,id) {
	
	const res2 = [1,2];
  const api= "/vidoes/"+id;
router.get(api, function(req, res) {
  collection.find({ _id: req.params.id }, function(err, result){
    if (err) throw err;
    let ap_len=  Object.keys( result[0].appointments).length ;
    const res1 = [];

    for(let i=0; i < ap_len; i++)
    {res1[i] = result[0].appointments[i].date;
      console.log("test");
      if(res1[i]=="10-10-2022")
      {
        for(let j=0; j < result[0].appointments[i].time.length; j++)
      {res2[j] = result[0].appointments[i].time[j];
  
      }
               break;
      }
      
        }
});
});
return res2;
}

module.exports = app;
