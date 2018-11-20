//__Requirements__\\
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');

//express init
const app = express();
//mongodb
mongoose.connect('mongodb://Aaron:gokuh123@ds157223.mlab.com:57223/books-march', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//__Middleware__\\
//app.use(fileupload())
app.use(express.static('public'))

app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//__Routes__\
//app.use('/api', require('./routes/api'));
app.use('/dash', require('./routes/routes'));

//__Dash Routes
app.get('/', function(req, res){
  res.render('home')
})




app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message})
})

//__PORT__\\
app.listen(process.env.PORT || 5000, () => {
  console.log('app listening on port 5000')
});
