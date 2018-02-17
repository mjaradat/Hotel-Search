var express = require('express');
var router = express.Router();
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var search = require('./routes/search.js');
var result = require('./routes/result.js');


var app = express();
// app.set('view engine', 'pug');
// app.set('views','./views');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));



app.get('/', function(req, res){
    res.redirect('search');
 });

 //Defining the routes
app.use('/search', search);
app.use('/result', result);

app.get('*', function(req, res){
    res.redirect('search');
 });

app.listen(3003);