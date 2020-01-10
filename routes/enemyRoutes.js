"use strict";

module.exports = function(app) {
  var enemy = require("../controllers/enemyController");
  var auth = require("../middleware/tokenAuthenticator");

  //Enemy Routes

  app.route("/enemy").post(auth.authenticate, enemy.spawn);
  app
    .route("/enemy/getByName/:name")
    .get(auth.authenticate, enemy.get_by_name); //found : but didn't work either https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
  app
    .route("/enemy/:id")
    .get(auth.authenticate, enemy.get_by_id)
    .put(auth.authenticate, enemy.update_by_id)
    .delete(auth.authenticate, enemy.delete_by_id);
};
