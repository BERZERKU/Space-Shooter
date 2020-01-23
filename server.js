require("dotenv").config();

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Player = require("./models/playerModel").default, //created model loading here
  enemyModel = require("./models/enemyModel");
bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./routes/playerRoutes"); //importing route
routes(app); //register the route
var enemyRoute = require("./routes/enemyRoutes"); //importing route
enemyRoute(app); //register the route
var enemiesRoute = require("./routes/enemiesRoutes"); //importing route
enemiesRoute(app); //register the route

var enemy = require("./controllers/enemyController");
//var enemies = enemy.get_all_enemies;

//tell express that we are using pug as our template engine
app.set("view engine", "pug");

// serve static files from the `public` folder
app.use(express.static(__dirname + "/views/public"));

app.get("/", (req, res) => {
  //finds enemies and turns data into json. Only works if directly integrated into server.js
  enemyModel.find({}, function(err, enemies) {
    if (err) {
      res.send(err);
      console.log("Error from the Database");
    } else {
      res.render("index", {
        title: "Homepage",
        enemiesCategory: enemies
      });
    }
  });
});

//when the user accesses a specific enemy, we send it's id to the browser. Express accesses URL query parameters with req.query
app.get("/enemy", (req, res) => {
  enemyModel.find({}, function(err, enemies) {
    if (err) {
      res.send(err);
      console.log("Error from the Database");
    } else {
      const enemy = enemies.find(p => p.id === req.query.id);
      res.render("enemy", {
        title: `About ${enemy.name}`,
        enemy
      });
    }
  });
});

app.listen(port);

console.log("Space shooter API server started on: " + port);
