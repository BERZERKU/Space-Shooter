require('dotenv').config();


var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Player = require('./models/playerModel').default, //created model loading here
  Enemy = require('./models/enemyModel');
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/playerRoutes'); //importing route
routes(app); //register the route
var enemyRoute = require('./routes/enemyRoutes'); //importing route
enemyRoute(app); //register the route
var enemiesRoute = require('./routes/enemiesRoutes'); //importing route
enemiesRoute(app); //register the route

app.listen(port);

console.log('Space shooter API server started on: ' + port);